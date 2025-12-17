import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CalendarDefaultExport from "../../../../components/input/calendar/index";

const meta: Meta<typeof CalendarDefaultExport> = {
  title: "Input/Calendar",
  component: CalendarDefaultExport,
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
    eventtitle: { control: "text" },
    eventstart: { control: "text" },
    eventend: { control: "text" },
    eventallday: { control: "text" },
    eventclass: { control: "text" },
    tabindex: { control: "number" },
  },
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

// Sample events dataset
const sampleEvents = [
  {
    title: "Team Meeting",
    start: "2024-01-15T10:00:00",
    end: "2024-01-15T11:00:00",
    allday: false,
    className: "event-primary",
  },
  {
    title: "Project Deadline",
    start: "2024-01-20",
    end: "2024-01-20",
    allday: true,
    className: "event-danger",
  },
  {
    title: "Conference",
    start: "2024-01-25T09:00:00",
    end: "2024-01-25T17:00:00",
    allday: false,
    className: "event-success",
  },
  {
    title: "Lunch with Client",
    start: "2024-01-18T12:00:00",
    end: "2024-01-18T13:30:00",
    allday: false,
    className: "event-info",
  },
  {
    title: "Workshop",
    start: "2024-01-22T14:00:00",
    end: "2024-01-22T16:00:00",
    allday: false,
    className: "event-warning",
  },
];

const multiDayEvents = [
  {
    title: "Company Retreat",
    start: "2024-01-10",
    end: "2024-01-13",
    allday: true,
    className: "event-primary",
  },
  {
    title: "Training Week",
    start: "2024-01-15",
    end: "2024-01-20",
    allday: true,
    className: "event-success",
  },
  {
    title: "Vacation",
    start: "2024-01-25",
    end: "2024-02-02",
    allday: true,
    className: "event-info",
  },
];

const recurringEvents = [
  {
    title: "Daily Standup",
    start: "2024-01-15T09:00:00",
    end: "2024-01-15T09:15:00",
    allday: false,
    className: "event-primary",
  },
  {
    title: "Weekly Review",
    start: "2024-01-19T16:00:00",
    end: "2024-01-19T17:00:00",
    allday: false,
    className: "event-success",
  },
];

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <CalendarDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Default: Story = {
  render: Template,
  args: {
    name: "calendar1",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    selectionmode: "none",
    controls: "navigation, today, year, month, week, day",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const MonthView: Story = {
  render: Template,
  args: {
    name: "monthView",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const WeekView: Story = {
  render: Template,
  args: {
    name: "weekView",
    listener: mockListener,
    view: "week",
    calendartype: "basic",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const DayView: Story = {
  render: Template,
  args: {
    name: "dayView",
    listener: mockListener,
    view: "day",
    calendartype: "basic",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const AgendaView: Story = {
  render: Template,
  args: {
    name: "agendaView",
    listener: mockListener,
    view: "week",
    calendartype: "agenda",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const ListView: Story = {
  render: Template,
  args: {
    name: "listView",
    listener: mockListener,
    view: "month",
    calendartype: "list",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const SingleSelection: Story = {
  render: Template,
  args: {
    name: "singleSelection",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    selectionmode: "single",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const MultipleSelection: Story = {
  render: Template,
  args: {
    name: "multipleSelection",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    selectionmode: "multiple",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const NoSelection: Story = {
  render: Template,
  args: {
    name: "noSelection",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    selectionmode: "none",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const WithMultiDayEvents: Story = {
  render: Template,
  args: {
    name: "multiDayEvents",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    height: "600px",
    width: "100%",
    dataset: multiDayEvents,
  },
};

export const EmptyCalendar: Story = {
  render: Template,
  args: {
    name: "emptyCalendar",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    height: "600px",
    width: "100%",
    dataset: [],
  },
};

export const NavigationOnly: Story = {
  render: Template,
  args: {
    name: "navigationOnly",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    controls: "navigation",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const TodayButtonOnly: Story = {
  render: Template,
  args: {
    name: "todayOnly",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    controls: "today",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const MinimalControls: Story = {
  render: Template,
  args: {
    name: "minimalControls",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    controls: "navigation, today",
    height: "600px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const CompactCalendar: Story = {
  render: Template,
  args: {
    name: "compactCalendar",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    height: "400px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const LargeCalendar: Story = {
  render: Template,
  args: {
    name: "largeCalendar",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    height: "800px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const AllViewTypes: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Month View (Basic)
            </Typography>
            <CalendarDefaultExport
              name="viewMonth"
              view="month"
              calendartype="basic"
              height="500px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Week View (Agenda)
            </Typography>
            <CalendarDefaultExport
              name="viewWeek"
              view="week"
              calendartype="agenda"
              height="500px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              List View
            </Typography>
            <CalendarDefaultExport
              name="viewList"
              view="month"
              calendartype="list"
              height="400px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "allViews",
    listener: mockListener,
  },
};

export const SelectionModes: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              No Selection (View Only)
            </Typography>
            <CalendarDefaultExport
              name="selectionNone"
              view="month"
              calendartype="basic"
              selectionmode="none"
              height="400px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Single Day Selection
            </Typography>
            <CalendarDefaultExport
              name="selectionSingle"
              view="month"
              calendartype="basic"
              selectionmode="single"
              height="400px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Multiple Days Selection (Click and Drag)
            </Typography>
            <CalendarDefaultExport
              name="selectionMultiple"
              view="month"
              calendartype="basic"
              selectionmode="multiple"
              height="400px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "selectionModes",
    listener: mockListener,
  },
};

export const ProjectPlanner: Story = {
  render: () => {
    const projectEvents = [
      {
        title: "Project Kickoff",
        start: "2024-01-08",
        end: "2024-01-08",
        allday: true,
        className: "event-success",
      },
      {
        title: "Design Phase",
        start: "2024-01-09",
        end: "2024-01-15",
        allday: true,
        className: "event-primary",
      },
      {
        title: "Development Sprint 1",
        start: "2024-01-16",
        end: "2024-01-26",
        allday: true,
        className: "event-info",
      },
      {
        title: "QA Testing",
        start: "2024-01-27",
        end: "2024-01-31",
        allday: true,
        className: "event-warning",
      },
      {
        title: "Project Launch",
        start: "2024-02-01",
        end: "2024-02-01",
        allday: true,
        className: "event-danger",
      },
    ];

    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={2}>
          Project Timeline
        </Typography>
        <CalendarDefaultExport
          name="projectPlanner"
          view="month"
          calendartype="basic"
          selectionmode="multiple"
          height="600px"
          width="100%"
          dataset={projectEvents}
          listener={mockListener}
        />
      </Box>
    );
  },
  args: {
    name: "projectPlanner",
    listener: mockListener,
  },
};

export const MeetingScheduler: Story = {
  render: () => {
    const meetings = [
      {
        title: "Morning Standup",
        start: "2024-01-15T09:00:00",
        end: "2024-01-15T09:30:00",
        allday: false,
        className: "event-primary",
      },
      {
        title: "Client Call",
        start: "2024-01-15T11:00:00",
        end: "2024-01-15T12:00:00",
        allday: false,
        className: "event-success",
      },
      {
        title: "Lunch Break",
        start: "2024-01-15T12:00:00",
        end: "2024-01-15T13:00:00",
        allday: false,
        className: "event-info",
      },
      {
        title: "Sprint Planning",
        start: "2024-01-15T14:00:00",
        end: "2024-01-15T16:00:00",
        allday: false,
        className: "event-warning",
      },
      {
        title: "Code Review",
        start: "2024-01-15T16:30:00",
        end: "2024-01-15T17:30:00",
        allday: false,
        className: "event-danger",
      },
    ];

    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={2}>
          Daily Meeting Schedule
        </Typography>
        <CalendarDefaultExport
          name="meetingScheduler"
          view="day"
          calendartype="agenda"
          height="700px"
          width="100%"
          dataset={meetings}
          listener={mockListener}
        />
      </Box>
    );
  },
  args: {
    name: "meetingScheduler",
    listener: mockListener,
  },
};

export const TeamCalendar: Story = {
  render: () => {
    const teamEvents = [
      {
        title: "John - Vacation",
        start: "2024-01-10",
        end: "2024-01-15",
        allday: true,
        className: "event-info",
      },
      {
        title: "Sarah - Conference",
        start: "2024-01-18",
        end: "2024-01-20",
        allday: true,
        className: "event-success",
      },
      {
        title: "Team Building Event",
        start: "2024-01-25",
        end: "2024-01-25",
        allday: true,
        className: "event-warning",
      },
      {
        title: "Mike - Remote Work",
        start: "2024-01-22",
        end: "2024-01-26",
        allday: true,
        className: "event-primary",
      },
    ];

    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={2}>
          Team Availability Calendar
        </Typography>
        <CalendarDefaultExport
          name="teamCalendar"
          view="month"
          calendartype="basic"
          height="600px"
          width="100%"
          dataset={teamEvents}
          listener={mockListener}
        />
      </Box>
    );
  },
  args: {
    name: "teamCalendar",
    listener: mockListener,
  },
};

export const EventList: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={2}>
          Upcoming Events (List View)
        </Typography>
        <CalendarDefaultExport
          name="eventList"
          view="month"
          calendartype="list"
          controls="navigation, today"
          height="500px"
          width="100%"
          dataset={sampleEvents}
          listener={mockListener}
        />
      </Box>
    );
  },
  args: {
    name: "eventList",
    listener: mockListener,
  },
};

export const CompactSchedule: Story = {
  render: Template,
  args: {
    name: "compactSchedule",
    listener: mockListener,
    view: "week",
    calendartype: "agenda",
    controls: "navigation, today, week, day",
    height: "450px",
    width: "100%",
    dataset: sampleEvents,
  },
};

export const CustomHeight: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Small Calendar (300px)
            </Typography>
            <CalendarDefaultExport
              name="heightSmall"
              view="month"
              calendartype="basic"
              height="300px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Medium Calendar (500px)
            </Typography>
            <CalendarDefaultExport
              name="heightMedium"
              view="month"
              calendartype="basic"
              height="500px"
              width="100%"
              dataset={sampleEvents}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "customHeight",
    listener: mockListener,
  },
};

export const ResponsiveCalendar: Story = {
  render: Template,
  args: {
    name: "responsiveCalendar",
    listener: mockListener,
    view: "month",
    calendartype: "basic",
    height: "auto",
    width: "100%",
    dataset: sampleEvents,
    styles: {
      maxWidth: "900px",
      margin: "0 auto",
    },
  },
};

export const CalendarWithCustomEvents: Story = {
  render: () => {
    const customEvents = [
      {
        title: "🎂 Birthday Party",
        start: "2024-01-16",
        end: "2024-01-16",
        allday: true,
        className: "event-primary",
      },
      {
        title: "📚 Book Club Meeting",
        start: "2024-01-18T18:00:00",
        end: "2024-01-18T20:00:00",
        allday: false,
        className: "event-success",
      },
      {
        title: "🏃 Morning Run",
        start: "2024-01-20T06:00:00",
        end: "2024-01-20T07:00:00",
        allday: false,
        className: "event-info",
      },
      {
        title: "🎵 Concert",
        start: "2024-01-25T19:00:00",
        end: "2024-01-25T22:00:00",
        allday: false,
        className: "event-warning",
      },
    ];

    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={2}>
          Personal Calendar
        </Typography>
        <CalendarDefaultExport
          name="customEvents"
          view="month"
          calendartype="basic"
          height="600px"
          width="100%"
          dataset={customEvents}
          listener={mockListener}
        />
      </Box>
    );
  },
  args: {
    name: "customEvents",
    listener: mockListener,
  },
};
