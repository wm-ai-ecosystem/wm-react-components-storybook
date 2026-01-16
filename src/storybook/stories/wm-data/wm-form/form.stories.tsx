import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import WmForm from "../../../../components/data/form";
import WmText from "../../../../components/input/text";
import WmTextarea from "../../../../components/input/textarea";
import WmSelect from "../../../../components/input/select";
import WmCheckbox from "../../../../components/input/default/checkbox";
import WmDate from "../../../../components/input/epoch/date";
import WmNumber from "../../../../components/input/number";
import WmSwitch from "../../../../components/input/default/switch";
import WmCurrency from "../../../../components/input/currency";
import WmRadioset from "../../../../components/input/default/radioset";
import WmCheckboxset from "../../../../components/input/default/checkboxset";
import WmComposite from "../../../../components/input/composite";
import WmLabel from "../../../../components/basic/label";


import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import formTokensData from "../../../../designTokens/components/form-controls/form-controls.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Data/Form",
  component: WmForm,
  // argTypes: {
  //   title: { control: "text" },
  //   subheading: { control: "text" },
  //   iconclass:{
  //     control:{
  //       type:"select"
  //     },
  //     options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
  //       "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-user"],
  //   },
  //   collapsible: { control: "boolean" },
  //   expanded: { control: "boolean" },
  //   captionposition: {
  //     control: "select",
  //     options: ["left", "top", "floating"]
  //   },
  //   captionalign: {
  //     control: "select",
  //     options: ["left", "center", "right"]
  //   },
  // },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmForm>;

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
  args: {} as any,
};


export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Forms Showcase
          </Typography>
        </Box>

        <Stack spacing={6} sx={{ mt: 4 }}>
          {/* USER PROFILE FORM */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              User Profile Form
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Edit profile with pre-filled data
            </Typography>

            <WmForm {...({
              name: "profileForm",
              title: "Edit Profile",
              subheading: "Update your personal information",
              iconclass: "fa fa-user",
              captionposition: "left",
              captionalign: "left",
              listener: mockListener,
            } as any)}>
              <Box sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  {/* Two-column layout for form fields */}
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="firstName_composite">
                        <WmLabel caption="First Name" listener={mockListener} name="firstName_label" className="control-label" />
                        <WmText
                          name="firstName"
                          placeholder="Enter first name"
                          datavalue="John"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="lastName_composite">
                        <WmLabel caption="Last Name" listener={mockListener} name="lastName_label" className="control-label" />
                        <WmText
                          name="lastName"
                          placeholder="Enter last name"
                          datavalue="Doe"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="email_composite">
                        <WmLabel caption="Email" listener={mockListener} name="email_label" className="control-label" />
                        <WmText
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          datavalue="john.doe@example.com"
                          listener={mockListener}
                          readonly={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="phone_composite">
                        <WmLabel caption="Phone Number" listener={mockListener} name="phone_label" className="control-label" />
                        <WmNumber
                          name="phone"
                          placeholder="Enter phone number"
                          datavalue={2345678900}
                          listener={mockListener}
                          minvalue={1000000000}
                          maxvalue={9999999999}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="birthdate_composite">
                        <WmLabel caption="Date of Birth" listener={mockListener} name="birthdate_label" className="control-label" />
                        <WmDate
                          name="birthdate"
                          datavalue="1990-01-15"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="gender_composite">
                        <WmLabel caption="Gender" listener={mockListener} name="gender_label" className="control-label" />
                        <WmSwitch
                          name="gender"
                          datavalue="Male"
                          dataset="Male, Female, Other"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="country_composite">
                        <WmLabel caption="Country" listener={mockListener} name="country_label" className="control-label" />
                        <WmSelect
                          name="country"
                          datavalue="USA"
                          dataset={["USA", "Canada", "UK", "Australia", "Other"]}
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="city_composite">
                        <WmLabel caption="City" listener={mockListener} name="city_label" className="control-label" />
                        <WmText
                          name="city"
                          placeholder="Enter city"
                          datavalue="San Francisco"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <WmComposite captionposition="top" listener={mockListener} name="bio_composite">
                    <WmLabel caption="Bio" listener={mockListener} name="bio_label" className="control-label" />
                    <WmTextarea
                      name="bio"
                      placeholder="Tell us about yourself"
                      datavalue="Software engineer passionate about web development"
                      listener={mockListener}
                      rows={4}
                    />
                  </WmComposite>

                  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" type="submit">
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </WmForm>
          </Box>

          {/* REGISTRATION FORM */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Form
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Three-column layout
            </Typography>

            <WmForm {...({
              name: "registrationForm",
              title: "User Registration",
              subheading: "Create your account",
              iconclass: "fa fa-user",
              captionposition: "top",
              captionalign: "left",
              listener: mockListener,
            } as any)}>
              <Box sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  {/* Three-column layout for name fields */}
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="regFirstName_composite">
                        <WmLabel caption="First Name" required={true} listener={mockListener} name="regFirstName_label" className="control-label"/>
                        <WmText
                          name="firstName"
                          placeholder="First name"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="middleName_composite">
                        <WmLabel caption="Middle Name" listener={mockListener} name="middleName_label" className="control-label"/>
                        <WmText
                          name="middleName"
                          placeholder="Middle name"
                          datavalue=""
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="regLastName_composite">
                        <WmLabel caption="Last Name" required={true} listener={mockListener} name="regLastName_label" className="control-label"/>
                        <WmText
                          name="lastName"
                          placeholder="Last name"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="username_composite">
                        <WmLabel caption="Username" required={true} listener={mockListener} name="username_label" className="control-label"/>
                        <WmText
                          name="username"
                          placeholder="Choose a username"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="regEmail_composite">
                        <WmLabel caption="Email Address" required={true} listener={mockListener} name="regEmail_label" className="control-label"/>
                        <WmText
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="mobile_composite">
                        <WmLabel caption="Mobile Number" required={true} listener={mockListener} name="mobile_label" className="control-label" />
                        <WmNumber
                          name="mobile"
                          placeholder="Mobile number"
                          datavalue={null}
                          listener={mockListener}
                          required={true}
                          minvalue={1000000000}
                          maxvalue={9999999999}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="password_composite">
                        <WmLabel caption="Password" required={true} listener={mockListener} name="password_label" className="control-label"/>
                        <WmText
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="confirmPassword_composite">
                        <WmLabel caption="Confirm Password" required={true} listener={mockListener} name="confirmPassword_label" className="control-label"/>
                        <WmText
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="dob_composite">
                        <WmLabel caption="Date of Birth" required={true} listener={mockListener} name="dob_label" className="control-label"/>
                        <WmDate
                          name="dob"
                          datavalue=""
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="regGender_composite">
                        <WmLabel caption="Gender" listener={mockListener} name="regGender_label" className="control-label"/>
                        <WmSwitch
                          name="gender"
                          datavalue="Male"
                          dataset="Male, Female, Other"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="regCountry_composite">
                        <WmLabel caption="Country" required={true} listener={mockListener} name="regCountry_label" className="control-label"/>
                        <WmSelect
                          name="country"
                          datavalue=""
                          dataset={["USA", "Canada", "UK", "Australia", "India", "Other"]}
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="zipcode_composite">
                        <WmLabel caption="ZIP Code" listener={mockListener} name="zipcode_label" className="control-label"/>
                        <WmText
                          name="zipcode"
                          placeholder="ZIP/Postal code"
                          datavalue=""
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <WmCheckbox
                    name="terms"
                    caption="I agree to the terms and conditions *"
                    datavalue={false}
                    listener={mockListener}
                    required={true}
                  />

                  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button variant="outlined" type="reset">
                      Clear
                    </Button>
                    <Button variant="contained" type="submit">
                      Register
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </WmForm>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {} as any,
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: (args) => {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <WmForm {...({
            name: "basicContactForm",
            title: args.title,
            subheading: args.subheading,
            iconclass: args.iconclass,
            captionposition: args.captionposition,
            captionalign: args.captionalign,
            collapsible: args.collapsible,
            expanded: args.expanded,
            listener: mockListener,
          } as any)}>
            <Box sx={{ padding: 3 }}>
              <Stack spacing={3}>
                <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="basicFullName_composite">
                  <WmLabel caption="Full Name" required={true} listener={mockListener} name="basicFullName_label" className="control-label"/>
                  <WmText
                    name="fullName"
                    placeholder="Enter your full name"
                    datavalue=""
                    listener={mockListener}
                    required={true}
                  />
                </WmComposite>

                <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="basicEmail_composite">
                  <WmLabel caption="Email Address" required={true} listener={mockListener} name="basicEmail_label" className="control-label"/>
                  <WmText
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    datavalue=""
                    listener={mockListener}
                    required={true}
                  />
                </WmComposite>

                <WmComposite captionposition={args.captionposition} listener={mockListener} name="basicPhone_composite">
                  <WmLabel caption="Phone Number" listener={mockListener} name="basicPhone_label" className="control-label"/>
                  <WmNumber
                    name="phone"
                    placeholder="Contact number"
                    datavalue={null}
                    listener={mockListener}
                  />
                </WmComposite>

                <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="basicSubject_composite">
                  <WmLabel caption="Subject" required={true} listener={mockListener} name="basicSubject_label" className="control-label"/>
                  <WmSelect
                    name="subject"
                    datavalue=""
                    dataset={["General Inquiry", "Support", "Feedback", "Partnership", "Other"]}
                    listener={mockListener}
                    required={true}
                  />
                </WmComposite>

                <WmComposite captionposition={args.captionposition} required={false} listener={mockListener} name="basicMessage_composite">
                  <WmLabel caption="Message" required={false} listener={mockListener} name="basicMessage_label" className="control-label"/>
                  <WmTextarea
                    name="message"
                    placeholder="Your message here..."
                    datavalue=""
                    listener={mockListener}
                    rows={5}
                    required={false}
                  />
                </WmComposite>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                  <Button variant="outlined" type="reset">
                    Reset
                  </Button>
                  <Button variant="contained" type="submit" color="primary">
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Box>
          </WmForm>
      </Box>
    );
  },
  args: {
    title: "Contact Form",
    subheading: "Simple form example",
    iconclass: "fa fa-user",
    captionposition: "top",
    captionalign: "left",
    collapsible: false,
    expanded: true,
  } as any,
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
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <div data-design-token-target="true">
            <WmForm {...({
                name: "standardForm",
                title: args.title,
                subheading: args.subheading,
                iconclass: args.iconclass,
                captionposition: args.captionposition,
                captionalign: args.captionalign,
                collapsible: args.collapsible,
                expanded: args.expanded,
                listener: mockListener,
              } as any)}>
                <Box sx={{ padding: 3 }}>
                  <Stack spacing={3}>
                    {/* Text Input */}
                    <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdFullName_composite">
                      <WmLabel caption="Full Name" required={true} listener={mockListener} name="stdFullName_label" className="control-label" />
                      <WmText
                        name="fullName"
                        placeholder="Enter your full name"
                        datavalue=""
                        listener={mockListener}
                        required={true}
                      />
                    </WmComposite>

                    {/* Email Input */}
                    <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdEmail_composite">
                      <WmLabel caption="Email Address" required={true} listener={mockListener} name="stdEmail_label" className="control-label"/>
                      <WmText
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        datavalue=""
                        listener={mockListener}
                        required={true}
                      />
                    </WmComposite>

                    {/* Number Input */}
                    <WmComposite captionposition={args.captionposition} listener={mockListener} name="stdPhone_composite">
                      <WmLabel caption="Phone Number" listener={mockListener} name="stdPhone_label" className="control-label"/>
                      <WmNumber
                        name="phone"
                        placeholder="Enter phone number"
                        datavalue={null}
                        listener={mockListener}
                        minvalue={1000000000}
                        maxvalue={9999999999}
                      />
                    </WmComposite>

                    {/* Currency Input */}
                    <WmComposite captionposition={args.captionposition} listener={mockListener} name="stdSalary_composite">
                      <WmLabel caption="Expected Salary" listener={mockListener} name="stdSalary_label" className="control-label"/>
                      <WmCurrency
                        name="salary"
                        placeholder="Enter amount"
                        datavalue={null}
                        listener={mockListener}
                        currency="USD"
                        decimalplaces={2}
                      />
                    </WmComposite>

                    {/* Date Input */}
                    <WmComposite captionposition={args.captionposition} required={false} listener={mockListener} name="stdStartDate_composite">
                      <WmLabel caption="Start Date" required={false} listener={mockListener} name="stdStartDate_label" className="control-label"/>
                      <WmDate
                        name="startDate"
                        datavalue=""
                        listener={mockListener}
                        required={false}
                      />
                    </WmComposite>

                    {/* Select Dropdown */}
                    <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdDepartment_composite">
                      <WmLabel caption="Department" required={true} listener={mockListener} name="stdDepartment_label" className="control-label"/>
                      <WmSelect
                        name="department"
                        datavalue=""
                        dataset={["Engineering", "Marketing", "Sales", "HR", "Operations"]}
                        listener={mockListener}
                        required={true}
                      />
                    </WmComposite>

                    {/* Radio Button Set */}
                    <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdEmploymentType_composite">
                      <WmLabel caption="Employment Type" required={true} listener={mockListener} name="stdEmploymentType_label" className="control-label"/>
                      <WmRadioset
                        name="employmentType"
                        datavalue="Full-time"
                        dataset="Full-time, Part-time, Contract, Intern"
                        listener={mockListener}
                        required={true}
                      />
                    </WmComposite>

                    {/* Checkbox Set */}
                    <WmComposite captionposition={args.captionposition} listener={mockListener} name="stdSkills_composite">
                      <WmLabel caption="Technical Skills" listener={mockListener} name="stdSkills_label" className="control-label"/>
                      <WmCheckboxset
                        name="skills"
                        datavalue="Python"
                        dataset="JavaScript, Python, React, Node.js, AWS"
                        listener={mockListener}
                      />
                    </WmComposite>

                    {/* Switch */}
                    <WmComposite captionposition={args.captionposition} listener={mockListener} name="stdRemote_composite">
                      <WmLabel caption="Open to Remote Work" listener={mockListener} name="stdRemote_label" className="control-label"/>
                      <WmSwitch
                        name="remote"
                        datavalue="No"
                        dataset="Yes, No"
                        listener={mockListener}
                      />
                    </WmComposite>

                    {/* Textarea */}
                    <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdExperience_composite">
                      <WmLabel caption="Work Experience" required={true} listener={mockListener} name="stdExperience_label" className="control-label"/>
                      <WmTextarea
                        name="experience"
                        placeholder="Describe your work experience..."
                        datavalue=""
                        listener={mockListener}
                        rows={5}
                        required={true}
                      />
                    </WmComposite>

                    {/* Checkbox */}
                    <WmCheckbox
                      name="terms"
                      caption="I agree to the terms and conditions *"
                      datavalue={false}
                      listener={mockListener}
                      required={true}
                    />

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                      <Button variant="outlined" type="reset">
                        Reset
                      </Button>
                      <Button variant="contained" type="submit" color="primary">
                        Submit Application
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </WmForm>
          </div>
        </Stack>
      </Box>
    );
  },
  args: {
    title: "Job Application Form",
    subheading: "Complete the form to apply for a position",
    iconclass: "fa fa-briefcase",
    captionposition: "top",
    captionalign: "left",
    collapsible: false,
    expanded: true,
  } as any,
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart",
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-briefcase", "fa fa-user"],
    },
    collapsible: { control: "boolean" },
    expanded: { control: "boolean" },
    captionposition: {
      control: "select",
      options: ["left", "top", "floating"],
      description: "Position of field labels (top = above input, left = beside input, floating = inside input)"
    },
    captionalign: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Horizontal alignment of field labels"
    },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: formTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "form",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
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