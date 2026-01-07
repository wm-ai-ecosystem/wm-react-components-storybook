import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import WmLiveForm from "../../../../components/data/live-form";
import WmText from "../../../../components/input/text";
import WmNumber from "../../../../components/input/number";
import WmTextarea from "../../../../components/input/textarea";
import WmSelect from "../../../../components/input/select";
import WmSwitch from "../../../../components/input/default/switch";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

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
                  <WmText
                    name="employeeId"
                    datavalue="EMP-12345"
                    listener={mockListener}
                    caption="Employee ID"
                    readonly={true}
                  />
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmText
                        name="firstName"
                        datavalue="John"
                        listener={mockListener}
                        caption="First Name"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmText
                        name="lastName"
                        datavalue="Doe"
                        listener={mockListener}
                        caption="Last Name"
                      />
                    </Box>
                  </Stack>
                  <WmText
                    name="email"
                    type="email"
                    datavalue="john.doe@company.com"
                    listener={mockListener}
                    caption="Email"
                  />
                  <WmSelect
                    name="department"
                    datavalue="Engineering"
                    dataset={["Engineering", "Marketing", "Sales", "HR", "Finance"]}
                    listener={mockListener}
                    caption="Department"
                  />
                  <WmNumber
                    name="salary"
                    datavalue={85000}
                    listener={mockListener}
                    caption="Salary"
                  />
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
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmText
                        name="firstName"
                        placeholder="Enter first name"
                        datavalue="Jane"
                        listener={mockListener}
                        caption="First Name"
                        required={true}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmText
                        name="lastName"
                        placeholder="Enter last name"
                        datavalue="Smith"
                        listener={mockListener}
                        caption="Last Name"
                        required={true}
                      />
                    </Box>
                  </Stack>

                  <WmText
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    datavalue="jane.smith@example.com"
                    listener={mockListener}
                    caption="Email Address"
                    required={true}
                  />

                  <WmSelect
                    name="role"
                    datavalue="Manager"
                    dataset={["Admin", "User", "Manager", "Guest"]}
                    listener={mockListener}
                    caption="Role"
                  />

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
                  <WmText
                    name="productName"
                    placeholder="Enter product name"
                    datavalue=""
                    listener={mockListener}
                    caption="Product Name"
                    required={true}
                  />

                  <WmText
                    name="sku"
                    placeholder="Enter SKU"
                    datavalue=""
                    listener={mockListener}
                    caption="SKU"
                    required={true}
                  />

                  <WmTextarea
                    name="description"
                    placeholder="Enter product description"
                    datavalue=""
                    listener={mockListener}
                    caption="Description"
                    rows={4}
                  />

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <WmNumber
                        name="price"
                        datavalue={null}
                        listener={mockListener}
                        caption="Price ($)"
                        minvalue={0}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <WmNumber
                        name="stock"
                        datavalue={null}
                        listener={mockListener}
                        caption="Stock Quantity"
                        minvalue={0}
                      />
                    </Box>
                  </Stack>

                  <WmSelect
                    name="category"
                    datavalue=""
                    dataset={["Electronics", "Clothing", "Food", "Books", "Toys"]}
                    listener={mockListener}
                    caption="Category"
                  />

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

export const Basic: Story = {
  tags: ['show-panel'],
  render: (args) => {
    // Sample form data for demonstration
    const sampleFormData = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "User",
    };

    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <WmLiveForm {...({
          name: "basicLiveForm",
          title: args.title,
          subheading: args.subheading,
          iconclass: args.iconclass,
          datasource: createMockDataSource(),
          defaultmode: args.defaultmode,
          formlayout: args.formlayout,
          messagelayout: args.messagelayout,
          insertmessage: args.insertmessage,
          updatemessage: args.updatemessage,
          deletemessage: args.deletemessage,
          errormessage: args.errormessage,
          formdata: args.defaultmode === "create" ? {} : sampleFormData,
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
              <WmText
                name="firstName"
                placeholder="Enter first name"
                datavalue={args.defaultmode === "create" ? "" : "John"}
                listener={mockListener}
                caption="First Name"
                required={true}
                readonly={args.defaultmode === "view"}
              />
              <WmText
                name="lastName"
                placeholder="Enter last name"
                datavalue={args.defaultmode === "create" ? "" : "Doe"}
                listener={mockListener}
                caption="Last Name"
                required={true}
                readonly={args.defaultmode === "view"}
              />
              <WmText
                name="email"
                type="email"
                placeholder="Enter email"
                datavalue={args.defaultmode === "create" ? "" : "john.doe@example.com"}
                listener={mockListener}
                caption="Email Address"
                required={true}
                readonly={args.defaultmode === "view"}
              />
              <WmSelect
                name="role"
                datavalue={args.defaultmode === "create" ? "" : "User"}
                dataset={["Admin", "User", "Manager", "Guest"]}
                listener={mockListener}
                caption="Role"
                readonly={args.defaultmode === "view"}
              />
              {args.defaultmode !== "view" && (
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                  <Button variant="outlined" type="reset">
                    Reset
                  </Button>
                  <Button variant="contained" type="submit">
                    {args.defaultmode === "create" ? "Create" : args.defaultmode === "edit" ? "Update" : "Save"}
                  </Button>
                </Box>
              )}
            </Stack>
          </Box>
        </WmLiveForm>
      </Box>
    );
  },
  args: {
    title: "User Management",
    subheading: "Create or edit user records",
    iconclass: "fa fa-user",
    defaultmode: "edit",
    formlayout: "inline",
    messagelayout: "Toaster",
    insertmessage: "Record inserted successfully",
    updatemessage: "Record updated successfully",
    deletemessage: "Record deleted successfully",
    errormessage: "An error occurred",
  } as any,
};

// export const ViewMode: Story = {
//   args: {
//     name: "viewModeLiveForm",
//     title: "Employee Details",
//     subheading: "View employee information",
//     iconclass: "wi wi-id-card",
//     datasource: createMockDataSource(),
//     defaultmode: "View",
//     listener: mockListener,
//     formdata: {
//       employeeId: "EMP-12345",
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@company.com",
//       department: "Engineering",
//       position: "Senior Developer",
//       joinDate: "2020-01-15",
//       salary: 85000,
//     },
//     formSubmit: (data: any, operation: string, success: any, error: any) => {
//       console.log("Form submit:", operation, data);
//       setTimeout(() => {
//         success({ success: true, operationType: operation });
//       }, 500);
//     },
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <WmText
//             name="employeeId"
//             datavalue="EMP-12345"
//             listener={mockListener}
//             caption="Employee ID"
//             readonly={true}
//           />
//           <Stack direction="row" spacing={2}>
//             <WmText
//               name="firstName"
//               datavalue="John"
//               listener={mockListener}
//               caption="First Name"
//             />
//             <WmText
//               name="lastName"
//               datavalue="Doe"
//               listener={mockListener}
//               caption="Last Name"
//             />
//           </Stack>
//           <WmText
//             name="email"
//             type="email"
//             datavalue="john.doe@company.com"
//             listener={mockListener}
//             caption="Email"
//           />
//           <WmSelect
//             name="department"
//             datavalue="Engineering"
//             dataset={["Engineering", "Marketing", "Sales", "HR", "Finance"]}
//             listener={mockListener}
//             caption="Department"
//           />
//           <WmText
//             name="position"
//             datavalue="Senior Developer"
//             listener={mockListener}
//             caption="Position"
//           />
//           <Stack direction="row" spacing={2}>
//             <WmDate
//               name="joinDate"
//               datavalue="2020-01-15"
//               listener={mockListener}
//               caption="Join Date"
//             />
//             <WmNumber
//               name="salary"
//               datavalue={85000}
//               listener={mockListener}
//               caption="Salary"
//             />
//           </Stack>
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="outlined">Cancel</Button>
//             <Button variant="contained" type="submit">
//               Update
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const WithCustomMessages: Story = {
//   args: {
//     name: "customMessagesLiveForm",
//     title: "Product Management",
//     subheading: "Add or update products",
//     iconclass: "wi wi-shopping-cart",
//     datasource: createMockDataSource(),
//     defaultmode: "Edit",
//     insertmessage: "Product added successfully! 🎉",
//     updatemessage: "Product updated successfully! ✅",
//     deletemessage: "Product deleted successfully! 🗑️",
//     errormessage: "Failed to save product. Please try again.",
//     messagelayout: "Toaster",
//     listener: mockListener,
//     formSubmit: (data: any, operation: string, success: any, error: any) => {
//       console.log("Form submit:", operation, data);
//       setTimeout(() => {
//         success({ success: true, operationType: operation });
//       }, 500);
//     },
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <WmText
//             name="productName"
//             placeholder="Enter product name"
//             datavalue=""
//             listener={mockListener}
//             caption="Product Name"
//             required={true}
//           />
//           <WmText
//             name="sku"
//             placeholder="Enter SKU"
//             datavalue=""
//             listener={mockListener}
//             caption="SKU"
//             required={true}
//           />
//           <WmTextarea
//             name="description"
//             placeholder="Enter product description"
//             datavalue=""
//             listener={mockListener}
//             caption="Description"
//             rows={4}
//           />
//           <Stack direction="row" spacing={2}>
//             <WmNumber
//               name="price"
//               datavalue=""
//               listener={mockListener}
//               caption="Price ($)"
//               minvalue={0}
//             />
//             <WmNumber
//               name="stock"
//               datavalue=""
//               listener={mockListener}
//               caption="Stock Quantity"
//               minvalue={0}
//             />
//           </Stack>
//           <WmSelect
//             name="category"
//             datavalue=""
//             dataset={["Electronics", "Clothing", "Food", "Books", "Toys"]}
//             listener={mockListener}
//             caption="Category"
//           />
//           <WmSwitch
//             name="active"
//             caption="Active"
//             datavalue={true}
//             listener={mockListener}
//           />
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="outlined" type="reset">
//               Clear
//             </Button>
//             <Button variant="contained" type="submit">
//               Save Product
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const InlineMessages: Story = {
//   args: {
//     name: "inlineMessagesLiveForm",
//     title: "Task Form",
//     subheading: "Create or update tasks",
//     iconclass: "wi wi-check-square",
//     datasource: createMockDataSource(),
//     defaultmode: "Edit",
//     messagelayout: "Inline",
//     insertmessage: "Task created successfully",
//     updatemessage: "Task updated successfully",
//     errormessage: "Error saving task",
//     listener: mockListener,
//     formSubmit: (data: any, operation: string, success: any, error: any) => {
//       console.log("Form submit:", operation, data);
//       setTimeout(() => {
//         success({ success: true, operationType: operation });
//       }, 500);
//     },
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <WmText
//             name="taskTitle"
//             placeholder="Enter task title"
//             datavalue=""
//             listener={mockListener}
//             caption="Task Title"
//             required={true}
//           />
//           <WmTextarea
//             name="taskDescription"
//             placeholder="Enter task description"
//             datavalue=""
//             listener={mockListener}
//             caption="Description"
//             rows={3}
//           />
//           <Stack direction="row" spacing={2}>
//             <WmSelect
//               name="priority"
//               datavalue="Medium"
//               dataset={["Low", "Medium", "High", "Critical"]}
//               listener={mockListener}
//               caption="Priority"
//             />
//             <WmSelect
//               name="status"
//               datavalue="Not Started"
//               dataset={["Not Started", "In Progress", "Completed", "Blocked"]}
//               listener={mockListener}
//               caption="Status"
//             />
//           </Stack>
//           <WmDate
//             name="dueDate"
//             datavalue=""
//             listener={mockListener}
//             caption="Due Date"
//           />
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//             <Button variant="contained" type="submit">
//               Save Task
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const InteractiveLiveForm: Story = {
//   render: () => {
//     const [formData, setFormData] = useState<any>({
//       id: null,
//       name: "",
//       email: "",
//       age: "",
//     });
//     const [operationLog, setOperationLog] = useState<string[]>([]);
//     const [mode, setMode] = useState<"Edit" | "View">("Edit");

//     const handleFormSubmit = (data: any, operation: string, success: any, error: any) => {
//       const timestamp = new Date().toLocaleTimeString();

//       // Determine operation type based on whether we have an id
//       const actualOperation = formData.id ? "update" : "insert";

//       setOperationLog((prev) => [
//         ...prev.slice(-4),
//         `[${timestamp}] ${actualOperation.toUpperCase()} operation: ${JSON.stringify(data)}`,
//       ]);

//       // Simulate successful save
//       setTimeout(() => {
//         if (!formData.id) {
//           // For insert, generate an ID
//           setFormData((prev: any) => ({ ...prev, id: Date.now() }));
//         }
//         success({ success: true, operationType: actualOperation });
//       }, 500);
//     };

//     const handleDelete = () => {
//       const timestamp = new Date().toLocaleTimeString();
//       setOperationLog((prev) => [
//         ...prev.slice(-4),
//         `[${timestamp}] DELETE operation: Record deleted`,
//       ]);
//       setFormData({ id: null, name: "", email: "", age: "" });
//     };

//     const handleNew = () => {
//       setFormData({ id: null, name: "", email: "", age: "" });
//       setMode("Edit");
//     };

//     const datasource = createMockDataSource();

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={3}>
//           <WmLiveForm
//             name="interactiveLiveForm"
//             title="Interactive Live Form"
//             subheading="Test CRUD operations"
//             iconclass="wi wi-database"
//             datasource={datasource}
//             defaultmode={mode}
//             formdata={formData}
//             listener={mockListener}
//             formSubmit={handleFormSubmit}
//           >
//             <Box sx={{ padding: 3 }}>
//               <Stack spacing={3}>
//                 {formData.id && (
//                   <Typography variant="body2" color="text.secondary">
//                     Record ID: {formData.id}
//                   </Typography>
//                 )}

//                 <WmText
//                   name="name"
//                   placeholder="Enter name"
//                   datavalue={formData.name}
//                   listener={mockListener}
//                   caption="Name"
//                   required={true}
//                   onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
//                 />

//                 <WmText
//                   name="email"
//                   type="email"
//                   placeholder="Enter email"
//                   datavalue={formData.email}
//                   listener={mockListener}
//                   caption="Email"
//                   required={true}
//                   onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
//                 />

//                 <WmNumber
//                   name="age"
//                   datavalue={formData.age}
//                   listener={mockListener}
//                   caption="Age"
//                   minvalue={1}
//                   maxvalue={120}
//                   onChange={(e) => setFormData((prev: any) => ({ ...prev, age: e.target.value }))}
//                 />

//                 <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                   <Button variant="outlined" onClick={handleNew}>
//                     New
//                   </Button>
//                   {formData.id && (
//                     <Button variant="outlined" color="error" onClick={handleDelete}>
//                       Delete
//                     </Button>
//                   )}
//                   <Button variant="contained" type="submit">
//                     {formData.id ? "Update" : "Insert"}
//                   </Button>
//                 </Box>
//               </Stack>
//             </Box>
//           </WmLiveForm>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Current Data:
//             </Typography>
//             <pre style={{ fontSize: "12px", overflow: "auto" }}>
//               {JSON.stringify(formData, null, 2)}
//             </pre>
//           </Box>

//           {operationLog.length > 0 && (
//             <Box sx={{ padding: 2, backgroundColor: "#e8f5e9", borderRadius: 1 }}>
//               <Typography variant="subtitle2" gutterBottom>
//                 Operation Log:
//               </Typography>
//               <Stack spacing={0.5}>
//                 {operationLog.map((log, index) => (
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

// export const OrderForm: Story = {
//   args: {
//     name: "orderLiveForm",
//     title: "Order Management",
//     subheading: "Create or update orders",
//     iconclass: "wi wi-file-text",
//     datasource: createMockDataSource(),
//     defaultmode: "Edit",
//     insertmessage: "Order created successfully",
//     updatemessage: "Order updated successfully",
//     listener: mockListener,
//     formSubmit: (data: any, operation: string, success: any, error: any) => {
//       console.log("Form submit:", operation, data);
//       setTimeout(() => {
//         success({ success: true, operationType: operation });
//       }, 500);
//     },
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6" gutterBottom>
//             Customer Information
//           </Typography>
//           <Stack direction="row" spacing={2}>
//             <WmText
//               name="customerName"
//               placeholder="Customer name"
//               datavalue=""
//               listener={mockListener}
//               caption="Customer Name"
//               required={true}
//             />
//             <WmText
//               name="customerEmail"
//               type="email"
//               placeholder="Customer email"
//               datavalue=""
//               listener={mockListener}
//               caption="Email"
//               required={true}
//             />
//           </Stack>

//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Order Details
//           </Typography>
//           <WmSelect
//             name="productCategory"
//             datavalue=""
//             dataset={["Electronics", "Clothing", "Food", "Books"]}
//             listener={mockListener}
//             caption="Product Category"
//           />
//           <WmText
//             name="productName"
//             placeholder="Enter product name"
//             datavalue=""
//             listener={mockListener}
//             caption="Product"
//             required={true}
//           />
//           <Stack direction="row" spacing={2}>
//             <WmNumber
//               name="quantity"
//               datavalue={1}
//               listener={mockListener}
//               caption="Quantity"
//               minvalue={1}
//             />
//             <WmNumber
//               name="unitPrice"
//               datavalue=""
//               listener={mockListener}
//               caption="Unit Price ($)"
//               minvalue={0}
//             />
//           </Stack>

//           <WmSelect
//             name="shippingMethod"
//             datavalue="Standard"
//             dataset={["Standard", "Express", "Overnight"]}
//             listener={mockListener}
//             caption="Shipping Method"
//           />

//           <WmTextarea
//             name="specialInstructions"
//             placeholder="Any special instructions?"
//             datavalue=""
//             listener={mockListener}
//             caption="Special Instructions"
//             rows={3}
//           />

//           <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
//             <Button variant="outlined" type="reset">
//               Clear
//             </Button>
//             <Button variant="contained" type="submit">
//               Submit Order
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CompactLiveForm: Story = {
//   args: {
//     name: "compactLiveForm",
//     title: "Quick Entry",
//     iconclass: "wi wi-flash",
//     datasource: createMockDataSource(),
//     defaultmode: "Edit",
//     listener: mockListener,
//     formSubmit: (data: any, operation: string, success: any, error: any) => {
//       console.log("Form submit:", operation, data);
//       setTimeout(() => {
//         success({ success: true, operationType: operation });
//       }, 500);
//     },
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Stack direction="row" spacing={2} alignItems="flex-end">
//           <WmText
//             name="title"
//             placeholder="Title"
//             datavalue=""
//             listener={mockListener}
//             caption="Title"
//           />
//           <WmSelect
//             name="type"
//             datavalue="task"
//             dataset={["task", "bug", "feature"]}
//             listener={mockListener}
//             caption="Type"
//           />
//           <Button variant="contained" type="submit" sx={{ height: "40px" }}>
//             Add
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };
