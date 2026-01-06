import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import HtmlDefaultExport from "../../../../components/basic/html/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof HtmlDefaultExport> = {
  title: "Basic/Html",
  component: HtmlDefaultExport,
  argTypes: {
    horizontalalign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    height: { control: "text" },
    width: { control: "text" },
    show: { control: "boolean" },
    // hint: { control: "text" },
    // arialabel: { control: "text" },
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
    <HtmlDefaultExport {...args} listener={mockListener}>
      {args.children}
    </HtmlDefaultExport>
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicHtml",
    listener: mockListener,
    horizontalalign: "center",
    show: true,
    children: (
      <div>
        <h2 style={{margin: '0 0 12px'}}>Basic HTML Content</h2>
        <p>This is basic HTML content rendered inside the HTML component.</p>
      </div>
    ),
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Stack spacing={4}>
        <Typography variant="h6" fontWeight={600}>
          HTML Showcase
        </Typography>

        {/* 2. Code Snippet */}
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Code Snippet
          </Typography>

          <HtmlDefaultExport name="codeHtml" listener={mockListener}>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "16px",
                borderRadius: "6px",
                overflow: "auto",
              }}
            >
              <code>{`function greet(name) {
  return "Hello, " + name;
}`}</code>
            </pre>
          </HtmlDefaultExport>
        </Stack>

        {/* 3. Rich Content */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Rich Content
          </Typography>

          <HtmlDefaultExport name="richHtml" listener={mockListener}>
            <div>
              <p>
                This content contains <strong>bold</strong>, <em>italic</em>,
                and a{" "}
                <a href="https://www.wavemaker.com" target="_blank" rel="noreferrer">
                  link
                </a>
                .
              </p>
              <ul>
                <li>First item</li>
                <li>Second item</li>
              </ul>
            </div>
          </HtmlDefaultExport>
        </Stack>

        {/* 4. Layout Content */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Layout Content
          </Typography>

          <HtmlDefaultExport name="layoutHtml" listener={mockListener}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
              }}
            >
              <div style={{ padding: "12px", background: "#e3f2fd" }}>Column 1</div>
              <div style={{ padding: "12px", background: "#fce4ec" }}>Column 2</div>
              <div style={{ padding: "12px", background: "#e8f5e9" }}>Column 3</div>
            </div>
          </HtmlDefaultExport>
        </Stack>
      </Stack>
    </Box>
  ),
};


// export const WithBlockquote: Story = {
//   render: Template,
//   args: {
//     name: "withBlockquote",
//     listener: mockListener,
//     show: true,
//     children: (
//       <div>
//         <h3>Quotation</h3>
//         <blockquote
//           style={{
//             borderLeft: "4px solid #2196f3",
//             paddingLeft: "16px",
//             fontStyle: "italic",
//             color: "#666",
//             margin: "16px 0",
//           }}
//         >
//           "The only way to do great work is to love what you do."
//           <footer style={{ marginTop: "8px", fontStyle: "normal", fontSize: "14px" }}>
//             — Steve Jobs
//           </footer>
//         </blockquote>
//       </div>
//     ),
//   },
// };

// export const EventHandlers: Story = {
//   render: () => {
//     const [events, setEvents] = useState<string[]>([]);

//     const addEvent = (eventName: string) => {
//       setEvents((prev) => [...prev, `${eventName} at ${new Date().toLocaleTimeString()}`].slice(-5));
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">HTML Component with Event Handlers</Typography>
//           <HtmlDefaultExport
//             name="eventHandlers"
//             listener={mockListener}
//             onClick={() => addEvent("Click")}
//             onDoubleClick={() => addEvent("Double Click")}
//             onMouseEnter={() => addEvent("Mouse Enter")}
//             onMouseLeave={() => addEvent("Mouse Leave")}
//             styles={{
//               padding: "24px",
//               backgroundColor: "#f5f5f5",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             <h3>Interact with this content</h3>
//             <p>Click, double-click, or hover to trigger events.</p>
//           </HtmlDefaultExport>
//           <Box p={2} bgcolor="#e3f2fd" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Event Log:
//             </Typography>
//             {events.length === 0 ? (
//               <Typography variant="body2">No events yet</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {events.map((event, index) => (
//                   <Typography key={index} variant="body2">
//                     • {event}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "eventHandlers",
//     listener: mockListener,
//   },
// };

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "html1",
//     listener: mockListener,
//     children: (
//       <div>
//         <h2>Default HTML Content</h2>
//         <p>This is basic HTML content rendered inside the HTML component.</p>
//       </div>
//     ),
//   },
// };

// export const SimpleText: Story = {
//   render: Template,
//   args: {
//     name: "simpleText",
//     listener: mockListener,
//     children: <p>Simple text content</p>,
//   },
// };

// export const RichContent: Story = {
//   render: Template,
//   args: {
//     name: "richContent",
//     listener: mockListener,
//     children: (
//       <div>
//         <h1>Main Heading</h1>
//         <h2>Subheading</h2>
//         <p>
//           This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and{" "}
//           <u>underlined text</u>.
//         </p>
//         <ul>
//           <li>List item 1</li>
//           <li>List item 2</li>
//           <li>List item 3</li>
//         </ul>
//         <p>
//           <a href="https://example.com" target="_blank" rel="noopener noreferrer">
//             Link to external site
//           </a>
//         </p>
//       </div>
//     ),
//   },
// };

// export const AlignLeft: Story = {
//   render: Template,
//   args: {
//     name: "alignLeft",
//     listener: mockListener,
//     horizontalalign: "left",
//     children: (
//       <div>
//         <h3>Left Aligned</h3>
//         <p>This content is aligned to the left.</p>
//       </div>
//     ),
//   },
// };

// export const AlignCenter: Story = {
//   render: Template,
//   args: {
//     name: "alignCenter",
//     listener: mockListener,
//     horizontalalign: "center",
//     children: (
//       <div>
//         <h3>Center Aligned</h3>
//         <p>This content is centered.</p>
//       </div>
//     ),
//   },
// };

// export const AlignRight: Story = {
//   render: Template,
//   args: {
//     name: "alignRight",
//     listener: mockListener,
//     horizontalalign: "right",
//     children: (
//       <div>
//         <h3>Right Aligned</h3>
//         <p>This content is aligned to the right.</p>
//       </div>
//     ),
//   },
// };

// export const WithCustomDimensions: Story = {
//   render: Template,
//   args: {
//     name: "customDimensions",
//     listener: mockListener,
//     width: "400px",
//     height: "200px",
//     children: (
//       <div style={{ border: "2px dashed #ccc", height: "100%", padding: "16px" }}>
//         <p>This HTML component has custom width (400px) and height (200px).</p>
//       </div>
//     ),
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     styles: {
//       padding: "24px",
//       backgroundColor: "#f5f5f5",
//       borderRadius: "8px",
//       border: "1px solid #e0e0e0",
//     },
//     children: (
//       <div>
//         <h3>Custom Styled Content</h3>
//         <p>This HTML component has custom styling applied.</p>
//       </div>
//     ),
//   },
// };

// export const WithTable: Story = {
//   render: Template,
//   args: {
//     name: "withTable",
//     listener: mockListener,
//     children: (
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
//               Name
//             </th>
//             <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
//               Email
//             </th>
//             <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
//               Role
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={{ border: "1px solid #ddd", padding: "8px" }}>John Doe</td>
//             <td style={{ border: "1px solid #ddd", padding: "8px" }}>john@example.com</td>
//             <td style={{ border: "1px solid #ddd", padding: "8px" }}>Admin</td>
//           </tr>
//           <tr>
//             <td style={{ border: "1px solid #ddd", padding: "8px" }}>Jane Smith</td>
//             <td style={{ border: "1px solid #ddd", padding: "8px" }}>jane@example.com</td>
//             <td style={{ border: "1px solid #ddd", padding: "8px" }}>User</td>
//           </tr>
//         </tbody>
//       </table>
//     ),
//   },
// };

// export const WithImage: Story = {
//   render: Template,
//   args: {
//     name: "withImage",
//     listener: mockListener,
//     children: (
//       <div>
//         <h3>Image in HTML Component</h3>
//         <img
//           src="https://via.placeholder.com/400x200"
//           alt="Placeholder"
//           style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
//         />
//         <p>This is an image rendered inside the HTML component.</p>
//       </div>
//     ),
//   },
// };

// export const WithForm: Story = {
//   render: Template,
//   args: {
//     name: "withForm",
//     listener: mockListener,
//     children: (
//       <form>
//         <div style={{ marginBottom: "16px" }}>
//           <label htmlFor="name" style={{ display: "block", marginBottom: "4px" }}>
//             Name:
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "16px" }}>
//           <label htmlFor="email" style={{ display: "block", marginBottom: "4px" }}>
//             Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#2196f3",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Submit
//         </button>
//       </form>
//     ),
//   },
// };

// export const WithEmbeddedVideo: Story = {
//   render: Template,
//   args: {
//     name: "withVideo",
//     listener: mockListener,
//     children: (
//       <div>
//         <h3>Embedded Video</h3>
//         <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
//           <iframe
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               border: 0,
//             }}
//             src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//             title="YouTube video player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       </div>
//     ),
//   },
// };

// export const Clickable: Story = {
//   render: (args: any) => {
//     const [clicked, setClicked] = useState(false);

//     return (
//       <Box style={{ padding: 16 }}>
//         <HtmlDefaultExport
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
//           <h3>{clicked ? "Clicked!" : "Click me"}</h3>
//           <p>This HTML component is clickable and changes color when clicked.</p>
//         </HtmlDefaultExport>
//       </Box>
//     );
//   },
//   args: {
//     name: "clickable",
//   },
// };

// export const InteractiveContent: Story = {
//   render: () => {
//     const [count, setCount] = useState(0);

//     return (
//       <Box style={{ padding: 16 }}>
//         <HtmlDefaultExport name="interactive" listener={mockListener}>
//           <div style={{ padding: "24px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
//             <h3>Interactive Counter</h3>
//             <p>Count: {count}</p>
//             <button
//               onClick={() => setCount(count + 1)}
//               style={{
//                 padding: "8px 16px",
//                 marginRight: "8px",
//                 backgroundColor: "#2196f3",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Increment
//             </button>
//             <button
//               onClick={() => setCount(count - 1)}
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: "#f44336",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Decrement
//             </button>
//           </div>
//         </HtmlDefaultExport>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveContent",
//     listener: mockListener,
//   },
// };

// export const MultiColumnLayout: Story = {
//   render: Template,
//   args: {
//     name: "multiColumn",
//     listener: mockListener,
//     children: (
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
//         <div style={{ padding: "16px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
//           <h4>Column 1</h4>
//           <p>Content for the first column.</p>
//         </div>
//         <div style={{ padding: "16px", backgroundColor: "#f3e5f5", borderRadius: "8px" }}>
//           <h4>Column 2</h4>
//           <p>Content for the second column.</p>
//         </div>
//         <div style={{ padding: "16px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
//           <h4>Column 3</h4>
//           <p>Content for the third column.</p>
//         </div>
//       </div>
//     ),
//   },
// };


// export const ArticleLayout: Story = {
//   render: Template,
//   args: {
//     name: "articleLayout",
//     listener: mockListener,
//     width: "800px",
//     children: (
//       <article>
//         <header style={{ marginBottom: "24px" }}>
//           <h1 style={{ marginBottom: "8px" }}>Article Title</h1>
//           <p style={{ color: "#666", fontSize: "14px" }}>Published on January 1, 2024 by John Doe</p>
//         </header>
//         <section style={{ marginBottom: "24px" }}>
//           <h2>Introduction</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
//             ut labore et dolore magna aliqua.
//           </p>
//         </section>
//         <section style={{ marginBottom: "24px" }}>
//           <h2>Main Content</h2>
//           <p>
//             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//             commodo consequat.
//           </p>
//         </section>
//         <footer style={{ borderTop: "1px solid #ddd", paddingTop: "16px" }}>
//           <p style={{ fontSize: "14px", color: "#666" }}>Tags: HTML, Component, React</p>
//         </footer>
//       </article>
//     ),
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     hint: "This is a tooltip - hover over the component to see it",
//     arialabel: "HTML content container",
//     children: (
//       <div>
//         <h3>Hover over this content</h3>
//         <p>This HTML component has a tooltip (hint) and aria-label for accessibility.</p>
//       </div>
//     ),
//   },
// };

