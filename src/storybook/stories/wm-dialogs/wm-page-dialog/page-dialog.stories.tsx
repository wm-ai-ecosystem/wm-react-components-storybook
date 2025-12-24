import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import PageDialogDefaultExport from "../../../../components/dialogs/page-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Page Dialog",
  component: PageDialogDefaultExport,
  argTypes: {
    title: { control: "text" },
    iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save", "fa fa-file", "fa-fa-user"] },
    oktext: { control: "text" },
    showactions: { control: "boolean" },
    closable: { control: "boolean" },
    content: { control: "text" },
  },
} satisfies Meta<typeof PageDialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ padding: 16 }}>
      <WmButton
        name="openPageDialogBtn"
        caption="Open Page Dialog"
        onClick={() => setIsOpen(true)}
        listener={mockListener}
        styles={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
      <PageDialogDefaultExport
        {...args}
        isopen={isOpen}
        onClose={() => setIsOpen(false)}
        close={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        listener={mockListener}
      />
    </Box>
  );
};

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicPageDialog",
    title: "Page Content",
    iconclass: "fa fa-file",
    oktext: "OK",
    showactions: true,
    closable: true,
    content: "Main",
  },
};

// export const WithCustomTitle: Story = {
//   render: Template,
//   args: {
//     name: "customTitleDialog",
//     title: "User Details",
//     iconclass: "wi wi-user",
//     oktext: "Close",
//     showactions: true,
//     closable: true,
//     content: "UserProfile",
//   },
// };

// export const WithoutActions: Story = {
//   render: Template,
//   args: {
//     name: "noActionsDialog",
//     title: "View Only",
//     iconclass: "wi wi-eye",
//     showactions: false,
//     closable: true,
//     content: "ViewContent",
//   },
// };

// export const NotClosable: Story = {
//   render: Template,
//   args: {
//     name: "notClosableDialog",
//     title: "Required Action",
//     iconclass: "wi wi-exclamation-triangle",
//     oktext: "Continue",
//     showactions: true,
//     closable: false,
//     content: "RequiredContent",
//   },
// };

// export const SettingsDialog: Story = {
//   render: Template,
//   args: {
//     name: "settingsDialog",
//     title: "Settings",
//     iconclass: "wi wi-cog",
//     oktext: "Save",
//     showactions: true,
//     closable: true,
//     content: "Settings",
//   },
// };

// export const ReportDialog: Story = {
//   render: Template,
//   args: {
//     name: "reportDialog",
//     title: "Monthly Report",
//     iconclass: "wi wi-bar-chart",
//     oktext: "Download",
//     showactions: true,
//     closable: true,
//     content: "Report",
//   },
// };

// export const FormDialog: Story = {
//   render: Template,
//   args: {
//     name: "formDialog",
//     title: "Edit Form",
//     iconclass: "wi wi-edit",
//     oktext: "Submit",
//     showactions: true,
//     closable: true,
//     content: "EditForm",
//   },
// };

// export const DashboardDialog: Story = {
//   render: Template,
//   args: {
//     name: "dashboardDialog",
//     title: "Dashboard",
//     iconclass: "wi wi-dashboard",
//     oktext: "Refresh",
//     showactions: true,
//     closable: true,
//     content: "Dashboard",
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [eventLog, setEventLog] = useState<string[]>([]);
//     const [currentContent, setCurrentContent] = useState("Main");

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     const pages = [
//       { label: "Main", content: "Main", icon: "wi wi-home" },
//       { label: "Profile", content: "Profile", icon: "wi wi-user" },
//       { label: "Settings", content: "Settings", icon: "wi wi-cog" },
//       { label: "Reports", content: "Reports", icon: "wi wi-bar-chart" },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
//             {pages.map((page) => (
//               <WmButton
//                 key={page.label}
//                 name={`open${page.label}Btn`}
//                 caption={`Open ${page.label}`}
//                 onClick={() => {
//                   setCurrentContent(page.content);
//                   setIsOpen(true);
//                   addLog(`Opening ${page.label} page`);
//                 }}
//                 listener={mockListener}
//                 styles={{
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                 }}
//               />
//             ))}
//           </Stack>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2">No events yet</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {eventLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>

//           <PageDialogDefaultExport
//             name="interactivePageDialog"
//             title={`${currentContent} Page`}
//             content={currentContent}
//             iconclass={pages.find((p) => p.content === currentContent)?.icon || "wi wi-file"}
//             oktext="Close"
//             showactions={true}
//             closable={true}
//             isopen={isOpen}
//             onClose={() => {
//               setIsOpen(false);
//               addLog("Dialog closed");
//             }}
//             close={() => {
//               setIsOpen(false);
//               addLog("Dialog closed via close button");
//             }}
//             onOk={() => {
//               setIsOpen(false);
//               addLog("OK button clicked");
//             }}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const MultipleDialogs: Story = {
//   render: () => {
//     const [openDialogs, setOpenDialogs] = useState<{
//       profile: boolean;
//       settings: boolean;
//       reports: boolean;
//     }>({
//       profile: false,
//       settings: false,
//       reports: false,
//     });

//     const handleOpen = (type: "profile" | "settings" | "reports") => {
//       setOpenDialogs((prev) => ({ ...prev, [type]: true }));
//     };

//     const handleClose = (type: "profile" | "settings" | "reports") => {
//       setOpenDialogs((prev) => ({ ...prev, [type]: false }));
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
//           <WmButton
//             name="openProfileBtn"
//             caption="Open Profile"
//             onClick={() => handleOpen("profile")}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#17a2b8",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//           <WmButton
//             name="openSettingsBtn"
//             caption="Open Settings"
//             onClick={() => handleOpen("settings")}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#6c757d",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//           <WmButton
//             name="openReportsBtn"
//             caption="Open Reports"
//             onClick={() => handleOpen("reports")}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#28a745",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//         </Stack>

//         <PageDialogDefaultExport
//           name="profileDialog"
//           title="User Profile"
//           content="Profile"
//           iconclass="wi wi-user"
//           oktext="Close"
//           showactions={true}
//           closable={true}
//           isopen={openDialogs.profile}
//           onClose={() => handleClose("profile")}
//           close={() => handleClose("profile")}
//           onOk={() => handleClose("profile")}
//           listener={mockListener}
//         />
//         <PageDialogDefaultExport
//           name="settingsDialog"
//           title="Settings"
//           content="Settings"
//           iconclass="wi wi-cog"
//           oktext="Save"
//           showactions={true}
//           closable={true}
//           isopen={openDialogs.settings}
//           onClose={() => handleClose("settings")}
//           close={() => handleClose("settings")}
//           onOk={() => handleClose("settings")}
//           listener={mockListener}
//         />
//         <PageDialogDefaultExport
//           name="reportsDialog"
//           title="Reports"
//           content="Reports"
//           iconclass="wi wi-bar-chart"
//           oktext="Export"
//           showactions={true}
//           closable={true}
//           isopen={openDialogs.reports}
//           onClose={() => handleClose("reports")}
//           close={() => handleClose("reports")}
//           onOk={() => handleClose("reports")}
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
// };

// export const WizardFlow: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [currentStep, setCurrentStep] = useState(1);

//     const steps = [
//       { step: 1, title: "Step 1: Basic Info", content: "BasicInfo", icon: "wi wi-info-circle" },
//       { step: 2, title: "Step 2: Details", content: "Details", icon: "wi wi-list" },
//       { step: 3, title: "Step 3: Review", content: "Review", icon: "wi wi-check-circle" },
//     ];

//     const currentStepData = steps.find((s) => s.step === currentStep) || steps[0];

//     const handleNext = () => {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1);
//       } else {
//         setIsOpen(false);
//         setCurrentStep(1);
//       }
//     };

//     const handleBack = () => {
//       if (currentStep > 1) {
//         setCurrentStep(currentStep - 1);
//       }
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <WmButton
//           name="openWizardBtn"
//           caption="Start Wizard"
//           onClick={() => {
//             setIsOpen(true);
//             setCurrentStep(1);
//           }}
//           listener={mockListener}
//           styles={{
//             backgroundColor: "#007bff",
//             color: "white",
//             padding: "8px 16px",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "14px",
//             fontWeight: "500",
//           }}
//         />
//         <PageDialogDefaultExport
//           name="wizardDialog"
//           title={currentStepData.title}
//           content={currentStepData.content}
//           iconclass={currentStepData.icon}
//           oktext={currentStep === steps.length ? "Finish" : "Next"}
//           showactions={true}
//           closable={true}
//           isopen={isOpen}
//           onClose={() => {
//             setIsOpen(false);
//             setCurrentStep(1);
//           }}
//           close={() => {
//             setIsOpen(false);
//             setCurrentStep(1);
//           }}
//           onOk={handleNext}
//           listener={mockListener}
//         >
//           <Box sx={{ p: 3 }}>
//             <Stack spacing={2}>
//               <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//                 {steps.map((step) => (
//                   <Box
//                     key={step.step}
//                     sx={{
//                       flex: 1,
//                       height: "4px",
//                       backgroundColor: currentStep >= step.step ? "#007bff" : "#e0e0e0",
//                       borderRadius: "2px",
//                     }}
//                   />
//                 ))}
//               </Box>
//               <Typography variant="body2">
//                 Step {currentStep} of {steps.length}
//               </Typography>
//               <Typography variant="body1">
//                 Content for {currentStepData.title} would be loaded here via the partial container.
//               </Typography>
//               {currentStep > 1 && (
//                 <Box>
//                   <WmButton
//                     name="backBtn"
//                     caption="Back"
//                     onClick={handleBack}
//                     listener={mockListener}
//                     styles={{
//                       backgroundColor: "#6c757d",
//                       color: "white",
//                       padding: "8px 16px",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       fontSize: "14px",
//                     }}
//                   />
//                 </Box>
//               )}
//             </Stack>
//           </Box>
//         </PageDialogDefaultExport>
//       </Box>
//     );
//   },
// };

// export const ConditionalActions: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [showActions, setShowActions] = useState(true);
//     const [isClosable, setIsClosable] = useState(true);

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Stack spacing={2}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <input
//                 type="checkbox"
//                 id="showActionsCheckbox"
//                 checked={showActions}
//                 onChange={(e) => setShowActions(e.target.checked)}
//               />
//               <label htmlFor="showActionsCheckbox">Show Actions</label>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <input
//                 type="checkbox"
//                 id="closableCheckbox"
//                 checked={isClosable}
//                 onChange={(e) => setIsClosable(e.target.checked)}
//               />
//               <label htmlFor="closableCheckbox">Closable</label>
//             </Box>
//           </Stack>

//           <WmButton
//             name="openConditionalBtn"
//             caption="Open Dialog"
//             onClick={() => setIsOpen(true)}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#007bff",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />

//           <PageDialogDefaultExport
//             name="conditionalDialog"
//             title="Conditional Settings"
//             content="ConditionalContent"
//             iconclass="wi wi-sliders"
//             oktext="OK"
//             showactions={showActions}
//             closable={isClosable}
//             isopen={isOpen}
//             onClose={() => setIsOpen(false)}
//             close={() => setIsOpen(false)}
//             onOk={() => setIsOpen(false)}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
// };
