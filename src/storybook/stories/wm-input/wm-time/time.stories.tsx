import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import TimeDefaultExport from "../../../../components/input/epoch/time/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import timeTokensData from "../../../../designTokens/components/time/time.json";

const meta: Meta<typeof TimeDefaultExport> = {
  title: "Input/Time",
  component: TimeDefaultExport,
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
    <TimeDefaultExport {...args} listener={mockListener} />
  </Box>
);


const DesignTokenTemplate = (args: any) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;

    return (
      <Box className="wm-app" style={{ padding: 16,}} data-design-token-target={dataAttr}>
        <TimeDefaultExport {...componentArgs} listener={mockListener} />
      </Box>
    );
  };

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14260&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsTime",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        {/* Title */}
        <Typography variant="h6" fontWeight={600}>
          Time Input Showcase
        </Typography>

        {/* Time Format */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Time Formats
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                12-Hour Format (h:mm a)
              </Typography>
              <TimeDefaultExport
                name="format12"
                timepattern="h:mm a"
                datavalue="CURRENT_TIME"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                24-Hour Format (HH:mm)
              </Typography>
              <TimeDefaultExport
                name="format24"
                timepattern="HH:mm"
                datavalue="CURRENT_TIME"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                12-Hour with Seconds (h:mm:ss a)
              </Typography>
              <TimeDefaultExport
                name="format12Seconds"
                timepattern="h:mm:ss a"
                datavalue="CURRENT_TIME"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            {/* <Box>
              <Typography variant="body2" mb={1}>
                24-Hour with Seconds (HH:mm:ss)
              </Typography>
              <TimeDefaultExport
                name="format24Seconds"
                timepattern="HH:mm:ss"
                datavalue="CURRENT_TIME"
                listener={mockListener}
              />
            </Box> */}
          </Stack>
        </Box>

        {/* Time Range */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Time Range
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Business Hours (9:00 AM – 5:00 PM)
              </Typography>
              <TimeDefaultExport
                name="businessRange"
                mintime="09:00:00"
                maxtime="17:00:00"
                timepattern="h:mm a"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            {/* <Box>
              <Typography variant="body2" mb={1}>
                Morning Shift (6:00 AM – 12:00 PM)
              </Typography>
              <TimeDefaultExport
                name="morningRange"
                mintime="06:00:00"
                maxtime="12:00:00"
                timepattern="h:mm a"
                listener={mockListener}
              />
            </Box> */}
          </Stack>
        </Box>

        {/* Hour Step */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Hour Step
          </Typography>

          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              2-Hour Interval
            </Typography>
            <TimeDefaultExport
              name="hourStep"
              hourstep={2}
              timepattern="HH:mm"
              listener={mockListener}
              dataentrymode="default"
            />
          </Box>
        </Box>

        {/* Minute Step */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Minute Step
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                5-Minute Interval
              </Typography>
              <TimeDefaultExport
                name="minuteStep5"
                minutestep={5}
                timepattern="HH:mm"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            {/* <Box>
              <Typography variant="body2" mb={1}>
                15-Minute Interval
              </Typography>
              <TimeDefaultExport
                name="minuteStep15"
                minutestep={15}
                timepattern="HH:mm"
                listener={mockListener}
              />
            </Box> */}
          </Stack>
        </Box>

        {/* Second Step */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Second Step
          </Typography>

          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              10-Second Interval
            </Typography>
            <TimeDefaultExport
              name="secondStep"
              secondsstep={10}
              timepattern="HH:mm:ss"
              listener={mockListener}
              dataentrymode="default"
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "timeShowcase",
    listener: mockListener,
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardTime",
    placeholder: "Select time",
    listener: mockListener,
    disabled: false,
    readonly: false,
    required: false,
    timepattern: "h:mm a",
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue: "CURRENT_TIME",
    "data-design-token-target":true
  },
  argTypes: {
    placeholder: { control: "text" },
    datavalue: { control: "text" },
    timepattern: { control: "select", options: ["h:mm a", "HH:mm", "h:mm:ss a", "HH:mm:ss"] },
    hourstep: { control: "number" },
    minutestep: { control: "number" },
    secondsstep: { control: "number" },
    outputformat: { control: "text" },
    mintime: { control: "text" },
    maxtime: { control: "text" },
    required: { control: "boolean" },
    autofocus: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }  
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: timeTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "timepicker",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};


// export const TimeFormat: Story = {
//   render: Template,
//   args: {
//     name: "timeFormat",
//     timepattern: "h:mm:ss a",
//     // datavalue: "14:30:00",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     dataentrymode: "default",
//     showdropdownon: "default",
//     datavalue: "CURRENT_TIME",
//   },
// };

// export const WithTimeRange: Story = {
//   render: Template,
//   args: {
//     name: "timeRange",
//     placeholder: "Business hours (9 AM - 5 PM)",
//     mintime: "09:00:00",
//     maxtime: "17:00:00",
//     timepattern: "h:mm a",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const HourStep: Story = {
//   render: Template,
//   args: {
//     name: "hourStep",
//     placeholder: "2-hour intervals",
//     hourstep: 2,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     // timepattern: "h:mm a",
//     timepattern: "HH:mm",
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const MinuteStep: Story = {
//   render: Template,
//   args: {
//     name: "minuteStep",
//     placeholder: "5-minute intervals",
//     minutestep: 5,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     timepattern: "HH:mm",
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const SecondsStep: Story = {
//   render: Template,
//   args: {
//     name: "secondsStep",
//     timepattern: "HH:mm:ss",
//     placeholder: "5-second intervals",
//     secondsstep: 5,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     required: false,
//     dataentrymode: "default",
//     showdropdownon: "default",
//   },
// };

// export const WithValue: Story = {
//   render: Template,
//   args: {
//     name: "timeWithValue",
//     placeholder: "Select time",
//     datavalue: "14:30:00",
//     listener: mockListener,
//   },
// };

// export const CurrentTime: Story = {
//   render: Template,
//   args: {
//     name: "currentTime",
//     placeholder: "Current time",
//     datavalue: "CURRENT_TIME",
//     listener: mockListener,
//   },
// };

// export const CustomPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "customPlaceholder",
//     placeholder: "Pick a time",
//     listener: mockListener,
//   },
// };

// export const TwelveHourFormat: Story = {
//   render: Template,
//   args: {
//     name: "time12Hour",
//     timepattern: "h:mm a",
//     datavalue: "14:30:00",
//     listener: mockListener,
//   },
// };

// export const TwentyFourHourFormat: Story = {
//   render: Template,
//   args: {
//     name: "time24Hour",
//     timepattern: "HH:mm",
//     datavalue: "14:30:00",
//     listener: mockListener,
//   },
// };

// export const WithSeconds12Hour: Story = {
//   render: Template,
//   args: {
//     name: "withSeconds12",
//     timepattern: "h:mm:ss a",
//     datavalue: "14:30:45",
//     listener: mockListener,
//   },
// };

// export const WithSeconds24Hour: Story = {
//   render: Template,
//   args: {
//     name: "withSeconds24",
//     timepattern: "HH:mm:ss",
//     datavalue: "14:30:45",
//     listener: mockListener,
//   },
// };


// export const MinuteStepFifteen: Story = {
//   render: Template,
//   args: {
//     name: "minuteStep15",
//     placeholder: "15-minute intervals",
//     minutestep: 15,
//     listener: mockListener,
//   },
// };

// export const MinuteStepThirty: Story = {
//   render: Template,
//   args: {
//     name: "minuteStep30",
//     placeholder: "30-minute intervals",
//     minutestep: 30,
//     listener: mockListener,
//   },
// };

// export const SecondsStepTen: Story = {
//   render: Template,
//   args: {
//     name: "secondsStep10",
//     timepattern: "HH:mm:ss",
//     placeholder: "10-second intervals",
//     secondsstep: 10,
//     listener: mockListener,
//   },
// };

// export const WithMinTime: Story = {
//   render: Template,
//   args: {
//     name: "minTime",
//     placeholder: "Min: 09:00 AM",
//     mintime: "09:00:00",
//     timepattern: "h:mm a",
//     listener: mockListener,
//   },
// };

// export const WithMaxTime: Story = {
//   render: Template,
//   args: {
//     name: "maxTime",
//     placeholder: "Max: 05:00 PM",
//     maxtime: "17:00:00",
//     timepattern: "h:mm a",
//     listener: mockListener,
//   },
// };

// export const MorningHours: Story = {
//   render: Template,
//   args: {
//     name: "morningHours",
//     placeholder: "Morning (6 AM - 12 PM)",
//     mintime: "06:00:00",
//     maxtime: "12:00:00",
//     timepattern: "h:mm a",
//     listener: mockListener,
//   },
// };

// export const AfternoonHours: Story = {
//   render: Template,
//   args: {
//     name: "afternoonHours",
//     placeholder: "Afternoon (12 PM - 6 PM)",
//     mintime: "12:00:00",
//     maxtime: "18:00:00",
//     timepattern: "h:mm a",
//     listener: mockListener,
//   },
// };

// export const EveningHours: Story = {
//   render: Template,
//   args: {
//     name: "eveningHours",
//     placeholder: "Evening (6 PM - 11 PM)",
//     mintime: "18:00:00",
//     maxtime: "23:00:00",
//     timepattern: "h:mm a",
//     listener: mockListener,
//   },
// };

// export const DisabledTime: Story = {
//   render: Template,
//   args: {
//     name: "disabledTime",
//     placeholder: "Disabled",
//     datavalue: "14:30:00",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyTime: Story = {
//   render: Template,
//   args: {
//     name: "readonlyTime",
//     placeholder: "Readonly",
//     datavalue: "14:30:00",
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const RequiredTime: Story = {
//   render: Template,
//   args: {
//     name: "requiredTime",
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
//     placeholder: "Click icon to open",
//     showdropdownon: "button",
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintTime",
//     placeholder: "Hover for hint",
//     hint: "Select your preferred time",
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaTime",
//     placeholder: "Select time",
//     arialabel: "Meeting time selection",
//     listener: mockListener,
//   },
// };

// export const WithShortcutKey: Story = {
//   render: Template,
//   args: {
//     name: "shortcutTime",
//     placeholder: "Press Alt+T to focus",
//     shortcutkey: "t",
//     listener: mockListener,
//   },
// };

// export const WithCustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClass",
//     placeholder: "Custom class",
//     className: "custom-time-class",
//     listener: mockListener,
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledTime",
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
//     const [selectedTime, setSelectedTime] = useState<string>("");

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveTime: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedTime(data.datavalue || "");
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Time Demo</Typography>
//           <TimeDefaultExport
//             name="interactiveTime"
//             placeholder="Select a time"
//             datavalue={selectedTime}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Time:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedTime || "No time selected"}
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
//     const sampleTime = "14:30:45";
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Time Format Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               12-Hour Format (h:mm a)
//             </Typography>
//             <TimeDefaultExport
//               name="format12Hour"
//               timepattern="h:mm a"
//               datavalue={sampleTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               24-Hour Format (HH:mm)
//             </Typography>
//             <TimeDefaultExport
//               name="format24Hour"
//               timepattern="HH:mm"
//               datavalue={sampleTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               12-Hour with Seconds (h:mm:ss a)
//             </Typography>
//             <TimeDefaultExport
//               name="format12HourSeconds"
//               timepattern="h:mm:ss a"
//               datavalue={sampleTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               24-Hour with Seconds (HH:mm:ss)
//             </Typography>
//             <TimeDefaultExport
//               name="format24HourSeconds"
//               timepattern="HH:mm:ss"
//               datavalue={sampleTime}
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
//             <TimeDefaultExport
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
//             <TimeDefaultExport
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
//             <TimeDefaultExport
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
//             <TimeDefaultExport
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

// export const TimeRangeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Time Range Examples
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Business Hours (9 AM - 5 PM)
//             </Typography>
//             <TimeDefaultExport
//               name="businessHours"
//               placeholder="Business hours"
//               mintime="09:00:00"
//               maxtime="17:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Morning Shift (6 AM - 2 PM)
//             </Typography>
//             <TimeDefaultExport
//               name="morningShift"
//               placeholder="Morning shift"
//               mintime="06:00:00"
//               maxtime="14:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Evening Shift (2 PM - 10 PM)
//             </Typography>
//             <TimeDefaultExport
//               name="eveningShift"
//               placeholder="Evening shift"
//               mintime="14:00:00"
//               maxtime="22:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Night Shift (10 PM - 6 AM)
//             </Typography>
//             <TimeDefaultExport
//               name="nightShift"
//               placeholder="Night shift"
//               mintime="22:00:00"
//               maxtime="06:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "rangeComparison",
//     listener: mockListener,
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     const sampleTime = "14:30:00";
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
//             <TimeDefaultExport
//               name="normalState"
//               placeholder="Select time"
//               datavalue={sampleTime}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <TimeDefaultExport
//               name="disabledState"
//               placeholder="Disabled"
//               datavalue={sampleTime}
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <TimeDefaultExport
//               name="readonlyState"
//               placeholder="Readonly"
//               datavalue={sampleTime}
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <TimeDefaultExport
//               name="requiredState"
//               placeholder="Required"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Current Time (Live Update)
//             </Typography>
//             <TimeDefaultExport
//               name="currentState"
//               datavalue="CURRENT_TIME"
//               timepattern="h:mm:ss a"
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
//           Doctor Appointment Form
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
//               Appointment Time *
//             </Typography>
//             <Typography variant="caption" color="text.secondary" display="block" mb={1}>
//               Available: 9:00 AM - 5:00 PM (15-minute intervals)
//             </Typography>
//             <TimeDefaultExport
//               name="appointmentTime"
//               placeholder="Select appointment time"
//               required={true}
//               mintime="09:00:00"
//               maxtime="17:00:00"
//               minutestep={15}
//               timepattern="h:mm a"
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
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Meeting Scheduler
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Meeting Start Time *
//             </Typography>
//             <TimeDefaultExport
//               name="meetingStart"
//               placeholder="Select start time"
//               required={true}
//               mintime="08:00:00"
//               maxtime="18:00:00"
//               minutestep={30}
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Meeting End Time *
//             </Typography>
//             <TimeDefaultExport
//               name="meetingEnd"
//               placeholder="Select end time"
//               required={true}
//               mintime="08:00:00"
//               maxtime="18:00:00"
//               minutestep={30}
//               timepattern="h:mm a"
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

// export const RestaurantBookingExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Restaurant Reservation
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             Select your preferred dining time
//           </Typography>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Lunch Time (11:30 AM - 2:30 PM)
//             </Typography>
//             <TimeDefaultExport
//               name="lunchTime"
//               placeholder="Select lunch time"
//               mintime="11:30:00"
//               maxtime="14:30:00"
//               minutestep={15}
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Dinner Time (5:30 PM - 10:00 PM)
//             </Typography>
//             <TimeDefaultExport
//               name="dinnerTime"
//               placeholder="Select dinner time"
//               mintime="17:30:00"
//               maxtime="22:00:00"
//               minutestep={15}
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "restaurantExample",
//     listener: mockListener,
//   },
// };

// export const AlarmClockExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Set Alarm
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Alarm Time *
//             </Typography>
//             <TimeDefaultExport
//               name="alarmTime"
//               placeholder="Set alarm time"
//               required={true}
//               timepattern="h:mm a"
//               minutestep={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Snooze Duration
//             </Typography>
//             <TimeDefaultExport
//               name="snoozeDuration"
//               placeholder="Snooze for"
//               timepattern="HH:mm"
//               datavalue="00:05:00"
//               minutestep={5}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "alarmExample",
//     listener: mockListener,
//   },
// };

// export const WorkScheduleExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Work Schedule
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Clock In Time
//             </Typography>
//             <TimeDefaultExport
//               name="clockIn"
//               placeholder="Clock in"
//               mintime="06:00:00"
//               maxtime="10:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Break Start
//             </Typography>
//             <TimeDefaultExport
//               name="breakStart"
//               placeholder="Break start"
//               timepattern="h:mm a"
//               minutestep={15}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Break End
//             </Typography>
//             <TimeDefaultExport
//               name="breakEnd"
//               placeholder="Break end"
//               timepattern="h:mm a"
//               minutestep={15}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Clock Out Time
//             </Typography>
//             <TimeDefaultExport
//               name="clockOut"
//               placeholder="Clock out"
//               mintime="14:00:00"
//               maxtime="20:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "workScheduleExample",
//     listener: mockListener,
//   },
// };

// export const LiveClockExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Current Time (Live)
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2" color="text.secondary">
//             This field updates every second to show the current time.
//           </Typography>
//           <TimeDefaultExport
//             name="liveClock"
//             datavalue="CURRENT_TIME"
//             timepattern="h:mm:ss a"
//             listener={mockListener}
//           />
//           <TimeDefaultExport
//             name="liveClock24"
//             datavalue="CURRENT_TIME"
//             timepattern="HH:mm:ss"
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
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Time Validation Examples
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Required Field
//             </Typography>
//             <TimeDefaultExport
//               name="requiredValidation"
//               placeholder="This field is required"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Time Range (9 AM - 5 PM)
//             </Typography>
//             <TimeDefaultExport
//               name="rangeValidation"
//               placeholder="Business hours only"
//               mintime="09:00:00"
//               maxtime="17:00:00"
//               timepattern="h:mm a"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               15-Minute Intervals
//             </Typography>
//             <TimeDefaultExport
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
