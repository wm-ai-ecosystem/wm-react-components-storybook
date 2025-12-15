import { ReactNode } from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WizardStepData {
  name: string;
  title: string;
  subtitle?: string;
  iconclass: string;
  doneiconclass: string;
  show: boolean | string;
  enableskip: boolean;
  enableNext: boolean;
  enablePrev: boolean;
  enableDone: boolean;
  isDone: boolean;
  done: boolean;
  active: boolean;
  disabled: boolean;
  isValid: boolean;
  isInitialized: boolean;
  content?: ReactNode;
  render?: (step: WizardStepData, stepIndex?: number) => ReactNode;
  dynamicStepIndex?: number;
  isdynamic?: boolean;
  haveForm?: boolean;
  onLoad?: (step: WizardStepData, stepIndex: number) => void;
  onNext?: (
    widget: any,
    currentStep: WizardStepData,
    stepIndex: number
  ) => boolean | Promise<boolean>;
  onPrev?: (
    widget: any,
    currentStep: WizardStepData,
    stepIndex: number
  ) => boolean | Promise<boolean>;
  onSkip?: (
    widget: any,
    currentStep: WizardStepData,
    stepIndex: number
  ) => boolean | Promise<boolean>;
  className?: string;
  props?: Record<string, any>;
  listener?: Record<string, any>;
  children?: ReactNode;
}

export interface WizardContextType {
  steps: WizardStepData[];
  currentStep: WizardStepData | null;
  currentStepIndex: number;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  showDoneBtn: boolean;
  enableNext: boolean;
  enablePrev: boolean;
  enableDone: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isInsideWizard: boolean;
  registerStep: (step: WizardStepData) => void;
  updateStep: (stepName: string, updates: Partial<WizardStepData>) => void;
  next: (eventName?: string) => void;
  prev: () => void;
  skip: () => void;
  done: () => void;
  cancel: () => void;
  gotoStep: (step: string | number) => void;
  onStepHeaderClick: (event: React.MouseEvent, step: WizardStepData) => void;
  addStep: (wizardSteps: any[]) => string[];
}

export interface WmWizardProps extends Omit<BaseProps, "name"> {
  stepstyle?: "auto" | "justified";
  actionsalignment?: "left" | "center" | "right";
  defaultstep?: string;
  defaultstepindex?: number;
  cancelable?: boolean;
  enablenext?: boolean;
  nextbtnlabel?: string;
  previousbtnlabel?: string;
  donebtnlabel?: string;
  cancelbtnlabel?: string;
  type?: "static" | "dynamic";
  dataset?: any[];
  nodatamessage?: string;
  fieldDefs?: any[];
  children?: ReactNode;
  className?: string;
  styles?: Record<string, any>;
  name: string;
  onCancel?: (currentStep, steps: WizardStepData[]) => void;
  onDone?: (currentStep: WizardStepData, steps: WizardStepData[]) => void;
  message?: { caption: string; type: string };
  stepClass?: string;
  orientation?: "horizontal" | "vertical";
  alternativeLabel?: boolean;
  nonLinear?: boolean;
  connector?: ReactNode;
  width?: string | number;
  height?: string | number;
  render?: (item: any, index: number, dataset: any[]) => ReactNode;
  listener?: Record<string, any>;
}

export interface WmWizardStepProps {
  name?: string;
  title?: string;
  subtitle?: string;
  iconclass?: string;
  doneiconclass?: string;
  enableskip?: boolean;
  disablenext?: boolean;
  disabledone?: boolean;
  disableprevious?: boolean;
  show?: boolean;
  content?: ReactNode;
  children?: ReactNode;
  dynamicStepIndex?: number;
  isdynamic?: boolean;
  haveForm?: boolean;
  onLoad?: (step: WizardStepData, stepIndex: number) => void;
  onNext?: (
    widget: any,
    currentStep: WizardStepData,
    stepIndex: number
  ) => boolean | Promise<boolean>;
  onPrev?: (
    widget: any,
    currentStep: WizardStepData,
    stepIndex: number
  ) => boolean | Promise<boolean>;
  onSkip?: (
    widget: any,
    currentStep: WizardStepData,
    stepIndex: number
  ) => boolean | Promise<boolean>;
  ref?: React.Ref<any>;
  className?: string;
  props?: Record<string, any>;
  render?: (item: any, index: number, dataset: any[]) => ReactNode;
  listener?: Record<string, any>;
}

export interface WmWizardActionProps {
  children?: ReactNode;
  className?: string;
  props?: Record<string, any>;
}

export interface DefaultActionsProps {
  actionsalignment?: string;
  children?: ReactNode;
  listener?: Record<string, any>;
}

export interface WizardStepProps {
  step: WizardStepData;
  index: number;
  className?: string;
  nonLinear?: boolean;
  orientation?: "horizontal" | "vertical";
  onStepClick: (index: number) => void;
  current: boolean;
}
