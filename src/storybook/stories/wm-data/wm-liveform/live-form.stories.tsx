import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import WmLiveForm from "../../../../components/data/live-form";
import WmText from "../../../../components/input/text";
import WmNumber from "../../../../components/input/number";
import WmTextarea from "../../../../components/input/textarea";
import WmSelect from "../../../../components/input/select";
import WmSwitch from "../../../../components/input/default/switch";
import WmDate from "../../../../components/input/epoch/date";
import WmCurrency from "../../../../components/input/currency";
import WmRadioset from "../../../../components/input/default/radioset";
import WmCheckboxset from "../../../../components/input/default/checkboxset";
import WmCheckbox from "../../../../components/input/default/checkbox";
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

// Mock DataSource for demonstration purposes
const createMockDataSource = () => ({
  execute: (method: string, ...args: any[]) => {
    console.log(`DataSource.${method} called with:`, args);

    if (method === "getPrimaryKey") {
      return ["id"];
    }

    if (method === "getRelatedTableData") {
      return Promise.resolve({
        data: [
          { id: 1, name: "Option 1" },
          { id: 2, name: "Option 2" },
          { id: 3, name: "Option 3" },
        ],
      });
    }

    if (method === "getRelatedTablePrimaryKeys") {
      return ["id"];
    }

    return Promise.resolve({ success: true });
  },
});

const mockListener = {
  appLocale: {},
  Widgets: {},
  App: {
    notifyApp: (message: string, type: string) => {
      console.log(`Notification [${type}]:`, message);
    },
  },
  onChange: () => {},
};

const meta = {
  title: "Data/LiveForm",
  component: WmLiveForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmLiveForm>;

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
            Live Forms Showcase
          </Typography>
        </Box>

        <Stack spacing={6} sx={{ mt: 4 }}>
          {/* VIEW MODE - Read-only form with pre-filled data */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              View Mode (Read-Only)
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Display employee information in read-only mode
            </Typography>

            <WmLiveForm {...({
              name: "viewModeForm",
              title: "Employee Details",
              subheading: "View employee information",
              iconclass: "fa fa-user",
              datasource: createMockDataSource(),
              defaultmode: "view",
              formlayout: "inline",
              formdata: {
                employeeId: "EMP-12345",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@company.com",
                department: "Engineering",
                salary: 85000,
              },
              listener: mockListener,
              formSubmit: (data: any, operation: string, success: any) => {
                console.log("Form submit:", operation, data);
                setTimeout(() => {
                  success({ success: true, operationType: operation });
                }, 500);
              },
            } as any)}>
              <Box sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  <WmComposite captionposition="top" listener={mockListener} name="viewEmployeeId_composite">
                    <WmLabel caption="Employee ID" listener={mockListener} name="viewEmployeeId_label" className="control-label" />
                    <WmText
                      name="employeeId"
                      datavalue="EMP-12345"
                      listener={mockListener}
                      readonly={true}
                    />
                  </WmComposite>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="viewFirstName_composite">
                        <WmLabel caption="First Name" listener={mockListener} name="viewFirstName_label" className="control-label"/>
                        <WmText
                          name="firstName"
                          datavalue="John"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="viewLastName_composite">
                        <WmLabel caption="Last Name" listener={mockListener} name="viewLastName_label" className="control-label"/>
                        <WmText
                          name="lastName"
                          datavalue="Doe"
                          listener={mockListener}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>
                  <WmComposite captionposition="top" listener={mockListener} name="viewEmail_composite">
                    <WmLabel caption="Email" listener={mockListener} name="viewEmail_label" className="control-label"/>
                    <WmText
                      name="email"
                      type="email"
                      datavalue="john.doe@company.com"
                      listener={mockListener}
                    />
                  </WmComposite>
                  <WmComposite captionposition="top" listener={mockListener} name="viewDepartment_composite">
                    <WmLabel caption="Department" listener={mockListener} name="viewDepartment_label" className="control-label"/>
                    <WmSelect
                      name="department"
                      datavalue="Engineering"
                      dataset={["Engineering", "Marketing", "Sales", "HR", "Finance"]}
                      listener={mockListener}
                    />
                  </WmComposite>
                  <WmComposite captionposition="top" listener={mockListener} name="viewSalary_composite">
                    <WmLabel caption="Salary" listener={mockListener} name="viewSalary_label" className="control-label"/>
                    <WmNumber
                      name="salary"
                      datavalue={85000}
                      listener={mockListener}
                    />
                  </WmComposite>
                </Stack>
              </Box>
            </WmLiveForm>
          </Box>

          {/* EDIT MODE - Editable form with pre-filled data */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Edit Mode (Update Existing Record)
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Edit existing user records with datasource
            </Typography>

            <WmLiveForm {...({
              name: "editModeForm",
              title: "Edit User",
              subheading: "Update user information",
              iconclass: "fa fa-user",
              datasource: createMockDataSource(),
              defaultmode: "edit",
              formlayout: "inline",
              formdata: {
                id: 1,
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                role: "Manager",
              },
              updatemessage: "User updated successfully!",
              listener: mockListener,
              formSubmit: (data: any, operation: string, success: any) => {
                console.log("Form submit:", operation, data);
                setTimeout(() => {
                  success({ success: true, operationType: operation });
                }, 500);
              },
            } as any)}>
              <Box sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="editFirstName_composite">
                        <WmLabel caption="First Name" required={true} listener={mockListener} name="editFirstName_label" className="control-label"/>
                        <WmText
                          name="firstName"
                          placeholder="Enter first name"
                          datavalue="Jane"
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" required={true} listener={mockListener} name="editLastName_composite">
                        <WmLabel caption="Last Name" required={true} listener={mockListener} name="editLastName_label" className="control-label"/>
                        <WmText
                          name="lastName"
                          placeholder="Enter last name"
                          datavalue="Smith"
                          listener={mockListener}
                          required={true}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <WmComposite captionposition="top" required={true} listener={mockListener} name="editEmail_composite">
                    <WmLabel caption="Email Address" required={true} listener={mockListener} name="editEmail_label" className="control-label"/>
                    <WmText
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      datavalue="jane.smith@example.com"
                      listener={mockListener}
                      required={true}
                    />
                  </WmComposite>

                  <WmComposite captionposition="top" listener={mockListener} name="editRole_composite">
                    <WmLabel caption="Role" listener={mockListener} name="editRole_label" className="control-label"/>
                    <WmSelect
                      name="role"
                      datavalue="Manager"
                      dataset={["Admin", "User", "Manager", "Guest"]}
                      listener={mockListener}
                    />
                  </WmComposite>

                  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button variant="outlined" type="reset">
                      Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                      Update
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </WmLiveForm>
          </Box>

          {/* CREATE MODE - Empty form for new records */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Create Mode (New Record)
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Add new products with custom success messages
            </Typography>

            <WmLiveForm {...({
              name: "createModeForm",
              title: "Add New Product",
              subheading: "Create a new product entry",
              iconclass: "fa fa-archive",
              datasource: createMockDataSource(),
              defaultmode: "create",
              formlayout: "inline",
              insertmessage: "Product added successfully!",
              errormessage: "Failed to save product. Please try again.",
              messagelayout: "Toaster",
              listener: mockListener,
              formSubmit: (data: any, operation: string, success: any) => {
                console.log("Form submit:", operation, data);
                setTimeout(() => {
                  success({ success: true, operationType: operation });
                }, 500);
              },
            } as any)}>
              <Box sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  <WmComposite captionposition="top" required={true} listener={mockListener} name="createProductName_composite">
                    <WmLabel caption="Product Name" required={true} listener={mockListener} name="createProductName_label" className="control-label"/>
                    <WmText
                      name="productName"
                      placeholder="Enter product name"
                      datavalue=""
                      listener={mockListener}
                      required={true}
                    />
                  </WmComposite>

                  <WmComposite captionposition="top" required={true} listener={mockListener} name="createSku_composite">
                    <WmLabel caption="SKU" required={true} listener={mockListener} name="createSku_label" className="control-label"/>
                    <WmText
                      name="sku"
                      placeholder="Enter SKU"
                      datavalue=""
                      listener={mockListener}
                      required={true}
                    />
                  </WmComposite>

                  <WmComposite captionposition="top" listener={mockListener} name="createDescription_composite">
                    <WmLabel caption="Description" listener={mockListener} name="createDescription_label" className="control-label"/>
                    <WmTextarea
                      name="description"
                      placeholder="Enter product description"
                      datavalue=""
                      listener={mockListener}
                      rows={4}
                    />
                  </WmComposite>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="createPrice_composite">
                        <WmLabel caption="Price ($)" listener={mockListener} name="createPrice_label" className="control-label"/>
                        <WmNumber
                          name="price"
                          datavalue={null}
                          listener={mockListener}
                          minvalue={0}
                        />
                      </WmComposite>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmComposite captionposition="top" listener={mockListener} name="createStock_composite">
                        <WmLabel caption="Stock Quantity" listener={mockListener} name="createStock_label" className="control-label"/>
                        <WmNumber
                          name="stock"
                          datavalue={null}
                          listener={mockListener}
                          minvalue={0}
                        />
                      </WmComposite>
                    </Box>
                  </Stack>

                  <WmComposite captionposition="top" listener={mockListener} name="createCategory_composite">
                    <WmLabel caption="Category" listener={mockListener} name="createCategory_label" className="control-label"/>
                    <WmSelect
                      name="category"
                      datavalue=""
                      dataset={["Electronics", "Clothing", "Food", "Books", "Toys"]}
                      listener={mockListener}
                    />
                  </WmComposite>

                  <WmSwitch
                    name="active"
                    caption="Active"
                    datavalue={true}
                    listener={mockListener}
                  />

                  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button variant="outlined" type="reset">
                      Clear
                    </Button>
                    <Button variant="contained" type="submit">
                      Create Product
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </WmLiveForm>
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
    const handleFormSubmit = (data: any, operation: string, success: any) => {
      console.log('Form submitted:', operation, data);
      setTimeout(() => {
        success({ success: true, operationType: operation });
      }, 500);
    };

    return (
      <Box sx={{ p: 3, width: "100%" }}>
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
            <WmLiveForm {...({
              name: "standardLiveForm",
              title: args.title,
              subheading: args.subheading,
              iconclass: args.iconclass,
              captionposition: args.captionposition,
              captionalign: args.captionalign,
              datasource: createMockDataSource(),
              defaultmode: args.defaultmode,
              formlayout: args.formlayout,
              messagelayout: args.messagelayout,
              insertmessage: args.insertmessage,
              updatemessage: args.updatemessage,
              deletemessage: args.deletemessage,
              errormessage: args.errormessage,
              listener: mockListener,
              formSubmit: handleFormSubmit,
            } as any)}>
              <Box sx={{ padding: 3 }}>
                <Stack spacing={3}>
                  {/* Text Input */}
                  <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdFullName_composite">
                    <WmLabel caption="Full Name" required={true} listener={mockListener} name="stdFullName_label" className="control-label"/>
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
                  <WmComposite captionposition={args.captionposition} required={true} listener={mockListener} name="stdStartDate_composite">
                    <WmLabel caption="Start Date" required={true} listener={mockListener} name="stdStartDate_label" className="control-label"/>
                    <WmDate
                      name="startDate"
                      datavalue=""
                      listener={mockListener}
                      required={true}
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
                      datavalue=""
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
            </WmLiveForm>
          </div>
        </Stack>
      </Box>
    );
  },
  args: {
    title: "Job Application",
    subheading: "Complete the form to apply for a position",
    iconclass: "fa fa-briefcase",
    captionposition: "top",
    captionalign: "left",
    defaultmode: "create",
    formlayout: "inline",
    messagelayout: "Toaster",
    insertmessage: "Application submitted successfully",
    updatemessage: "Application updated successfully",
    deletemessage: "Application deleted successfully",
    errormessage: "An error occurred",
  } as any,
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    captionposition:{ control:{ type:"select"}, options: ["left", "top", "floating"]},
    captionalign:{ control:{ type:"select"}, options: ["left", "center", "right"]},
    defaultmode: {
      control: "select",
      options: ["view", "edit", "create"]
    },
    formlayout: {
      control: "select",
      options: ["inline", "dialog"]
    },
    messagelayout: {
      control: "select",
      options: ["Toaster", "Inline"]
    },
    insertmessage: { control: "text" },
    updatemessage: { control: "text" },
    deletemessage: { control: "text" },
    errormessage: { control: "text" },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: formTokensData,
      componentKey: "form",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};

// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     // Sample form data for demonstration
//     const sampleFormData = {
//       id: 1,
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       role: "User",
//     };

//     return (
//       <Box sx={{ p: 3, width: "100%", mx: 'auto' }}>
//         <WmLiveForm {...({
//           name: "basicLiveForm",
//           title: args.title,
//           subheading: args.subheading,
//           iconclass: args.iconclass,
//           datasource: createMockDataSource(),
//           defaultmode: args.defaultmode,
//           formlayout: args.formlayout,
//           messagelayout: args.messagelayout,
//           insertmessage: args.insertmessage,
//           updatemessage: args.updatemessage,
//           deletemessage: args.deletemessage,
//           errormessage: args.errormessage,
//           formdata: args.defaultmode === "create" ? {} : sampleFormData,
//           listener: mockListener,
//           formSubmit: (data: any, operation: string, success: any) => {
//             console.log("Form submit:", operation, data);
//             setTimeout(() => {
//               success({ success: true, operationType: operation });
//             }, 500);
//           },
//         } as any)}>
//           <Box sx={{ padding: 3 }}>
//             <Stack spacing={3}>
//               <WmComposite captionposition="top" required={true} listener={mockListener} name="basicFirstName_composite">
//                 <WmLabel caption="First Name" required={true} listener={mockListener} name="basicFirstName_label" className="control-label"/>
//                 <WmText
//                   name="firstName"
//                   placeholder="Enter first name"
//                   datavalue={args.defaultmode === "create" ? "" : "John"}
//                   listener={mockListener}
//                   required={true}
//                   readonly={args.defaultmode === "view"}
//                 />
//               </WmComposite>
//               <WmComposite captionposition="top" required={true} listener={mockListener} name="basicLastName_composite">
//                 <WmLabel caption="Last Name" required={true} listener={mockListener} name="basicLastName_label" className="control-label"/>
//                 <WmText
//                   name="lastName"
//                   placeholder="Enter last name"
//                   datavalue={args.defaultmode === "create" ? "" : "Doe"}
//                   listener={mockListener}
//                   required={true}
//                   readonly={args.defaultmode === "view"}
//                 />
//               </WmComposite>
//               <WmComposite captionposition="top" required={true} listener={mockListener} name="basicEmail_composite">
//                 <WmLabel caption="Email Address" required={true} listener={mockListener} name="basicEmail_label" className="control-label"/>
//                 <WmText
//                   name="email"
//                   type="email"
//                   placeholder="Enter email"
//                   datavalue={args.defaultmode === "create" ? "" : "john.doe@example.com"}
//                   listener={mockListener}
//                   required={true}
//                   readonly={args.defaultmode === "view"}
//                 />
//               </WmComposite>
//               <WmComposite captionposition="top" listener={mockListener} name="basicRole_composite">
//                 <WmLabel caption="Role" listener={mockListener} name="basicRole_label" className="control-label"/>
//                 <WmSelect
//                   name="role"
//                   datavalue={args.defaultmode === "create" ? "" : "User"}
//                   dataset={["Admin", "User", "Manager", "Guest"]}
//                   listener={mockListener}
//                   readonly={args.defaultmode === "view"}
//                 />
//               </WmComposite>
//               {args.defaultmode !== "view" && (
//                 <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                   <Button variant="outlined" type="reset">
//                     Reset
//                   </Button>
//                   <Button variant="contained" type="submit">
//                     {args.defaultmode === "create" ? "Create" : args.defaultmode === "edit" ? "Update" : "Save"}
//                   </Button>
//                 </Box>
//               )}
//             </Stack>
//           </Box>
//         </WmLiveForm>
//       </Box>
//     );
//   },
//   args: {
//     title: "User Management",
//     subheading: "Create or edit user records",
//     iconclass: "fa fa-user",
//     defaultmode: "edit",
//     formlayout: "inline",
//     messagelayout: "Toaster",
//     insertmessage: "Record inserted successfully",
//     updatemessage: "Record updated successfully",
//     deletemessage: "Record deleted successfully",
//     errormessage: "An error occurred",
//   } as any,
//   argTypes: {
//     title: { control: "text" },
//     subheading: { control: "text" },
//     iconclass:{ control:{ type:"select"}, options: iconClassNames },
//     defaultmode: {
//       control: "select",
//       options: ["view", "edit", "create"]
//     },
//     formlayout: {
//       control: "select",
//       options: ["inline", "dialog"]
//     },
//     messagelayout: {
//       control: "select",
//       options: ["Toaster", "Inline"]
//     },
//     insertmessage: { control: "text" },
//     updatemessage: { control: "text" },
//     deletemessage: { control: "text" },
//     errormessage: { control: "text" },
//   },
// };