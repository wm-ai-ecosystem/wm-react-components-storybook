import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import WmForm from "../../../../components/data/form";
import WmText from "../../../../components/input/text";
import WmNumber from "../../../../components/input/number";
import WmTextarea from "../../../../components/input/textarea";
import WmSelect from "../../../../components/input/select";
import WmCheckbox from "../../../../components/input/default/checkbox";
import WmSwitch from "../../../../components/input/default/switch";
import WmDate from "../../../../components/input/epoch/date";
import WmFormField from "../../../../components/data/form/form-field";
import WmFormAction from "../../../../components/data/form/form-action";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Data/Form",
  component: WmForm,
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-user"],
    },
    collapsible: { control: "boolean" },
    expanded: { control: "boolean" },
    captionposition: {
      control: "select",
      options: ["left", "top", "floating"]
    },
    captionalign: {
      control: "select",
      options: ["left", "center", "right"]
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof WmForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: "basicForm",
    title: "Contact Form",
    subheading: "Please fill in your details",
    iconclass: "",
    listener: mockListener,
    children: (
      <Box sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <WmText
            name="fullName"
            placeholder="Enter your full name"
            datavalue=""
            listener={mockListener}
            caption="Full Name"
            required={true}
          />
          <WmText
            name="email"
            type="email"
            placeholder="Enter your email"
            datavalue=""
            listener={mockListener}
            caption="Email Address"
            required={true}
          />
          <WmTextarea
            name="message"
            placeholder="Enter your message"
            datavalue=""
            listener={mockListener}
            caption="Message"
            rows={4}
          />
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" type="reset">
              Reset
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    ),
  },
};

export const Showcase: Story = {
  args: {
    name: "showcaseForm",
    title: "Shipping Information",
    subheading: "Enter your delivery address",
    iconclass: "",
    listener: mockListener,
    children: (
      <Box sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <WmText
              name="firstName"
              placeholder="First name"
              datavalue=""
              listener={mockListener}
              caption="First Name"
            />
            <WmText
              name="lastName"
              placeholder="Last name"
              datavalue=""
              listener={mockListener}
              caption="Last Name"
            />
          </Stack>
          <WmText
            name="address1"
            placeholder="Street address"
            datavalue=""
            listener={mockListener}
            caption="Address Line 1"
          />
          <WmText
            name="address2"
            placeholder="Apt, suite, etc. (optional)"
            datavalue=""
            listener={mockListener}
            caption="Address Line 2"
          />
          <Stack direction="row" spacing={2}>
            <WmText
              name="city"
              placeholder="City"
              datavalue=""
              listener={mockListener}
              caption="City"
            />
            <WmText
              name="state"
              placeholder="State"
              datavalue=""
              listener={mockListener}
              caption="State/Province"
            />
            <WmText
              name="zipCode"
              placeholder="ZIP"
              datavalue=""
              listener={mockListener}
              caption="ZIP Code"
            />
          </Stack>
          <WmSelect
            name="country"
            datavalue="USA"
            dataset={["USA", "Canada", "UK", "Australia"]}
            listener={mockListener}
            caption="Country"
          />
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined">Back</Button>
            <Button variant="contained" type="submit">
              Continue to Payment
            </Button>
          </Box>
        </Stack>
      </Box>
    ),
  },
};


// export const RegistrationForm: Story = {
//   args: {
//     name: "registrationForm",
//     title: "User Registration",
//     subheading: "Create your account",
//     iconclass: "wi wi-user-plus",
//     captionposition: "top",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <Stack direction="row" spacing={2}>
//             <WmText
//               name="firstName"
//               placeholder="First name"
//               datavalue=""
//               listener={mockListener}
//               caption="First Name *"
//               required={true}
//             />
//             <WmText
//               name="lastName"
//               placeholder="Last name"
//               datavalue=""
//               listener={mockListener}
//               caption="Last Name *"
//               required={true}
//             />
//           </Stack>
//           <WmText
//             name="username"
//             placeholder="Choose a username"
//             datavalue=""
//             listener={mockListener}
//             caption="Username *"
//             required={true}
//           />
//           <WmText
//             name="email"
//             type="email"
//             placeholder="your.email@example.com"
//             datavalue=""
//             listener={mockListener}
//             caption="Email Address *"
//             required={true}
//           />
//           <WmText
//             name="password"
//             type="password"
//             placeholder="Enter password"
//             datavalue=""
//             listener={mockListener}
//             caption="Password *"
//             required={true}
//           />
//           <WmText
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm password"
//             datavalue=""
//             listener={mockListener}
//             caption="Confirm Password *"
//             required={true}
//           />
//           <WmCheckbox
//             name="terms"
//             caption="I agree to the terms and conditions"
//             datavalue={false}
//             listener={mockListener}
//           />
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="outlined" type="reset">
//               Clear
//             </Button>
//             <Button variant="contained" type="submit">
//               Register
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ProfileForm: Story = {
//   args: {
//     name: "profileForm",
//     title: "Edit Profile",
//     subheading: "Update your personal information",
//     iconclass: "wi wi-user",
//     captionposition: "left",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <WmText
//             name="fullName"
//             placeholder="Enter your name"
//             datavalue="John Doe"
//             listener={mockListener}
//             caption="Full Name"
//           />
//           <WmText
//             name="email"
//             type="email"
//             placeholder="Enter email"
//             datavalue="john.doe@example.com"
//             listener={mockListener}
//             caption="Email"
//             readonly={true}
//           />
//           <WmDate
//             name="birthdate"
//             datavalue="1990-01-15"
//             listener={mockListener}
//             caption="Date of Birth"
//           />
//           <WmText
//             name="phone"
//             type="tel"
//             placeholder="Enter phone number"
//             datavalue="+1 234 567 8900"
//             listener={mockListener}
//             caption="Phone"
//           />
//           <WmSelect
//             name="country"
//             datavalue="USA"
//             dataset={["USA", "Canada", "UK", "Australia", "Other"]}
//             listener={mockListener}
//             caption="Country"
//           />
//           <WmTextarea
//             name="bio"
//             placeholder="Tell us about yourself"
//             datavalue="Software engineer passionate about web development"
//             listener={mockListener}
//             caption="Bio"
//             rows={4}
//           />
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="outlined">Cancel</Button>
//             <Button variant="contained" type="submit">
//               Save Changes
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CollapsibleForm: Story = {
//   args: {
//     name: "collapsibleForm",
//     title: "Advanced Settings",
//     subheading: "Configure advanced options",
//     iconclass: "wi wi-cog",
//     collapsible: true,
//     expanded: true,
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <WmSwitch
//             name="notifications"
//             caption="Enable email notifications"
//             datavalue={true}
//             listener={mockListener}
//           />
//           <WmSwitch
//             name="autoSave"
//             caption="Enable auto-save"
//             datavalue={true}
//             listener={mockListener}
//           />
//           <WmNumber
//             name="timeout"
//             datavalue={30}
//             listener={mockListener}
//             caption="Session timeout (minutes)"
//             minvalue={5}
//             maxvalue={120}
//           />
//           <WmSelect
//             name="theme"
//             datavalue="light"
//             dataset={["light", "dark", "auto"]}
//             listener={mockListener}
//             caption="Theme"
//           />
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="outlined" type="reset">
//               Reset to Defaults
//             </Button>
//             <Button variant="contained" type="submit">
//               Apply Settings
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const FloatingLabels: Story = {
//   args: {
//     name: "floatingLabelsForm",
//     title: "Login",
//     subheading: "Sign in to your account",
//     iconclass: "wi wi-lock",
//     captionposition: "floating",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 3, maxWidth: 400 }}>
//         <Stack spacing={3}>
//           <WmText
//             name="email"
//             type="email"
//             placeholder="Email"
//             datavalue=""
//             listener={mockListener}
//             caption="Email"
//             required={true}
//           />
//           <WmText
//             name="password"
//             type="password"
//             placeholder="Password"
//             datavalue=""
//             listener={mockListener}
//             caption="Password"
//             required={true}
//           />
//           <WmCheckbox
//             name="remember"
//             caption="Remember me"
//             datavalue={false}
//             listener={mockListener}
//           />
//           <Button variant="contained" fullWidth type="submit">
//             Sign In
//           </Button>
//           <Typography variant="body2" align="center" color="text.secondary">
//             Forgot password?
//           </Typography>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const SurveyForm: Story = {
//   args: {
//     name: "surveyForm",
//     title: "Customer Satisfaction Survey",
//     subheading: "Help us improve our service",
//     iconclass: "wi wi-comment",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <WmText
//             name="customerName"
//             placeholder="Your name"
//             datavalue=""
//             listener={mockListener}
//             caption="Name"
//           />
//           <WmSelect
//             name="satisfactionLevel"
//             datavalue=""
//             dataset={["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]}
//             listener={mockListener}
//             caption="Overall Satisfaction"
//           />
//           <WmSelect
//             name="serviceQuality"
//             datavalue=""
//             dataset={["Excellent", "Good", "Average", "Poor"]}
//             listener={mockListener}
//             caption="Service Quality"
//           />
//           <WmTextarea
//             name="comments"
//             placeholder="Please share your thoughts"
//             datavalue=""
//             listener={mockListener}
//             caption="Additional Comments"
//             rows={5}
//           />
//           <WmCheckbox
//             name="followUp"
//             caption="I would like to be contacted for follow-up"
//             datavalue={false}
//             listener={mockListener}
//           />
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="contained" type="submit">
//               Submit Survey
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const InteractiveForm: Story = {
//   render: () => {
//     const [formData, setFormData] = useState<any>({});
//     const [submitLog, setSubmitLog] = useState<string[]>([]);

//     const handleFormSubmit = (event: React.FormEvent) => {
//       event.preventDefault();
//       const timestamp = new Date().toLocaleTimeString();
//       setSubmitLog((prev) => [
//         ...prev.slice(-3),
//         `[${timestamp}] Form submitted with data: ${JSON.stringify(formData, null, 2)}`,
//       ]);
//     };

//     const handleFieldChange = (fieldName: string, value: any) => {
//       setFormData((prev: any) => ({
//         ...prev,
//         [fieldName]: value,
//       }));
//     };

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={3}>
//           <form onSubmit={handleFormSubmit}>
//             <WmForm
//               name="interactiveForm"
//               title="Interactive Form"
//               subheading="See form data in real-time"
//               iconclass="wi wi-edit"
//               listener={mockListener}
//             >
//               <Box sx={{ padding: 3 }}>
//                 <Stack spacing={3}>
//                   <WmText
//                     name="name"
//                     placeholder="Enter your name"
//                     datavalue={formData.name || ""}
//                     listener={mockListener}
//                     caption="Name"
//                     onChange={(e) => handleFieldChange("name", e.target.value)}
//                   />
//                   <WmText
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     datavalue={formData.email || ""}
//                     listener={mockListener}
//                     caption="Email"
//                     onChange={(e) => handleFieldChange("email", e.target.value)}
//                   />
//                   <WmNumber
//                     name="age"
//                     datavalue={formData.age || ""}
//                     listener={mockListener}
//                     caption="Age"
//                     onChange={(e) => handleFieldChange("age", e.target.value)}
//                   />
//                   <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                     <Button variant="outlined" type="reset">
//                       Reset
//                     </Button>
//                     <Button variant="contained" type="submit">
//                       Submit
//                     </Button>
//                   </Box>
//                 </Stack>
//               </Box>
//             </WmForm>
//           </form>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Current Form Data:
//             </Typography>
//             <pre style={{ fontSize: "12px", overflow: "auto" }}>
//               {JSON.stringify(formData, null, 2)}
//             </pre>
//           </Box>

//           {submitLog.length > 0 && (
//             <Box sx={{ padding: 2, backgroundColor: "#e3f2fd", borderRadius: 1 }}>
//               <Typography variant="subtitle2" gutterBottom>
//                 Submit Log:
//               </Typography>
//               <Stack spacing={0.5}>
//                 {submitLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace", fontSize: "11px" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Box>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const InlineLayout: Story = {
//   args: {
//     name: "inlineForm",
//     title: "Quick Search",
//     iconclass: "wi wi-search",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack direction="row" spacing={2} alignItems="flex-end">
//           <WmText
//             name="searchTerm"
//             placeholder="Enter search term"
//             datavalue=""
//             listener={mockListener}
//             caption="Search"
//           />
//           <WmSelect
//             name="category"
//             datavalue="all"
//             dataset={["all", "products", "users", "orders"]}
//             listener={mockListener}
//             caption="Category"
//           />
//           <Button variant="contained" type="submit" sx={{ height: "40px" }}>
//             Search
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };