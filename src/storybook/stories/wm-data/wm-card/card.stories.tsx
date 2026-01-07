import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import WmCard from "../../../../components/data/card";
import WmCardContent from "../../../../components/data/card/card-content";
import WmCardActions from "../../../../components/data/card/card-actions";
import WmCardFooter from "../../../../components/data/card/card-footer";

import { animationNames } from "../../constants/animationsConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Data/Card",
  component: WmCard,
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-user", "wi wi-dashboard"],
    },
    iconurl: { control: "text" },
    picturesource: { control: "text" },
    picturetitle: { control: "text" },
    imageheight: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    animation: { control: "select", options: animationNames },
    actions: { control: "text" },
  },
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
      styling={styling}
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args:{
    name: "cardsDocs",
    listener: mockListener
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
        avatar: "https://i.pravatar.cc/150?img=32",
      },
      {
        id: 2,
        name: "Jane Liu",
        title: "Marketing Lead",
        team: "Marketing",
        location: "New York",
        phone: "+1 821-44-90",
        avatar: "https://i.pravatar.cc/150?img=47",
      },
    ];

    const mediaPosts = [
      {
        id: 1,
        author: "Brad Tucker",
        published: "May 13 · 4 mins read",
        headline: "Design systems at scale",
        image: "https://picsum.photos/600/300?random=21",
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
        image: "https://picsum.photos/600/300?random=22",
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
  }
};

export const Basic: Story = {
  tags: ['show-panel'],
  args: {
    name: "actionMenuCard",
    title: "Dashboard Card",
    subheading: "Quick actions available",
    iconclass: "wi wi-dashboard",
    actions: JSON.stringify([
      { id: 1, label: "Edit", icon: "wi wi-edit" },
      { id: 2, label: "Share", icon: "wi wi-share" },
      { id: 3, label: "Delete", icon: "wi wi-trash" },
    ]),
    itemlabel: "label",
    itemicon: "icon",
    picturesource: "https://picsum.photos/200",
    imageheight: "200px",
    width: "500px",
    listener: mockListener,
    children: (
      <WmCardContent name="cardContent">
        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">
            This card has a menu with multiple actions. Click the menu icon in the header to see
            available options.
          </Typography>
        </Box>
      </WmCardContent>
    ),
  },
};




// export const Showcase: Story = {
//   render: () => {
//     const products = [
//       {
//         id: 1,
//         title: "Laptop Pro",
//         price: "$1,499",
//         image: "https://picsum.photos/300/200?random=10",
//         rating: 4.7,
//       },
//       {
//         id: 2,
//         title: "Wireless Mouse",
//         price: "$49",
//         image: "https://picsum.photos/300/200?random=11",
//         rating: 4.5,
//       },
//       {
//         id: 3,
//         title: "Mechanical Keyboard",
//         price: "$129",
//         image: "https://picsum.photos/300/200?random=12",
//         rating: 4.8,
//       },
//       {
//         id: 4,
//         title: "USB-C Hub",
//         price: "$79",
//         image: "https://picsum.photos/300/200?random=13",
//         rating: 4.4,
//       },
//     ];

//     return (
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: 2,
//           padding: 2,
//         }}
//       >
//         {products.map((product) => (
//           <WmCard
//             key={product.id}
//             name={`productCard${product.id}`}
//             title={product.title}
//             picturesource={product.image}
//             imageheight="160px"
//             listener={mockListener}
//           >
//             <WmCardContent name="cardContent">
//               <Box sx={{ padding: 2 }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Typography variant="h6" color="primary.main">
//                     {product.price}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     ⭐ {product.rating}
//                   </Typography>
//                 </Box>
//               </Box>
//             </WmCardContent>
//             <WmCardActions name="cardActions">
//               <Button size="small" color="primary">
//                 Add to Cart
//               </Button>
//               <Button size="small">Details</Button>
//             </WmCardActions>
//           </WmCard>
//         ))}
//       </Box>
//     );
//   },
//   args:{
//     name: "showcaseCards",
//     listener: mockListener
//   }
// };

// export const Basic: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "basicCard",
//     title: "User Profile",
//     subheading: "View and edit your profile information",
//     iconclass: "fa fa-user",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent">
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="body1">
//             Name: John Doe
//             <br />
//             Email: john@example.com
//             <br />
//             Role: Administrator
//           </Typography>
//         </Box>
//       </WmCardContent>
//     ),
//   },
// };

// export const Default: Story = {
//   args: {
//     name: "defaultCard",
//     title: "Default Card",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent">
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="body1">
//             This is a basic card with a title and content area.
//           </Typography>
//         </Box>
//       </WmCardContent>
//     ),
//   },
// };

// export const WithSubheading: Story = {
//   args: {
//     name: "subheadingCard",
//     title: "User Profile",
//     subheading: "View and edit your profile information",
//     iconclass: "wi wi-user",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent">
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="body1">
//             Name: John Doe
//             <br />
//             Email: john@example.com
//             <br />
//             Role: Administrator
//           </Typography>
//         </Box>
//       </WmCardContent>
//     ),
//   },
// };

// export const WithImage: Story = {
//   args: {
//     name: "imageCard",
//     title: "Product Card",
//     subheading: "Featured Product",
//     iconclass: "wi wi-shopping-cart",
//     picturesource: "https://picsum.photos/400/300",
//     picturetitle: "Product Image",
//     imageheight: "200px",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent">
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Premium Headphones
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             High-quality wireless headphones with noise cancellation.
//           </Typography>
//           <Typography variant="h5" sx={{ mt: 2, color: "primary.main" }}>
//             $299.99
//           </Typography>
//         </Box>
//       </WmCardContent>
//     ),
//   },
// };

// export const WithActions: Story = {
//   args: {
//     name: "actionsCard",
//     title: "Product Details",
//     subheading: "Premium Wireless Headphones",
//     iconclass: "wi wi-headphones",
//     picturesource: "https://picsum.photos/400/250",
//     imageheight: "200px",
//     listener: mockListener,
//     children: (
//       <>
//         <WmCardContent name="cardContent">
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body2" paragraph>
//               Experience superior sound quality with our premium wireless headphones featuring
//               active noise cancellation and 30-hour battery life.
//             </Typography>
//             <Typography variant="h5" color="primary.main">
//               $299.99
//             </Typography>
//           </Box>
//         </WmCardContent>
//         <WmCardActions name="cardActions">
//           <Button size="small" color="primary">
//             Add to Cart
//           </Button>
//           <Button size="small" color="secondary">
//             Learn More
//           </Button>
//         </WmCardActions>
//       </>
//     ),
//   },
// };

// export const WithFooter: Story = {
//   args: {
//     name: "footerCard",
//     title: "Blog Post",
//     subheading: "Getting Started with React",
//     iconclass: "wi wi-file-text",
//     picturesource: "https://picsum.photos/400/200",
//     imageheight: "180px",
//     listener: mockListener,
//     children: (
//       <>
//         <WmCardContent name="cardContent">
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body2" paragraph>
//               Learn the fundamentals of React and build modern web applications with this
//               comprehensive guide for beginners.
//             </Typography>
//           </Box>
//         </WmCardContent>
//         <WmCardFooter name="cardFooter">
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="caption" color="text.secondary">
//               Published: Dec 17, 2025
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               5 min read
//             </Typography>
//           </Box>
//         </WmCardFooter>
//       </>
//     ),
//   },
// };

// export const WithIconUrl: Story = {
//   args: {
//     name: "iconUrlCard",
//     title: "Profile Card",
//     subheading: "Software Engineer",
//     iconurl: "https://i.pravatar.cc/150?img=3",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent">
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="body1" gutterBottom>
//             <strong>Sarah Johnson</strong>
//           </Typography>
//           <Typography variant="body2" color="text.secondary" paragraph>
//             Passionate about building scalable web applications and leading development teams.
//           </Typography>
//           <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h6">256</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Posts
//               </Typography>
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h6">2.4K</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Followers
//               </Typography>
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h6">512</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Following
//               </Typography>
//             </Box>
//           </Stack>
//         </Box>
//       </WmCardContent>
//     ),
//   },
// };


// export const CustomSize: Story = {
//   args: {
//     name: "customSizeCard",
//     title: "Custom Size Card",
//     subheading: "Fixed width and height",
//     iconclass: "wi wi-resize",
//     width: "400px",
//     height: "300px",
//     listener: mockListener,
//     children: (
//       <WmCardContent name="cardContent">
//         <Box sx={{ padding: 2 }}>
//           <Typography variant="body1">
//             This card has custom width (400px) and height (300px) dimensions.
//           </Typography>
//         </Box>
//       </WmCardContent>
//     ),
//   },
// };


// export const ProductShowcase: Story = {
//   args: {
//     name: "productShowcaseCard",
//     title: "Latest Smartphone",
//     subheading: "Flagship Model 2025",
//     iconclass: "wi wi-mobile",
//     picturesource: "https://picsum.photos/400/300?random=1",
//     picturetitle: "Smartphone",
//     imageheight: "250px",
//     width: "400px",
//     listener: mockListener,
//     children: (
//       <>
//         <WmCardContent name="cardContent">
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               UltraPhone Pro Max
//             </Typography>
//             <Typography variant="body2" color="text.secondary" paragraph>
//               6.7" OLED Display | 256GB Storage | 5G Enabled | Triple Camera System
//             </Typography>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
//               <Typography variant="h4" color="primary.main">
//                 $1,299
//               </Typography>
//               <Box>
//                 <Typography variant="caption" color="success.main">
//                   ⭐ 4.8/5.0
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
//                   (2,341 reviews)
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </WmCardContent>
//         <WmCardActions name="cardActions">
//           <Button size="small" variant="contained" color="primary">
//             Buy Now
//           </Button>
//           <Button size="small" variant="outlined" color="primary">
//             Add to Wishlist
//           </Button>
//         </WmCardActions>
//         <WmCardFooter name="cardFooter">
//           <Typography variant="caption" color="text.secondary">
//             Free shipping | 2-year warranty | 30-day returns
//           </Typography>
//         </WmCardFooter>
//       </>
//     ),
//   },
// };

// export const BlogArticle: Story = {
//   args: {
//     name: "blogArticleCard",
//     title: "Technology Trends 2025",
//     subheading: "AI and Machine Learning",
//     iconclass: "wi wi-lightbulb",
//     picturesource: "https://picsum.photos/400/200?random=2",
//     imageheight: "200px",
//     actions: JSON.stringify([
//       { id: 1, label: "Share", icon: "wi wi-share" },
//       { id: 2, label: "Bookmark", icon: "wi wi-bookmark" },
//       { id: 3, label: "Report", icon: "wi wi-flag" },
//     ]),
//     itemlabel: "label",
//     itemicon: "icon",
//     listener: mockListener,
//     children: (
//       <>
//         <WmCardContent name="cardContent">
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body2" paragraph>
//               Explore the latest advancements in artificial intelligence and machine learning
//               that are shaping the future of technology. From generative AI to autonomous
//               systems, discover what's next.
//             </Typography>
//             <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//               <Box
//                 sx={{
//                   px: 1,
//                   py: 0.5,
//                   backgroundColor: "primary.light",
//                   color: "primary.contrastText",
//                   borderRadius: 1,
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 AI
//               </Box>
//               <Box
//                 sx={{
//                   px: 1,
//                   py: 0.5,
//                   backgroundColor: "secondary.light",
//                   color: "secondary.contrastText",
//                   borderRadius: 1,
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 Technology
//               </Box>
//               <Box
//                 sx={{
//                   px: 1,
//                   py: 0.5,
//                   backgroundColor: "info.light",
//                   color: "info.contrastText",
//                   borderRadius: 1,
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 Innovation
//               </Box>
//             </Stack>
//           </Box>
//         </WmCardContent>
//         <WmCardActions name="cardActions">
//           <Button size="small">Read More</Button>
//           <Button size="small">Comment</Button>
//         </WmCardActions>
//         <WmCardFooter name="cardFooter">
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="caption" color="text.secondary">
//               By John Smith • Dec 17, 2025
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               👁 1.2K views
//             </Typography>
//           </Box>
//         </WmCardFooter>
//       </>
//     ),
//   },
// };

// export const UserProfile: Story = {
//   args: {
//     name: "userProfileCard",
//     title: "Alex Martinez",
//     subheading: "Senior Product Designer",
//     iconurl: "https://i.pravatar.cc/150?img=12",
//     width: "350px",
//     actions: JSON.stringify([
//       { id: 1, label: "Send Message", icon: "wi wi-envelope" },
//       { id: 2, label: "View Profile", icon: "wi wi-user" },
//       { id: 3, label: "Block User", icon: "wi wi-ban" },
//     ]),
//     itemlabel: "label",
//     itemicon: "icon",
//     listener: mockListener,
//     children: (
//       <>
//         <WmCardContent name="cardContent">
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body2" color="text.secondary" paragraph>
//               Creating beautiful and intuitive user experiences. Based in San Francisco, CA.
//             </Typography>
//             <Stack direction="row" spacing={3} sx={{ mt: 2, mb: 2 }}>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" color="primary.main">
//                   342
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Projects
//                 </Typography>
//               </Box>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" color="primary.main">
//                   5.2K
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Followers
//                 </Typography>
//               </Box>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" color="primary.main">
//                   1.8K
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Following
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         </WmCardContent>
//         <WmCardActions name="cardActions">
//           <Button size="small" variant="contained" color="primary" fullWidth>
//             Follow
//           </Button>
//           <Button size="small" variant="outlined" color="primary" fullWidth>
//             Message
//           </Button>
//         </WmCardActions>
//       </>
//     ),
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [eventLog, setEventLog] = useState<string[]>([]);

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     const handleClick = () => {
//       addLog("Card clicked");
//     };

//     const handleDoubleClick = () => {
//       addLog("Card double-clicked");
//     };

//     const handleMouseEnter = () => {
//       addLog("Mouse entered card");
//     };

//     const handleMouseLeave = () => {
//       addLog("Mouse left card");
//     };

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={3}>
//           <WmCard
//             name="interactiveCard"
//             title="Interactive Card"
//             subheading="Try clicking, double-clicking, and hovering"
//             iconclass="wi wi-hand-pointer"
//             listener={mockListener}
//             onClick={handleClick}
//             onDblclick={handleDoubleClick}
//             onMouseenter={handleMouseEnter}
//             onMouseleave={handleMouseLeave}
//           >
//             <WmCardContent name="cardContent">
//               <Box sx={{ padding: 2 }}>
//                 <Typography variant="body1">
//                   This card demonstrates various mouse events. Interact with it to see the event log
//                   below.
//                 </Typography>
//               </Box>
//             </WmCardContent>
//           </WmCard>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2">Interact with the card to see events</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {eventLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
// };
