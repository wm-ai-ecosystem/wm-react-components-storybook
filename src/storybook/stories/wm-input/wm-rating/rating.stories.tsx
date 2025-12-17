import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import RatingDefaultExport from "../../../../components/input/rating/index";

const meta: Meta<typeof RatingDefaultExport> = {
  title: "Input/Rating",
  component: RatingDefaultExport,
  argTypes: {
    maxvalue: { control: "number" },
    caption: { control: "text" },
    readonly: { control: "boolean" },
    showcaptions: { control: "boolean" },
    iconcolor: { control: "color" },
    iconsize: { control: "text" },
    activeiconclass: { control: "text" },
    inactiveiconclass: { control: "text" },
    datavalue: { control: "number" },
    dataset: { control: "object" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
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
    <RatingDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Default: Story = {
  render: Template,
  args: {
    name: "rating1",
    listener: mockListener,
  },
};

export const WithValue: Story = {
  render: Template,
  args: {
    name: "ratingWithValue",
    datavalue: 3,
    listener: mockListener,
  },
};

export const WithCaption: Story = {
  render: Template,
  args: {
    name: "ratingCaption",
    caption: "Rate this product",
    datavalue: 4,
    listener: mockListener,
  },
};

export const ThreeStars: Story = {
  render: Template,
  args: {
    name: "threeStars",
    maxvalue: 3,
    listener: mockListener,
  },
};

export const FiveStars: Story = {
  render: Template,
  args: {
    name: "fiveStars",
    maxvalue: 5,
    datavalue: 4,
    listener: mockListener,
  },
};

export const TenStars: Story = {
  render: Template,
  args: {
    name: "tenStars",
    maxvalue: 10,
    datavalue: 7,
    listener: mockListener,
  },
};

export const WithoutCaptions: Story = {
  render: Template,
  args: {
    name: "noCaptions",
    showcaptions: false,
    datavalue: 3,
    listener: mockListener,
  },
};

export const WithCaptions: Story = {
  render: Template,
  args: {
    name: "withCaptions",
    showcaptions: true,
    caption: "Your rating",
    datavalue: 4,
    listener: mockListener,
  },
};

export const CustomIconColor: Story = {
  render: Template,
  args: {
    name: "customColor",
    iconcolor: "#ff6b6b",
    datavalue: 3,
    listener: mockListener,
  },
};

export const GoldenStars: Story = {
  render: Template,
  args: {
    name: "goldenStars",
    iconcolor: "#ffd700",
    datavalue: 5,
    listener: mockListener,
  },
};

export const BlueStars: Story = {
  render: Template,
  args: {
    name: "blueStars",
    iconcolor: "#1976d2",
    datavalue: 4,
    listener: mockListener,
  },
};

export const GreenStars: Story = {
  render: Template,
  args: {
    name: "greenStars",
    iconcolor: "#2e7d32",
    datavalue: 5,
    listener: mockListener,
  },
};

export const SmallIcons: Story = {
  render: Template,
  args: {
    name: "smallIcons",
    iconsize: "16px",
    datavalue: 3,
    listener: mockListener,
  },
};

export const MediumIcons: Story = {
  render: Template,
  args: {
    name: "mediumIcons",
    iconsize: "24px",
    datavalue: 4,
    listener: mockListener,
  },
};

export const LargeIcons: Story = {
  render: Template,
  args: {
    name: "largeIcons",
    iconsize: "36px",
    datavalue: 5,
    listener: mockListener,
  },
};

export const ExtraLargeIcons: Story = {
  render: Template,
  args: {
    name: "extraLargeIcons",
    iconsize: "48px",
    datavalue: 4,
    listener: mockListener,
  },
};

export const CustomDataset: Story = {
  render: Template,
  args: {
    name: "customDataset",
    dataset: [
      { index: 1, label: "Poor", value: 1 },
      { index: 2, label: "Fair", value: 2 },
      { index: 3, label: "Good", value: 3 },
      { index: 4, label: "Very Good", value: 4 },
      { index: 5, label: "Excellent", value: 5 },
    ],
    showcaptions: true,
    datavalue: 3,
    listener: mockListener,
  },
};

export const SatisfactionRating: Story = {
  render: Template,
  args: {
    name: "satisfaction",
    dataset: [
      { index: 1, label: "Very Dissatisfied", value: 1 },
      { index: 2, label: "Dissatisfied", value: 2 },
      { index: 3, label: "Neutral", value: 3 },
      { index: 4, label: "Satisfied", value: 4 },
      { index: 5, label: "Very Satisfied", value: 5 },
    ],
    showcaptions: true,
    iconcolor: "#ff9800",
    listener: mockListener,
  },
};

export const QualityRating: Story = {
  render: Template,
  args: {
    name: "quality",
    dataset: [
      { index: 1, label: "Terrible", value: 1 },
      { index: 2, label: "Bad", value: 2 },
      { index: 3, label: "Average", value: 3 },
      { index: 4, label: "Good", value: 4 },
      { index: 5, label: "Outstanding", value: 5 },
    ],
    showcaptions: true,
    iconcolor: "#4caf50",
    datavalue: 4,
    listener: mockListener,
  },
};

export const ReadonlyRating: Story = {
  render: Template,
  args: {
    name: "readonlyRating",
    datavalue: 4,
    readonly: true,
    listener: mockListener,
  },
};

export const DisabledRating: Story = {
  render: Template,
  args: {
    name: "disabledRating",
    datavalue: 3,
    disabled: true,
    listener: mockListener,
  },
};

export const RequiredRating: Story = {
  render: Template,
  args: {
    name: "requiredRating",
    caption: "Required rating",
    required: true,
    listener: mockListener,
  },
};

export const OneStarRating: Story = {
  render: Template,
  args: {
    name: "oneStar",
    maxvalue: 1,
    caption: "Like/Unlike",
    listener: mockListener,
  },
};

export const ThreeStarRating: Story = {
  render: Template,
  args: {
    name: "threeStar",
    maxvalue: 3,
    dataset: [
      { index: 1, label: "Bad", value: 1 },
      { index: 2, label: "Okay", value: 2 },
      { index: 3, label: "Great", value: 3 },
    ],
    showcaptions: true,
    listener: mockListener,
  },
};

export const WithCustomWidth: Story = {
  render: Template,
  args: {
    name: "customWidth",
    width: "300px",
    datavalue: 3,
    listener: mockListener,
  },
};

export const WithCustomStyles: Story = {
  render: Template,
  args: {
    name: "styledRating",
    datavalue: 4,
    styles: {
      padding: "16px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
    },
    listener: mockListener,
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [rating, setRating] = useState<number>(0);

    const customListener = {
      ...mockListener,
      Widgets: {
        interactiveRating: {},
      },
      onChange: (name: string, data: any) => {
        setRating(data.datavalue || 0);
      },
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Typography variant="h6">Interactive Rating Demo</Typography>
          <RatingDefaultExport
            name="interactiveRating"
            caption="Click to rate"
            showcaptions={true}
            datavalue={rating}
            listener={customListener}
          />
          <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="subtitle2">Current Rating:</Typography>
            <Typography variant="body2" color="text.secondary">
              {rating > 0 ? `${rating} out of 5 stars` : "No rating selected"}
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "interactiveDemo",
    listener: mockListener,
  },
};

export const MaxValueComparison: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={3}>
          Max Value Comparison
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              3 Stars
            </Typography>
            <RatingDefaultExport
              name="threeStarsComp"
              maxvalue={3}
              datavalue={2}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              5 Stars (Default)
            </Typography>
            <RatingDefaultExport
              name="fiveStarsComp"
              maxvalue={5}
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              7 Stars
            </Typography>
            <RatingDefaultExport
              name="sevenStarsComp"
              maxvalue={7}
              datavalue={5}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              10 Stars
            </Typography>
            <RatingDefaultExport
              name="tenStarsComp"
              maxvalue={10}
              datavalue={8}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "maxValueComparison",
    listener: mockListener,
  },
};

export const IconColorComparison: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={3}>
          Icon Color Comparison
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Default Color
            </Typography>
            <RatingDefaultExport name="defaultColor" datavalue={4} listener={mockListener} />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Golden (#FFD700)
            </Typography>
            <RatingDefaultExport
              name="goldenColor"
              iconcolor="#FFD700"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Red (#FF6B6B)
            </Typography>
            <RatingDefaultExport
              name="redColor"
              iconcolor="#FF6B6B"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Blue (#1976D2)
            </Typography>
            <RatingDefaultExport
              name="blueColor"
              iconcolor="#1976D2"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Green (#2E7D32)
            </Typography>
            <RatingDefaultExport
              name="greenColor"
              iconcolor="#2E7D32"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "colorComparison",
    listener: mockListener,
  },
};

export const IconSizeComparison: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={3}>
          Icon Size Comparison
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Small (16px)
            </Typography>
            <RatingDefaultExport
              name="small"
              iconsize="16px"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Medium (24px)
            </Typography>
            <RatingDefaultExport
              name="medium"
              iconsize="24px"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Large (36px)
            </Typography>
            <RatingDefaultExport
              name="large"
              iconsize="36px"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Extra Large (48px)
            </Typography>
            <RatingDefaultExport
              name="extraLarge"
              iconsize="48px"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "sizeComparison",
    listener: mockListener,
  },
};

export const StateComparison: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={3}>
          State Comparison
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Normal State
            </Typography>
            <RatingDefaultExport name="normalState" datavalue={4} listener={mockListener} />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Readonly State
            </Typography>
            <RatingDefaultExport
              name="readonlyState"
              datavalue={4}
              readonly={true}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Disabled State
            </Typography>
            <RatingDefaultExport
              name="disabledState"
              datavalue={4}
              disabled={true}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1}>
              Required State
            </Typography>
            <RatingDefaultExport
              name="requiredState"
              caption="Required"
              required={true}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "stateComparison",
    listener: mockListener,
  },
};

export const ProductReviewExample: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Product Review
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Overall Rating *
            </Typography>
            <RatingDefaultExport
              name="overallRating"
              caption="Rate this product"
              showcaptions={true}
              required={true}
              iconcolor="#ffd700"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Quality *
            </Typography>
            <RatingDefaultExport
              name="qualityRating"
              dataset={[
                { index: 1, label: "Poor", value: 1 },
                { index: 2, label: "Fair", value: 2 },
                { index: 3, label: "Good", value: 3 },
                { index: 4, label: "Very Good", value: 4 },
                { index: 5, label: "Excellent", value: 5 },
              ]}
              showcaptions={true}
              required={true}
              iconcolor="#4caf50"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Value for Money *
            </Typography>
            <RatingDefaultExport
              name="valueRating"
              caption="How would you rate the value?"
              showcaptions={true}
              required={true}
              iconcolor="#ff9800"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Would you recommend?
            </Typography>
            <RatingDefaultExport
              name="recommendRating"
              maxvalue={10}
              caption="0 = Not at all, 10 = Definitely"
              showcaptions={true}
              iconsize="20px"
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "productReviewExample",
    listener: mockListener,
  },
};

export const ServiceFeedbackExample: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Service Feedback
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Friendliness *
            </Typography>
            <RatingDefaultExport
              name="friendliness"
              dataset={[
                { index: 1, label: "Very Unfriendly", value: 1 },
                { index: 2, label: "Unfriendly", value: 2 },
                { index: 3, label: "Neutral", value: 3 },
                { index: 4, label: "Friendly", value: 4 },
                { index: 5, label: "Very Friendly", value: 5 },
              ]}
              showcaptions={true}
              required={true}
              iconcolor="#e91e63"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Speed of Service *
            </Typography>
            <RatingDefaultExport
              name="speed"
              dataset={[
                { index: 1, label: "Very Slow", value: 1 },
                { index: 2, label: "Slow", value: 2 },
                { index: 3, label: "Average", value: 3 },
                { index: 4, label: "Fast", value: 4 },
                { index: 5, label: "Very Fast", value: 5 },
              ]}
              showcaptions={true}
              required={true}
              iconcolor="#2196f3"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Problem Resolution *
            </Typography>
            <RatingDefaultExport
              name="resolution"
              caption="Rate problem resolution"
              showcaptions={true}
              required={true}
              iconcolor="#9c27b0"
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "serviceFeedbackExample",
    listener: mockListener,
  },
};

export const RestaurantReviewExample: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Restaurant Review
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Food Quality *
            </Typography>
            <RatingDefaultExport
              name="foodQuality"
              caption="Rate the food"
              showcaptions={true}
              required={true}
              iconcolor="#ff5722"
              iconsize="28px"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Service *
            </Typography>
            <RatingDefaultExport
              name="service"
              caption="Rate the service"
              showcaptions={true}
              required={true}
              iconcolor="#3f51b5"
              iconsize="28px"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Ambiance *
            </Typography>
            <RatingDefaultExport
              name="ambiance"
              caption="Rate the ambiance"
              showcaptions={true}
              required={true}
              iconcolor="#00bcd4"
              iconsize="28px"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Value for Money *
            </Typography>
            <RatingDefaultExport
              name="value"
              caption="Rate the value"
              showcaptions={true}
              required={true}
              iconcolor="#8bc34a"
              iconsize="28px"
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "restaurantReviewExample",
    listener: mockListener,
  },
};

export const AppStoreExample: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          App Store Rating
        </Typography>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Rate your experience with this app
          </Typography>
          <RatingDefaultExport
            name="appRating"
            caption="Tap a star to rate"
            showcaptions={true}
            iconcolor="#ffd700"
            iconsize="40px"
            listener={mockListener}
          />
        </Stack>
      </Box>
    );
  },
  args: {
    name: "appStoreExample",
    listener: mockListener,
  },
};

export const SkillLevelExample: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Skill Assessment
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              JavaScript
            </Typography>
            <RatingDefaultExport
              name="jsSkill"
              dataset={[
                { index: 1, label: "Beginner", value: 1 },
                { index: 2, label: "Intermediate", value: 2 },
                { index: 3, label: "Advanced", value: 3 },
                { index: 4, label: "Expert", value: 4 },
                { index: 5, label: "Master", value: 5 },
              ]}
              showcaptions={true}
              iconcolor="#f7df1e"
              datavalue={3}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              React
            </Typography>
            <RatingDefaultExport
              name="reactSkill"
              dataset={[
                { index: 1, label: "Beginner", value: 1 },
                { index: 2, label: "Intermediate", value: 2 },
                { index: 3, label: "Advanced", value: 3 },
                { index: 4, label: "Expert", value: 4 },
                { index: 5, label: "Master", value: 5 },
              ]}
              showcaptions={true}
              iconcolor="#61dafb"
              datavalue={4}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              TypeScript
            </Typography>
            <RatingDefaultExport
              name="tsSkill"
              dataset={[
                { index: 1, label: "Beginner", value: 1 },
                { index: 2, label: "Intermediate", value: 2 },
                { index: 3, label: "Advanced", value: 3 },
                { index: 4, label: "Expert", value: 4 },
                { index: 5, label: "Master", value: 5 },
              ]}
              showcaptions={true}
              iconcolor="#3178c6"
              datavalue={3}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "skillLevelExample",
    listener: mockListener,
  },
};

export const MultiCriteriaExample: Story = {
  render: () => {
    const [ratings, setRatings] = useState({
      design: 0,
      usability: 0,
      features: 0,
      performance: 0,
    });

    const updateRating = (key: string, value: number) => {
      setRatings(prev => ({ ...prev, [key]: value }));
    };

    const averageRating =
      Object.values(ratings).reduce((a, b) => a + b, 0) / Object.keys(ratings).length;

    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Multi-Criteria Rating
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Design
            </Typography>
            <RatingDefaultExport
              name="design"
              showcaptions={false}
              iconcolor="#e91e63"
              datavalue={ratings.design}
              listener={{
                ...mockListener,
                Widgets: { design: {} },
                onChange: (_: string, data: any) => updateRating("design", data.datavalue || 0),
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Usability
            </Typography>
            <RatingDefaultExport
              name="usability"
              showcaptions={false}
              iconcolor="#2196f3"
              datavalue={ratings.usability}
              listener={{
                ...mockListener,
                Widgets: { usability: {} },
                onChange: (_: string, data: any) => updateRating("usability", data.datavalue || 0),
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Features
            </Typography>
            <RatingDefaultExport
              name="features"
              showcaptions={false}
              iconcolor="#4caf50"
              datavalue={ratings.features}
              listener={{
                ...mockListener,
                Widgets: { features: {} },
                onChange: (_: string, data: any) => updateRating("features", data.datavalue || 0),
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Performance
            </Typography>
            <RatingDefaultExport
              name="performance"
              showcaptions={false}
              iconcolor="#ff9800"
              datavalue={ratings.performance}
              listener={{
                ...mockListener,
                Widgets: { performance: {} },
                onChange: (_: string, data: any) =>
                  updateRating("performance", data.datavalue || 0),
              }}
            />
          </Box>
          <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="subtitle2">Average Rating:</Typography>
            <Typography variant="h5" color="primary">
              {averageRating.toFixed(1)} / 5.0
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "multiCriteriaExample",
    listener: mockListener,
  },
};
