import { Step, StepLabel, StepContent, Box } from "@mui/material";
import clsx from "clsx";
import { WizardStepProps } from "../props";
import { CustomStepIcon, CustomStepLabel } from "./StepComponents";

const STEP_CLASS = "app-wizard-step";

export const WizardStep = ({
  step,
  index,
  className,
  nonLinear = false,
  orientation = "horizontal",
  onStepClick,
  current,
}: WizardStepProps) => {
  const stepProps: any = {};
  const labelProps: any = {};

  if (step.disabled) {
    stepProps.disabled = true;
  }

  if (step.done || step.isDone) {
    stepProps.completed = true;
  }

  if (step.show === false || step.show === "false") {
    stepProps.hidden = true;
  }

  return (
    <Step
      key={step.name}
      {...stepProps}
      className={clsx(
        STEP_CLASS,
        current ? "current" : step.done || step.isDone ? "active" : "disabled"
      )}
      {...stepProps}
    >
      {nonLinear || step.done || step.isDone ? (
        <Box
          component="a"
          onClick={() => onStepClick(index)}
          className={clsx({
            current: current,
            active: step.done || step.isDone,
            disabled: !current && !(step.done || step.isDone),
          })}
          aria-current={step.active ? "step" : undefined}
          aria-label={
            step.subtitle
              ? `step ${index + 1} ${step.title} ${step.subtitle}`
              : `step ${index + 1} ${step.title}`
          }
          aria-disabled={step.disabled}
        >
          <StepLabel
            {...labelProps}
            slots={{ stepIcon: CustomStepIcon }}
            slotProps={{
              stepIcon: {
                step,
                index,
                wizardClass: className,
                active: step.active,
                completed: step.done || step.isDone,
              },
            }}
          >
            <CustomStepLabel step={step} index={index} wizardClass={className || ""} />
          </StepLabel>
        </Box>
      ) : (
        <StepLabel
          {...labelProps}
          slots={{ stepIcon: CustomStepIcon }}
          slotProps={{
            stepIcon: {
              step,
              index,
              wizardClass: className,
              active: step.active,
              completed: step.done || step.isDone,
            },
          }}
        >
          <CustomStepLabel step={step} index={index} wizardClass={className || ""} />
        </StepLabel>
      )}
      {orientation === "vertical" && <StepContent>{step.active && step.content}</StepContent>}
    </Step>
  );
};
WizardStep.displayName = "WizardStep";
