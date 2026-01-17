import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import TileDefaultExport from "../../../../components/basic/tile/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import tileTokensData from "../../../../designTokens/components/tile/tile.json";

const meta: Meta<typeof TileDefaultExport> = {
  title: "Basic/Tile",
  component: TileDefaultExport,
  // argTypes: {
  //   className: {
  //     control: {
  //       type: "select",
  //     },
  //     options: ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info"],
  //   },
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
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <TileDefaultExport {...args} listener={mockListener}>
      {args.children || "Tile Content"}
    </TileDefaultExport>
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
    name:"docsTile",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const tilesHorizontal = [
      { title: "Total Users", value: "1,234", className: "bg-primary" },
      { title: "Active Sessions", value: "567", className: "bg-success" },
      { title: "Critical Alerts", value: "23", className: "bg-danger" },
    ];

    const tilesVertical = [
      { title: "Notifications", description: "5 new notifications", className: "bg-info" },
      { title: "Messages", description: "3 unread messages", className: "bg-primary" },
      { title: "Task", description: "Course to complete", className: "bg-warning" },
    ];

    return (
      <Box sx={{ p: 4 }}>
        {/* Main Heading */}
        <Stack mb={2}>
        <Typography variant="h6" fontWeight={600} mb={5}>
          Tiles Showcase
        </Typography>
        </Stack>

        {/* Horizontal Tiles */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight={500} mb={3}>
            Horizontal Layout
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="space-between"
            flexWrap="wrap"
            gap="24px"
          >
            {tilesHorizontal.map((tile, index) => (
              <TileDefaultExport
                key={index}
                name={`dashboardTile${index}`}
                listener={mockListener}
                className={tile.className}
                styles={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {tile.value}
                </Typography>
                <Typography variant="body1">{tile.title}</Typography>
              </TileDefaultExport>
            ))}
          </Stack>
        </Box>

        {/* Vertical Tiles */}
        <Box>
          <Typography variant="subtitle1" fontWeight={500} mb={3}>
            Vertical Layout
          </Typography>
          <Stack spacing={3}>
            {tilesVertical.map((tile, index) => (
              <TileDefaultExport
                key={index}
                name={`verticalTile${index}`}
                listener={mockListener}
                className={tile.className}
                styles={{
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {tile.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tile.description}
                </Typography>
              </TileDefaultExport>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  },
  args: {
    name: "tileShowcase",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicTile",
    listener: mockListener,
    children: (
      <Box>
        <Typography variant="h6" gutterBottom>
          Tile Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a tile with structured content including a title and description text.
        </Typography>
      </Box>
    ),
    className: "bg-primary",
  },
  argTypes: {
    className: {
      control: {
        type: "select",
      },
      options: ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info"],
    },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardTile",
    listener: mockListener,
    children: (
      <Box>
        <Typography variant="h6" gutterBottom>
          Tile Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a tile with structured content including a title and description text.
        </Typography>
      </Box>
    ),
    className: "bg-primary",
    "data-design-token-target":"true"
  },
  argTypes: {
    className: {
      control: {
        type: "select",
      },
      options: ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info"],
    },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: tileTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "tile",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};


// export const FeatureTiles: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Feature Tiles
//         </Typography>
//         <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
//           <TileDefaultExport
//             name="feature1"
//             listener={mockListener}
//             styles={{
//               padding: "32px",
//               backgroundColor: "#ffffff",
//               border: "1px solid #e0e0e0",
//               borderRadius: "12px",
//               textAlign: "center",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               },
//             }}
//           >
//             <Box fontSize="48px" mb={2}>
//               🚀
//             </Box>
//             <Typography variant="h6" gutterBottom>
//               Fast Performance
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Lightning fast load times and smooth interactions
//             </Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="feature2"
//             listener={mockListener}
//             styles={{
//               padding: "32px",
//               backgroundColor: "#ffffff",
//               border: "1px solid #e0e0e0",
//               borderRadius: "12px",
//               textAlign: "center",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               },
//             }}
//           >
//             <Box fontSize="48px" mb={2}>
//               🔒
//             </Box>
//             <Typography variant="h6" gutterBottom>
//               Secure
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Enterprise-grade security for your data
//             </Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="feature3"
//             listener={mockListener}
//             styles={{
//               padding: "32px",
//               backgroundColor: "#ffffff",
//               border: "1px solid #e0e0e0",
//               borderRadius: "12px",
//               textAlign: "center",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               },
//             }}
//           >
//             <Box fontSize="48px" mb={2}>
//               📱
//             </Box>
//             <Typography variant="h6" gutterBottom>
//               Responsive
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Works seamlessly across all devices
//             </Typography>
//           </TileDefaultExport>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "featureTiles",
//     listener: mockListener,
//   },
// };

// export const DashboardTiles: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Dashboard Tiles
//         </Typography>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
//           gap={3}
//         >
//           <TileDefaultExport
//             name="dashboard1"
//             listener={mockListener}
//             styles={{
//               padding: "24px",
//               backgroundColor: "#1976d2",
//               color: "#ffffff",
//               borderRadius: "12px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             }}
//           >
//             <Typography variant="h4" fontWeight="bold">
//               1,234
//             </Typography>
//             <Typography variant="body1">Total Users</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="dashboard2"
//             listener={mockListener}
//             styles={{
//               padding: "24px",
//               backgroundColor: "#388e3c",
//               color: "#ffffff",
//               borderRadius: "12px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             }}
//           >
//             <Typography variant="h4" fontWeight="bold">
//               567
//             </Typography>
//             <Typography variant="body1">Active Sessions</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="dashboard3"
//             listener={mockListener}
//             styles={{
//               padding: "24px",
//               backgroundColor: "#f57c00",
//               color: "#ffffff",
//               borderRadius: "12px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             }}
//           >
//             <Typography variant="h4" fontWeight="bold">
//               89
//             </Typography>
//             <Typography variant="body1">Pending Tasks</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="dashboard4"
//             listener={mockListener}
//             styles={{
//               padding: "24px",
//               backgroundColor: "#d32f2f",
//               color: "#ffffff",
//               borderRadius: "12px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             }}
//           >
//             <Typography variant="h4" fontWeight="bold">
//               23
//             </Typography>
//             <Typography variant="body1">Critical Alerts</Typography>
//           </TileDefaultExport>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "dashboardTiles",
//     listener: mockListener,
//   },
// };

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "tile1",
//     listener: mockListener,
//     children: "Basic Tile",
//     styles: {
//       padding: "20px",
//       backgroundColor: "#f5f5f5",
//       borderRadius: "8px",
//     },
//   },
// };

// export const Clickable: Story = {
//   render: (args: any) => {
//     const [clicked, setClicked] = useState(false);

//     return (
//       <Box style={{ padding: 16 }}>
//         <TileDefaultExport
//           {...args}
//           listener={mockListener}
//           onClick={() => setClicked(!clicked)}
//           styles={{
//             padding: "24px",
//             backgroundColor: clicked ? "#2196f3" : "#f5f5f5",
//             color: clicked ? "#ffffff" : "#000000",
//             borderRadius: "8px",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <Typography variant="h6">
//             {clicked ? "Tile Clicked!" : "Click this tile"}
//           </Typography>
//         </TileDefaultExport>
//       </Box>
//     );
//   },
//   args: {
//     name: "clickableTile",
//   },
// };

// export const WithHoverEffect: Story = {
//   render: Template,
//   args: {
//     name: "hoverTile",
//     listener: mockListener,
//     children: (
//       <Box textAlign="center">
//         <Typography variant="h6">Hover Over Me</Typography>
//         <Typography variant="body2" color="text.secondary">
//           This tile has hover effects
//         </Typography>
//       </Box>
//     ),
//     styles: {
//       padding: "24px",
//       backgroundColor: "#ffffff",
//       border: "1px solid #e0e0e0",
//       borderRadius: "8px",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//       "&:hover": {
//         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//         transform: "translateY(-2px)",
//       },
//     },
//   },
// };

// export const TileGrid: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Tile Grid Layout
//         </Typography>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
//           gap={2}
//         >
//           <TileDefaultExport
//             name="gridTile1"
//             listener={mockListener}
//             styles={{
//               padding: "20px",
//               backgroundColor: "#e3f2fd",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h6">Tile 1</Typography>
//             <Typography variant="body2">Content here</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="gridTile2"
//             listener={mockListener}
//             styles={{
//               padding: "20px",
//               backgroundColor: "#f3e5f5",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h6">Tile 2</Typography>
//             <Typography variant="body2">Content here</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="gridTile3"
//             listener={mockListener}
//             styles={{
//               padding: "20px",
//               backgroundColor: "#e8f5e9",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h6">Tile 3</Typography>
//             <Typography variant="body2">Content here</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="gridTile4"
//             listener={mockListener}
//             styles={{
//               padding: "20px",
//               backgroundColor: "#fff3e0",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h6">Tile 4</Typography>
//             <Typography variant="body2">Content here</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="gridTile5"
//             listener={mockListener}
//             styles={{
//               padding: "20px",
//               backgroundColor: "#fce4ec",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h6">Tile 5</Typography>
//             <Typography variant="body2">Content here</Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="gridTile6"
//             listener={mockListener}
//             styles={{
//               padding: "20px",
//               backgroundColor: "#e0f2f1",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="h6">Tile 6</Typography>
//             <Typography variant="body2">Content here</Typography>
//           </TileDefaultExport>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "tileGrid",
//     listener: mockListener,
//   },
// };

// export const CardStyleTile: Story = {
//   render: Template,
//   args: {
//     name: "cardTile",
//     listener: mockListener,
//     children: (
//       <Box>
//         <Box
//           component="img"
//           src="https://via.placeholder.com/300x150"
//           alt="Card image"
//           sx={{ width: "100%", borderRadius: "8px 8px 0 0", marginBottom: 2 }}
//         />
//         <Typography variant="h6" gutterBottom>
//           Card Title
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={2}>
//           This is a card-style tile with an image, title, description, and action button.
//         </Typography>
//         <Button variant="contained" size="small">
//           Learn More
//         </Button>
//       </Box>
//     ),
//     styles: {
//       padding: "0",
//       backgroundColor: "#ffffff",
//       border: "1px solid #e0e0e0",
//       borderRadius: "8px",
//       overflow: "hidden",
//       "& > div": {
//         padding: "16px",
//       },
//     },
//   },
// };

// export const InteractiveTiles: Story = {
//   render: () => {
//     const [selectedTile, setSelectedTile] = useState<string | null>(null);

//     const tiles = [
//       { id: "1", title: "Option 1", color: "#e3f2fd" },
//       { id: "2", title: "Option 2", color: "#f3e5f5" },
//       { id: "3", title: "Option 3", color: "#e8f5e9" },
//       { id: "4", title: "Option 4", color: "#fff3e0" },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Interactive Selection Tiles
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           {tiles.map((tile) => (
//             <TileDefaultExport
//               key={tile.id}
//               name={`interactiveTile${tile.id}`}
//               listener={mockListener}
//               onClick={() => setSelectedTile(tile.id)}
//               styles={{
//                 padding: "24px",
//                 backgroundColor: selectedTile === tile.id ? "#2196f3" : tile.color,
//                 color: selectedTile === tile.id ? "#ffffff" : "#000000",
//                 border: selectedTile === tile.id ? "2px solid #1976d2" : "1px solid #e0e0e0",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 minWidth: "150px",
//                 textAlign: "center",
//               }}
//             >
//               <Typography variant="h6">{tile.title}</Typography>
//               {selectedTile === tile.id && (
//                 <Typography variant="body2" mt={1}>
//                   ✓ Selected
//                 </Typography>
//               )}
//             </TileDefaultExport>
//           ))}
//         </Stack>
//         {selectedTile && (
//           <Typography variant="body1" mt={3}>
//             You selected: Option {selectedTile}
//           </Typography>
//         )}
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveTiles",
//     listener: mockListener,
//   },
// };


// export const CustomStyledTile: Story = {
//   render: Template,
//   args: {
//     name: "customStyled",
//     listener: mockListener,
//     children: (
//       <Box>
//         <Typography variant="h5" gutterBottom>
//           Custom Styled Tile
//         </Typography>
//         <Typography variant="body1" mb={2}>
//           This tile demonstrates custom styling with gradient background, shadow, and border.
//         </Typography>
//         <Button variant="outlined" style={{ color: "#ffffff", borderColor: "#ffffff" }}>
//           Action
//         </Button>
//       </Box>
//     ),
//     styles: {
//       padding: "32px",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       color: "#ffffff",
//       borderRadius: "16px",
//       boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
//     },
//   },
// };

// export const CompactTiles: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Compact Tiles
//         </Typography>
//         <Stack spacing={1}>
//           <TileDefaultExport
//             name="compact1"
//             listener={mockListener}
//             styles={{
//               padding: "12px 16px",
//               backgroundColor: "#f5f5f5",
//               borderRadius: "4px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography variant="body2">Notification 1</Typography>
//             <Typography variant="caption" color="text.secondary">
//               2 min ago
//             </Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="compact2"
//             listener={mockListener}
//             styles={{
//               padding: "12px 16px",
//               backgroundColor: "#f5f5f5",
//               borderRadius: "4px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography variant="body2">Notification 2</Typography>
//             <Typography variant="caption" color="text.secondary">
//               5 min ago
//             </Typography>
//           </TileDefaultExport>
//           <TileDefaultExport
//             name="compact3"
//             listener={mockListener}
//             styles={{
//               padding: "12px 16px",
//               backgroundColor: "#f5f5f5",
//               borderRadius: "4px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography variant="body2">Notification 3</Typography>
//             <Typography variant="caption" color="text.secondary">
//               1 hour ago
//             </Typography>
//           </TileDefaultExport>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "compactTiles",
//     listener: mockListener,
//   },
// };

// export const WithEventHandlers: Story = {
//   render: () => {
//     const [events, setEvents] = useState<string[]>([]);

//     const addEvent = (eventName: string) => {
//       setEvents((prev) => [...prev, `${eventName} at ${new Date().toLocaleTimeString()}`].slice(-5));
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Tile with Event Handlers
//         </Typography>
//         <TileDefaultExport
//           name="eventTile"
//           listener={mockListener}
//           onClick={() => addEvent("Click")}
//           onDoubleClick={() => addEvent("Double Click")}
//           onMouseEnter={() => addEvent("Mouse Enter")}
//           onMouseLeave={() => addEvent("Mouse Leave")}
//           onFocus={() => addEvent("Focus")}
//           onBlur={() => addEvent("Blur")}
//           styles={{
//             padding: "32px",
//             backgroundColor: "#e3f2fd",
//             borderRadius: "8px",
//             cursor: "pointer",
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6">Interact with this tile</Typography>
//           <Typography variant="body2" color="text.secondary">
//             Click, double-click, hover, or focus to trigger events
//           </Typography>
//         </TileDefaultExport>
//         <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//           <Typography variant="subtitle2" mb={1}>
//             Event Log:
//           </Typography>
//           {events.length === 0 ? (
//             <Typography variant="body2" color="text.secondary">
//               No events yet
//             </Typography>
//           ) : (
//             <Stack spacing={0.5}>
//               {events.map((event, index) => (
//                 <Typography key={index} variant="body2">
//                   • {event}
//                 </Typography>
//               ))}
//             </Stack>
//           )}
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "eventHandlers",
//     listener: mockListener,
//   },
// };
