import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import DateTimeDefaultExport from "../../../../components/input/epoch/datetime/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof DateTimeDefaultExport> = {
  title: "Input/DateTime",
  component: DateTimeDefaultExport,
  // argTypes: {
  //   placeholder: { control: "text" },
  //   // hint: { control: "text" },
  //   // tabindex: { control: "number" },
  //   // shortcutkey: { control: "text" },
  //   datavalue: { control: "text" },
  //   datepattern: { control: "select", options: ["MM/dd/yyyy h:mm a", "dd/MM/yyyy HH:mm", "MM/dd/yyyy h:mm:ss a"] },
  //   hourstep: { control: "number" },
  //   minutestep: { control: "number" },
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
  //   selectfromothermonth: { control: "boolean" },
  //   todaybutton: { control: "boolean" },
  //   clearbutton: { control: "boolean" },
  //   todaybuttonlabel: { control: "text" },
  //   clearbuttonlabel: { control: "text" },
  //   showcustompicker: { control: "boolean" },
  //   adaptiveposition: { control: "boolean" },
  //   showdropdownon: {
  //     control: { type: "select" },
  //     options: ["default", "button"],
  //   },
  //   dataentrymode: {
  //     control: { type: "select" },
  //     options: ["default", "picker"],
  //   },
  //   // width: { control: "text" },
  //   // arialabel: { control: "text" },
  //   // className: { control: "text" },
  //   // floatinglabel: { control: "text" },
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
    <DateTimeDefaultExport {...args} listener={mockListener} />
  </Box>
);

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
  args:{
    name:"docsDateTime",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const now = new Date();
    const todayISO = now.toISOString();
    const nextWeekISO = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return (
      <Box sx={{ p: 3 }}>
        <Box mb={3} id="datetime-showcase">
          <Typography variant="h6" mr={2} fontWeight={600}>
            DateTime Input Showcase
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Various examples of DateTime input configurations
          </Typography> */}
        </Box>

        <Stack spacing={4}>
          {/* Basic */}
          <Box id="basic">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Basic DateTime</Typography>
            <DateTimeDefaultExport
              name="basicDateTime"
              placeholder="Select Date Time"
              datavalue="CURRENT_DATE"
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* Min/Max */}
          <Box id="minMax">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Min/Max DateTime</Typography>
            <DateTimeDefaultExport
              name="minMaxDateTime"
              placeholder="Select Date Time"
              mindate={todayISO}
              maxdate={nextWeekISO}
              datavalue={todayISO}
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* 12-hour format */}
          <Box id="hourFormat">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>12-Hour Format</Typography>
            <DateTimeDefaultExport
              name="hourFormatDateTime"
              placeholder="MM/dd/yyyy h:mm a"
              datavalue={todayISO}
              listener={mockListener}
              datepattern="MM/dd/yyyy h:mm a"
              outputformat="MM/dd/yyyy h:mm a"
            />
          </Box>

          {/* Picker only */}
          <Box id="pickerOnly">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Picker Only Mode</Typography>
            <DateTimeDefaultExport
              name="pickerOnly"
              placeholder="Picker only"
              dataentrymode="picker"
              showcustompicker={true}
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* Exclude Weekends */}
          <Box id="excludeWeekends">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Exclude Weekends</Typography>
            <DateTimeDefaultExport
              name="excludeWeekends"
              placeholder="Weekdays only"
              excludedays="0,6"
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* Custom Steps */}
          <Box id="customSteps">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Custom Minute Step (15 min)</Typography>
            <DateTimeDefaultExport
              name="fifteenMinutes"
              placeholder="15-minute intervals"
              minutestep={15}
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    listener: mockListener,
    name: "showcaseDateTime"
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicDateTime",
    placeholder: "Select Date Time",
    listener: mockListener,
    outputformat: "dd/MM/yyyy HH:mm",
    datepattern: "dd/MM/yyyy HH:mm",
    disabled: false,
    readonly: false,
    required: false,
    selectfromothermonth: true,
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue:"CURRENT_DATE"
  },
  argTypes: {
    placeholder: { control: "text" },
    // hint: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    datavalue: { control: "text" },
    datepattern: { control: "select", options: ["MM/dd/yyyy h:mm a", "dd/MM/yyyy HH:mm", "MM/dd/yyyy h:mm:ss a"] },
    hourstep: { control: "number" },
    minutestep: { control: "number" },
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
    selectfromothermonth: { control: "boolean" },
    todaybutton: { control: "boolean" },
    clearbutton: { control: "boolean" },
    todaybuttonlabel: { control: "text" },
    clearbuttonlabel: { control: "text" },
    showcustompicker: { control: "boolean" },
    adaptiveposition: { control: "boolean" },
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    // width: { control: "text" },
    // arialabel: { control: "text" },
    // className: { control: "text" },
    // floatinglabel: { control: "text" },
  },
};

// export const MinMaxDateTime: Story = {
//   render: Template,
//   args: {
//     name: "minMaxDateTime",
//     placeholder: "Select Date Time",
//     mindate: new Date().toISOString(),
//     maxdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
//     datepattern: "dd/MM/yyyy HH:mm",
//     outputformat: "dd/MM/yyyy HH:mm",
//     datavalue: new Date().toISOString(),
//     disabled: false,
//     readonly: false,
//     required: false,
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//     listener: mockListener,
//   },
// };

// export const HourFormat: Story = {
//   render: Template,
//   args: {
//     name: "hourFormatDateTime",
//     datepattern: "MM/dd/yyyy h:mm a",
//     outputformat: "MM/dd/yyyy h:mm a",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const CustomHourStep: Story = {
//   render: Template,
//   args: {
//     name: "hourStep",
//     placeholder: "2-hour intervals",
//     hourstep: 2,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const CustomMinuteStep: Story = {
//   render: Template,
//   args: {
//     name: "minuteStep",
//     placeholder: "30-minute intervals",
//     minutestep: 30,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     selectfromothermonth: true,
//     dataentrymode: "default",
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
//     disabled: false,
//     readonly: false,
//     required: false,
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const ExcludeSpecificDates: Story = {
//   render: Template,
//   args: {
//     name: "excludeDates",
//     placeholder: "Holidays excluded",
//     excludedates: "2024-12-25, 2024-12-26, 2025-01-01",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
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
//     selectfromothermonth: true,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const WithValue: Story = {
//   render: Template,
//   args: {
//     name: "datetimeWithValue",
//     placeholder: "Select Date Time",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const CurrentDateTime: Story = {
//   render: Template,
//   args: {
//     name: "currentDateTime",
//     placeholder: "Current Date Time",
//     datavalue: "CURRENT_DATE",
//     listener: mockListener,
//   },
// };

// export const CustomPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "customPlaceholder",
//     placeholder: "Pick date and time",
//     listener: mockListener,
//   },
// };

// export const With12HourFormat: Story = {
//   render: Template,
//   args: {
//     name: "time12Hour",
//     datepattern: "MM/dd/yyyy h:mm a",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const With24HourFormat: Story = {
//   render: Template,
//   args: {
//     name: "time24Hour",
//     datepattern: "dd/MM/yyyy HH:mm",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const WithSeconds: Story = {
//   render: Template,
//   args: {
//     name: "withSeconds",
//     datepattern: "MM/dd/yyyy h:mm:ss a",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const LongDateTimeFormat: Story = {
//   render: Template,
//   args: {
//     name: "longFormat",
//     datepattern: "MMMM d, yyyy h:mm a",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const ISOFormat: Story = {
//   render: Template,
//   args: {
//     name: "isoFormat",
//     datepattern: "yyyy-MM-dd HH:mm:ss",
//     datavalue: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const FifteenMinuteIntervals: Story = {
//   render: Template,
//   args: {
//     name: "fifteenMinutes",
//     placeholder: "15-minute intervals",
//     minutestep: 15,
//     listener: mockListener,
//   },
// };

// export const FiveMinuteIntervals: Story = {
//   render: Template,
//   args: {
//     name: "fiveMinutes",
//     placeholder: "5-minute intervals",
//     minutestep: 5,
//     listener: mockListener,
//   },
// };

// export const WithMinDateTime: Story = {
//   render: Template,
//   args: {
//     name: "minDateTime",
//     placeholder: "Min: Today",
//     mindate: new Date().toISOString(),
//     listener: mockListener,
//   },
// };

// export const WithMaxDateTime: Story = {
//   render: Template,
//   args: {
//     name: "maxDateTime",
//     placeholder: "Max: 7 days from now",
//     maxdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
//     listener: mockListener,
//   },
// };

// export const WithDateTimeRange: Story = {
//   render: Template,
//   args: {
//     name: "dateTimeRange",
//     placeholder: "Next 30 days only",
//     mindate: new Date().toISOString(),
//     maxdate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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

// export const DisabledDateTime: Story = {
//   render: Template,
//   args: {
//     name: "disabledDateTime",
//     placeholder: "Disabled",
//     datavalue: new Date().toISOString(),
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyDateTime: Story = {
//   render: Template,
//   args: {
//     name: "readonlyDateTime",
//     placeholder: "Readonly",
//     datavalue: new Date().toISOString(),
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const RequiredDateTime: Story = {
//   render: Template,
//   args: {
//     name: "requiredDateTime",
//     placeholder: "Required field",
//     required: true,
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
//     placeholder: "Click icons to open",
//     showdropdownon: "button",
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintDateTime",
//     placeholder: "Hover for hint",
//     hint: "Select appointment date and time",
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaDateTime",
//     placeholder: "Select Date Time",
//     arialabel: "Appointment date and time selection",
//     listener: mockListener,
//   },
// };

// export const WithFloatingLabel: Story = {
//   render: Template,
//   args: {
//     name: "floatingLabel",
//     floatinglabel: "Appointment Date & Time",
//     listener: mockListener,
//   },
// };

// export const CustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "customWidth",
//     placeholder: "Custom width",
//     width: "400px",
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
//     className: "custom-datetime-class",
//     listener: mockListener,
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledDateTime",
//     placeholder: "Custom styled",
//     styles: {
//       backgroundColor: "#f0f8ff",
//       borderColor: "#1976d2",
//       borderRadius: "8px",
//     },
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedDateTime, setSelectedDateTime] = useState<string>("");

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveDateTime: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedDateTime(data.datavalue || "");
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive DateTime Demo</Typography>
//           <DateTimeDefaultExport
//             name="interactiveDateTime"
//             placeholder="Select date and time"
//             datavalue={selectedDateTime}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected DateTime:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedDateTime || "No datetime selected"}
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

// export const TimeFormatComparison: Story = {
//   render: () => {
//     const sampleDateTime = new Date().toISOString();
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Time Format Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               12-Hour Format with AM/PM
//             </Typography>
//             <DateTimeDefaultExport
//               name="format12Hour"
//               datepattern="MM/dd/yyyy h:mm a"
//               datavalue={sampleDateTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               24-Hour Format
//             </Typography>
//             <DateTimeDefaultExport
//               name="format24Hour"
//               datepattern="dd/MM/yyyy HH:mm"
//               datavalue={sampleDateTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               With Seconds (12-hour)
//             </Typography>
//             <DateTimeDefaultExport
//               name="formatSeconds"
//               datepattern="MM/dd/yyyy h:mm:ss a"
//               datavalue={sampleDateTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               ISO Format
//             </Typography>
//             <DateTimeDefaultExport
//               name="formatISO"
//               datepattern="yyyy-MM-dd HH:mm:ss"
//               datavalue={sampleDateTime}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "timeFormatComparison",
//     listener: mockListener,
//   },
// };

// export const MinuteStepComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Minute Step Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               1 Minute Steps (Default)
//             </Typography>
//             <DateTimeDefaultExport
//               name="step1Min"
//               placeholder="1-minute intervals"
//               minutestep={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               5 Minute Steps
//             </Typography>
//             <DateTimeDefaultExport
//               name="step5Min"
//               placeholder="5-minute intervals"
//               minutestep={5}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               15 Minute Steps
//             </Typography>
//             <DateTimeDefaultExport
//               name="step15Min"
//               placeholder="15-minute intervals"
//               minutestep={15}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               30 Minute Steps
//             </Typography>
//             <DateTimeDefaultExport
//               name="step30Min"
//               placeholder="30-minute intervals"
//               minutestep={30}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "minuteStepComparison",
//     listener: mockListener,
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     const sampleDateTime = new Date().toISOString();
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
//             <DateTimeDefaultExport
//               name="normalState"
//               placeholder="Select Date Time"
//               datavalue={sampleDateTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <DateTimeDefaultExport
//               name="disabledState"
//               placeholder="Disabled"
//               datavalue={sampleDateTime}
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <DateTimeDefaultExport
//               name="readonlyState"
//               placeholder="Readonly"
//               datavalue={sampleDateTime}
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <DateTimeDefaultExport
//               name="requiredState"
//               placeholder="Required"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Current DateTime (Live Update)
//             </Typography>
//             <DateTimeDefaultExport
//               name="currentState"
//               datavalue="CURRENT_DATE"
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
//     const today = new Date().toISOString();
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Appointment Booking Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Patient Name
//             </Typography>
//             <input
//               type="text"
//               placeholder="Enter patient name"
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
//               Appointment Date & Time *
//             </Typography>
//             <DateTimeDefaultExport
//               name="appointmentDateTime"
//               placeholder="Select appointment date and time"
//               required={true}
//               mindate={today}
//               excludedays="0,6"
//               minutestep={15}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preferred Contact Time
//             </Typography>
//             <DateTimeDefaultExport
//               name="contactTime"
//               placeholder="When can we reach you?"
//               minutestep={30}
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

// export const MeetingSchedulerExample: Story = {
//   render: () => {
//     const today = new Date();
//     const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();
//     const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Meeting Scheduler
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Meeting Start *
//             </Typography>
//             <DateTimeDefaultExport
//               name="meetingStart"
//               placeholder="Select meeting start time"
//               required={true}
//               mindate={minDate}
//               maxdate={maxDate}
//               excludedays="0,6"
//               datepattern="MMM d, yyyy h:mm a"
//               minutestep={15}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Meeting End *
//             </Typography>
//             <DateTimeDefaultExport
//               name="meetingEnd"
//               placeholder="Select meeting end time"
//               required={true}
//               mindate={minDate}
//               maxdate={maxDate}
//               excludedays="0,6"
//               datepattern="MMM d, yyyy h:mm a"
//               minutestep={15}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "meetingExample",
//     listener: mockListener,
//   },
// };

// export const EventRegistrationExample: Story = {
//   render: () => {
//     const eventDate = new Date("2024-12-31T20:00:00").toISOString();
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Event Registration
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             Event Date: December 31, 2024 at 8:00 PM
//           </Typography>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Event Date & Time (Read-only)
//             </Typography>
//             <DateTimeDefaultExport
//               name="eventDateTime"
//               datavalue={eventDate}
//               readonly={true}
//               datepattern="MMMM d, yyyy 'at' h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Registration Deadline
//             </Typography>
//             <DateTimeDefaultExport
//               name="registrationDeadline"
//               placeholder="Register by"
//               maxdate={eventDate}
//               datepattern="MMM d, yyyy h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "eventExample",
//     listener: mockListener,
//   },
// };

// export const DeliveryScheduleExample: Story = {
//   render: () => {
//     const today = new Date().toISOString();
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Delivery Schedule
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preferred Delivery Date & Time *
//             </Typography>
//             <Typography variant="caption" color="text.secondary" display="block" mb={1}>
//               Weekdays only, between 8 AM and 6 PM
//             </Typography>
//             <DateTimeDefaultExport
//               name="deliveryDateTime"
//               placeholder="Select delivery slot"
//               required={true}
//               mindate={today}
//               excludedays="0,6"
//               datepattern="MM/dd/yyyy h:mm a"
//               hourstep={1}
//               minutestep={30}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "deliveryExample",
//     listener: mockListener,
//   },
// };

// export const FlightBookingExample: Story = {
//   render: () => {
//     const today = new Date().toISOString();
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Flight Booking
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Departure Date & Time *
//             </Typography>
//             <DateTimeDefaultExport
//               name="departureDateTime"
//               placeholder="Select departure"
//               required={true}
//               mindate={today}
//               datepattern="MMM d, yyyy h:mm a"
//               minutestep={5}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Return Date & Time
//             </Typography>
//             <DateTimeDefaultExport
//               name="returnDateTime"
//               placeholder="Select return"
//               mindate={today}
//               datepattern="MMM d, yyyy h:mm a"
//               minutestep={5}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "flightExample",
//     listener: mockListener,
//   },
// };

// export const ReminderExample: Story = {
//   render: () => {
//     const today = new Date().toISOString();
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Set Reminder
//         </Typography>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Reminder Title
//             </Typography>
//             <input
//               type="text"
//               placeholder="Enter reminder title"
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
//               Remind Me On *
//             </Typography>
//             <DateTimeDefaultExport
//               name="reminderDateTime"
//               placeholder="Select reminder date and time"
//               required={true}
//               mindate={today}
//               datepattern="MMM d, yyyy 'at' h:mm a"
//               minutestep={5}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "reminderExample",
//     listener: mockListener,
//   },
// };

// export const LiveClockExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Current Date & Time (Live)
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             This field updates every second to show the current date and time.
//           </Typography>
//           <DateTimeDefaultExport
//             name="liveClock"
//             datavalue="CURRENT_DATE"
//             datepattern="MMMM d, yyyy h:mm:ss a"
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "liveClockExample",
//     listener: mockListener,
//   },
// };

// export const ValidationExample: Story = {
//   render: () => {
//     const today = new Date().toISOString();
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           DateTime Validation Examples
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Required Field
//             </Typography>
//             <DateTimeDefaultExport
//               name="requiredValidation"
//               placeholder="This field is required"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Future Dates Only
//             </Typography>
//             <DateTimeDefaultExport
//               name="futureOnly"
//               placeholder="Future dates only"
//               mindate={today}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Weekdays Only (No Weekends)
//             </Typography>
//             <DateTimeDefaultExport
//               name="weekdaysOnly"
//               placeholder="Weekdays only"
//               excludedays="0,6"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               15-Minute Intervals
//             </Typography>
//             <DateTimeDefaultExport
//               name="intervalValidation"
//               placeholder="15-minute intervals only"
//               minutestep={15}
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
