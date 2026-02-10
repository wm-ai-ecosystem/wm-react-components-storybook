import React, { useContext } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import WmWizard from "../../../../components/container/wizard";
import WmWizardstep from "../../../../components/container/wizard/wizard-step";
import WmWizardAction from "../../../../components/container/wizard/wizard-action";
import WizardContext from "../../../../components/container/wizard/WizardContext";
import WmButton from "../../../../components/form/button";
import WmAnchor from "../../../../components/basic/anchor";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import wizardTokensData from "../../../../designTokens/components/wizard/wizard.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

// Helper component to render wizard action buttons
// Props should match the wizard component props to be controllable
interface WizardActionsProps {
  actionsalignment?: "left" | "center" | "right";
  cancelable?: boolean;
  enablenext?: boolean;
  nextbtnlabel?: string;
  previousbtnlabel?: string;
  donebtnlabel?: string;
  cancelbtnlabel?: string;
  skipbtnlabel?: string;
}

const WizardActions = ({
  actionsalignment = "right",
  cancelable = true,
  enablenext,
  nextbtnlabel = "Next",
  previousbtnlabel = "Previous",
  donebtnlabel = "Done",
  cancelbtnlabel = "Cancel",
  skipbtnlabel = "Skip",
}: WizardActionsProps) => {
  const context = useContext(WizardContext);

  if (!context) {
    return null;
  }

  const {
    hasNextStep,
    hasPrevStep,
    showDoneBtn,
    enableNext: contextEnableNext,
    enablePrev,
    enableDone,
    currentStep,
    next,
    prev,
    skip,
    done,
    cancel,
  } = context;

  // Check if skip button should be shown (from current step's enableskip prop)
  const showSkipBtn = currentStep?.enableskip || false;

  // Use prop enablenext if provided, otherwise use context enableNext
  const shouldEnableNext = enablenext !== undefined ? enablenext : contextEnableNext;

  return (
    <WmWizardAction actionsalignment={actionsalignment} name="wizardActions" listener={mockListener}>
      {hasPrevStep && enablePrev && (
        <WmButton
          name="wizardPrevBtn"
          className="btn-default app-wizard-previous"
          caption={previousbtnlabel}
          onClick={prev}
          type="button"
          listener={mockListener}
          styles={{ marginRight: "8px" }}
        />
      )}
      {hasNextStep && shouldEnableNext && (
        <WmButton
          name="wizardNextBtn"
          className="btn-primary app-wizard-next"
          caption={nextbtnlabel}
          onClick={() => next()}
          type="button"
          listener={mockListener}
          styles={{ marginRight: "8px" }}
        />
      )}
      {showSkipBtn && hasNextStep && (
        <WmAnchor
          name="wizardSkipBtn"
          className="app-wizard-skip"
          caption={skipbtnlabel}
          onClick={skip}
          listener={mockListener}
          styles={{ marginRight: "8px" }}
        />
      )}
      {showDoneBtn && enableDone && (
        <WmButton
          name="wizardDoneBtn"
          className="btn-success app-wizard-done"
          caption={donebtnlabel}
          onClick={done}
          type="button"
          listener={mockListener}
          styles={{ marginRight: "8px" }}
        />
      )}
      {cancelable && (
        <WmButton
          name="wizardCancelBtn"
          className="btn-default app-wizard-cancel"
          caption={cancelbtnlabel}
          onClick={cancel}
          type="button"
          listener={mockListener}
        />
      )}
    </WmWizardAction>
  );
};

const meta = {
  title: "Containers/Wizard",
  component: WmWizard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
    //   styling={styling}
    style={style}
    token={token}
    externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=58831-653&p=f",
        label: "",
      }}
    />
  ),
  args: {
    name: "DocsWizard",
    listener: mockListener,
  },
  argTypes:{
    name:{table:{disable: true}},
    listener: {table: {disable: true}}
  },
  parameters: {
    layout: 'fullscreen',
  }
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={6}>
          {/* Main Heading */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Wizard Showcase
            </Typography>
          </Box>

          {/* Number Style */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Number Style
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="numberShowcase"
                className="number"
                defaultstepindex={0}
                cancelable={true}
                listener={mockListener}
              >
                <WmWizardstep
                  name="step1"
                  title="Personal Info"
                  // subtitle="Enter your details"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      This is step 1 content. The number style shows step numbers in circles.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="step2"
                  title="Contact Details"
                  // subtitle="How to reach you"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      This is step 2 content. Navigate using the action buttons below.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="step3"
                  title="Review"
                  // subtitle="Confirm information"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      This is step 3 content. Complete the wizard to finish.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box>

          {/* Icon Stepper Style */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Icon Stepper
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="iconStepperShowcase"
                className="iconstepper"
                defaultstepindex={0}
                cancelable={true}
                listener={mockListener}
              >
                <WmWizardstep
                  name="account"
                  title="Create Account"
                  // subtitle="Set up your account"
                  iconclass="fa fa-user"
                  doneiconclass="fa fa-check"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 1: Icon stepper uses custom icons for each step.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="settings"
                  title="Configure Settings"
                  // subtitle="Customize preferences"
                  iconclass="fa fa-cog"
                  doneiconclass="fa fa-check"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 2: Each step can have its own unique icon.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="finish"
                  title="Complete Setup"
                  // subtitle="Finalize configuration"
                  iconclass="fa fa-flag-checkered"
                  doneiconclass="fa fa-check"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 3: Complete the wizard setup process.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box>

          {/* Icon Stepper with Text Inline */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Icon Stepper - Text Inline
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="iconStepperInlineShowcase"
                className="iconstepper text-inline"
                defaultstepindex={0}
                cancelable={true}
                listener={mockListener}
              >
                <WmWizardstep
                  name="upload"
                  title="Upload Files"
                  subtitle="Select your files"
                  iconclass="fa fa-upload"
                  doneiconclass="fa fa-check"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 1: Text inline variant displays step labels alongside icons.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="process"
                  title="Process"
                  subtitle="Processing files"
                  iconclass="fa fa-spinner"
                  doneiconclass="fa fa-check"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 2: This layout works well for horizontal space.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="done"
                  title="Complete"
                  subtitle="All done"
                  iconclass="fa fa-check-circle"
                  doneiconclass="fa fa-check"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 3: Finish the process.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box>

          {/* Dotted Stepper Style */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Dotted Stepper
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="dottedStepperShowcase"
                className="dottedstepper"
                defaultstepindex={0}
                cancelable={true}
                listener={mockListener}
              >
                <WmWizardstep
                  name="basic"
                  title="Basic Information"
                  // subtitle="Enter basic details"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 1: Dotted stepper provides a minimal, clean appearance.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="advanced"
                  title="Advanced Options"
                  // subtitle="Configure settings"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 2: Steps are connected with dotted lines.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="summary"
                  title="Summary"
                  // subtitle="Review & complete"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 3: Review and complete.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box>

          {/* Dotted Stepper with Text Inline */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Dotted Stepper - Text Inline
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="dottedStepperInlineShowcase"
                className="dottedstepper text-inline"
                defaultstepindex={0}
                cancelable={true}
                listener={mockListener}
              >
                <WmWizardstep
                  name="start"
                  title="Getting Started"
                  subtitle="Begin your journey"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 1: Dotted stepper with inline text combines minimal design with clear labels.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="middle"
                  title="Configuration"
                  subtitle="Set your preferences"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 2: This variant is excellent for modern UIs.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="end"
                  title="Finalize"
                  subtitle="Complete setup"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 3: Complete the wizard.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box>

          {/* Classic Style */}
          {/* <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Classic Style
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="classicShowcase"
                className="classic"
                defaultstepindex={0}
                cancelable={true}
                stepstyle="justified"
                listener={mockListener}
              >
                <WmWizardstep
                  name="intro"
                  title="Introduction"
                  // subtitle="Welcome"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Introduction
                    </Typography>
                    <Typography variant="body1">
                      Classic style provides a traditional wizard appearance.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="content"
                  title="Content"
                  // subtitle="Main area"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Content
                    </Typography>
                    <Typography variant="body1">
                      Simple and familiar design pattern.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="conclusion"
                  title="Conclusion"
                  // subtitle="Final step"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Conclusion
                    </Typography>
                    <Typography variant="body1">
                      Finish the classic wizard.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box> */}

          {/* Vertical Orientation */}
          {/* <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{ marginBottom: 12 }}>
              Vertical Orientation
            </Typography>
            <Box sx={{ height: "auto", border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
              <WmWizard
                name="verticalShowcase"
                className="number"
                orientation="vertical"
                defaultstepindex={0}
                cancelable={true}
                listener={mockListener}
              >
                <WmWizardstep
                  name="verticalStep1"
                  title="First Step"
                  subtitle="Vertical layout"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 1: Vertical orientation is ideal for sidebars and narrow layouts.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="verticalStep2"
                  title="Second Step"
                  subtitle="Side by side"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 2: Steps are displayed vertically with content to the right.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WmWizardstep
                  name="verticalStep3"
                  title="Third Step"
                  subtitle="Final step"
                  listener={mockListener}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body1">
                      Step 3: Complete the vertical wizard.
                    </Typography>
                  </Box>
                </WmWizardstep>
                <WizardActions
                  actionsalignment="right"
                  cancelable={true}
                  nextbtnlabel="Next"
                  previousbtnlabel="Previous"
                  donebtnlabel="Done"
                  cancelbtnlabel="Cancel"
                  skipbtnlabel="Skip"
                />
              </WmWizard>
            </Box>
          </Box> */}
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseWizard",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

// export const Standard: Story = {
//   tags: ["show-panel"],
//   render: (args) => (
//     <Box sx={{ p: 4 }}>
//       <WmWizard {...args} listener={mockListener}>
//         <WmWizardstep
//           name="stepOne"
//           title="Step 1"
//           subtitle="First step"
//           iconclass="fa fa-user"
//           doneiconclass="fa fa-check"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Step 1: Personal Information
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               This is the content for the first step. You can add form fields, text, or any other components here.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Use the action buttons below to navigate between steps.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WmWizardstep
//           name="stepTwo"
//           title="Step 2 (Skippable)"
//           subtitle="Second step - can be skipped"
//           iconclass="fa fa-envelope"
//           doneiconclass="fa fa-check"
//           enableskip={true}
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Step 2: Contact Details (Optional)
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               This step is optional and can be skipped. Notice the Skip button appears when this step is active.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Click Skip to bypass this step, or Next to continue normally.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WmWizardstep
//           name="stepThree"
//           title="Step 3"
//           subtitle="Third step"
//           iconclass="fa fa-check-circle"
//           doneiconclass="fa fa-check"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Step 3: Review & Complete
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               This is the final step. Review your information and click Done to complete the wizard.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The Done button will appear on the last step.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WizardActions
//           actionsalignment={args.actionsalignment}
//           cancelable={args.cancelable}
//           enablenext={args.enablenext}
//           nextbtnlabel={args.nextbtnlabel}
//           previousbtnlabel={args.previousbtnlabel}
//           donebtnlabel={args.donebtnlabel}
//           cancelbtnlabel={args.cancelbtnlabel}
//           skipbtnlabel={args.skipbtnlabel}
//         />
//       </WmWizard>
//     </Box>
//   ),
//   args: {
//     name: "standardWizard",
//     className: "number",
//     defaultstepindex: 0,
//     cancelable: true,
//     enablenext: true,
//     nextbtnlabel: "Next",
//     previousbtnlabel: "Previous",
//     donebtnlabel: "Done",
//     cancelbtnlabel: "Cancel",
//     skipbtnlabel: "Skip",
//     orientation: "horizontal",
//     stepstyle: "auto",
//     actionsalignment: "right",
//     listener: mockListener,
//     // "data-design-token-target": "true", // Disabled - see parameters.designTokens comment
//   },
//   argTypes: {
//     className: {
//       control: "select",
//       options: ["number", "iconstepper", "iconstepper text-inline", "dottedstepper", "dottedstepper text-inline", "classic"],
//       description: "Wizard visual style",
//     },
//     orientation: {
//       control: "select",
//       options: ["horizontal", "vertical"],
//       description: "Wizard orientation",
//     },
//     stepstyle: {
//       control: "select",
//       options: ["auto", "justified"],
//       description: "Step layout style",
//     },
//     actionsalignment: {
//       control: "select",
//       options: ["left", "center", "right"],
//       description: "Action buttons alignment",
//     },
//     defaultstepindex: {
//       control: "number",
//       description: "Default active step index (0-based)",
//     },
//     cancelable: {
//       control: "boolean",
//       description: "Show cancel button",
//     },
//     enablenext: {
//       control: "boolean",
//       description: "Enable next button",
//     },
//     nextbtnlabel: {
//       control: "text",
//       description: "Next button label",
//     },
//     previousbtnlabel: {
//       control: "text",
//       description: "Previous button label",
//     },
//     donebtnlabel: {
//       control: "text",
//       description: "Done button label",
//     },
//     cancelbtnlabel: {
//       control: "text",
//       description: "Cancel button label",
//     },
//     skipbtnlabel: {
//       control: "text",
//       description: "Skip button label (shows when step has enableskip=true)",
//     },
//     // "data-design-token-target": { table: { disable: true } },
//     name: { table: { disable: true } },
//     listener: { table: { disable: true } },
//   },
//   parameters: {
//     // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
//     // which is incompatible with CSS variable approach. To enable design tokens,
//     // the wizard component would need to be rewritten without MUI Stepper.
//     designTokens: {
//       enabled: false,
//       tokenData: wizardTokensData,
//       componentKey: "wizard",
//       extractCSSVariablesAtRuntime: true,
//     },
//     layout: "fullscreen",
//   },
// };

// ============================================================================
// VARIANT-SPECIFIC STORIES
// ============================================================================

export const Number: Story = {
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    return (
      <Box sx={{ p: 4, width: "100%" }} data-design-token-target={dataAttr}>
        <WmWizard {...componentArgs}>
          <WmWizardstep
            name="step1"
            title="Step 1: Getting Started"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Getting Started
              </Typography>
              <Typography variant="body1" gutterBottom>
                The number style wizard displays step numbers in circular indicators. This is the default and most common wizard style.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click Next to proceed to the next step.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="step2"
            title="Step 2: Configuration"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Configuration
              </Typography>
              <Typography variant="body1" gutterBottom>
                This is the second step of the wizard. You can navigate back to the previous step or continue forward.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use the Previous and Next buttons to navigate.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="step3"
            title="Step 3: Review & Complete"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Review & Complete
              </Typography>
              <Typography variant="body1" gutterBottom>
                This is the final step. Review your information and click Done to complete the wizard.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The Done button appears on the last step.
              </Typography>
            </Box>
          </WmWizardstep>
          <WizardActions
            actionsalignment={componentArgs.actionsalignment}
            cancelable={componentArgs.cancelable}
            enablenext={componentArgs.enablenext}
            nextbtnlabel={componentArgs.nextbtnlabel}
            previousbtnlabel={componentArgs.previousbtnlabel}
            donebtnlabel={componentArgs.donebtnlabel}
            cancelbtnlabel={componentArgs.cancelbtnlabel}
            skipbtnlabel="Skip"
          />
        </WmWizard>
      </Box>
    );
  },
  args: {
    name: "numberWizard",
    className: "number",
    defaultstepindex: 0,
    cancelable: true,
    enablenext: true,
    nextbtnlabel: "Next",
    previousbtnlabel: "Previous",
    donebtnlabel: "Done",
    cancelbtnlabel: "Cancel",
    orientation: "horizontal",
    actionsalignment: "right",
    listener: mockListener,
    stepstyle: "auto",
    "data-design-token-target":true
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: {disable: true}
    },
    stepstyle: {
      control: "select",
      options: ["auto", "justified"],
    },
    actionsalignment: {
      control: "select",
      options: ["left", "right"],
    },
    defaultstepindex: {
      control: "number",
    },
    cancelable: {
      control: "boolean",
    },
    enablenext: {
      control: "boolean",
    },
    nextbtnlabel: {
      control: "text",
    },
    previousbtnlabel: {
      control: "text",
    },
    donebtnlabel: {
      control: "text",
    },
    cancelbtnlabel: {
      control: "text",
    },
    // skipbtnlabel: {
    //   control: "text",
    //   description: "Skip button label (shows when step has enableskip=true)",
    // },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className: {table: {disable: true}},
  },
  parameters: {
    // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
    // which is incompatible with CSS variable approach. To enable design tokens,
    // the wizard component would need to be rewritten without MUI Stepper.
    designTokens: {
      enabled: true,
      tokenData: wizardTokensData,
      componentKey: "wizard",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const IconStepper: Story = {
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    return (
      <Box sx={{ p: 4, width: "100%" }} data-design-token-target={dataAttr}>
        <WmWizard {...componentArgs}>
          <WmWizardstep
            name="account"
            title="Create Account"
            iconclass="fa fa-user"
            doneiconclass="fa fa-check"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Create Account
              </Typography>
              <Typography variant="body1" gutterBottom>
                The icon stepper style uses custom icons for each step instead of numbers. This provides a more visual and intuitive experience.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Each step can have its own unique icon defined via the iconclass prop.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="settings"
            title="Configure Settings"
            iconclass="fa fa-cog"
            doneiconclass="fa fa-check"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Configure Settings
              </Typography>
              <Typography variant="body1" gutterBottom>
                Configure your preferences in this step. The gear icon represents configuration.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Icons change to a checkmark when steps are completed.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="finish"
            title="Complete Setup"
            iconclass="fa fa-flag-checkered"
            doneiconclass="fa fa-check"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Complete Setup
              </Typography>
              <Typography variant="body1" gutterBottom>
                Finish the setup process. The flag icon indicates the final step.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click Done to complete the wizard.
              </Typography>
            </Box>
          </WmWizardstep>
          <WizardActions
            actionsalignment={componentArgs.actionsalignment}
            cancelable={componentArgs.cancelable}
            enablenext={componentArgs.enablenext}
            nextbtnlabel={componentArgs.nextbtnlabel}
            previousbtnlabel={componentArgs.previousbtnlabel}
            donebtnlabel={componentArgs.donebtnlabel}
            cancelbtnlabel={componentArgs.cancelbtnlabel}
            skipbtnlabel="Skip"
          />
        </WmWizard>
      </Box>
    );
  },
  args: {
    name: "iconStepperWizard",
    className: "iconstepper",
    defaultstepindex: 0,
    cancelable: true,
    enablenext: true,
    nextbtnlabel: "Next",
    previousbtnlabel: "Previous",
    donebtnlabel: "Done",
    cancelbtnlabel: "Cancel",
    orientation: "horizontal",
    actionsalignment: "right",
    listener: mockListener,
    stepstyle: "auto",
    "data-design-token-target":true
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: {disable: true}
    },
    stepstyle: {
      control: "select",
      options: ["auto", "justified"],
    },
    actionsalignment: {
      control: "select",
      options: ["left", "right"],
    },
    defaultstepindex: {
      control: "number",
    },
    cancelable: {
      control: "boolean",
    },
    enablenext: {
      control: "boolean",
    },
    nextbtnlabel: {
      control: "text",
    },
    previousbtnlabel: {
      control: "text",
    },
    donebtnlabel: {
      control: "text",
    },
    cancelbtnlabel: {
      control: "text",
    },
    // skipbtnlabel: {
    //   control: "text",
    //   description: "Skip button label (shows when step has enableskip=true)",
    // },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className: {table: {disable: true}},
  },
  parameters: {
    // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
    // which is incompatible with CSS variable approach. To enable design tokens,
    // the wizard component would need to be rewritten without MUI Stepper.
    designTokens: {
      enabled: true,
      tokenData: wizardTokensData,
      componentKey: "wizard",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const IconStepperTextInline: Story = {
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    return (
      <Box sx={{ p: 4, width: "100%" }} data-design-token-target={dataAttr}>
        <WmWizard {...componentArgs}>
          <WmWizardstep
            name="upload"
            title="Upload Files"
            iconclass="fa fa-upload"
            doneiconclass="fa fa-check"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upload Files
              </Typography>
              <Typography variant="body1" gutterBottom>
                The text-inline variant displays step labels alongside icons horizontally. This is ideal when you have more horizontal space.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The inline layout works well for workflows with longer step titles.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="process"
            title="Process Data"
            iconclass="fa fa-spinner"
            doneiconclass="fa fa-check"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Process Data
              </Typography>
              <Typography variant="body1" gutterBottom>
                Your files are being processed. The spinner icon indicates ongoing activity.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Text appears inline with the icon for better readability.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="complete"
            title="Complete"
            iconclass="fa fa-check-circle"
            doneiconclass="fa fa-check"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Complete
              </Typography>
              <Typography variant="body1" gutterBottom>
                Processing is complete. Click Done to finish.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The check-circle icon indicates successful completion.
              </Typography>
            </Box>
          </WmWizardstep>
          <WizardActions
            actionsalignment={componentArgs.actionsalignment}
            cancelable={componentArgs.cancelable}
            enablenext={componentArgs.enablenext}
            nextbtnlabel={componentArgs.nextbtnlabel}
            previousbtnlabel={componentArgs.previousbtnlabel}
            donebtnlabel={componentArgs.donebtnlabel}
            cancelbtnlabel={componentArgs.cancelbtnlabel}
            skipbtnlabel="Skip"
          />
        </WmWizard>
      </Box>
    );
  },
  args: {
    name: "iconStepperTextInlineWizard",
    className: "iconstepper text-inline",
    defaultstepindex: 0,
    cancelable: true,
    enablenext: true,
    nextbtnlabel: "Next",
    previousbtnlabel: "Previous",
    donebtnlabel: "Done",
    cancelbtnlabel: "Cancel",
    orientation: "horizontal",
    actionsalignment: "right",
    listener: mockListener,
    stepstyle: "auto",
    "data-design-token-target":true
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: {disable: true}
    },
    stepstyle: {
      control: "select",
      options: ["auto", "justified"],
    },
    actionsalignment: {
      control: "select",
      options: ["left", "right"],
    },
    defaultstepindex: {
      control: "number",
    },
    cancelable: {
      control: "boolean",
    },
    enablenext: {
      control: "boolean",
    },
    nextbtnlabel: {
      control: "text",
    },
    previousbtnlabel: {
      control: "text",
    },
    donebtnlabel: {
      control: "text",
    },
    cancelbtnlabel: {
      control: "text",
    },
    // skipbtnlabel: {
    //   control: "text",
    //   description: "Skip button label (shows when step has enableskip=true)",
    // },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className: {table: {disable: true}},
  },
  parameters: {
    // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
    // which is incompatible with CSS variable approach. To enable design tokens,
    // the wizard component would need to be rewritten without MUI Stepper.
    designTokens: {
      enabled: true,
      tokenData: wizardTokensData,
      componentKey: "wizard",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const DottedStepper: Story = {
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    return (
      <Box sx={{ p: 4, width: "100%" }} data-design-token-target={dataAttr}>
        <WmWizard {...componentArgs}>
          <WmWizardstep
            name="basic"
            title="Basic Information"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                The dotted stepper style provides a minimal, clean appearance with small dots as step indicators.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This style is perfect for modern, minimalist interfaces.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="advanced"
            title="Advanced Options"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Advanced Options
              </Typography>
              <Typography variant="body1" gutterBottom>
                Configure advanced settings in this step. The dotted line connects the steps visually.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Simple dots keep the focus on the content rather than the navigation.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="summary"
            title="Summary"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body1" gutterBottom>
                Review your information and complete the wizard.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The minimal design keeps users focused on the task.
              </Typography>
            </Box>
          </WmWizardstep>
          <WizardActions
            actionsalignment={componentArgs.actionsalignment}
            cancelable={componentArgs.cancelable}
            enablenext={componentArgs.enablenext}
            nextbtnlabel={componentArgs.nextbtnlabel}
            previousbtnlabel={componentArgs.previousbtnlabel}
            donebtnlabel={componentArgs.donebtnlabel}
            cancelbtnlabel={componentArgs.cancelbtnlabel}
            skipbtnlabel="Skip"
          />
        </WmWizard>
      </Box>
    );
  },
  args: {
    name: "dottedStepperWizard",
    className: "dottedstepper",
    defaultstepindex: 0,
    cancelable: true,
    enablenext: true,
    nextbtnlabel: "Next",
    previousbtnlabel: "Previous",
    donebtnlabel: "Done",
    cancelbtnlabel: "Cancel",
    orientation: "horizontal",
    actionsalignment: "right",
    listener: mockListener,
    stepstyle: "auto",
    "data-design-token-target":true
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: {disable: true}
    },
    stepstyle: {
      control: "select",
      options: ["auto", "justified"],
    },
    actionsalignment: {
      control: "select",
      options: ["left", "right"],
    },
    defaultstepindex: {
      control: "number",
    },
    cancelable: {
      control: "boolean",
    },
    enablenext: {
      control: "boolean",
    },
    nextbtnlabel: {
      control: "text",
    },
    previousbtnlabel: {
      control: "text",
    },
    donebtnlabel: {
      control: "text",
    },
    cancelbtnlabel: {
      control: "text",
    },
    // skipbtnlabel: {
    //   control: "text",
    //   description: "Skip button label (shows when step has enableskip=true)",
    // },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className: {table: {disable: true}},
  },
  parameters: {
    // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
    // which is incompatible with CSS variable approach. To enable design tokens,
    // the wizard component would need to be rewritten without MUI Stepper.
    designTokens: {
      enabled: true,
      tokenData: wizardTokensData,
      componentKey: "wizard",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const DottedStepperTextInline: Story = {
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    return (
      <Box sx={{ p: 4, width: "100%" }} data-design-token-target={dataAttr}>
        <WmWizard {...componentArgs}>
          <WmWizardstep
            name="start"
            title="Getting Started"
            subtitle="Begin your journey"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Getting Started
              </Typography>
              <Typography variant="body1" gutterBottom>
                The dotted stepper with text-inline combines minimal design with clear, inline step labels.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This variant is excellent for modern, clean interfaces with good readability.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="configure"
            title="Configuration"
            subtitle="Set your preferences"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Configuration
              </Typography>
              <Typography variant="body1" gutterBottom>
                Set your preferences. The inline text layout provides clear labels while maintaining a minimal aesthetic.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Labels appear horizontally next to the dots for better space utilization.
              </Typography>
            </Box>
          </WmWizardstep>
          <WmWizardstep
            name="finalize"
            title="Finalize"
            listener={mockListener}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Finalize
              </Typography>
              <Typography variant="body1" gutterBottom>
                Complete the wizard setup. This style balances minimalism with usability.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click Done to finish the setup process.
              </Typography>
            </Box>
          </WmWizardstep>
          <WizardActions
            actionsalignment={componentArgs.actionsalignment}
            cancelable={componentArgs.cancelable}
            enablenext={componentArgs.enablenext}
            nextbtnlabel={componentArgs.nextbtnlabel}
            previousbtnlabel={componentArgs.previousbtnlabel}
            donebtnlabel={componentArgs.donebtnlabel}
            cancelbtnlabel={componentArgs.cancelbtnlabel}
            skipbtnlabel="Skip"
          />
        </WmWizard>
      </Box>
    );
  },
  args: {
    name: "dottedStepperTextInlineWizard",
    className: "dottedstepper text-inline",
    defaultstepindex: 0,
    cancelable: true,
    enablenext: true,
    nextbtnlabel: "Next",
    previousbtnlabel: "Previous",
    donebtnlabel: "Done",
    cancelbtnlabel: "Cancel",
    orientation: "horizontal",
    actionsalignment: "right",
    listener: mockListener,
    stepstyle: "auto",
    "data-design-token-target":true
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: {disable: true}
    },
    stepstyle: {
      control: "select",
      options: ["auto", "justified"],
    },
    actionsalignment: {
      control: "select",
      options: ["left", "right"],
    },
    defaultstepindex: {
      control: "number",
    },
    cancelable: {
      control: "boolean",
    },
    enablenext: {
      control: "boolean",
    },
    nextbtnlabel: {
      control: "text",
    },
    previousbtnlabel: {
      control: "text",
    },
    donebtnlabel: {
      control: "text",
    },
    cancelbtnlabel: {
      control: "text",
    },
    // skipbtnlabel: {
    //   control: "text",
    //   description: "Skip button label (shows when step has enableskip=true)",
    // },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className: {table: {disable: true}},
  },
  parameters: {
    // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
    // which is incompatible with CSS variable approach. To enable design tokens,
    // the wizard component would need to be rewritten without MUI Stepper.
    designTokens: {
      enabled: true,
      tokenData: wizardTokensData,
      componentKey: "wizard",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

// export const Classic: Story = {
//   render: (args) => (
//     <Box sx={{ p: 4 }}>
//       <WmWizard {...args}>
//         <WmWizardstep
//           name="intro"
//           title="Introduction"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3, textAlign: "center" }}>
//             <Typography variant="h6" gutterBottom>
//               Introduction
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               The classic style provides a traditional wizard appearance with a timeless design.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               This style is familiar to users and works well for standard workflows.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WmWizardstep
//           name="content"
//           title="Content"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3, textAlign: "center" }}>
//             <Typography variant="h6" gutterBottom>
//               Content
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Simple and familiar design pattern that users recognize immediately.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The classic style emphasizes clarity and ease of use.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WmWizardstep
//           name="conclusion"
//           title="Conclusion"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3, textAlign: "center" }}>
//             <Typography variant="h6" gutterBottom>
//               Conclusion
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Complete the classic wizard setup with a traditional finish.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Click Done to finish the process.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WizardActions
//           actionsalignment={args.actionsalignment}
//           cancelable={args.cancelable}
//           enablenext={args.enablenext}
//           nextbtnlabel={args.nextbtnlabel}
//           previousbtnlabel={args.previousbtnlabel}
//           donebtnlabel={args.donebtnlabel}
//           cancelbtnlabel={args.cancelbtnlabel}
//           skipbtnlabel="Skip"
//         />
//       </WmWizard>
//     </Box>
//   ),
//   args: {
//     name: "classicWizard",
//     className: "classic",
//     defaultstepindex: 0,
//     cancelable: true,
//     enablenext: true,
//     nextbtnlabel: "Next",
//     previousbtnlabel: "Previous",
//     donebtnlabel: "Done",
//     cancelbtnlabel: "Cancel",
//     orientation: "horizontal",
//     actionsalignment: "right",
//     listener: mockListener,
//     stepstyle: "justified",
//     "data-design-token-target":false
//   },
//   argTypes: {
//     orientation: {
//       control: "select",
//       options: ["horizontal", "vertical"],
//       table: {disable: true}
//     },
//     stepstyle: {
//       control: "select",
//       options: ["auto", "justified"],
//     },
//     actionsalignment: {
//       control: "select",
//       options: ["left", "right"],
//     },
//     defaultstepindex: {
//       control: "number",
//     },
//     cancelable: {
//       control: "boolean",
//     },
//     enablenext: {
//       control: "boolean",
//     },
//     nextbtnlabel: {
//       control: "text",
//     },
//     previousbtnlabel: {
//       control: "text",
//     },
//     donebtnlabel: {
//       control: "text",
//     },
//     cancelbtnlabel: {
//       control: "text",
//     },
//     // skipbtnlabel: {
//     //   control: "text",
//     //   description: "Skip button label (shows when step has enableskip=true)",
//     // },
//     "data-design-token-target": { table: { disable: true } },
//     name: { table: { disable: true } },
//     listener: { table: { disable: true } },
//     className: {table: {disable: true}},
//   },
//   parameters: {
//     // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
//     // which is incompatible with CSS variable approach. To enable design tokens,
//     // the wizard component would need to be rewritten without MUI Stepper.
//     designTokens: {
//       enabled: false,
//       tokenData: wizardTokensData,
//       componentKey: "wizard",
//       extractCSSVariablesAtRuntime: true,
//     },
//     layout: "fullscreen",
//   },
// };

// export const Vertical: Story = {
//   render: (args) => (
//     <Box sx={{ p: 4 }}>
//       <WmWizard {...args}>
//         <WmWizardstep
//           name="verticalStep1"
//           title="First Step"
//           subtitle="Vertical layout"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               First Step
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Vertical orientation is ideal for sidebars and narrow layouts where horizontal space is limited.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               The steps are stacked vertically with content displayed alongside.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WmWizardstep
//           name="verticalStep2"
//           title="Second Step"
//           subtitle="Side by side"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Second Step
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Steps are displayed vertically with content positioned to the right of the step indicators.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               This layout works well for dashboard-style interfaces.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WmWizardstep
//           name="verticalStep3"
//           title="Third Step"
//           subtitle="Final step"
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Third Step
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Complete the vertical wizard setup. This orientation maximizes vertical screen space.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Click Done to finish the vertical wizard.
//             </Typography>
//           </Box>
//         </WmWizardstep>
//         <WizardActions
//           actionsalignment={args.actionsalignment}
//           cancelable={args.cancelable}
//           enablenext={args.enablenext}
//           nextbtnlabel={args.nextbtnlabel}
//           previousbtnlabel={args.previousbtnlabel}
//           donebtnlabel={args.donebtnlabel}
//           cancelbtnlabel={args.cancelbtnlabel}
//           skipbtnlabel="Skip"
//         />
//       </WmWizard>
//     </Box>
//   ),
//   args: {
//     name: "verticalWizard",
//     className: "number",
//     orientation: "vertical",
//     defaultstepindex: 0,
//     cancelable: true,
//     enablenext: true,
//     nextbtnlabel: "Next",
//     previousbtnlabel: "Previous",
//     donebtnlabel: "Done",
//     cancelbtnlabel: "Cancel",
//     actionsalignment: "right",
//     listener: mockListener,
//   },
//   argTypes: {
//     className: { table: { disable: true } },
//     orientation: { table: { disable: true } },
//     name: { table: { disable: true } },
//     listener: { table: { disable: true } },
//   },
//   parameters: {
//     // Design tokens disabled for wizard - MUI Stepper uses JS-in-CSS (Emotion)
//     // which is incompatible with CSS variable approach. To enable design tokens,
//     // the wizard component would need to be rewritten without MUI Stepper.
//     designTokens: {
//       enabled: false,
//       tokenData: wizardTokensData,
//       componentKey: "wizard",
//       extractCSSVariablesAtRuntime: true,
//     },
//     layout: "fullscreen",
//   },
// };
