import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import SliderDefaultExport from "../../../../components/input/slider/index";

const meta: Meta<typeof SliderDefaultExport> = {
  title: "Input/Slider",
  component: SliderDefaultExport,
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    hint: { control: "text" },
    shortcutkey: { control: "text" },
    tabindex: { control: "number" },
    width: { control: "text" },
    height: { control: "text" },
    className: { control: "text" },
  },
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
    <SliderDefaultExport {...args} listener={mockListener} />
  </Box>
);

// Basic Examples
export const Default: Story = {
  render: Template,
  args: {
    name: "defaultSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    listener: mockListener,
  },
};

export const WithCustomRange: Story = {
  render: Template,
  args: {
    name: "customRangeSlider",
    datavalue: 5,
    minvalue: 0,
    maxvalue: 10,
    step: 1,
    listener: mockListener,
  },
};

export const NegativeRange: Story = {
  render: Template,
  args: {
    name: "negativeRangeSlider",
    datavalue: 0,
    minvalue: -100,
    maxvalue: 100,
    step: 10,
    listener: mockListener,
  },
};

export const LargeRange: Story = {
  render: Template,
  args: {
    name: "largeRangeSlider",
    datavalue: 500,
    minvalue: 0,
    maxvalue: 1000,
    step: 50,
    listener: mockListener,
  },
};

export const SmallRange: Story = {
  render: Template,
  args: {
    name: "smallRangeSlider",
    datavalue: 0.5,
    minvalue: 0,
    maxvalue: 1,
    step: 0.1,
    listener: mockListener,
  },
};

// Step Variations
export const StepOne: Story = {
  render: Template,
  args: {
    name: "stepOneSlider",
    datavalue: 25,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    listener: mockListener,
  },
};

export const StepFive: Story = {
  render: Template,
  args: {
    name: "stepFiveSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 5,
    listener: mockListener,
  },
};

export const StepTen: Story = {
  render: Template,
  args: {
    name: "stepTenSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 10,
    listener: mockListener,
  },
};

export const StepTwentyFive: Story = {
  render: Template,
  args: {
    name: "stepTwentyFiveSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 25,
    listener: mockListener,
  },
};

export const DecimalStep: Story = {
  render: Template,
  args: {
    name: "decimalStepSlider",
    datavalue: 2.5,
    minvalue: 0,
    maxvalue: 5,
    step: 0.5,
    listener: mockListener,
  },
};

// State Variations
export const Disabled: Story = {
  render: Template,
  args: {
    name: "disabledSlider",
    datavalue: 60,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    disabled: true,
    listener: mockListener,
  },
};

export const Readonly: Story = {
  render: Template,
  args: {
    name: "readonlySlider",
    datavalue: 60,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    readonly: true,
    listener: mockListener,
  },
};

export const WithHint: Story = {
  render: Template,
  args: {
    name: "hintSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    hint: "Adjust the slider value",
    listener: mockListener,
  },
};

// Size Variations
export const CustomWidth: Story = {
  render: Template,
  args: {
    name: "customWidthSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    width: "400px",
    listener: mockListener,
  },
};

export const FullWidth: Story = {
  render: Template,
  args: {
    name: "fullWidthSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    width: "100%",
    listener: mockListener,
  },
};

// State Comparison
export const StateComparison: Story = {
  render: () => (
    <Stack spacing={3} padding={2}>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Normal (Value: 50)
        </Typography>
        <SliderDefaultExport
          name="normalSlider"
          datavalue={50}
          minvalue={0}
          maxvalue={100}
          step={1}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Disabled (Value: 75)
        </Typography>
        <SliderDefaultExport
          name="disabledStateSlider"
          datavalue={75}
          minvalue={0}
          maxvalue={100}
          step={1}
          disabled={true}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Readonly (Value: 25)
        </Typography>
        <SliderDefaultExport
          name="readonlyStateSlider"
          datavalue={25}
          minvalue={0}
          maxvalue={100}
          step={1}
          readonly={true}
          listener={mockListener}
        />
      </Box>
    </Stack>
  ),
};

// Step Comparison
export const StepComparison: Story = {
  render: () => (
    <Stack spacing={3} padding={2} maxWidth={600}>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Step: 1 (Fine control)
        </Typography>
        <SliderDefaultExport
          name="step1Slider"
          datavalue={50}
          minvalue={0}
          maxvalue={100}
          step={1}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Step: 10 (Coarse control)
        </Typography>
        <SliderDefaultExport
          name="step10Slider"
          datavalue={50}
          minvalue={0}
          maxvalue={100}
          step={10}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Step: 25 (Very coarse control)
        </Typography>
        <SliderDefaultExport
          name="step25Slider"
          datavalue={50}
          minvalue={0}
          maxvalue={100}
          step={25}
          listener={mockListener}
        />
      </Box>
    </Stack>
  ),
};

// Interactive Examples
export const InteractiveSlider: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    const customListener = {
      appLocale: {
        LABEL_ICON: "Icon",
      },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setValue(data.datavalue);
      },
    };

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Interactive Slider
        </Typography>
        <SliderDefaultExport
          name="interactiveSlider"
          datavalue={value}
          minvalue={0}
          maxvalue={100}
          step={1}
          listener={customListener}
        />
        <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
          <Typography variant="h4" color="primary" textAlign="center">
            {value}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const InteractiveWithReset: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    const customListener = {
      appLocale: {
        LABEL_ICON: "Icon",
      },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setValue(data.datavalue);
      },
    };

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Interactive Slider with Reset
        </Typography>
        <SliderDefaultExport
          name="interactiveResetSlider"
          datavalue={value}
          minvalue={0}
          maxvalue={100}
          step={1}
          listener={customListener}
        />
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="primary">
            Value: {value}
          </Typography>
          <Button variant="outlined" onClick={() => setValue(50)}>
            Reset
          </Button>
        </Box>
      </Box>
    );
  },
};

export const MultipleSliders: Story = {
  render: () => {
    const [red, setRed] = useState(128);
    const [green, setGreen] = useState(128);
    const [blue, setBlue] = useState(128);

    const redListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setRed(data.datavalue),
    };

    const greenListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setGreen(data.datavalue),
    };

    const blueListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setBlue(data.datavalue),
    };

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          RGB Color Mixer
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="error" mb={1}>
              Red: {red}
            </Typography>
            <SliderDefaultExport
              name="redSlider"
              datavalue={red}
              minvalue={0}
              maxvalue={255}
              step={1}
              listener={redListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="success.main" mb={1}>
              Green: {green}
            </Typography>
            <SliderDefaultExport
              name="greenSlider"
              datavalue={green}
              minvalue={0}
              maxvalue={255}
              step={1}
              listener={greenListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="info.main" mb={1}>
              Blue: {blue}
            </Typography>
            <SliderDefaultExport
              name="blueSlider"
              datavalue={blue}
              minvalue={0}
              maxvalue={255}
              step={1}
              listener={blueListener}
            />
          </Box>
          <Box
            mt={2}
            p={3}
            borderRadius={1}
            border="1px solid #ddd"
            bgcolor={`rgb(${red}, ${green}, ${blue})`}
          >
            <Typography
              variant="body2"
              textAlign="center"
              color={red + green + blue > 382 ? "black" : "white"}
            >
              rgb({red}, {green}, {blue})
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
};

// Real-world Examples
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(50);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setVolume(data.datavalue),
    };

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Volume Control
        </Typography>
        <SliderDefaultExport
          name="volumeSlider"
          datavalue={volume}
          minvalue={0}
          maxvalue={100}
          step={1}
          listener={customListener}
        />
        <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1} textAlign="center">
          <Typography variant="h5" color="primary">
            🔊 {volume}%
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = useState(75);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setBrightness(data.datavalue),
    };

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Screen Brightness
        </Typography>
        <SliderDefaultExport
          name="brightnessSlider"
          datavalue={brightness}
          minvalue={0}
          maxvalue={100}
          step={5}
          listener={customListener}
        />
        <Box
          mt={2}
          p={3}
          bgcolor={`rgba(255, 255, 0, ${brightness / 100})`}
          borderRadius={1}
          border="1px solid #ddd"
          textAlign="center"
        >
          <Typography variant="h5">☀️ {brightness}%</Typography>
        </Box>
      </Box>
    );
  },
};

export const TemperatureControl: Story = {
  render: () => {
    const [temperature, setTemperature] = useState(22);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setTemperature(data.datavalue),
    };

    const getTemperatureColor = (temp: number) => {
      if (temp < 18) return "#2196F3"; // Blue (cold)
      if (temp < 24) return "#4CAF50"; // Green (comfortable)
      return "#FF5722"; // Red (hot)
    };

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Thermostat Control
        </Typography>
        <SliderDefaultExport
          name="temperatureSlider"
          datavalue={temperature}
          minvalue={16}
          maxvalue={30}
          step={0.5}
          listener={customListener}
        />
        <Box
          mt={2}
          p={3}
          bgcolor={getTemperatureColor(temperature)}
          borderRadius={1}
          textAlign="center"
        >
          <Typography variant="h4" color="white">
            {temperature}°C
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const PriceRangeFilter: Story = {
  render: () => {
    const [minPrice, setMinPrice] = useState(100);
    const [maxPrice, setMaxPrice] = useState(500);

    const minListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        const newMin = data.datavalue;
        setMinPrice(Math.min(newMin, maxPrice - 50));
      },
    };

    const maxListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        const newMax = data.datavalue;
        setMaxPrice(Math.max(newMax, minPrice + 50));
      },
    };

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Price Range Filter
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Minimum Price: ${minPrice}
            </Typography>
            <SliderDefaultExport
              name="minPriceSlider"
              datavalue={minPrice}
              minvalue={0}
              maxvalue={1000}
              step={10}
              listener={minListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Maximum Price: ${maxPrice}
            </Typography>
            <SliderDefaultExport
              name="maxPriceSlider"
              datavalue={maxPrice}
              minvalue={0}
              maxvalue={1000}
              step={10}
              listener={maxListener}
            />
          </Box>
          <Box mt={2} p={2} bgcolor="#e3f2fd" borderRadius={1}>
            <Typography variant="body1" textAlign="center">
              Price Range: <strong>${minPrice} - ${maxPrice}</strong>
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
};

export const ProgressTracker: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setProgress(data.datavalue),
    };

    const getProgressStatus = () => {
      if (progress === 0) return { text: "Not Started", color: "#9e9e9e" };
      if (progress < 25) return { text: "Just Started", color: "#f44336" };
      if (progress < 50) return { text: "In Progress", color: "#ff9800" };
      if (progress < 75) return { text: "More than Half", color: "#ffeb3b" };
      if (progress < 100) return { text: "Almost Done", color: "#4caf50" };
      return { text: "Completed!", color: "#2196f3" };
    };

    const status = getProgressStatus();

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Project Progress Tracker
        </Typography>
        <SliderDefaultExport
          name="progressSlider"
          datavalue={progress}
          minvalue={0}
          maxvalue={100}
          step={5}
          listener={customListener}
        />
        <Box mt={2} p={2} bgcolor={status.color} borderRadius={1} textAlign="center">
          <Typography variant="h5" color="white">
            {progress}% - {status.text}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const AgeSelector: Story = {
  render: () => {
    const [age, setAge] = useState(25);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setAge(data.datavalue),
    };

    const getAgeGroup = () => {
      if (age < 18) return "Minor";
      if (age < 30) return "Young Adult";
      if (age < 50) return "Adult";
      if (age < 65) return "Middle Aged";
      return "Senior";
    };

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Age Selector
        </Typography>
        <SliderDefaultExport
          name="ageSlider"
          datavalue={age}
          minvalue={1}
          maxvalue={100}
          step={1}
          listener={customListener}
        />
        <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
          <Typography variant="h4" color="primary" textAlign="center">
            {age} years
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={1}>
            Age Group: <strong>{getAgeGroup()}</strong>
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const RatingScale: Story = {
  render: () => {
    const [satisfaction, setSatisfaction] = useState(5);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setSatisfaction(data.datavalue),
    };

    const getRatingLabel = () => {
      switch (satisfaction) {
        case 1:
          return { text: "Very Dissatisfied", emoji: "😞", color: "#f44336" };
        case 2:
          return { text: "Dissatisfied", emoji: "😟", color: "#ff9800" };
        case 3:
          return { text: "Neutral", emoji: "😐", color: "#ffc107" };
        case 4:
          return { text: "Satisfied", emoji: "🙂", color: "#8bc34a" };
        case 5:
          return { text: "Very Satisfied", emoji: "😄", color: "#4caf50" };
        default:
          return { text: "Neutral", emoji: "😐", color: "#ffc107" };
      }
    };

    const rating = getRatingLabel();

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Customer Satisfaction Rating
        </Typography>
        <SliderDefaultExport
          name="satisfactionSlider"
          datavalue={satisfaction}
          minvalue={1}
          maxvalue={5}
          step={1}
          listener={customListener}
        />
        <Box mt={2} p={3} bgcolor={rating.color} borderRadius={1} textAlign="center">
          <Typography variant="h3" mb={1}>
            {rating.emoji}
          </Typography>
          <Typography variant="h6" color="white">
            {rating.text}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const TimeOfDayPicker: Story = {
  render: () => {
    const [hour, setHour] = useState(12);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => setHour(data.datavalue),
    };

    const formatTime = (h: number) => {
      if (h === 0) return "12:00 AM (Midnight)";
      if (h === 12) return "12:00 PM (Noon)";
      if (h < 12) return `${h}:00 AM`;
      return `${h - 12}:00 PM`;
    };

    const getTimeOfDay = () => {
      if (hour >= 5 && hour < 12) return { period: "Morning", color: "#ffeb3b" };
      if (hour >= 12 && hour < 17) return { period: "Afternoon", color: "#ff9800" };
      if (hour >= 17 && hour < 21) return { period: "Evening", color: "#ff5722" };
      return { period: "Night", color: "#3f51b5" };
    };

    const timeInfo = getTimeOfDay();

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={2}>
          Time of Day Picker
        </Typography>
        <SliderDefaultExport
          name="timeSlider"
          datavalue={hour}
          minvalue={0}
          maxvalue={23}
          step={1}
          listener={customListener}
        />
        <Box mt={2} p={3} bgcolor={timeInfo.color} borderRadius={1} textAlign="center">
          <Typography variant="h5" color="white" mb={1}>
            {formatTime(hour)}
          </Typography>
          <Typography variant="body1" color="white">
            {timeInfo.period}
          </Typography>
        </Box>
      </Box>
    );
  },
};
