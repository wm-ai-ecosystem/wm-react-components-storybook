import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import PictureDefaultExport from "../../../../components/basic/picture/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import pictureTokensData from "../../../../designTokens/components/picture/picture.json";

const meta: Meta<typeof PictureDefaultExport> = {
  title: "Basic/Picture",
  component: PictureDefaultExport,
  // argTypes: {
  //   picturesource: { control: "text" },
  //   // pictureplaceholder: { control: "text" },
  //   alttext: { control: "text" },
  //   pictureaspect: {
  //     control: { type: "select" },
  //     options: ["None", "H", "V", "Both"],
  //   },
  //   shape:{
  //     control:"select",
  //     options:['circle',"rounded","thumbnail"]
  //   },
  //   resizemode: {
  //     control: { type: "select" },
  //     options: ["fill", "cover", "contain", "none", "scale-down"],
  //   },
  //   width: { control: "text" },
  //   height: { control: "text" },
  //   // encodeurl: { control: "boolean" },
  //   // arialabel: { control: "text" },
  //   // tabindex: { control: "number" },
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
    <PictureDefaultExport {...args} listener={mockListener} />
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
    name:"docsPicture",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>Image Showcase:</Typography>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 2 }}>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Default
              </Typography>
              <PictureDefaultExport
                name="shapeDefault"
                picturesource="https://picsum.photos/200"
                alttext="Default shape"
                width="150px"
                height="150px"
                listener={mockListener}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Circle
              </Typography>
              <PictureDefaultExport
                name="shapeCircle"
                picturesource="https://picsum.photos/200"
                alttext="Circle shape"
                width="150px"
                height="150px"
                shape="circle"
                listener={mockListener}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Rounded
              </Typography>
              <PictureDefaultExport
                name="shapeRounded"
                picturesource="https://picsum.photos/200"
                alttext="Rounded shape"
                width="150px"
                height="150px"
                shape="rounded"
                listener={mockListener}
                styles={{ borderRadius: "12px" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Thumbnail
              </Typography>
              <PictureDefaultExport
                name="shapeThumbnail"
                picturesource="https://picsum.photos/200"
                alttext="Thumbnail shape"
                width="150px"
                height="150px"
                shape="thumbnail"
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcasePictureShapes",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicPicture",
    listener: mockListener,
    picturesource: "https://picsum.photos/200",
    alttext: "Placeholder image",
    width: "200px",
    height: "200px",
    resizemode: "cover",
    shape: "thumbnail"
  },
  argTypes: {
    picturesource: { control: "text" },
    // pictureplaceholder: { control: "text" },
    alttext: { control: "text" },
    pictureaspect: {
      control: { type: "select" },
      options: ["None", "H", "V", "Both"],
    },
    shape:{
      control:"select",
      options:['circle',"rounded","thumbnail"]
    },
    resizemode: {
      control: { type: "select" },
      options: ["fill", "cover", "contain", "none", "scale-down"],
    },
    width: { control: "text" },
    height: { control: "text" },
  },
};

export const DesignToken: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "designTokenPicture",
    listener: mockListener,
    picturesource: "https://picsum.photos/200",
    alttext: "Placeholder image",
    "data-design-token-target":"true"
  },
  argTypes: {
    picturesource: { control: "text" },
    alttext: { control: "text" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: pictureTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "picture",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "picture1",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/400x300",
//     alttext: "Placeholder image",
//     width: "400px",
//     height: "300px",
//   },
// };

// export const Square: Story = {
//   render: Template,
//   args: {
//     name: "squarePicture",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/300x300",
//     alttext: "Square image",
//     width: "300px",
//     height: "300px",
//   },
// };

// export const CircleShape: Story = {
//   render: Template,
//   args: {
//     name: "circlePicture",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/200x200",
//     alttext: "Circle image",
//     width: "200px",
//     height: "200px",
//     shape: "circle",
//   },
// };

// export const RoundedShape: Story = {
//   render: Template,
//   args: {
//     name: "roundedPicture",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/300x200",
//     alttext: "Rounded image",
//     width: "300px",
//     height: "200px",
//     shape: "rounded",
//     styles: {
//       borderRadius: "12px",
//     },
//   },
// };

// export const ThumbnailShape: Story = {
//   render: Template,
//   args: {
//     name: "thumbnailPicture",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/150x150",
//     alttext: "Thumbnail image",
//     width: "150px",
//     height: "150px",
//     shape: "thumbnail",
//   },
// };

// export const HorizontalAspect: Story = {
//   render: Template,
//   args: {
//     name: "horizontalAspect",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/800x400",
//     alttext: "Horizontal aspect image",
//     pictureaspect: "H",
//     width: "600px",
//   },
// };

// export const VerticalAspect: Story = {
//   render: Template,
//   args: {
//     name: "verticalAspect",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/400x600",
//     alttext: "Vertical aspect image",
//     pictureaspect: "V",
//     height: "400px",
//   },
// };

// export const BothAspect: Story = {
//   render: Template,
//   args: {
//     name: "bothAspect",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/500x300",
//     alttext: "Both aspect image",
//     pictureaspect: "Both",
//     width: "300px",
//     height: "300px",
//   },
// };

// export const ResizeModeCover: Story = {
//   render: Template,
//   args: {
//     name: "coverMode",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/800x400",
//     alttext: "Cover resize mode",
//     width: "400px",
//     height: "400px",
//     resizemode: "cover",
//   },
// };

// export const ResizeModeContain: Story = {
//   render: Template,
//   args: {
//     name: "containMode",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/800x400",
//     alttext: "Contain resize mode",
//     width: "400px",
//     height: "400px",
//     resizemode: "contain",
//     styles: {
//       border: "1px solid #ccc",
//     },
//   },
// };

// export const ResizeModeFill: Story = {
//   render: Template,
//   args: {
//     name: "fillMode",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/400x300",
//     alttext: "Fill resize mode",
//     width: "500px",
//     height: "300px",
//     resizemode: "fill",
//   },
// };

// export const WithPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "withPlaceholder",
//     listener: mockListener,
//     picturesource: "",
//     pictureplaceholder: "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image",
//     alttext: "Placeholder example",
//     width: "400px",
//     height: "300px",
//   },
// };

// export const SmallThumbnail: Story = {
//   render: Template,
//   args: {
//     name: "smallThumbnail",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/100x100",
//     alttext: "Small thumbnail",
//     width: "100px",
//     height: "100px",
//   },
// };

// export const LargeImage: Story = {
//   render: Template,
//   args: {
//     name: "largeImage",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/1200x600",
//     alttext: "Large image",
//     width: "800px",
//     height: "400px",
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/400x300",
//     alttext: "Custom styled image",
//     width: "400px",
//     height: "300px",
//     styles: {
//       border: "4px solid #2196f3",
//       borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//     },
//   },
// };

// export const DifferentShapes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Different Image Shapes:</Typography>
//           <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 2 }}>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Default
//               </Typography>
//               <PictureDefaultExport
//                 name="shapeDefault"
//                 picturesource="https://via.placeholder.com/150x150"
//                 alttext="Default shape"
//                 width="150px"
//                 height="150px"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Circle
//               </Typography>
//               <PictureDefaultExport
//                 name="shapeCircle"
//                 picturesource="https://via.placeholder.com/150x150"
//                 alttext="Circle shape"
//                 width="150px"
//                 height="150px"
//                 shape="circle"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Rounded
//               </Typography>
//               <PictureDefaultExport
//                 name="shapeRounded"
//                 picturesource="https://via.placeholder.com/150x150"
//                 alttext="Rounded shape"
//                 width="150px"
//                 height="150px"
//                 shape="rounded"
//                 listener={mockListener}
//                 styles={{ borderRadius: "12px" }}
//               />
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Thumbnail
//               </Typography>
//               <PictureDefaultExport
//                 name="shapeThumbnail"
//                 picturesource="https://via.placeholder.com/150x150"
//                 alttext="Thumbnail shape"
//                 width="150px"
//                 height="150px"
//                 shape="thumbnail"
//                 listener={mockListener}
//               />
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "differentShapes",
//     listener: mockListener,
//   },
// };

// export const ProfilePictures: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Profile Pictures:</Typography>
//           <Stack direction="row" spacing={2} alignItems="center">
//             <PictureDefaultExport
//               name="profileSmall"
//               picturesource="https://via.placeholder.com/40x40/2196F3/FFFFFF?text=JS"
//               alttext="Small profile"
//               width="40px"
//               height="40px"
//               shape="circle"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="profileMedium"
//               picturesource="https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=AB"
//               alttext="Medium profile"
//               width="60px"
//               height="60px"
//               shape="circle"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="profileLarge"
//               picturesource="https://via.placeholder.com/80x80/FF9800/FFFFFF?text=CD"
//               alttext="Large profile"
//               width="80px"
//               height="80px"
//               shape="circle"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="profileXLarge"
//               picturesource="https://via.placeholder.com/120x120/E91E63/FFFFFF?text=EF"
//               alttext="Extra large profile"
//               width="120px"
//               height="120px"
//               shape="circle"
//               listener={mockListener}
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "profilePictures",
//     listener: mockListener,
//   },
// };

// export const ResponsiveImage: Story = {
//   render: Template,
//   args: {
//     name: "responsiveImage",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/1200x600",
//     alttext: "Responsive image",
//     width: "100%",
//     height: "auto",
//     pictureaspect: "H",
//     styles: {
//       maxWidth: "100%",
//     },
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     picturesource: "https://via.placeholder.com/300x200",
//     alttext: "Image with tooltip",
//     hint: "Hover to see this tooltip message",
//     width: "300px",
//     height: "200px",
//     styles: {
//       cursor: "help",
//     },
//   },
// };

// export const ImageGallery: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Image Gallery:</Typography>
//           <Box
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//               gap: "16px",
//             }}
//           >
//             <PictureDefaultExport
//               name="gallery1"
//               picturesource="https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Image+1"
//               alttext="Gallery image 1"
//               width="100%"
//               height="200px"
//               resizemode="cover"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="gallery2"
//               picturesource="https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Image+2"
//               alttext="Gallery image 2"
//               width="100%"
//               height="200px"
//               resizemode="cover"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="gallery3"
//               picturesource="https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Image+3"
//               alttext="Gallery image 3"
//               width="100%"
//               height="200px"
//               resizemode="cover"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="gallery4"
//               picturesource="https://via.placeholder.com/300x300/FFA07A/FFFFFF?text=Image+4"
//               alttext="Gallery image 4"
//               width="100%"
//               height="200px"
//               resizemode="cover"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="gallery5"
//               picturesource="https://via.placeholder.com/300x300/98D8C8/FFFFFF?text=Image+5"
//               alttext="Gallery image 5"
//               width="100%"
//               height="200px"
//               resizemode="cover"
//               listener={mockListener}
//             />
//             <PictureDefaultExport
//               name="gallery6"
//               picturesource="https://via.placeholder.com/300x300/F7B731/FFFFFF?text=Image+6"
//               alttext="Gallery image 6"
//               width="100%"
//               height="200px"
//               resizemode="cover"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "imageGallery",
//     listener: mockListener,
//   },
// };
