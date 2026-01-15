import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import DialogDefaultExport from "../../../../components/dialogs/dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmDialogFooter } from "@wavemaker/react-runtime/components/dialogs/dialog-actions";
import WmText from "../../../../components/input/text";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Dialog",
  component: DialogDefaultExport,
  // argTypes: {
  //   title: { control: "text" },
  //   iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save", "fa fa-file", "fa-fa-user"] },
  //   dialogtype: {
  //     control: { type: "select" },
  //     options: ["design-dialog", "custom"],
  //   },
  //   showheader: { control: "boolean" },
  //   closable: { control: "boolean" },
  //   modal: { control: "boolean" },
  // },
} satisfies Meta<typeof DialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      styling={styling}
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: "docsDialog",
    listener: mockListener,
  },
};

export const Showcase: Story = {
  tags: ["show-panel"],
  render: () => {
    const [openReadOnly, setOpenReadOnly] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    return (
      <Box p={4} maxWidth={900}>
        {/* Heading */}
        <Typography variant="h6" fontWeight={600} style={{marginBottom: "24px"}}>
          Design Dialog Showcase
        </Typography>

        <Typography variant="body1" color="text.secondary" style={{marginBottom: "16px"}}>
          Examples of design dialogs using Box and Stack. One dialog is read-only
          and the other contains an editable form.
        </Typography>

        {/* ================= TRIGGERS ================= */}
        <Stack direction="row" spacing={4} mb={4} gap="24px">
          <WmButton
          name="openDialogBtn"
          caption="Open Read-Only Dialog"
          onClick={() => setOpenReadOnly(true)}
          listener={mockListener}
          styles={{
            backgroundColor: "#00c8ff",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />

          <WmButton
          name="openDialogFormBtn"
          caption="Open Update Form Dialog"
          onClick={() => setOpenForm(true)}
          listener={mockListener}
          styles={{
            backgroundColor: "#FF7250",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />
        </Stack>

        {/* ================= READ ONLY DIALOG ================= */}
        <DialogDefaultExport
          name="readOnlyDialog"
          title="User Information"
          dialogtype="design-dialog"
          showheader
          closable
          modal
          isopen={openReadOnly}
          close={() => setOpenReadOnly(false)}
          onClose={() => setOpenReadOnly(false)}
          listener={mockListener}
        >
          <Box p={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Basic Information
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={4}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    Vinith Krishna
                  </Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1">
                    Frontend Engineer
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={4}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1">
                    UI Engineering
                  </Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1">
                    Active
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <WmDialogFooter name="readOnlyFooter" listener={mockListener}>
            <WmButton
              name="closeBtn"
              caption="Close"
              className="btn-primary"
              listener={mockListener}
              onClick={() => setOpenReadOnly(false)}
            />
          </WmDialogFooter>
        </DialogDefaultExport>

        {/* ================= FORM DIALOG ================= */}
        <DialogDefaultExport
          name="updateFormDialog"
          title="Update User Details"
          dialogtype="design-dialog"
          showheader
          closable
          modal
          isopen={openForm}
          close={() => setOpenForm(false)}
          onClose={() => setOpenForm(false)}
          listener={mockListener}
        >
          <Box p={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Update Details
            </Typography>

            <Stack spacing={2}>
              <WmText
                name="email"
                caption="Email"
                placeholder="Enter email"
                datavalue=""
                listener={mockListener}
              />

              <WmText
                name="phone"
                caption="Phone"
                placeholder="Enter phone number"
                datavalue=""
                listener={mockListener}
              />
            </Stack>
          </Box>

          <WmDialogFooter name="formFooter" listener={mockListener}>
            <WmButton
              name="cancelBtn"
              caption="Cancel"
              className="btn-default"
              listener={mockListener}
              onClick={() => setOpenForm(false)}
            />
            <WmButton
              name="saveBtn"
              caption="Save Changes"
              className="btn-primary"
              listener={mockListener}
              onClick={() => setOpenForm(false)}
            />
          </WmDialogFooter>
        </DialogDefaultExport>
      </Box>
    );
  },
  args:{
    name: "showcaseDesignDialog",
    listener:mockListener
  }
};


export const Basic: Story = {
  tags: ['show-panel'],
  render: (args: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box style={{ padding: 16 }}>
        <WmButton
          name="openDialogBtn"
          caption="Open Dialog"
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
        <DialogDefaultExport
          {...args}
          isopen={isOpen}
          onClose={() => setIsOpen(false)}
          close={() => setIsOpen(false)}
          listener={mockListener}
        >
          <Box sx={{ padding: 3 }}>
            <Typography variant="body1">
              This dialog includes a header, body and footer with action buttons.
            </Typography>
          </Box>
          <WmDialogFooter name="basicDialogFooter" listener={mockListener}>
            <WmButton
              name="cancelBtn"
              caption="Cancel"
              onClick={() => setIsOpen(false)}
              listener={mockListener}
              className="btn-default"
            />
            <WmButton
              name="saveBtn"
              caption="Save"
              onClick={() => setIsOpen(false)}
              listener={mockListener}
              className="btn-primary"
            />
          </WmDialogFooter>
        </DialogDefaultExport>
      </Box>
    );
  },
  args: {
    name: "basicDialog",
    title: "Basic Dialog",
    dialogtype: "design-dialog",
    showheader: true,
    closable: true,
    modal: true,
    iconclass: "fa fa-file",
    listener: mockListener,
  },
  argTypes: {
    title: { control: "text" },
    iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save", "fa fa-file", "fa-fa-user"] },
    dialogtype: {
      control: { type: "select" },
      options: ["design-dialog", "custom"],
    },
    showheader: { control: "boolean" },
    closable: { control: "boolean" },
    modal: { control: "boolean" },
  },
};

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "defaultDialog",
//     title: "Default Dialog",
//     dialogtype: "design-dialog",
//     showheader: true,
//     closable: true,
//     modal: true,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="body1">This is a default dialog with custom content.</Typography>
//       </Box>
//     ),
//   },
// };

// export const WithHeader: Story = {
//   render: Template,
//   args: {
//     name: "headerDialog",
//     title: "Dialog with Header",
//     dialogtype: "design-dialog",
//     showheader: true,
//     closable: true,
//     iconclass: "wi wi-info",
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Welcome
//         </Typography>
//         <Typography variant="body1">
//           This dialog demonstrates the header functionality with an icon and close button.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const WithoutHeader: Story = {
//   render: Template,
//   args: {
//     name: "noHeaderDialog",
//     title: "No Header Dialog",
//     dialogtype: "design-dialog",
//     showheader: false,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Content Only
//         </Typography>
//         <Typography variant="body1">
//           This dialog has no header. The content starts immediately.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const FormDialog: Story = {
//   render: (args: any) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [formData, setFormData] = useState({ name: "", email: "" });

//     return (
//       <Box style={{ padding: 16 }}>
//         <WmButton
//           name="openFormDialogBtn"
//           caption="Open Form Dialog"
//           onClick={() => setIsOpen(true)}
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
//         <DialogDefaultExport
//           name="formDialog"
//           title="User Information"
//           dialogtype="design-dialog"
//           showheader={true}
//           closable={true}
//           iconclass="wi wi-user"
//           isopen={isOpen}
//           onClose={() => setIsOpen(false)}
//           close={() => setIsOpen(false)}
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 3 }}>
//             <Stack spacing={2}>
//               <Box>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   Name:
//                 </Typography>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   style={{
//                     width: "100%",
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                   }}
//                   placeholder="Enter your name"
//                 />
//               </Box>
//               <Box>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   Email:
//                 </Typography>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   style={{
//                     width: "100%",
//                     padding: "8px",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                   }}
//                   placeholder="Enter your email"
//                 />
//               </Box>
//             </Stack>
//           </Box>
//           <WmDialogFooter name="" listener={{}}>
//             <WmButton
//               name="cancelBtn"
//               caption="Cancel"
//               onClick={() => {
//                 setIsOpen(false);
//                 setFormData({ name: "", email: "" });
//               }}
//               listener={mockListener}
//               className="btn-default"
//             />
//             <WmButton
//               name="submitBtn"
//               caption="Submit"
//               onClick={() => {
//                 console.log("Form submitted:", formData);
//                 setIsOpen(false);
//               }}
//               listener={mockListener}
//               className="btn-primary"
//             />
//           </WmDialogFooter>
//         </DialogDefaultExport>
//       </Box>
//     );
//   },
// };

// export const LargeContent: Story = {
//   render: Template,
//   args: {
//     name: "largeContentDialog",
//     title: "Large Content Dialog",
//     dialogtype: "design-dialog",
//     showheader: true,
//     closable: true,
//     iconclass: "wi wi-document",
//     children: (
//       <Box sx={{ padding: 3, maxHeight: "400px", overflow: "auto" }}>
//         <Typography variant="h6" gutterBottom>
//           Terms and Conditions
//         </Typography>
//         {[1, 2, 3, 4, 5].map((section) => (
//           <Box key={section} sx={{ mb: 2 }}>
//             <Typography variant="subtitle1" gutterBottom>
//               Section {section}
//             </Typography>
//             <Typography variant="body2">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
//               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
//               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//               pariatur.
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     ),
//   },
// };

// export const CustomStyling: Story = {
//   render: Template,
//   args: {
//     name: "styledDialog",
//     title: "Custom Styled Dialog",
//     dialogtype: "design-dialog",
//     showheader: true,
//     closable: true,
//     iconclass: "wi wi-paint-brush",
//     styles: {
//       width: "600px",
//       maxWidth: "90vw",
//     },
//     children: (
//       <Box
//         sx={{
//           padding: 3,
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           color: "white",
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Custom Styling
//         </Typography>
//         <Typography variant="body1">
//           This dialog demonstrates custom styling with gradient background and custom dimensions.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const NonModal: Story = {
//   render: Template,
//   args: {
//     name: "nonModalDialog",
//     title: "Non-Modal Dialog",
//     dialogtype: "design-dialog",
//     showheader: true,
//     closable: true,
//     modal: false,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="body1">
//           This is a non-modal dialog. You can interact with the background while this dialog is
//           open.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [eventLog, setEventLog] = useState<string[]>([]);

//     const addLog = (message: string) => {
//       setEventLog((prev) => [...prev.slice(-4), message]);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <WmButton
//             name="openInteractiveDialogBtn"
//             caption="Open Interactive Dialog"
//             onClick={() => {
//               setIsOpen(true);
//               addLog("Dialog opened");
//             }}
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

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2">Event Log:</Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2">No events yet</Typography>
//             ) : (
//               eventLog.map((log, index) => (
//                 <Typography key={index} variant="body2">
//                   {log}
//                 </Typography>
//               ))
//             )}
//           </Box>

//           <DialogDefaultExport
//             name="interactiveDialog"
//             title="Interactive Dialog"
//             dialogtype="design-dialog"
//             showheader={true}
//             closable={true}
//             iconclass="wi wi-cog"
//             isopen={isOpen}
//             onClose={() => {
//               setIsOpen(false);
//               addLog("Dialog closed");
//             }}
//             close={() => {
//               setIsOpen(false);
//               addLog("Dialog closed via close button");
//             }}
//             listener={mockListener}
//           >
//             <Box sx={{ padding: 3 }}>
//               <Typography variant="body1" gutterBottom>
//                 Interact with the buttons to see events being logged.
//               </Typography>
//               <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//                 <button
//                   onClick={() => addLog("Custom button clicked")}
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#28a745",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Action 1
//                 </button>
//                 <button
//                   onClick={() => addLog("Another action performed")}
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#ffc107",
//                     color: "black",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Action 2
//                 </button>
//               </Stack>
//             </Box>
//             <WmDialogFooter name="" listener={{}}>
//               <WmButton
//                 name="closeBtn"
//                 caption="Close"
//                 onClick={() => {
//                   setIsOpen(false);
//                   addLog("Close button clicked");
//                 }}
//                 listener={mockListener}
//                 className="btn-primary"
//               />
//             </WmDialogFooter>
//           </DialogDefaultExport>
//         </Stack>
//       </Box>
//     );
//   },
// };
