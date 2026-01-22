import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CalendarDefaultExport from "../../../../components/input/calendar/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import calendarTokensData from "../../../../designTokens/components/calendar/calendar.json";

const meta: Meta<typeof CalendarDefaultExport> = {
  title: "Input/Calendar",
  component: CalendarDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
    LABEL_CALENDAR_YEAR: "Year",
    LABEL_CALENDAR_MONTH: "Month",
    LABEL_CALENDAR_WEEK: "Week",
    LABEL_CALENDAR_DAY: "Day",
    LABEL_CALENDAR_TODAY: "Today",
  },
  Widgets: {},
  onChange: () => {},
};

// ------------------
// Date helpers
// ------------------
const createDateTime = (
  base: Date,
  dayOffset: number,
  hour: number,
  minute: number
) => {
  const d = new Date(base);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const addMinutes = (iso: string, minutes: number) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() + minutes);
  return d.toISOString();
};

// ------------------
// Dynamic meeting events (SAFE)
// ------------------
const createMeetingEvents = () => {
  const today = new Date();

  return [
    {
      title: "Team Standup (30 mins)",
      start: createDateTime(today, 0, 10, 0),
      end: addMinutes(createDateTime(today, 0, 10, 0), 30),
      allday: false,
      className: "event-primary",
    },
    {
      title: "Client Call (1 hour)",
      start: createDateTime(today, 1, 12, 30),
      end: addMinutes(createDateTime(today, 1, 12, 30), 60),
      allday: false,
      className: "event-info",
    },
    {
      title: "Workshop (2 hours)",
      start: createDateTime(today, 2, 14, 0),
      end: addMinutes(createDateTime(today, 2, 14, 0), 120),
      allday: false,
      className: "event-warning",
    },
    {
      title: "Project Review (1.5 hrs)",
      start: createDateTime(today, 3, 11, 0),
      end: addMinutes(createDateTime(today, 3, 11, 0), 90),
      allday: false,
      className: "event-success",
    },
    {
      title: "Company Holiday",
      start: createDateTime(today, 4, 0, 0),
      end: createDateTime(today, 4, 23, 59),
      allday: true,
      className: "event-danger",
    },
  ];
};

const meetingEvents = createMeetingEvents();

// ------------------
// Dynamic multi-day events (current month)
// ------------------
const createMultiDayEvents = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // current month (0-based)

  const date = (day: number) =>
    new Date(year, month, day).toISOString().split("T")[0];

  return [
    {
      title: "Company Retreat",
      start: date(5),
      end: date(8),
      allday: true,
      className: "event-primary",
    },
    {
      title: "Training Program",
      start: date(12),
      end: date(16),
      allday: true,
      className: "event-success",
    },
    {
      title: "Annual Leave",
      start: date(20),
      end: date(25),
      allday: true,
      className: "event-info",
    },
  ];
};

const multiDayEvents = createMultiDayEvents();


// Sample events dataset
// const sampleEvents = [
//   {
//     title: "Team Meeting",
//     start: "2024-01-15T10:00:00",
//     end: "2024-01-15T11:00:00",
//     allday: false,
//     className: "event-primary",
//   },
//   {
//     title: "Project Deadline",
//     start: "2024-01-20",
//     end: "2024-01-20",
//     allday: true,
//     className: "event-danger",
//   },
//   {
//     title: "Conference",
//     start: "2024-01-25T09:00:00",
//     end: "2024-01-25T17:00:00",
//     allday: false,
//     className: "event-success",
//   },
//   {
//     title: "Lunch with Client",
//     start: "2024-01-18T12:00:00",
//     end: "2024-01-18T13:30:00",
//     allday: false,
//     className: "event-info",
//   },
//   {
//     title: "Workshop",
//     start: "2024-01-22T14:00:00",
//     end: "2024-01-22T16:00:00",
//     allday: false,
//     className: "event-warning",
//   },
// ];

const Template = (args: any) => {
    // component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
  
    return (
      <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <CalendarDefaultExport {...componentArgs} listener={mockListener} />
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
    />
  ),
  args:{
    name:"docsCalendar",
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
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={6}>

          {/* Month – Basic */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Month View (Basic)
            </Typography>
            <CalendarDefaultExport
              name="monthBasic"
              view="month"
              calendartype="basic"
              height="500px"
              width="100%"
              dataset={meetingEvents}
              listener={mockListener}
            />
          </Box>

          {/* Week – Basic */}
          {/* <Box>
            <Typography variant="h6" gutterBottom>
              Week View (Basic)
            </Typography>
            <CalendarDefaultExport
              name="weekBasic"
              view="week"
              calendartype="basic"
              height="500px"
              width="100%"
              dataset={meetingEvents}
              listener={mockListener}
            />
          </Box> */}

          {/* Day – Basic */}
          {/* <Box>
            <Typography variant="h6" gutterBottom>
              Day View (Basic)
            </Typography>
            <CalendarDefaultExport
              name="dayBasic"
              view="day"
              calendartype="basic"
              height="500px"
              width="100%"
              dataset={meetingEvents}
              listener={mockListener}
            />
          </Box> */}

          {/* List View */}
          <Box>
            <Typography variant="h6" gutterBottom>
              List View
            </Typography>
            <CalendarDefaultExport
              name="listView"
              view="month"
              calendartype="list"
              height="400px"
              width="100%"
              dataset={meetingEvents}
              listener={mockListener}
            />
          </Box>

          {/* Week – Agenda */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Week View (Agenda)
            </Typography>
            <CalendarDefaultExport
              name="weekAgenda"
              view="week"
              calendartype="agenda"
              height="500px"
              width="100%"
              dataset={meetingEvents}
              listener={mockListener}
            />
          </Box>

          {/* Day – Agenda */}
          {/* <Box>
            <Typography variant="h6" gutterBottom>
              Day View (Agenda)
            </Typography>
            <CalendarDefaultExport
              name="dayAgenda"
              view="day"
              calendartype="agenda"
              height="500px"
              width="100%"
              dataset={meetingEvents}
              listener={mockListener}
            />
          </Box> */}
          {/* Month – Multi-Day Events */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Month View (Multi-Day Events)
            </Typography>
            <CalendarDefaultExport
              name="monthMultiDay"
              view="month"
              calendartype="basic"
              height="500px"
              width="100%"
              dataset={multiDayEvents}
              listener={mockListener}
            />
          </Box>

        </Stack>
      </Box>
    );
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardCalendar",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    selectionmode: "single",
    controls: "navigation, today, year, month, week, day",
    height: "600px",
    width: "100%",
    dataset: meetingEvents,
    "data-design-token-target":true
  },
  argTypes: {
    view: {
      control: { type: "select" },
      options: ["month", "week", "day", "year"],
    },
    calendartype: {
      control: { type: "select" },
      options: ["basic", "agenda", "list"],
    },
    selectionmode: {
      control: { type: "select" },
      options: ["none", "single", "multiple"],
    },
    controls: { control: "text" },
    height: { control: "text" },
    width: { control: "text" },
    // eventtitle: { control: "text" },
    // eventstart: { control: "text" },
    // eventend: { control: "text" },
    // eventallday: { control: "boolean" },
    // eventclass: { control: "text" },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: calendarTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "calendar",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};