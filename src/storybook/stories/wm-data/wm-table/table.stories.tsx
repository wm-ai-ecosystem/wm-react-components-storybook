import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Divider } from "@mui/material";

import WmTable from "../../../../components/data/table";
import WmTableColumn from "../../../../components/data/table/table-column";
import WmTableAction from "../../../../components/data/table/table-action";
import WmTableRowAction from "../../../../components/data/table/table-row-action";
import WmTableGroup from "../../../../components/data/table/table-group";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

// Import design tokens
import dataTableTokensData from "../../../../designTokens/components/data-table/data-table.json";

const mockListener = {
  appLocale: {},
  Widgets: {} as Record<string, any>,
  onChange: (widgetName: string, widgetApis: any) => {
    mockListener.Widgets[widgetName] = widgetApis;
  },
};

// Sample datasets
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", age: 32, department: "Engineering" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", age: 28, department: "Marketing" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", age: 45, department: "Sales" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", age: 26, department: "Engineering" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Developer", age: 30, department: "Engineering" },
  { id: 6, name: "Diana Prince", email: "diana@example.com", role: "Admin", age: 38, department: "HR" },
  { id: 7, name: "Ethan Hunt", email: "ethan@example.com", role: "User", age: 34, department: "Operations" },
  { id: 8, name: "Fiona Gallagher", email: "fiona@example.com", role: "Manager", age: 41, department: "Marketing" },
];

const productsData = [
  { id: 1, name: "Laptop Pro", price: 1299, category: "Electronics", inStock: true, quantity: 45 },
  { id: 2, name: "Wireless Mouse", price: 29, category: "Accessories", inStock: true, quantity: 120 },
  { id: 3, name: "Keyboard", price: 79, category: "Accessories", inStock: false, quantity: 0 },
  { id: 4, name: "Monitor 27\"", price: 399, category: "Electronics", inStock: true, quantity: 32 },
  { id: 5, name: "USB-C Hub", price: 49, category: "Accessories", inStock: true, quantity: 88 },
  { id: 6, name: "Webcam HD", price: 89, category: "Electronics", inStock: true, quantity: 54 },
];

const meta: Meta<typeof WmTable> = {
  title: "Data/Data Table",
  component: WmTable,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      style={style}
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=58910-1427&p=f",
        label: "",
      }}
    />
  ),
  args: {
    name: "docsTable",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 4, width: "100%" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Data Table Examples
      </Typography>

      <Stack spacing={4} sx={{ mt: 4, width: "100%" }}>
        {/* 1. Default Table with Search */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            1. Default Table with Search & Sort
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Standard table with search, pagination and sorting
          </Typography>
          <WmTable
            name="defaultShowcaseTable"
            title="Users"
            subheading="All registered users"
            dataset={usersData}
            navigation="Basic"
            navigationalign="right"
            pagesize={5}
            showrecordcount={true}
            shownavigation={true}
            allowpagesizechange={false}
            pagesizeoptions="5,10,15"
            enablesort={true}
            filtermode="search"
            searchlabel="Search users..."
            filteronkeypress={true}
            listener={mockListener}
          >
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Name"
              widgetType="label"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="email"
              field="email"
              caption="Email"
              widgetType="label"
              listener={mockListener}
              index={1}
              headerindex="1"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="role"
              field="role"
              caption="Role"
              widgetType="label"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column4"
              binding="department"
              field="department"
              caption="Department"
              widgetType="label"
              listener={mockListener}
              index={3}
              headerindex="3"
            />
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* 2. Condensed Table with Multi-Select */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            2. Condensed Table
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Compact spacing
          </Typography>
          <WmTable
            name="condensedShowcaseTable"
            title="Products"
            subheading="Product inventory"
            dataset={productsData.slice(0, 5)}
            navigation="Classic"
            navigationalign="right"
            pagesize={4}
            showrecordcount={false}
            shownavigation={false}
            allowpagesizechange={false}
            pagesizeoptions="5,10,15"
            spacing="condensed"
            className="table-condensed"
            multiselect={false}
            enablesort={true}
            listener={mockListener}
          >
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Product Name"
              widgetType="label"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="price"
              field="price"
              caption="Price"
              widgetType="label"
              listener={mockListener}
              index={1}
              headerindex="1"
              type="number"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="category"
              field="category"
              caption="Category"
              widgetType="label"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column4"
              binding="quantity"
              field="quantity"
              caption="Stock"
              widgetType="label"
              listener={mockListener}
              index={3}
              headerindex="3"
              type="number"
            />
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* 3. Striped Even Table with Radio Selection */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            3. Striped Table with Radio Selection
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Alternating row colors with single row selection (radio)
          </Typography>
          <WmTable
            name="stripedEvenShowcaseTable"
            title="Users"
            subheading="Select one user"
            dataset={usersData.slice(0, 6)}
            navigation="Pager"
            navigationalign="right"
            pagesize={4}
            showrecordcount={true}
            shownavigation={true}
            allowpagesizechange={false}
            pagesizeoptions="5,10,15"
            className="striped-even"
            radioselect={true}
            enablesort={true}
            listener={mockListener}
          >
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Name"
              widgetType="label"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="email"
              field="email"
              caption="Email"
              widgetType="label"
              listener={mockListener}
              index={1}
              headerindex="1"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="role"
              field="role"
              caption="Role"
              widgetType="label"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column4"
              binding="department"
              field="department"
              caption="Department"
              widgetType="label"
              listener={mockListener}
              index={3}
              headerindex="3"
            />
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* 4. Striped Odd Table with Multi-Select */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            4. Striped Table with Multi-Select
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Alternating odd row colors with checkbox selection
          </Typography>
          <WmTable
            name="stripedOddShowcaseTable"
            title="Products"
            subheading="Product catalog"
            dataset={productsData}
            navigation="Advanced"
            navigationalign="right"
            pagesize={4}
            maxsize={5}
            boundarylinks={true}
            showrecordcount={true}
            shownavigation={true}
            allowpagesizechange={false}
            pagesizeoptions="5,10,15"
            className="striped-odd"
            multiselect={true}
            editmode="inline"
            enablesort={true}
            listener={mockListener}
          >
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Product Name"
              widgetType="label"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="price"
              field="price"
              caption="Price"
              widgetType="label"
              listener={mockListener}
              index={1}
              headerindex="1"
              type="number"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="category"
              field="category"
              caption="Category"
              widgetType="label"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column4"
              binding="quantity"
              field="quantity"
              caption="Stock"
              widgetType="label"
              listener={mockListener}
              index={3}
              headerindex="3"
              type="number"
            />
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* 5. Multicolumn Filter Table */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            5. Multicolumn Filter Table
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Table with column-specific filtering
          </Typography>
          <WmTable
            name="multicolumnFilterShowcaseTable"
            title="Employee Records"
            subheading="Filter by any column"
            dataset={usersData}
            navigation="Basic"
            navigationalign="right"
            pagesize={5}
            showrecordcount={true}
            shownavigation={true}
            allowpagesizechange={false}
            pagesizeoptions="5,10,15"
            enablesort={true}
            filtermode="multicolumn"
            listener={mockListener}
          >
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Name"
              widgetType="label"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="email"
              field="email"
              caption="Email"
              widgetType="label"
              listener={mockListener}
              index={1}
              headerindex="1"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="role"
              field="role"
              caption="Role"
              widgetType="label"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column4"
              binding="department"
              field="department"
              caption="Department"
              widgetType="label"
              listener={mockListener}
              index={3}
              headerindex="3"
            />
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* NOTE: Quick Edit with Add New Row commented out due to addNewRow action not functioning properly
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Quick Edit with Add New Row
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Inline editing with Add New button to insert rows
          </Typography>
          <WmTable
            name="quickEditShowcaseTable"
            title="Employee Records"
            subheading="Click 'New' to add employee"
            dataset={usersData.slice(0, 5)}
            navigation="None"
            editmode="inline"
            enablesort={true}
            listener={mockListener}
          >
            <WmTableAction
              name="addNewRowAction"
              key="addNewRow"
              displayName="New"
              iconclass="wi wi-plus"
              position="header"
              variant="contained"
              color="primary"
              listener={mockListener}
              onClick={() => console.log("Add new row clicked")}
            />
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Name"
              widgetType="label"
              editWidgetType="WmText"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="email"
              field="email"
              caption="Email"
              widgetType="label"
              editWidgetType="WmText"
              listener={mockListener}
              index={1}
              headerindex="1"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="role"
              field="role"
              caption="Role"
              widgetType="label"
              editWidgetType="WmText"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column4"
              binding="department"
              field="department"
              caption="Department"
              widgetType="label"
              editWidgetType="WmText"
              listener={mockListener}
              index={3}
              headerindex="3"
            />
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>
        */}

        {/* NOTE: Variants 6 & 7 commented out due to technical limitations
            - Row actions require complex datasource configuration
            - Column groups need additional parser support
            These features work in Individual stories but not in Showcase format
        */}

        {/* 6. Table with Actions & Multi-Select - COMMENTED OUT
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            5. Table with Actions & Multi-Select
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Header actions, row actions, multi-select and search
          </Typography>
          <WmTable
            name="actionsShowcaseTable"
            title="Users Management"
            subheading="Manage user accounts"
            iconclass="wi wi-settings"
            dataset={usersData}
            navigation="Pager"
            pagesize={5}
            showrecordcount={true}
            enablesort={true}
            multiselect={true}
            filtermode="search"
            searchlabel="Search users..."
            filteronkeypress={true}
            listener={mockListener}
          >
            <WmTableAction
              name="addAction"
              displayName="Add User"
              iconclass="wi wi-plus"
              position="header"
              variant="contained"
              color="primary"
              listener={mockListener}
              onClick={() => console.log("Add user")}
            />
            <WmTableAction
              name="exportAction"
              displayName="Export"
              iconclass="wi wi-download"
              position="header"
              variant="outlined"
              listener={mockListener}
              onClick={() => console.log("Export data")}
            />
            <WmTableColumn
              name="wm_table_column1"
              binding="name"
              field="name"
              caption="Name"
              widgetType="label"
              listener={mockListener}
              index={0}
              headerindex="0"
            />
            <WmTableColumn
              name="wm_table_column2"
              binding="email"
              field="email"
              caption="Email"
              widgetType="label"
              listener={mockListener}
              index={1}
              headerindex="1"
            />
            <WmTableColumn
              name="wm_table_column3"
              binding="role"
              field="role"
              caption="Role"
              widgetType="label"
              listener={mockListener}
              index={2}
              headerindex="2"
            />
            <WmTableColumn
              name="wm_table_column_actions"
              binding="rowOperations"
              field="rowOperations"
              caption="Actions"
              widgetType="label"
              listener={mockListener}
              index={3}
              headerindex="3"
            >
              <WmTableRowAction
                key="editAction"
                name="editAction"
                title="Edit"
                displayName="Edit"
                iconclass="wi wi-edit"
                action="edit"
                widgettype="button"
                show={true}
                listener={mockListener}
                onClick={(_e, _widget, row) => console.log("Edit:", row)}
              />
              <WmTableRowAction
                key="deleteAction"
                name="deleteAction"
                title="Delete"
                displayName="Delete"
                iconclass="wi wi-delete"
                action="delete"
                widgettype="button"
                show={true}
                listener={mockListener}
                onClick={(_e, _widget, row) => console.log("Delete:", row)}
              />
            </WmTableColumn>
          </WmTable>
          <Divider sx={{ mt: 3 }} />
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            7. Table with Column Groups & Sort
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Grouped columns under common headers with sorting
          </Typography>
          <WmTable
            name="groupedShowcaseTable"
            title="User Details"
            subheading="Organized by information groups"
            iconclass="wi wi-table"
            dataset={usersData.slice(0, 4)}
            navigation="None"
            enablesort={true}
            listener={mockListener}
          >
            <WmTableGroup name="personalInfo" caption="Personal Information" listener={mockListener}>
              <WmTableColumn
                name="wm_table_column1"
                binding="name"
                field="name"
                caption="Name"
                widgetType="label"
                listener={mockListener}
                index={0}
                headerindex="0"
              />
              <WmTableColumn
                name="wm_table_column2"
                binding="email"
                field="email"
                caption="Email"
                widgetType="label"
                listener={mockListener}
                index={1}
                headerindex="1"
              />
            </WmTableGroup>
            <WmTableGroup name="workInfo" caption="Work Information" listener={mockListener}>
              <WmTableColumn
                name="wm_table_column3"
                binding="role"
                field="role"
                caption="Role"
                widgetType="label"
                listener={mockListener}
                index={2}
                headerindex="2"
              />
              <WmTableColumn
                name="wm_table_column4"
                binding="department"
                field="department"
                caption="Department"
                widgetType="label"
                listener={mockListener}
                index={3}
                headerindex="3"
              />
            </WmTableGroup>
          </WmTable>
        </Box>
        */}
      </Stack>
    </Box>
  ),
  args: {
    name: "showcaseTable",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

export const Default: Story = {
  tags: ["show-panel"],
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    const renderkey = `${componentArgs.pagesize}`;
    return (
      <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
        <WmTable {...componentArgs} listener={mockListener} key={renderkey}>
          <WmTableColumn
            name="wm_table_column1"
            binding="name"
            field="name"
            caption="Name"
            widgetType="label"
            listener={mockListener}
            index={0}
            headerindex="0"
          />
          <WmTableColumn
            name="wm_table_column2"
            binding="email"
            field="email"
            caption="Email"
            widgetType="label"
            listener={mockListener}
            index={1}
            headerindex="1"
          />
          <WmTableColumn
            name="wm_table_column3"
            binding="role"
            field="role"
            caption="Role"
            widgetType="label"
            listener={mockListener}
            index={2}
            headerindex="2"
          />
          <WmTableColumn
            name="wm_table_column4"
            binding="department"
            field="department"
            caption="Department"
            widgetType="label"
            listener={mockListener}
            index={3}
            headerindex="3"
          />
        </WmTable>
      </Box>
    );
  },
  args: {
    name: "defaultTableStory",
    title: "Users Table",
    subheading: "All registered users",
    // iconclass: "wi wi-user",
    dataset: usersData,
    enablesort: true,
    radioselect: false,
    multiselect: false,
    showrecordcount: true,
    shownavigation: true,
    boundarylinks: true,
    navigation: "Advanced",
    navigationalign: "right",
    pagesize: 5,
    maxsize: 5,
    allowpagesizechange: false,
    pagesizeoptions: "5,10,15",
    filtermode:undefined,
    searchlabel:"Search...",
    filteronkeypress: false,
    spacing: "normal",
    className: "",
    editmode: "none",
    "data-design-token-target": "true",
  },
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    // iconclass: { control: "text" },
    navigation: {
      control: "select",
      options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"],
    },
    pagesize: { control: "number" },
    maxsize: { control: "number" },
    boundarylinks: { control: "boolean" },
    showrecordcount: { control: "boolean" },
    enablesort: { control: "boolean" },
    shownavigation: { control: "boolean" },
    allowpagesizechange: { control: "boolean" },
    pagesizeoptions: { control: "text" },
    navigationalign: {
      control: "select",
      options: ["left", "center", "right"],
    },
    spacing: {
      control: "select",
      options: ["normal", "condensed"],
    },
    className: { table: {disable : true} },
    filtermode:{control: "select", options:["undefined", "search", "multicolumn"]},
    searchlabel:{control:"text"},
    filteronkeypress: {control: "boolean"},
    radioselect: { control: "boolean" },
    multiselect: { control: "boolean" },
    editmode: {
      control: "select",
      options: ["none", "inline", "quickedit"],
    },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    dataset: { table: { disable: true } },
    columns: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: dataTableTokensData,
      componentKey: "data-table",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const Condensed: Story = {
  tags: ["show-panel"],
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    const renderkey = `${componentArgs.pagesize}`;
    return (
      <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
        <WmTable {...componentArgs} listener={mockListener} key={renderkey}>
          <WmTableColumn
            name="wm_table_column1"
            binding="name"
            field="name"
            caption="Product Name"
            widgetType="label"
            listener={mockListener}
            index={0}
            headerindex="0"
          />
          <WmTableColumn
            name="wm_table_column2"
            binding="price"
            field="price"
            caption="Price"
            widgetType="label"
            listener={mockListener}
            index={1}
            headerindex="1"
            type="number"
          />
          <WmTableColumn
            name="wm_table_column3"
            binding="category"
            field="category"
            caption="Category"
            widgetType="label"
            listener={mockListener}
            index={2}
            headerindex="2"
          />
          <WmTableColumn
            name="wm_table_column4"
            binding="quantity"
            field="quantity"
            caption="Stock"
            widgetType="label"
            listener={mockListener}
            index={3}
            headerindex="3"
            type="number"
          />
        </WmTable>
      </Box>
    );
  },
  args: {
    name: "condensedTableStory",
    title: "Products",
    subheading: "Compact view",
    dataset: productsData,
    enablesort: true,
    radioselect: false,
    multiselect: false,
    showrecordcount: true,
    shownavigation: true,
    boundarylinks: false,
    navigation: "Pager",
    navigationalign: "right",
    pagesize: 5,
    maxsize: 5,
    allowpagesizechange: false,
    pagesizeoptions: "5,10,15",
    filtermode: undefined,
    searchlabel: "Search...",
    filteronkeypress: false,
    spacing: "condensed",
    className: "table-condensed",
    editmode: "none",
    "data-design-token-target": "true",
  },
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    // iconclass: { control: "text" },
    navigation: {
      control: "select",
      options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"],
    },
    pagesize: { control: "number" },
    maxsize: { control: "number" },
    boundarylinks: { control: "boolean" },
    showrecordcount: { control: "boolean" },
    enablesort: { control: "boolean" },
    shownavigation: { control: "boolean" },
    allowpagesizechange: { control: "boolean" },
    pagesizeoptions: { control: "text" },
    navigationalign: {
      control: "select",
      options: ["left", "center", "right"],
    },
    spacing: {
      control: "select",
      options: ["normal", "condensed"],
    },
    className: { table: {disable: true} },
    radioselect: { control: "boolean" },
    multiselect: { control: "boolean" },
    editmode: {
      control: "select",
      options: ["none", "inline", "quickedit"],
    },
    filtermode: { control: "select", options: ["undefined", "search", "multicolumn"] },
    searchlabel: { control: "text" },
    filteronkeypress: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    dataset: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: dataTableTokensData,
      componentKey: "data-table",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const StripedEven: Story = {
  tags: ["show-panel"],
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    const renderkey=`${componentArgs.pagesize}`;
    return (
      <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
        <WmTable {...componentArgs} listener={mockListener} key={renderkey}>
          <WmTableColumn
            name="wm_table_column1"
            binding="name"
            field="name"
            caption="Name"
            widgetType="label"
            listener={mockListener}
            index={0}
            headerindex="0"
          />
          <WmTableColumn
            name="wm_table_column2"
            binding="email"
            field="email"
            caption="Email"
            widgetType="label"
            listener={mockListener}
            index={1}
            headerindex="1"
          />
          <WmTableColumn
            name="wm_table_column3"
            binding="role"
            field="role"
            caption="Role"
            widgetType="label"
            listener={mockListener}
            index={2}
            headerindex="2"
          />
          <WmTableColumn
            name="wm_table_column4"
            binding="department"
            field="department"
            caption="Department"
            widgetType="label"
            listener={mockListener}
            index={3}
            headerindex="3"
          />
        </WmTable>
      </Box>
    );
  },
  args: {
    name: "stripedEvenTableStory",
    title: "Users",
    subheading: "Striped even rows",
    dataset: usersData,
    enablesort: true,
    radioselect: false,
    multiselect: false,
    showrecordcount: true,
    shownavigation: true,
    boundarylinks: false,
    navigation: "Pager",
    navigationalign: "right",
    pagesize: 6,
    maxsize: 5,
    allowpagesizechange: false,
    pagesizeoptions: "5,10,15",
    filtermode: undefined,
    searchlabel: "Search...",
    filteronkeypress: false,
    spacing: "normal",
    className: "striped-even",
    editmode: "none",
    "data-design-token-target": "true",
  },
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    // iconclass: { control: "text" },
    navigation: {
      control: "select",
      options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"],
    },
    pagesize: { control: "number" },
    maxsize: { control: "number" },
    boundarylinks: { control: "boolean" },
    showrecordcount: { control: "boolean" },
    enablesort: { control: "boolean" },
    shownavigation: { control: "boolean" },
    allowpagesizechange: { control: "boolean" },
    pagesizeoptions: { control: "text" },
    navigationalign: {
      control: "select",
      options: ["left", "center", "right"],
    },
    spacing: {
      control: "select",
      options: ["normal", "condensed"],
    },
    className: { table: {disable: true} },
    radioselect: { control: "boolean" },
    multiselect: { control: "boolean" },
    editmode: {
      control: "select",
      options: ["none", "inline", "quickedit"],
    },
    filtermode: { control: "select", options: ["undefined", "search", "multicolumn"] },
    searchlabel: { control: "text" },
    filteronkeypress: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    dataset: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: dataTableTokensData,
      componentKey: "data-table",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const StripedOdd: Story = {
  tags: ["show-panel"],
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
    const renderkey = `${componentArgs.pagesize}`;
    return (
      <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
        <WmTable {...componentArgs} listener={mockListener} key={renderkey}>
          <WmTableColumn
            name="wm_table_column1"
            binding="name"
            field="name"
            caption="Product Name"
            widgetType="label"
            listener={mockListener}
            index={0}
            headerindex="0"
          />
          <WmTableColumn
            name="wm_table_column2"
            binding="price"
            field="price"
            caption="Price"
            widgetType="label"
            listener={mockListener}
            index={1}
            headerindex="1"
            type="number"
          />
          <WmTableColumn
            name="wm_table_column3"
            binding="category"
            field="category"
            caption="Category"
            widgetType="label"
            listener={mockListener}
            index={2}
            headerindex="2"
          />
          <WmTableColumn
            name="wm_table_column4"
            binding="quantity"
            field="quantity"
            caption="Stock"
            widgetType="label"
            listener={mockListener}
            index={3}
            headerindex="3"
            type="number"
          />
        </WmTable>
      </Box>
    );
  },
  args: {
    name: "stripedOddTableStory",
    title: "Products",
    subheading: "Striped odd rows",
    dataset: productsData,
    enablesort: true,
    radioselect: false,
    multiselect: false,
    showrecordcount: false,
    shownavigation: true,
    boundarylinks: false,
    navigation: "Basic",
    navigationalign: "right",
    pagesize: 6,
    maxsize: 5,
    allowpagesizechange: false,
    pagesizeoptions: "5,10,15",
    filtermode: undefined,
    searchlabel: "Search...",
    filteronkeypress: false,
    spacing: "normal",
    className: "striped-odd",
    editmode: "none",
    "data-design-token-target": "true",
  },
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    // iconclass: { control: "text" },
    navigation: {
      control: "select",
      options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"],
    },
    pagesize: { control: "number" },
    maxsize: { control: "number" },
    boundarylinks: { control: "boolean" },
    showrecordcount: { control: "boolean" },
    enablesort: { control: "boolean" },
    shownavigation: { control: "boolean" },
    allowpagesizechange: { control: "boolean" },
    pagesizeoptions: { control: "text" },
    navigationalign: {
      control: "select",
      options: ["left", "center", "right"],
    },
    spacing: {
      control: "select",
      options: ["normal", "condensed"],
    },
    className: { table: {disable : true} },
    radioselect: { control: "boolean" },
    multiselect: { control: "boolean" },
    editmode: {
      control: "select",
      options: ["none", "inline", "quickedit"],
    },
    filtermode: { control: "select", options: ["undefined", "search", "multicolumn"] },
    searchlabel: { control: "text" },
    filteronkeypress: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    dataset: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: dataTableTokensData,
      componentKey: "data-table",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};