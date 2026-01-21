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

import { iconClassNames } from "../../constants/iconClassConstants";


import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import formTokensData from "../../../../designTokens/components/form-controls/form-controls.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Data/Form",
  component: WmForm,
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
      // styling={styling}
      token={token}
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
      <Box sx={{ p: 3, width: "100%" }}>
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
              Enter the Details
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    return (
      <Box sx={{ p: 3, width: "100%", }}>
        <style>{`
          .caption-left .control-label {
            width: 200px;
            min-width: 200px;
            flex-shrink: 0;
            text-align: ${args.captionalign || 'left'};
            padding-right: 12px;
            display: inline-block;
            vertical-align: top;
          }

          .caption-left {
            display: flex;
            align-items: flex-start;
          }

          .caption-left > *:not(.control-label) {
            flex: 1;
          }
        `}</style>
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
    iconclass:{control: { type:"select"}, options: iconClassNames },
    collapsible: { control: "boolean" },
    expanded: { control: "boolean" },
    captionposition:{control: { type:"select"}, options: ["left", "top", "floating"]},
    captionalign:{control: { type:"select"}, options: ["left", "center", "right"]},
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