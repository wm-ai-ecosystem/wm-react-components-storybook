import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import DateDefaultExport from "../../../../components/input/epoch/date/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import dateTokensData from "../../../../designTokens/components/date/date.json";

const meta: Meta<typeof DateDefaultExport> = {
  title: "Input/Date",
  component: DateDefaultExport,
  // argTypes: {
  //   placeholder: { control: "text" },
  //   // hint: { control: "text" },
  //   // className: { control: "text" },
  //   // tabindex: { control: "number" },
  //   // shortcutkey: { control: "text" },
  //   datavalue: { control: "text" },
  //   datepattern: { control: "select", options: ["yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy", "dd.MM.yyyy", "MMMM d, yyyy", "M/d/yy"] },
  //   outputformat: { control: "text" },
  //   required: { control: "boolean" },
  //   mindate: { control: "text" },
  //   maxdate: { control: "text" },
  //   excludedays: { control: "text" },
  //   excludedates: { control: "text" },
  //   showweeks: { control: "boolean" },
  //   showbuttonbar: { control: "boolean" },
  //   autofocus: { control: "boolean" },
  //   readonly: { control: "boolean" },
  //   disabled: { control: "boolean" },
  //   showdropdownon: {
  //     control: { type: "select" },
  //     options: ["default", "button"],
  //   },
  //   adaptiveposition: { control: "boolean" },
  //   selectfromothermonth: { control: "boolean" },
  //   todaybutton: { control: "boolean" },
  //   clearbutton: { control: "boolean" },
  //   todaybuttonlabel: { control: "text" },
  //   clearbuttonlabel: { control: "text" },
  //   showcustompicker: { control: "boolean" },
  //   showdateformatasplaceholder: { control: "boolean" },
  //   viewmode: {
  //     control: { type: "select" },
  //     options: ["day", "month", "year"],
  //   },
  //   dataentrymode: {
  //     control: { type: "select" },
  //     options: ["default", "picker"],
  //   },
  //   // width: { control: "text" },
  //   // arialabel: { control: "text" },
  // },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
  onChange: () => {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <DateDefaultExport {...args} listener={mockListener} />
  </Box>
);

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
  args:{
    name:"docsDate",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const today = new Date().toISOString().split("T")[0];

    return (
      <Box sx={{ p: 3 }}>
        {/* Heading with anchor */}
        <Box mb={3} id="date-showcase">
          <Typography variant="h6" mr={2} fontWeight={600}>
            Date Input Showcase
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Various examples of date input configurations
          </Typography> */}
        </Box>

        <Stack spacing={4}>
          {/* Min/Max Dates */}
          <Box id="minMaxDates">
            <Typography variant="subtitle2" color="text.secondary">
              Min/Max Dates
            </Typography>
            <DateDefaultExport
              name="minMaxDates"
              placeholder="Select Date"
              mindate="CURRENT_DATE"
              maxdate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]}
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Exclude Days (No Mondays) */}
          <Box id="excludeDays">
            <Typography variant="subtitle2" color="text.secondary">
              Exclude Mondays
            </Typography>
            <DateDefaultExport
              name="excludeDays"
              placeholder="No Mondays"
              excludedays="1"
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Show Week Numbers */}
          <Box id="showWeekNumbers">
            <Typography variant="subtitle2" color="text.secondary">
              Show Week Numbers
            </Typography>
            <DateDefaultExport
              name="showWeeks"
              placeholder="With week numbers"
              showweeks={true}
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Picker Only Mode */}
          <Box id="pickerOnly">
            <Typography variant="subtitle2" color="text.secondary">
              Picker Only Mode
            </Typography>
            <DateDefaultExport
              name="pickerOnly"
              placeholder="Picker only (no typing)"
              dataentrymode="picker"
              showcustompicker={true}
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Date Pattern Examples */}
          <Box id="datePatternExamples">
            <Typography variant="subtitle2" color="text.secondary">
              Date Pattern Examples
            </Typography>
            <Stack spacing={2}>
              <DateDefaultExport
                name="usDatePattern"
                placeholder="MM/dd/yyyy"
                datepattern="MM/dd/yyyy"
                datavalue={today}
                listener={mockListener}
              />
              <DateDefaultExport
                name="longDatePattern"
                placeholder="MMMM d, yyyy"
                datepattern="MMMM d, yyyy"
                datavalue={today}
                listener={mockListener}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    listener: mockListener,
    name: "showCaseDate"
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicDate",
    placeholder: "Select Date",
    listener: mockListener,
    disabled: false,
    readonly: false,
    required: false,
    datepattern: "yyyy-MM-dd",
    outputformat: "yyyy-MM-dd",
    selectfromothermonth: true,
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue:"CURRENT_DATE"
  },
  argTypes: {
    placeholder: { control: "text" },
    // hint: { control: "text" },
    // className: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    datavalue: { control: "text" },
    datepattern: { control: "select", options: ["yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy", "dd.MM.yyyy", "MMMM d, yyyy", "M/d/yy"] },
    outputformat: { control: "text" },
    required: { control: "boolean" },
    mindate: { control: "text" },
    maxdate: { control: "text" },
    excludedays: { control: "text" },
    excludedates: { control: "text" },
    showweeks: { control: "boolean" },
    showbuttonbar: { control: "boolean" },
    autofocus: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    adaptiveposition: { control: "boolean" },
    selectfromothermonth: { control: "boolean" },
    todaybutton: { control: "boolean" },
    clearbutton: { control: "boolean" },
    todaybuttonlabel: { control: "text" },
    clearbuttonlabel: { control: "text" },
    showcustompicker: { control: "boolean" },
    showdateformatasplaceholder: { control: "boolean" },
    viewmode: {
      control: { type: "select" },
      options: ["day", "month", "year"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    // width: { control: "text" },
    // arialabel: { control: "text" },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardDate",
    placeholder: "Select Date",
    listener: mockListener,
    datepattern: "yyyy-MM-dd",
    outputformat: "yyyy-MM-dd",
    selectfromothermonth: true,
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue:"CURRENT_DATE",
    "data-design-token-target":"true"
  },
  argTypes: {
    placeholder: { control: "text" },
    // hint: { control: "text" },
    // className: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    datavalue: { control: "text" },
    datepattern: { control: "select", options: ["yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy", "dd.MM.yyyy", "MMMM d, yyyy", "M/d/yy"] },
    outputformat: { control: "text" },
    // mindate: { control: "text" },
    // maxdate: { control: "text" },
    // excludedays: { control: "text" },
    // excludedates: { control: "text" },
    // showweeks: { control: "boolean" },
    // showbuttonbar: { control: "boolean" },
    // autofocus: { control: "boolean" },
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    // adaptiveposition: { control: "boolean" },
    // selectfromothermonth: { control: "boolean" },
    // todaybutton: { control: "boolean" },
    // clearbutton: { control: "boolean" },
    // todaybuttonlabel: { control: "text" },
    // clearbuttonlabel: { control: "text" },
    // showcustompicker: { control: "boolean" },
    // showdateformatasplaceholder: { control: "boolean" },
    viewmode: {
      control: { type: "select" },
      options: ["day", "month", "year"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    "data-design-token-target": { control: false }
    // width: { control: "text" },
    // arialabel: { control: "text" },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: dateTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "datepicker",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};


// export const MinMaxDates: Story = {
//   render: Template,
//   args: {
//     name: "minMaxDates",
//     placeholder: "Select Date",
//     datepattern: "yyyy-MM-dd",
//     maxdate: "2025-12-31",
//     mindate: "2025-01-01",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     outputformat: "yyyy-MM-dd",
//     selectfromothermonth: false,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const ExcludeDays: Story = {
//   render: Template,
//   args: {
//     name: "excludeDays",
//     placeholder: "No Mondays",
//     excludedays: "1",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     datepattern: "yyyy-MM-dd",
//     outputformat: "yyyy-MM-dd",
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const ExcludeSpecificDates: Story = {
//   render: Template,
//   args: {
//     name: "excludeDates",
//     placeholder: "Specific dates excluded",
//     excludedates: "2024-12-25, 2024-12-26, 2025-01-01",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     datepattern: "yyyy-MM-dd",
//     outputformat: "yyyy-MM-dd",
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const ShowWeekNumbers: Story = {
//   render: Template,
//   args: {
//     name: "showWeeks",
//     placeholder: "With week numbers",
//     showweeks: true,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     datepattern: "yyyy-MM-dd",
//     outputformat: "yyyy-MM-dd",
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const PickerOnlyMode: Story = {
//   render: Template,
//   args: {
//     name: "pickerOnly",
//     placeholder: "Picker only (no typing)",
//     dataentrymode: "picker",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     datepattern: "yyyy-MM-dd",
//     outputformat: "yyyy-MM-dd",
//     selectfromothermonth: true,
//     showcustompicker: true, 
//     showdropdownon: "default",
//   },
// };

// export const ExcludeWeekends: Story = {
//   render: Template,
//   args: {
//     name: "excludeWeekends",
//     placeholder: "Weekdays only",
//     excludedays: "0,6",
//     listener: mockListener,
//   },
// };

// export const WithValue: Story = {
//   render: Template,
//   args: {
//     name: "dateWithValue",
//     placeholder: "Select Date",
//     datavalue: "2024-12-15",
//     listener: mockListener,
//   },
// };

// export const CustomPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "customPlaceholder",
//     placeholder: "Pick a date",
//     listener: mockListener,
//   },
// };

// export const ShowDateFormatAsPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "dateFormatPlaceholder",
//     showdateformatasplaceholder: true,
//     datepattern: "MM/dd/yyyy",
//     listener: mockListener,
//   },
// };

// export const CustomDatePattern: Story = {
//   render: Template,
//   args: {
//     name: "customPattern",
//     datepattern: "dd/MM/yyyy",
//     datavalue: "2024-12-15",
//     listener: mockListener,
//   },
// };

// export const USDateFormat: Story = {
//   render: Template,
//   args: {
//     name: "usDateFormat",
//     datepattern: "MM/dd/yyyy",
//     datavalue: "2024-12-15",
//     listener: mockListener,
//   },
// };

// export const EuropeanDateFormat: Story = {
//   render: Template,
//   args: {
//     name: "europeanFormat",
//     datepattern: "dd.MM.yyyy",
//     datavalue: "2024-12-15",
//     listener: mockListener,
//   },
// };

// export const LongDateFormat: Story = {
//   render: Template,
//   args: {
//     name: "longFormat",
//     datepattern: "MMMM d, yyyy",
//     datavalue: "2024-12-15",
//     listener: mockListener,
//   },
// };

// export const ShortDateFormat: Story = {
//   render: Template,
//   args: {
//     name: "shortFormat",
//     datepattern: "M/d/yy",
//     datavalue: "2024-12-15",
//     listener: mockListener,
//   },
// };

// export const WithMinDate: Story = {
//   render: Template,
//   args: {
//     name: "minDate",
//     placeholder: "Select Date (Min: 2024-01-01)",
//     mindate: "2024-01-01",
//     listener: mockListener,
//   },
// };

// export const WithMaxDate: Story = {
//   render: Template,
//   args: {
//     name: "maxDate",
//     placeholder: "Select Date (Max: 2024-12-31)",
//     maxdate: "2024-12-31",
//     listener: mockListener,
//   },
// };

// export const WithDateRange: Story = {
//   render: Template,
//   args: {
//     name: "dateRange",
//     placeholder: "Select Date (2024 only)",
//     mindate: "2024-01-01",
//     maxdate: "2024-12-31",
//     datavalue: "2024-06-15",
//     listener: mockListener,
//   },
// };


// export const WithoutButtonBar: Story = {
//   render: Template,
//   args: {
//     name: "noButtonBar",
//     placeholder: "No button bar",
//     showbuttonbar: false,
//     listener: mockListener,
//   },
// };

// export const WithoutTodayButton: Story = {
//   render: Template,
//   args: {
//     name: "noTodayButton",
//     placeholder: "No Today button",
//     todaybutton: false,
//     listener: mockListener,
//   },
// };

// export const WithoutClearButton: Story = {
//   render: Template,
//   args: {
//     name: "noClearButton",
//     placeholder: "No Clear button",
//     clearbutton: false,
//     listener: mockListener,
//   },
// };

// export const CustomButtonLabels: Story = {
//   render: Template,
//   args: {
//     name: "customLabels",
//     placeholder: "Custom button labels",
//     todaybuttonlabel: "Now",
//     clearbuttonlabel: "Reset",
//     listener: mockListener,
//   },
// };

// export const DisabledDate: Story = {
//   render: Template,
//   args: {
//     name: "disabledDate",
//     placeholder: "Disabled",
//     datavalue: "2024-12-15",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyDate: Story = {
//   render: Template,
//   args: {
//     name: "readonlyDate",
//     placeholder: "Readonly",
//     datavalue: "2024-12-15",
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const RequiredDate: Story = {
//   render: Template,
//   args: {
//     name: "requiredDate",
//     placeholder: "Required field",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const MonthViewMode: Story = {
//   render: Template,
//   args: {
//     name: "monthView",
//     placeholder: "Month picker",
//     viewmode: "month",
//     datepattern: "MMMM yyyy",
//     listener: mockListener,
//   },
// };

// export const YearViewMode: Story = {
//   render: Template,
//   args: {
//     name: "yearView",
//     placeholder: "Year picker",
//     viewmode: "year",
//     datepattern: "yyyy",
//     listener: mockListener,
//   },
// };

// export const PickerOnlyMode: Story = {
//   render: Template,
//   args: {
//     name: "pickerOnly",
//     placeholder: "Picker only (no typing)",
//     dataentrymode: "picker",
//     listener: mockListener,
//   },
// };

// export const OpenOnButtonOnly: Story = {
//   render: Template,
//   args: {
//     name: "buttonOnly",
//     placeholder: "Click icon to open",
//     showdropdownon: "button",
//     listener: mockListener,
//   },
// };

// export const DisableOtherMonthSelection: Story = {
//   render: Template,
//   args: {
//     name: "noOtherMonth",
//     placeholder: "Current month only",
//     selectfromothermonth: false,
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintDate",
//     placeholder: "Hover for hint",
//     hint: "Select your preferred date",
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaDate",
//     placeholder: "Select Date",
//     arialabel: "Birth date selection",
//     listener: mockListener,
//   },
// };

// export const CustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "customWidth",
//     placeholder: "Custom width",
//     width: "300px",
//     listener: mockListener,
//   },
// };

// export const FullWidth: Story = {
//   render: Template,
//   args: {
//     name: "fullWidth",
//     placeholder: "Full width",
//     width: "100%",
//     listener: mockListener,
//   },
// };

// export const WithCustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClass",
//     placeholder: "Custom class",
//     className: "custom-date-class",
//     listener: mockListener,
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledDate",
//     placeholder: "Custom styled",
//     styles: {
//       backgroundColor: "#f0f8ff",
//       borderColor: "#1976d2",
//     },
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedDate, setSelectedDate] = useState<string>("");

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveDate: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedDate(data.datavalue || "");
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Date Demo</Typography>
//           <DateDefaultExport
//             name="interactiveDate"
//             placeholder="Select a date"
//             datavalue={selectedDate}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Date:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedDate || "No date selected"}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveDemo",
//     listener: mockListener,
//   },
// };

// export const DateFormatComparison: Story = {
//   render: () => {
//     const sampleDate = "2024-12-15";
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Date Format Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               US Format (MM/dd/yyyy)
//             </Typography>
//             <DateDefaultExport
//               name="usFormat"
//               datepattern="MM/dd/yyyy"
//               datavalue={sampleDate}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               European Format (dd/MM/yyyy)
//             </Typography>
//             <DateDefaultExport
//               name="euFormat"
//               datepattern="dd/MM/yyyy"
//               datavalue={sampleDate}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               ISO Format (yyyy-MM-dd)
//             </Typography>
//             <DateDefaultExport
//               name="isoFormat"
//               datepattern="yyyy-MM-dd"
//               datavalue={sampleDate}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Long Format (MMMM d, yyyy)
//             </Typography>
//             <DateDefaultExport
//               name="longFormat"
//               datepattern="MMMM d, yyyy"
//               datavalue={sampleDate}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "formatComparison",
//     listener: mockListener,
//   },
// };

// export const ViewModeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           View Mode Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Day View (Default)
//             </Typography>
//             <DateDefaultExport
//               name="dayView"
//               viewmode="day"
//               datepattern="MMM d, yyyy"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Month View
//             </Typography>
//             <DateDefaultExport
//               name="monthViewComp"
//               viewmode="month"
//               datepattern="MMMM yyyy"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Year View
//             </Typography>
//             <DateDefaultExport
//               name="yearViewComp"
//               viewmode="year"
//               datepattern="yyyy"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "viewModeComparison",
//     listener: mockListener,
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     const sampleDate = "2024-12-15";
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           State Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State
//             </Typography>
//             <DateDefaultExport
//               name="normalState"
//               placeholder="Select Date"
//               datavalue={sampleDate}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <DateDefaultExport
//               name="disabledState"
//               placeholder="Disabled"
//               datavalue={sampleDate}
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <DateDefaultExport
//               name="readonlyState"
//               placeholder="Readonly"
//               datavalue={sampleDate}
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <DateDefaultExport
//               name="requiredState"
//               placeholder="Required"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "stateComparison",
//     listener: mockListener,
//   },
// };

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Event Registration Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Full Name
//             </Typography>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Email
//             </Typography>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Event Date *
//             </Typography>
//             <DateDefaultExport
//               name="eventDate"
//               placeholder="Select event date"
//               required={true}
//               mindate={new Date().toISOString().split("T")[0]}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Birth Date
//             </Typography>
//             <DateDefaultExport
//               name="birthDate"
//               placeholder="Select birth date"
//               maxdate={new Date().toISOString().split("T")[0]}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "formExample",
//     listener: mockListener,
//   },
// };

// export const BookingExample: Story = {
//   render: () => {
//     const today = new Date().toISOString().split("T")[0];
//     const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0];

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Hotel Booking
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Check-in Date *
//             </Typography>
//             <DateDefaultExport
//               name="checkinDate"
//               placeholder="Select check-in date"
//               required={true}
//               mindate={today}
//               maxdate={maxDate}
//               excludedays="0,6"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Check-out Date *
//             </Typography>
//             <DateDefaultExport
//               name="checkoutDate"
//               placeholder="Select check-out date"
//               required={true}
//               mindate={today}
//               maxdate={maxDate}
//               excludedays="0,6"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "bookingExample",
//     listener: mockListener,
//   },
// };

// export const AppointmentExample: Story = {
//   render: () => {
//     const today = new Date().toISOString().split("T")[0];
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Doctor Appointment
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             Select an appointment date (weekdays only, no holidays)
//           </Typography>
//           <DateDefaultExport
//             name="appointmentDate"
//             placeholder="Select appointment date"
//             required={true}
//             mindate={today}
//             excludedays="0,6"
//             excludedates="2024-12-25, 2025-01-01"
//             showweeks={true}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "appointmentExample",
//     listener: mockListener,
//   },
// };

// export const BirthdayExample: Story = {
//   render: () => {
//     const maxDate = new Date().toISOString().split("T")[0];
//     const minDate = new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0];

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Birthday Selection
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             Select your birth date (must be in the past)
//           </Typography>
//           <DateDefaultExport
//             name="birthday"
//             placeholder="Select birth date"
//             maxdate={maxDate}
//             mindate={minDate}
//             datepattern="MMMM d, yyyy"
//             viewmode="year"
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "birthdayExample",
//     listener: mockListener,
//   },
// };

// export const MonthYearPickerExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Expense Report
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Report Month *
//             </Typography>
//             <DateDefaultExport
//               name="reportMonth"
//               placeholder="Select month"
//               viewmode="month"
//               datepattern="MMMM yyyy"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Fiscal Year *
//             </Typography>
//             <DateDefaultExport
//               name="fiscalYear"
//               placeholder="Select year"
//               viewmode="year"
//               datepattern="yyyy"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "monthYearExample",
//     listener: mockListener,
//   },
// };

// export const ValidationExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Date Validation Examples
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Required Field
//             </Typography>
//             <DateDefaultExport
//               name="requiredValidation"
//               placeholder="This field is required"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Date Range (Current Year)
//             </Typography>
//             <DateDefaultExport
//               name="rangeValidation"
//               placeholder="Only 2024 dates allowed"
//               mindate="2024-01-01"
//               maxdate="2024-12-31"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Exclude Weekends
//             </Typography>
//             <DateDefaultExport
//               name="weekdaysOnly"
//               placeholder="Weekdays only"
//               excludedays="0,6"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "validationExample",
//     listener: mockListener,
//   },
// };
