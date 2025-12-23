import { memo, useMemo, ReactNode } from "react";
import { Box, Typography, StepIconProps } from "@mui/material";
import clsx from "clsx";
import { WizardStepData } from "../props";

// Custom Step Icon Component
export const CustomStepIcon = memo(
  (
    props: StepIconProps & {
      step?: WizardStepData;
      index?: number;
      wizardClass?: string;
      active?: boolean;
      completed?: boolean;
    }
  ) => {
    const { step, index = 0, wizardClass = "", active, completed } = props;

    if (!step) return null;

    const isNumber = wizardClass?.includes("number");
    const isDottedStepper = wizardClass?.includes("dottedstepper");
    const isTextInline = wizardClass?.includes("text-inline");
    const isIconStepper = wizardClass?.includes("iconstepper");

    const isCompleted = step.isDone;

    const iconContent = useMemo(() => {
      if (isCompleted && (isDottedStepper || isNumber)) {
        return <Box component="i" className="app-icon wi wi-done"></Box>;
      }

      if (isNumber && !isCompleted) {
        return (
          <Box component="span" className="count">
            {index + 1}
          </Box>
        );
      }

      if ((isDottedStepper || (isTextInline && !isIconStepper)) && !isCompleted) {
        return <Box component="span" className="dottedstepper"></Box>;
      }

      if (
        isIconStepper &&
        step.iconclass &&
        (!isCompleted || (isCompleted && !step.doneiconclass))
      ) {
        return <Box component="span" className={`app-icon ${step.iconclass}`}></Box>;
      }

      if (step.doneiconclass && isCompleted && isIconStepper) {
        return <Box component="span" className={`app-icon ${step.doneiconclass}`}></Box>;
      }

      return null;
    }, [step, index, isCompleted, isDottedStepper, isNumber, isTextInline, isIconStepper]);

    return (
      <Box
        component="span"
        className={clsx(
          "wizard-step-number",
          {
            active,
            completed: isCompleted,
            disabled: step.disabled,
          },
          isDottedStepper && !completed && "has-dotted-stepper"
        )}
      >
        {iconContent}
      </Box>
    );
  }
);

CustomStepIcon.displayName = "CustomStepIcon";

// Custom Step Label Component
export const CustomStepLabel = memo(
  (props: { step: WizardStepData; index: number; wizardClass: string; children?: ReactNode }) => {
    const { step, index, wizardClass, children } = props;
    const isTextInline = wizardClass?.includes("text-inline");

    return (
      <>
        <Box component="span" className="title-wrapper">
          {isTextInline && (
            <Typography component="span" className="step-number" variant="caption">
              {`0${index + 1}`}
            </Typography>
          )}
          <Typography component="span" variant="body2" className="step-title">
            {step.title}
          </Typography>
        </Box>
        {step.subtitle && (
          <Typography
            component="span"
            className="subtitle-wrapper"
            variant="caption"
            title={step.subtitle}
          >
            <Box component="span" className="step-title">
              {step.subtitle}
            </Box>
          </Typography>
        )}
        {children}
      </>
    );
  }
);

CustomStepLabel.displayName = "CustomStepLabel";
