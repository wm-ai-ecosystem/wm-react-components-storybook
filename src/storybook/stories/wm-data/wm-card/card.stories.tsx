import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import WmCard from "../../../../components/data/card";
import WmCardContent from "../../../../components/data/card/card-content";
import WmCardActions from "../../../../components/data/card/card-actions";
import WmCardFooter from "../../../../components/data/card/card-footer";

import { animationNames } from "../../constants/animationsConstants";
import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import cardsTokensData from "../../../../designTokens/components/cards/cards.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Data/Card",
  component: WmCard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmCard>;

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
      style={style}
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14171&p=f&t=TmoXZ4j5uVxcseDO-0",
        label: "",
      }}
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args:{
    name: "cardsDocs",
    listener: mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}},
  }
};

export const Showcase: Story = {
  render: () => {
    const contactCards = [
      {
        id: 1,
        name: "Eric Lin",
        title: "Product Manager",
        team: "Engineering",
        location: "San Francisco",
        phone: "+1 923-33-56",
        avatar: "/personIcon.svg",
      },
      {
        id: 2,
        name: "Jane Liu",
        title: "Marketing Lead",
        team: "Marketing",
        location: "New York",
        phone: "+1 821-44-90",
        avatar: "/personIcon.svg",
      },
    ];

    const mediaPosts = [
      {
        id: 1,
        author: "Brad Tucker",
        published: "May 13 · 4 mins read",
        headline: "Design systems at scale",
        image: "/showcaseImage.png",
        description:
          "Design systems help teams build consistent experiences faster across products.",
        likes: 75,
        comments: 10,
      },
      {
        id: 2,
        author: "Olivia Martin",
        published: "Jun 02 · 6 mins read",
        headline: "Why component reuse matters",
        image: "showcaseImage.png",
        description:
          "Reusable components reduce development time and improve maintainability.",
        likes: 112,
        comments: 24,
      },
    ];

    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Cards Showcase
          </Typography>
        </Box>

        <Stack spacing={6} sx={{ mt: 4 }}>
          {/* CONTACT CARDS — RESPONSIVE 2 COLUMN */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Contact Cards
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Horizontal content • Responsive two-column layout
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: 2,
              }}
            >
              {contactCards.map((item) => (
                <WmCard
                  key={item.id}
                  name={`contactCard${item.id}`}
                  listener={mockListener}
                >
                  <WmCardContent name="cardContent">
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ p: 2 }}
                    >
                      <Box
                        component="img"
                        src={item.avatar}
                        alt={item.name}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 1,
                          objectFit: "cover",
                        }}
                      />

                      <Stack spacing={0.3}>
                        <Typography variant="subtitle1">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.title}
                        </Typography>
                        <Typography variant="caption">
                          {item.team}
                        </Typography>
                        <Typography variant="caption">
                          {item.location}
                        </Typography>
                        <Typography variant="caption">
                          {item.phone}
                        </Typography>
                      </Stack>
                    </Stack>
                  </WmCardContent>
                </WmCard>
              ))}
            </Box>
          </Box>

          {/* MEDIA POSTS — VERTICAL STACK */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Media Post Cards
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}} fontWeight={300}>
              Vertical layout with image, content and footer
            </Typography>

            <Stack spacing={3}>
              {mediaPosts.map((post) => (
                <WmCard
                  key={post.id}
                  name={`mediaPost${post.id}`}
                  listener={mockListener}
                  picturesource={post.image}
                  imageheight="220px"
                >
                  <WmCardContent name="cardContent">
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1">
                        {post.headline}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {post.author} • {post.published}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1, lineHeight: 1.6 }}
                      >
                        {post.description}
                      </Typography>
                    </Box>
                  </WmCardContent>

                  <WmCardFooter name="cardFooter">
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="caption">
                        ❤️ {post.likes}
                      </Typography>
                      <Typography variant="caption">
                        💬 {post.comments}
                      </Typography>
                    </Box>
                  </WmCardFooter>
                </WmCard>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  args:{
    name: "showcaseCards",
    listener:mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}},
  }
};

export const Standard: Story = {
  tags: ["show-panel"],
  render: (args) => {
    // component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

    return (
      <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <WmCard {...componentArgs} listener={mockListener}>
          {componentArgs.children}
        </WmCard>
      </Box>
    );
  },
  args: {
    name: "standardCard",
    title: "User Overview",
    subheading: "Summary and recent activity",
    iconclass: "fa fa-user",
    width: "500px",
    height: "auto",
    listener: mockListener,
    actions: [
      { id: 1, label: "Edit", icon: "wi wi-edit" },
      { id: 2, label: "Share", icon: "wi wi-share" },
      { id: 3, label: "Delete", icon: "wi wi-trash" },
    ],
    itemlabel: "label",
    itemicon: "icon",
    picturesource: "",
    imageheight: "200px",
    children: [
      <WmCardContent name="cardContent" listener={mockListener} key="content">
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" fontWeight={500} gutterBottom>
            Account details
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            This section provides a quick overview of the user profile and
            current system status.
          </Typography>

          <Stack spacing={0.5}>
            <Typography variant="body2">
              <strong>Name:</strong> Alex Johnson
            </Typography>
            <Typography variant="body2">
              <strong>Role:</strong> Project Administrator
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> Active
            </Typography>
          </Stack>
        </Box>
      </WmCardContent>,

      <WmCardFooter name="cardFooter" listener={mockListener} key="footer">
        <Box
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Last updated: 2 hours ago
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Activity score: 82%
          </Typography>
        </Box>
      </WmCardFooter>,
    ],
    "data-design-token-target": true,
  },

  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    width: { control: "text" },
    height: { control: "text" },
    iconurl: { control: "text" },
    picturesource: { control: "text" },
    picturetitle: { control: "text" },
    imageheight: { control: "text" },
    animation: { control: "select", options: animationNames },
    actions: { control: "object" },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    children: { table: { disable: true } },
  },

  parameters: {
    designTokens: {
      enabled: true,
      tokenData: cardsTokensData,
      componentKey: "card",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

// export const Basic: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "actionMenuCard",
//     title: "Dashboard Card",
//     subheading: "Quick actions available",
//     iconclass: "wi wi-dashboard",
//     actions: JSON.stringify([
//       { id: 1, label: "Edit", icon: "wi wi-edit" },
//       { id: 2, label: "Share", icon: "wi wi-share" },
//       { id: 3, label: "Delete", icon: "wi wi-trash" },
//     ]),
//     itemlabel: "label",
//     itemicon: "icon",
//     picturesource: "https://picsum.photos/200",
//     imageheight: "200px",
//     width: "500px",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent" listener={mockListener}>
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="body1">
//             This card has a menu with multiple actions. Click the menu icon in the header to see
//             available options.
//           </Typography>
//         </Box>
//       </WmCardContent>
//     ),
//   },
//   argTypes: {
//     title: { control: "text" },
//     subheading: { control: "text" },
//     iconclass:{ control:{ type:"select"}, options: iconClassNames },
//     iconurl: { control: "text" },
//     picturesource: { control: "text" },
//     picturetitle: { control: "text" },
//     imageheight: { control: "text" },
//     width: { control: "text" },
//     height: { control: "text" },
//     animation: { control: "select", options: animationNames },
//     actions: { control: "text" },
//   },
// };