import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import IconDefaultExport from "../../../../components/basic/icon/index";
import {
  fontAwesomeIcons,
} from "../../constants/iconConstants";

const meta: Meta<typeof IconDefaultExport> = {
  title: "Basic/Icon",
  component: IconDefaultExport,
  argTypes: {
    caption: { control: "text" },
    iconclass: { control: "text" },
    iconurl: { control: "text" },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconsize: { control: "text" },
    // arialabel: { control: "text" },
    // prefabName: { control: "text" },
    // hint: { control: "text" },
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
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <IconDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicIcon",
    listener: mockListener,
    iconclass: "wm-sl-l sl-star",
    iconsize: "24px",
  },
};

export const WithCaption: Story = {
  render: Template,
  args: {
    name: "iconWithCaption",
    listener: mockListener,
    caption: "User Profile",
    iconclass: "wm-sl-l sl-user",
    iconsize: "24px",
    iconposition: "left",
  },
};

export const WithImageUrl: Story = {
  render: Template,
  args: {
    name: "imageIcon",
    listener: mockListener,
    caption: "Custom Image",
    iconurl: "https://picsum.photos/200",
    iconsize: "32px",
    iconposition: "left",
    styles: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  },
};

// Font Awesome Library Story
export const FontAwesomeLibrary: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const icons = fontAwesomeIcons.map((icon) => ({
      name: `fa-${icon}`,
      iconclass: `fa fa-${icon}`,
      iconsize: "24px",
    }));

    return (
      <IconLibrary
        title="Font Awesome Library (v4.7.0)"
        icons={icons}
        iconClassPrefix="fa fa-"
      />
    );
  },
};

// export const CaptionRight: Story = {
//   render: Template,
//   args: {
//     name: "captionRight",
//     listener: mockListener,
//     caption: "Settings",
//     iconclass: "wm-sl-l sl-settings",
//     iconsize: "24px",
//     iconposition: "right",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//   },
// };

// export const LargeIcon: Story = {
//   render: Template,
//   args: {
//     name: "largeIcon",
//     listener: mockListener,
//     caption: "Large Star",
//     iconclass: "wm-sl-l sl-star",
//     iconsize: "48px",
//     iconposition: "left",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     caption: "Help",
//     iconclass: "wm-sl-l sl-help-circle",
//     iconsize: "24px",
//     hint: "Click for help information",
//     arialabel: "Help icon",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     caption: "Styled Icon",
//     iconclass: "wm-sl-l sl-heart",
//     iconsize: "32px",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       color: "#e74c3c",
//       gap: "8px",
//       fontWeight: "600",
//     },
//   },
// };

// export const IconGroup: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Common Icons:</Typography>
//           <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 2 }}>
//             <IconDefaultExport
//               name="home"
//               caption="Home"
//               iconclass="wm-sl-l sl-home"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="user"
//               caption="User"
//               iconclass="wm-sl-l sl-user"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="settings"
//               caption="Settings"
//               iconclass="wm-sl-l sl-settings"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="mail"
//               caption="Mail"
//               iconclass="wm-sl-l sl-envelope"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="bell"
//               caption="Notifications"
//               iconclass="wm-sl-l sl-bell"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "iconGroup",
//     listener: mockListener,
//   },
// };

// export const DifferentSizes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Icon Sizes:</Typography>
//           <Stack direction="row" spacing={3} alignItems="center">
//             <IconDefaultExport
//               name="small"
//               caption="Small"
//               iconclass="wm-sl-l sl-star"
//               iconsize="16px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "4px" }}
//             />
//             <IconDefaultExport
//               name="medium"
//               caption="Medium"
//               iconclass="wm-sl-l sl-star"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "6px" }}
//             />
//             <IconDefaultExport
//               name="large"
//               caption="Large"
//               iconclass="wm-sl-l sl-star"
//               iconsize="32px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "8px" }}
//             />
//             <IconDefaultExport
//               name="xlarge"
//               caption="X-Large"
//               iconclass="wm-sl-l sl-star"
//               iconsize="48px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "10px" }}
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "differentSizes",
//     listener: mockListener,
//   },
// };

// Icon Library Component for displaying icon collections
interface IconLibraryProps {
  title: string;
  icons: Array<{ name: string; iconclass: string; iconsize: string }>;
  iconClassPrefix: string;
}

const IconLibrary: React.FC<IconLibraryProps> = ({ title, icons, iconClassPrefix }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = icons.filter((icon) =>
    icon.iconclass
      .replace(iconClassPrefix, "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleIconClick = async (iconClass: string) => {
    try {
      await navigator.clipboard.writeText(iconClass);
      setCopiedIcon(iconClass);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff", minHeight: "100vh" }}>
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          bgcolor: "#fff",
          zIndex: 10,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
          {title}
        </Typography>
        <TextField
          fullWidth
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f5f5f5",
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        {filteredIcons.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: 2,
            }}
          >
            {filteredIcons.map((icon, index) => (
              <Box
                key={index}
                onClick={() => handleIconClick(icon.iconclass)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  bgcolor: copiedIcon === icon.iconclass ? "#e3f2fd" : "transparent",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 0.5,
                  }}
                >
                  <IconDefaultExport {...icon} listener={mockListener} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "10px",
                    textAlign: "center",
                    color: "#666",
                    wordBreak: "break-word",
                  }}
                >
                  {icon.iconclass.replace(iconClassPrefix, "")}
                </Typography>
                {copiedIcon === icon.iconclass && (
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "9px",
                      color: "#1976d2",
                      mt: 0.5,
                    }}
                  >
                    Copied!
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography sx={{ p: 2, textAlign: "center", color: "#666" }}>
            No icons found matching "{searchQuery}"
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// // Wavicon Library Story
// export const WaviconLibrary: Story = {
//   parameters: {
//     layout: "fullscreen",
//   },
//   render: () => {
//     const icons = Object.keys(waviconGlyphMap).map((icon) => ({
//       name: `wavicon-${icon}`,
//       iconclass: `wi wi-${icon}`,
//       iconsize: "24px",
//     }));

//     return (
//       <IconLibrary
//         title="Wavicon Library"
//         icons={icons}
//         iconClassPrefix="wi wi-"
//       />
//     );
//   },
// };

// // Streamline Light Library Story
// export const StreamlineLightLibrary: Story = {
//   parameters: {
//     layout: "fullscreen",
//   },
//   render: () => {
//     const icons = Object.keys(streamlineLightGlyphMap).map((icon) => ({
//       name: `streamline-light-${icon}`,
//       iconclass: `wm-sl-l sl-${icon}`,
//       iconsize: "24px",
//     }));

//     return (
//       <IconLibrary
//         title="Streamline Light Library"
//         icons={icons}
//         iconClassPrefix="wm-sl-l sl-"
//       />
//     );
//   },
// };

// // Streamline Regular Library Story
// export const StreamlineRegularLibrary: Story = {
//   parameters: {
//     layout: "fullscreen",
//   },
//   render: () => {
//     const icons = Object.keys(streamlineRegularGlyphMap).map((icon) => ({
//       name: `streamline-regular-${icon}`,
//       iconclass: `wm-sl-r sl-${icon}`,
//       iconsize: "24px",
//     }));

//     return (
//       <IconLibrary
//         title="Streamline Regular Library"
//         icons={icons}
//         iconClassPrefix="wm-sl-r sl-"
//       />
//     );
//   },
// };
