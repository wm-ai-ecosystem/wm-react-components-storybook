import { WizardStepData } from "./props";

// Promise check utility
export const isPromise = (obj: any): obj is Promise<any> => {
  return (
    obj instanceof Promise ||
    (obj !== null &&
      typeof obj === "object" &&
      typeof obj.then === "function" &&
      typeof obj.catch === "function")
  );
};

// Step navigation utilities
export const getNextValidStep = (
  fromIndex: number,
  visibleSteps: WizardStepData[]
): WizardStepData | null => {
  for (let i = fromIndex; i < visibleSteps.length; i++) {
    if (visibleSteps[i].show) {
      return visibleSteps[i];
    }
  }
  return null;
};

export const getPrevValidStep = (
  fromIndex: number,
  visibleSteps: WizardStepData[]
): WizardStepData | null => {
  for (let i = fromIndex; i >= 0; i--) {
    if (visibleSteps[i].show) {
      return visibleSteps[i];
    }
  }
  return null;
};

export const getStepByName = (stepName: string, steps: WizardStepData[]): WizardStepData | null => {
  return steps.find(step => step.name === stepName) || steps[0];
};

export const getStepByIndex = (
  index: number,
  visibleSteps: WizardStepData[]
): WizardStepData | null => {
  return visibleSteps[index] || null;
};

// Step update utilities
export const updateStepFocus = () => {
  setTimeout(() => {
    const currentStepElement = document.querySelector(
      ".MuiStepButton-root[aria-current='step']"
    ) as HTMLElement;
    currentStepElement?.focus();
  }, 100);
};

// Navigation handler utility
export const handleNavigation = async (
  response: boolean | Promise<boolean>,
  action: () => void
) => {
  if (isPromise(response)) {
    try {
      const result = await response;
      if (result !== false) action();
    } catch (error) {
      console.error("Navigation error:", error);
    }
  } else {
    if (response !== false) action();
  }
};

// Step extension function
export const extendNextFn = (
  currentStep: WizardStepData,
  currentStepIndex: number,
  visibleSteps: WizardStepData[],
  setSteps: (updater: (prevSteps: WizardStepData[]) => WizardStepData[]) => void
) => {
  const nextStep = getNextValidStep(currentStepIndex + 1, visibleSteps);
  if (nextStep) {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        active: step.name === nextStep.name,
        isDone: step.name === currentStep.name ? true : step.isDone,
        done: step.name === currentStep.name ? true : step.done,
        disabled: false,
        isInitialized: step.name === nextStep.name ? true : step.isInitialized,
      }))
    );
    updateStepFocus();
  }
};

// Step extension function for previous step
export const extendPrevFn = (
  currentStep: WizardStepData,
  currentStepIndex: number,
  visibleSteps: WizardStepData[],
  setSteps: (updater: (prevSteps: WizardStepData[]) => WizardStepData[]) => void
) => {
  const prevStep = getPrevValidStep(currentStepIndex - 1, visibleSteps);
  if (prevStep) {
    setSteps(prevSteps =>
      prevSteps.map(step => {
        const stepIndex = prevSteps.findIndex(ps => ps.name === step.name);
        const targetIndex = prevSteps.findIndex(ps => ps.name === prevStep.name);

        return {
          ...step,
          active: step.name === prevStep.name,
          isDone: currentStep.name === step.name ? false : step.isDone,
          done: stepIndex < targetIndex,
          disabled: false,
        };
      })
    );
    updateStepFocus();
  }
};

// Append deduped dynamic steps to existing steps
export const appendDatasetSteps = (
  prev: WizardStepData[],
  incoming: WizardStepData[]
): WizardStepData[] => {
  if (!incoming || incoming.length === 0) {
    return prev;
  }
  const existingNames = new Set(prev.map(s => s.name));
  const deduped = incoming.filter(s => {
    if (existingNames.has(s.name)) {
      return false;
    }
    existingNames.add(s.name);
    return true;
  });
  return deduped.length ? [...prev, ...deduped] : prev;
};

// Trim steps to target length and normalize flags after shrink
export const trimStepsToLength = (prev: WizardStepData[], targetLen: number): WizardStepData[] => {
  const sliced = prev.slice(0, targetLen);
  if (sliced.length === 0) {
    return sliced;
  }
  let activeIndex = sliced.findIndex(s => s.active);
  if (activeIndex === -1 || activeIndex >= targetLen) {
    activeIndex = Math.max(0, targetLen - 1);
  }
  return sliced.map((s, idx) => ({
    ...s,
    active: idx === activeIndex,
    isDone: false,
    done: idx < activeIndex,
    disabled: false,
    isInitialized: idx === activeIndex ? true : s.isInitialized,
    enableNext: idx === activeIndex ? true : s.enableNext,
    isValid: idx === activeIndex ? true : s.isValid,
    dynamicStepIndex: typeof s.dynamicStepIndex === "number" ? idx : s.dynamicStepIndex,
  }));
};
