import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
  useRef,
  HtmlHTMLAttributes,
} from "react";
import { Box, Typography, Stepper } from "@mui/material";
import clsx from "clsx";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WizardStepData, WmWizardProps, WizardContextType } from "./props";
import {
  getNextValidStep,
  getStepByName,
  getStepByIndex,
  handleNavigation,
  extendNextFn,
  extendPrevFn,
  getPrevValidStep,
  appendDatasetSteps,
  trimStepsToLength,
} from "./utils";
import WizardContext from "./WizardContext";
import WmWizardstep from "./wizard-step";
import { WizardStep } from "./components/WizardStep";
import WmForm from "@wavemaker/react-runtime/components/data/form";
import { formValidate, getFormData } from "@wavemaker/react-runtime/utils/form-utils";
import isEqual from "lodash-es/isEqual";

const DEFAULT_CLS = "app-wizard panel clearfix";
const BODY_CLASS = "app-wizard-body panel-body";

// Main Wizard Component
const WmWizard = memo(
  (props: WmWizardProps) => {
    const {
      listener,
      stepstyle = "auto",
      actionsalignment = "right",
      defaultstep = "none",
      defaultstepindex = 0,
      cancelable = true,
      enablenext = false,
      nextbtnlabel = "Next",
      previousbtnlabel = "Previous",
      donebtnlabel = "Done",
      cancelbtnlabel = "Cancel",
      type = "static",
      dataset = [],
      nodatamessage = "No Data Found",
      children,
      className = "classic",
      styles,
      name = "",
      onCancel,
      onDone,
      message,
      orientation = "horizontal",
      alternativeLabel = false,
      nonLinear = true,
      connector,
      width,
      height,
      render,
    } = props;

    const [steps, setSteps] = useState<WizardStepData[]>([]);
    const [wizardMessage, setWizardMessage] = useState(message || { caption: "", type: "" });
    const [isInitialized, setIsInitialized] = useState(false);
    const formRefs = useRef({});
    const navIndexRef = useRef<number>(-1);
    const [formReady, setFormReady] = useState(false);

    // Create dynamic steps callback
    const createDynamicSteps = useCallback(
      (datasetItems: any[], startIndex?: number) => {
        return datasetItems.map((item, index) => {
          index = startIndex || index;
          const stepData = render ? render(item, index, datasetItems) : item;
          const stepProps = stepData.props || {};
          return {
            ...stepProps,
            name: `step_${index}`,
            title: stepProps.title || `Step ${index + 1}`,
            show: stepProps.show !== false,
            enableskip: stepData.enableskip || false,
            enableNext: stepData.enableNext !== false,
            enablePrev: stepData.enablePrev !== false,
            enableDone: stepData.enableDone !== false,
            isDone: false,
            done: false,
            active: index === defaultstepindex,
            disabled: false,
            isValid: true,
            isInitialized: false,
            isdynamic: true,
            dynamicStepIndex: index,
            render: stepProps.render,
            haveForm: stepProps.haveForm || false,
          };
        });
      },
      [defaultstepindex]
    );

    // Computed properties
    const currentStep = useMemo(() => steps.find(step => step.active) || null, [steps]);

    const visibleSteps = useMemo(() => steps.filter(step => step.show), [steps]);

    const currentStepIndex = useMemo(() => {
      if (!currentStep) return -1;
      return visibleSteps.findIndex(step => step.name === currentStep.name);
    }, [currentStep, visibleSteps]);

    // Sync navigation ref whenever the visible current index changes
    useEffect(() => {
      navIndexRef.current = currentStepIndex;
    }, [currentStepIndex]);

    const hasNextStep = useMemo(
      () => currentStepIndex < visibleSteps.length - 1,
      [currentStepIndex, visibleSteps]
    );

    const hasPrevStep = useMemo(() => currentStepIndex > 0, [currentStepIndex]);

    const showDoneBtn = useMemo(
      () => !hasNextStep && currentStep?.enableDone !== false,
      [hasNextStep, currentStep]
    );

    const [isStepValid, setIsStepValid] = useState(true);
    const [formValiditySignature, setFormValiditySignature] = useState("");
    useEffect(() => {
      let unbind: (() => void) | null = null;
      const bindEmitEvent = () => {
        const stepName = currentStep?.name;
        if (!stepName) return false;
        const formElOrList = (formRefs.current as any)?.[stepName];
        const forms: HTMLFormElement[] = formElOrList
          ? Array.isArray(formElOrList)
            ? formElOrList
            : [formElOrList]
          : [];
        if (forms.length === 0) return false;

        const onValidity = (e: Event) => {
          const detail = (e as CustomEvent).detail as any;
          const isValid = detail?.isValid !== false;
          setFormValiditySignature(isValid ? "1" : "0");
        };

        forms.forEach(f => f.addEventListener("wm:form-validity", onValidity as EventListener));

        unbind = () => {
          forms.forEach(f =>
            f.removeEventListener("wm:form-validity", onValidity as EventListener)
          );
        };
        return true;
      };
      bindEmitEvent();
      return () => {
        if (unbind) unbind();
      };
    }, [currentStep, formReady]);

    useEffect(() => {
      const validateStep = async () => {
        if (!currentStep) return;

        const currentStepForm = (formRefs.current as any)[currentStep.name];
        if (!currentStepForm) return;

        const formdata = getFormData({ current: currentStepForm } as any);
        if (!formdata) return;

        const hasFields = Object.keys(formdata.values || {}).length > 0;
        if (!hasFields) {
          setIsStepValid(true);
          return;
        }

        const result = await formValidate({ current: currentStepForm } as any);
        setIsStepValid(result);
      };

      validateStep();
    }, [currentStep, formValiditySignature, formReady]);

    const enableNext = useMemo(() => {
      return (
        enablenext ||
        (currentStep?.enableNext !== false && currentStep?.isValid !== false && isStepValid)
      );
    }, [enablenext, currentStep, isStepValid]);

    const enablePrev = useMemo(() => currentStep?.enablePrev !== false, [currentStep]);

    const enableDone = useMemo(
      () => currentStep?.enableDone !== false && currentStep?.isValid !== false && isStepValid,
      [currentStep, isStepValid]
    );

    const isFirstStep = useMemo(() => currentStepIndex === 0, [currentStepIndex]);

    const isLastStep = useMemo(
      () => currentStepIndex === visibleSteps.length - 1,
      [currentStepIndex, visibleSteps]
    );

    const computedStepClass = useMemo(
      () => (stepstyle === "justified" ? "justified" : "auto"),
      [stepstyle]
    );

    // Step click handler
    const onStepHeaderClick = useCallback(
      (event: React.MouseEvent, step: WizardStepData) => {
        if (
          (step.done || step.isDone || (nonLinear && type === "dynamic")) &&
          step.show &&
          !step.disabled
        ) {
          setSteps(prevSteps =>
            prevSteps.map(s => {
              const stepIndex = prevSteps.findIndex(ps => ps.name === s.name);
              const targetIndex = prevSteps.findIndex(ps => ps.name === step.name);

              return {
                ...s,
                active: s.name === step.name,
                isDone: type === "dynamic" ? stepIndex < targetIndex : stepIndex < targetIndex,
                done:
                  type === "dynamic"
                    ? stepIndex < targetIndex
                    : stepIndex < targetIndex || (s.name === step.name && targetIndex > 0),
                disabled: false,
                // Ensure enableNext and isValid are preserved when activating a step
                enableNext: s.name === step.name ? true : s.enableNext,
                isValid: s.name === step.name ? true : s.isValid,
              };
            })
          );
        }
      },
      [nonLinear, type]
    );

    const handleStepClick = useCallback(
      (index: number) => {
        const step = visibleSteps[index];
        if (step && step.show && !step.disabled) {
          if (step.done || step.isDone) {
            onStepHeaderClick({} as React.MouseEvent, step);
          }
        }
      },
      [visibleSteps, nonLinear, onStepHeaderClick, type]
    );

    // Step management functions
    const updateStep = useCallback((stepName: string, updates: Partial<WizardStepData>) => {
      setSteps(prevSteps => {
        const stepIndex = prevSteps.findIndex(step => step.name === stepName);
        if (stepIndex === -1) return prevSteps;

        const existing = prevSteps[stepIndex];
        const hasChanges = Object.keys(updates).some(
          key => existing[key as keyof WizardStepData] !== updates[key as keyof WizardStepData]
        );

        if (!hasChanges) return prevSteps;

        const newSteps = [...prevSteps];
        newSteps[stepIndex] = { ...existing, ...updates };
        return newSteps;
      });
    }, []);

    // Navigation functions
    const next = useCallback(
      async (eventName: string = "next") => {
        const fromIndex = navIndexRef.current >= 0 ? navIndexRef.current : currentStepIndex;
        const fromStep = getStepByIndex(fromIndex, visibleSteps);
        if (!fromStep) return;

        const nextStep = getNextValidStep(fromIndex + 1, visibleSteps);
        if (!nextStep) return;
        const nextIndex = visibleSteps.findIndex(s => s.name === nextStep.name);

        if (eventName === "skip") {
          const response = fromStep.onSkip?.(fromStep, fromStep, fromIndex);
          if (response !== undefined) {
            await handleNavigation(response, () =>
              extendNextFn(fromStep, fromIndex, visibleSteps, setSteps)
            );
          } else {
            extendNextFn(fromStep, fromIndex, visibleSteps, setSteps);
          }
        } else if (fromStep.isValid && eventName === "next") {
          const response = fromStep.onNext?.(fromStep, fromStep, fromIndex);
          if (response !== undefined) {
            await handleNavigation(response, () =>
              extendNextFn(fromStep, fromIndex, visibleSteps, setSteps)
            );
          } else {
            extendNextFn(fromStep, fromIndex, visibleSteps, setSteps);
          }
        } else if (enablenext && !fromStep.isValid) {
          console.warn("Cannot proceed: current step is invalid");
        } else {
          extendNextFn(fromStep, fromIndex, visibleSteps, setSteps);
        }

        // update ref to reflect the logical next position immediately
        navIndexRef.current = nextIndex;
        setFormReady(false);
      },
      [currentStepIndex, visibleSteps, enablenext]
    );

    const prev = useCallback(async () => {
      const fromIndex = navIndexRef.current >= 0 ? navIndexRef.current : currentStepIndex;
      const fromStep = getStepByIndex(fromIndex, visibleSteps);
      if (!fromStep) return;

      const targetStep = getPrevValidStep(fromIndex - 1, visibleSteps);
      if (!targetStep) return;
      const prevIndex = visibleSteps.findIndex(s => s.name === targetStep.name);

      const response = fromStep.onPrev?.(fromStep, fromStep, fromIndex);
      if (response !== undefined) {
        await handleNavigation(response, () =>
          extendPrevFn(fromStep, fromIndex, visibleSteps, setSteps)
        );
      } else {
        extendPrevFn(fromStep, fromIndex, visibleSteps, setSteps);
      }

      navIndexRef.current = prevIndex;
      setFormReady(false);
    }, [currentStepIndex, visibleSteps]);

    const registerStep = useCallback((stepData: WizardStepData) => {
      setSteps(prevSteps => {
        const existingIndex = prevSteps.findIndex(step => step.name === stepData.name);
        if (existingIndex >= 0) {
          const existing = prevSteps[existingIndex];
          const hasChanges = Object.keys(stepData).some(
            key => existing[key as keyof WizardStepData] !== stepData[key as keyof WizardStepData]
          );

          if (hasChanges) {
            const newSteps = [...prevSteps];
            newSteps[existingIndex] = { ...existing, ...stepData };
            return newSteps;
          }
          return prevSteps;
        }
        return [...prevSteps, stepData];
      });
    }, []);

    const skip = useCallback(() => {
      next("skip");
    }, [next]);

    const done = useCallback(() => {
      if (currentStep) {
        updateStep(currentStep.name, { isDone: true, done: true });
        if (onDone) {
          onDone(currentStep, steps);
        }
      }
    }, [currentStep, updateStep, onDone, steps]);

    const cancel = useCallback(() => {
      if (onCancel) {
        onCancel(currentStep, steps);
      }
    }, [onCancel, steps]);

    const gotoStep = useCallback(
      (step: string | number) => {
        let gotoStepIndex: number;
        let targetStep: WizardStepData | null = null;

        if (typeof step === "string") {
          gotoStepIndex = steps.map(s => s.name).indexOf(step);
          if (gotoStepIndex === -1) {
            console.error(`Could not find step '${step}'`);
            return;
          }
          targetStep = steps[gotoStepIndex];
        } else if (typeof step === "number" && step >= 0) {
          gotoStepIndex = step;
          targetStep = getStepByIndex(step, visibleSteps);
        } else {
          console.error("Invalid step name or index provided");
          return;
        }

        if (targetStep?.show) {
          const visIndex = visibleSteps.findIndex(s => s.name === targetStep?.name);
          if (visIndex >= 0) navIndexRef.current = visIndex;
          onStepHeaderClick({} as React.MouseEvent, targetStep);
        } else {
          console.error("The gotoStep function cannot navigate to hidden steps");
        }
      },
      [steps, visibleSteps, onStepHeaderClick]
    );

    // Initialize default step
    const setDefaultStep = useCallback(
      (step: WizardStepData | null) => {
        if (step && step.show) {
          setSteps(prevSteps =>
            prevSteps.map((s, index) => {
              const stepIndex = prevSteps.findIndex(ps => ps.name === s.name);
              const defaultIndex = prevSteps.findIndex(ps => ps.name === step.name);

              return {
                ...s,
                active: s.name === step.name,
                isDone: false,
                done: stepIndex < defaultIndex,
                isInitialized: s.name === step.name ? true : s.isInitialized,
                // Ensure enableNext and isValid are preserved for the active step
                enableNext: s.name === step.name ? true : s.enableNext,
                isValid: s.name === step.name ? true : s.isValid,
              };
            })
          );

          setTimeout(() => {
            if (step.onLoad) {
              const stepIndex = visibleSteps.findIndex(s => s.name === step.name);
              step.onLoad(step, stepIndex);
            }
          }, 100);
        } else {
          const nextValidStep = getNextValidStep(0, visibleSteps);
          if (nextValidStep) {
            setDefaultStep(nextValidStep);
          }
        }
      },
      [visibleSteps]
    );
    const showSignature = steps
      .map(s =>
        listener?.Widgets?.[s.name]?.show === false || listener?.Widgets?.[s.name]?.show === "false"
          ? "0"
          : "1"
      )
      .join("|");

    useEffect(() => {
      if (!listener?.Widgets) return;
      steps.forEach((step, index) => {
        const widgetShow = listener.Widgets[step.name]?.show;
        if ((widgetShow === false || widgetShow === "false") && step.show !== false) {
          updateStep(step.name, { show: false, enableskip: false });
          const prevStep = steps[index - 1];
          if (prevStep && step.active) {
            updateStep(prevStep.name, { active: true });
            navIndexRef.current = index - 1;
          }
        }
      });
    }, [showSignature]);

    const updateListener = React.useCallback(() => {
      if (listener && typeof listener.onChange === "function") {
        listener.onChange(name, {
          hasNextStep: () => hasNextStep,
          hasPreviousStep: () => hasPrevStep,
          hasNoNextStep: () => showDoneBtn,
          next: () => next("next"),
          previous: () => prev(),
          done: () => done(),
          cancel: () => cancel(),
          skip: () => skip(),
          disableNext: () => !enableNext,
          disablePrevious: () => !enablePrev,
          disableDone: () => !enableDone,
          prev,
          cancelable,
          nextbtnlabel,
          previousbtnlabel,
          donebtnlabel,
          cancelbtnlabel,
          actionsalignment,
          skippable: currentStep?.enableskip,
          getCurrentStepIndex: () => currentStepIndex,
          gotoStep: (step: string | number) => gotoStep(step),
          isFirstStep,
          isLastStep,
          currentStepIndex,
          currentStep,
        });
      }
    }, [
      hasNextStep,
      hasPrevStep,
      showDoneBtn,
      enableNext,
      enablePrev,
      enableDone,
      cancelable,
      currentStep?.enableskip,
      nextbtnlabel,
      previousbtnlabel,
      donebtnlabel,
      cancelbtnlabel,
      actionsalignment,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      visibleSteps,
    ]);
    useEffect(() => {
      updateListener();
    }, [updateListener]);

    // Initialize default step for STATIC wizards only
    useEffect(() => {
      if (steps.length > 0 && !isInitialized && visibleSteps.length > 0 && type !== "dynamic") {
        let defaultStepRef: WizardStepData | null = null;

        if (defaultstep !== "none") {
          defaultStepRef = getStepByName(defaultstep, steps);
        } else if (defaultstepindex >= 0 && defaultstepindex < visibleSteps.length) {
          // CHANGED: Removed type === "dynamic" check and added bounds checking
          // REASON: This effect only runs for static wizards, and bounds checking prevents runtime errors
          defaultStepRef = getStepByIndex(defaultstepindex, visibleSteps);
        } else {
          defaultStepRef = getNextValidStep(0, visibleSteps);
        }

        if (defaultStepRef) {
          setDefaultStep(defaultStepRef);
          setIsInitialized(true);
        }
      }
    }, [
      steps.length,
      visibleSteps.length,
      defaultstep,
      defaultstepindex,
      type,
      isInitialized,
      setDefaultStep,
      visibleSteps,
    ]);

    useEffect(() => {
      if (currentStep?.onLoad) {
        currentStep?.onLoad(currentStep, currentStepIndex);
      }
    }, [currentStep?.onLoad]);

    // Handle dataset changes for dynamic wizard
    useEffect(() => {
      if (type === "dynamic" && dataset.length > 0 && steps.length === 0) {
        const dynamicSteps = createDynamicSteps(dataset);
        if (defaultstepindex >= 0 && defaultstepindex < dynamicSteps.length) {
          const defaultStep = dynamicSteps[defaultstepindex];
          if (defaultStep && defaultStep.show) {
            const stepsWithDefault = dynamicSteps.map(step => ({
              ...step,
              active: step.name === defaultStep.name,
              isDone: false,
              done:
                step.dynamicStepIndex !== undefined
                  ? step.dynamicStepIndex < defaultstepindex
                  : false,
            }));
            setSteps(stepsWithDefault);
            setIsInitialized(true); // CHANGED: Mark as initialized immediately
          } else {
            setSteps(dynamicSteps);
          }
        } else {
          setSteps(dynamicSteps);
        }
        return;
      }

      if (type === "dynamic" && dataset.length > 0) {
        // Append new steps if dataset grew
        if (steps.length > 0 && dataset.length > steps.length) {
          const newItems = dataset.slice(steps.length);
          const newSteps = createDynamicSteps(newItems, steps.length);
          if (newSteps.length) {
            setSteps(prev => appendDatasetSteps(prev, newSteps));
          }
          return;
        }
        // Remove steps if dataset shrank
        if (steps.length > 0 && dataset.length < steps.length) {
          setSteps(prev => trimStepsToLength(prev, dataset.length));
          return;
        }
      }
    }, [type, dataset, createDynamicSteps, defaultstepindex, dataset.length]);

    // Context value
    const contextValue: WizardContextType = useMemo(
      () => ({
        steps,
        currentStep,
        currentStepIndex,
        hasNextStep,
        hasPrevStep,
        showDoneBtn: showDoneBtn || false,
        enableNext: enableNext || false,
        enablePrev: enablePrev || false,
        enableDone: enableDone || false,
        isFirstStep,
        isLastStep,
        registerStep,
        updateStep,
        next,
        prev,
        skip,
        done,
        cancel,
        gotoStep,
        onStepHeaderClick,
        addStep: () => [],
      }),
      [
        steps,
        currentStep,
        currentStepIndex,
        hasNextStep,
        hasPrevStep,
        showDoneBtn,
        enableNext,
        enablePrev,
        enableDone,
        isFirstStep,
        isLastStep,
        registerStep,
        updateStep,
        next,
        prev,
        skip,
        done,
        cancel,
        gotoStep,
        onStepHeaderClick,
      ]
    );

    // Extract wizard steps from children
    const wizardSteps: ReactElement[] = [];

    React.Children.forEach(children, child => {
      if (isValidElement(child) && child.type === WmWizardstep) {
        wizardSteps.push(child);
      }
    });

    // If no data in dynamic mode, show no data message
    if (type === "dynamic" && (!dataset || dataset.length === 0)) {
      return <div>{nodatamessage}</div>;
    }

    return (
      <WizardContext.Provider value={contextValue}>
        <Box
          className={clsx(DEFAULT_CLS, className, computedStepClass, {
            classic: className?.includes("classic"),
            number: className?.includes("number"),
            dottedstepper: className?.includes("dottedstepper"),
            "text-inline": className?.includes("text-inline"),
            iconstepper: className?.includes("iconstepper"),
          })}
          style={{ ...styles, width, height }}
          hidden={props.hidden}
          {...({ name } as HtmlHTMLAttributes<HTMLDivElement>)}
        >
          <Box className="app-wizard-heading">
            <Stepper
              activeStep={currentStepIndex}
              orientation={orientation}
              alternativeLabel={alternativeLabel}
              nonLinear={nonLinear}
              connector={connector as React.ReactElement}
              className={clsx(
                "app-wizard-steps",
                computedStepClass,
                className,
                stepstyle === "justified" ? "nav-justified" : ""
              )}
            >
              {steps.map((step, index) => {
                // Calculate the visible index by counting only visible steps before this one
                const visibleIndex = steps
                  .slice(0, index)
                  .filter(s => s.show !== false && s.show !== "false").length;
                const isCurrentStep =
                  currentStepIndex === visibleIndex && step.show !== false && step.show !== "false";

                return (
                  <WizardStep
                    key={step.name}
                    step={step}
                    index={index}
                    className={className}
                    nonLinear={nonLinear}
                    orientation={orientation}
                    onStepClick={handleStepClick}
                    current={isCurrentStep}
                  />
                );
              })}
            </Stepper>
          </Box>

          {(orientation === "horizontal" || type === "dynamic") && (
            <Box className={BODY_CLASS}>
              {wizardMessage.caption && (
                <Box component="p">
                  <Typography
                    variant="body2"
                    color={wizardMessage.type === "error" ? "error" : "textSecondary"}
                  >
                    {wizardMessage.caption}
                  </Typography>
                </Box>
              )}
              {steps.map((step, index) => (
                <div
                  key={step.name}
                  ref={el => {
                    if (el) {
                      const formElement = el.querySelector("form");
                      if (formElement) {
                        formRefs.current[step.name] = formElement;
                        if (formElement.classList.contains("app-form")) {
                          setFormReady(true);
                        }
                      }
                    }
                  }}
                  className={clsx("app-wizard-step-container", {
                    current: step.active,
                  })}
                  hidden={!step.active}
                >
                  {step.haveForm ? (
                    <div
                      className={clsx("app-wizard-step-content", {
                        current: step.active,
                      })}
                    >
                      {currentStep?.name && step.active && currentStep.render
                        ? currentStep.render(step, index)
                        : step.children}
                    </div>
                  ) : (
                    <WmForm
                      name={step.name}
                      className={clsx("app-wizard-step-content", {
                        current: step.active,
                      })}
                      listener={listener}
                      isInsideWizard={true}
                    >
                      {currentStep?.name && step.active && currentStep.render
                        ? currentStep.render(step, index)
                        : step.children}
                    </WmForm>
                  )}
                </div>
              ))}
            </Box>
          )}

          {children}
          {type === "static" &&
            wizardSteps.map((step: ReactElement<any>, index) =>
              cloneElement(step, {
                key: step.props?.name || index,
              })
            )}
        </Box>
      </WizardContext.Provider>
    );
  },
  (prev, next) => {
    const keys: (keyof any)[] = [
      "render",
      "dataset",
      "className",
      "styles",
      "width",
      "height",
      "type",
      "stepstyle",
      "orientation",
      "alternativeLabel",
      "nonLinear",
      "defaultstep",
      "defaultstepindex",
      "message",
      "cancelable",
      "enablenext",
      "nextbtnlabel",
      "previousbtnlabel",
      "donebtnlabel",
      "cancelbtnlabel",
      "children",
      "hidden",
    ];
    return keys.every(key => {
      // Never deep-compare children; treat as referential
      if (key === "children") {
        return prev[key] === next[key];
      }
      return isEqual(prev[key], next[key]);
    });
  }
);

WmWizard.displayName = "WmWizard";

export default withBaseWrapper(WmWizard);
