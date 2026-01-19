import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import RichTextEditorDefaultExport from "../../../../components/basic/richtexteditor/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import richTextEditTokensData from "../../../../designTokens/components/richtext-editor/richtext-editor.json";

const meta: Meta<typeof RichTextEditorDefaultExport> = {
  title: "Basic/RichTextEditor",
  component: RichTextEditorDefaultExport,
  // argTypes: {
  //   placeholder: { control: "text" },
  //   datavalue: { control: "text" },
  //   readonly: { control: "boolean" },
  //   disabled: { control: "boolean" },
  //   showpreview: { control: "boolean" },
  //   width: { control: "text" },
  //   height: { control: "text" },
  //   // tabindex: { control: "number" },
  //   // hint: { control: "text" },
  //   // arialabel: { control: "text" },
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
  onChange: () => {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <RichTextEditorDefaultExport {...args} listener={mockListener} />
  </Box>
);

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
    name:"docsRichTextEditor",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const editors = [
      {
        title: "Basic Editor",
        props: {
          name: "basicEditor",
          placeholder: "Start typing...",
          readonly: false,
          disabled: false,
          showpreview: false,
          height: "200px",
        },
      },
      {
        title: "Editor with Preview",
        props: {
          name: "previewEditor",
          datavalue: `<p>Edit the content above and see the rendered preview below.</p>`,
          readonly: false,
          disabled: false,
          showpreview: true,
          height: "250px",
        },
      },
      {
        title: "Read-Only Editor",
        props: {
          name: "readonlyEditor",
          datavalue: `
            <h3>Read-only Content</h3>
            <p>This content cannot be edited.</p>
            <p>Even multiple paragraphs and line breaks are preserved.</p>
          `,
          readonly: true,
          disabled: false,
          showpreview: true,
          height: "220px",
        },
      },
      {
        title: "Disabled Editor",
        props: {
          name: "disabledEditor",
          datavalue: `
            <p>This editor is disabled.</p>
            <p>User cannot type or modify content.</p>
          `,
          readonly: false,
          disabled: true,
          showpreview: true,
          height: "220px",
        },
      },
      {
        title: "Rich HTML Content",
        props: {
          name: "richContentEditor",
          datavalue: `
            <h2>Main Heading</h2>
            <h3>Subheading</h3>
            <p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p>
            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>
            <ol>
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
            </ol>
            <p>Colored text: <span style="color: red;">red</span>, Highlight: <span style="background-color: yellow;">yellow</span></p>
          `,
          readonly: false,
          disabled: false,
          showpreview: true,
          height: "300px",
        },
      },
      {
        title: "Custom Size Editor",
        props: {
          name: "customSizeEditor",
          placeholder: "Custom width (600px) and height (300px)",
          width: "600px",
          height: "300px",
          readonly: false,
          disabled: false,
          showpreview: true,
        },
      },
    ];

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          RichTextEditor Showcase
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 4,
          }}
        >
          {editors.map((editor, index) => (
            <Box key={index}>
              <Typography variant="subtitle2" mb={1}>
                {editor.title}
              </Typography>
              <RichTextEditorDefaultExport
                {...editor.props}
                listener={mockListener}
              />
            </Box>
          ))}
        </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseEditor",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicRichTextEditor",
    listener: mockListener,
    placeholder: "Start typing...",
    readonly: false,
    disabled: false,
    showpreview: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    datavalue: { control: "text" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    showpreview: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
      // component can't spread data-design-token-target, so we apply it to a wrapper
      const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
      return (
        <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
          <RichTextEditorDefaultExport {...componentArgs} listener={mockListener} />
        </Box>
      );
    },
  args: {
    name: "standardRichTextEditor",
    listener: mockListener,
    placeholder: "Start typing...",
    "data-design-token-target": true,
  },
  argTypes: {
    placeholder: { control: "text" },
    datavalue: { control: "text" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: richTextEditTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "note",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};

// export const RichFormattedContent: Story = {
//   render: Template,
//   args: {
//     name: "richContent",
//     listener: mockListener,
//     datavalue: `
//       <h1>Main Heading</h1>
//       <h2>Subheading</h2>
//       <p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p>
//       <ul>
//         <li>Unordered list item 1</li>
//         <li>Unordered list item 2</li>
//         <li>Unordered list item 3</li>
//       </ul>
//       <ol>
//         <li>Ordered list item 1</li>
//         <li>Ordered list item 2</li>
//         <li>Ordered list item 3</li>
//       </ol>
//       <p>Text can be <span style="color: red;">colored</span> and <span style="background-color: yellow;">highlighted</span>.</p>
//     `,
//   },
// };

// export const Showcase: Story = {
//   render: Template,
//   args: {
//     name: "showcaseEditor",
//     listener: mockListener,
//     showpreview: true,
//     readonly: false,
//     disabled: false,
//     height: "350px",
//     datavalue: `
//       <h2>Live Preview</h2>
//       <p>Edit the content above and see the rendered preview below.</p>
//       <ul>
//         <li>Real-time updates</li>
//         <li>Sanitized HTML output</li>
//         <li>Safe rendering</li>
//       </ul>
//     `,
//   },
// };

// export const WithInitialContent: Story = {
//   render: Template,
//   args: {
//     name: "editorWithContent",
//     listener: mockListener,
//     datavalue: "<h2>Welcome to Rich Text Editor</h2><p>This is a <strong>powerful</strong> editor with <em>formatting</em> capabilities.</p>",
//   },
// };

// export const WithPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "editorPlaceholder",
//     listener: mockListener,
//     placeholder: "Write your content here...",
//   },
// };

// export const ReadOnly: Story = {
//   render: Template,
//   args: {
//     name: "editorReadOnly",
//     listener: mockListener,
//     readonly: true,
//     datavalue: "<h3>Read-Only Content</h3><p>This content cannot be edited. The editor is in read-only mode.</p>",
//   },
// };

// export const Disabled: Story = {
//   render: Template,
//   args: {
//     name: "editorDisabled",
//     listener: mockListener,
//     disabled: true,
//     datavalue: "<p>This editor is disabled.</p>",
//   },
// };

// export const WithPreview: Story = {
//   render: Template,
//   args: {
//     name: "editorPreview",
//     listener: mockListener,
//     showpreview: true,
//     datavalue: "<h2>Preview Mode</h2><p>Type in the editor above, and see the preview below.</p><ul><li>Item 1</li><li>Item 2</li></ul>",
//   },
// };

// export const CustomHeight: Story = {
//   render: Template,
//   args: {
//     name: "editorHeight",
//     listener: mockListener,
//     height: "300px",
//     placeholder: "This editor has a custom height of 300px",
//   },
// };

// export const CustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "editorWidth",
//     listener: mockListener,
//     width: "600px",
//     placeholder: "This editor has a custom width of 600px",
//   },
// };

// export const CustomDimensions: Story = {
//   render: Template,
//   args: {
//     name: "editorDimensions",
//     listener: mockListener,
//     width: "700px",
//     height: "400px",
//     placeholder: "Custom width (700px) and height (400px)",
//   },
// };

// export const SmallEditor: Story = {
//   render: Template,
//   args: {
//     name: "smallEditor",
//     listener: mockListener,
//     width: "400px",
//     height: "200px",
//     placeholder: "Small editor (400x200)",
//   },
// };

// export const LargeEditor: Story = {
//   render: Template,
//   args: {
//     name: "largeEditor",
//     listener: mockListener,
//     width: "100%",
//     height: "500px",
//     placeholder: "Large editor with full width",
//   },
// };

// export const WithTable: Story = {
//   render: Template,
//   args: {
//     name: "editorTable",
//     listener: mockListener,
//     datavalue: `
//       <h3>Sample Table</h3>
//       <table border="1" style="width: 100%; border-collapse: collapse;">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>John Doe</td>
//             <td>john@example.com</td>
//             <td>Admin</td>
//           </tr>
//           <tr>
//             <td>Jane Smith</td>
//             <td>jane@example.com</td>
//             <td>User</td>
//           </tr>
//         </tbody>
//       </table>
//     `,
//   },
// };

// export const WithLinks: Story = {
//   render: Template,
//   args: {
//     name: "editorLinks",
//     listener: mockListener,
//     datavalue: `
//       <h3>Links and References</h3>
//       <p>Visit <a href="https://www.example.com" target="_blank">Example Website</a> for more information.</p>
//       <p>Check out our <a href="/documentation">documentation</a> page.</p>
//     `,
//   },
// };

// export const WithImage: Story = {
//   render: Template,
//   args: {
//     name: "editorImage",
//     listener: mockListener,
//     datavalue: `
//       <h3>Image Example</h3>
//       <p>Below is an embedded image:</p>
//       <img src="https://via.placeholder.com/400x200" alt="Placeholder" style="max-width: 100%;" />
//       <p>Images can be inserted and resized in the editor.</p>
//     `,
//   },
// };

// export const CodeContent: Story = {
//   render: Template,
//   args: {
//     name: "editorCode",
//     listener: mockListener,
//     datavalue: `
//       <h3>Code Example</h3>
//       <pre><code>function greet(name) {
//   return 'Hello, ' + name + '!';
// }

// console.log(greet('World'));</code></pre>
//       <p>Code blocks can be formatted with proper syntax.</p>
//     `,
//   },
// };

// export const BlogPostExample: Story = {
//   render: Template,
//   args: {
//     name: "blogPost",
//     listener: mockListener,
//     height: "500px",
//     datavalue: `
//       <h1>My Blog Post Title</h1>
//       <p><em>Published on January 1, 2024</em></p>
//       <p>This is the introduction paragraph of my blog post. It sets the context for what readers will learn.</p>
//       <h2>Main Section</h2>
//       <p>Here's the main content with detailed information about the topic.</p>
//       <ul>
//         <li>Key point 1</li>
//         <li>Key point 2</li>
//         <li>Key point 3</li>
//       </ul>
//       <h2>Conclusion</h2>
//       <p>This wraps up the blog post with final thoughts and takeaways.</p>
//     `,
//   },
// };

// export const NewsletterExample: Story = {
//   render: Template,
//   args: {
//     name: "newsletter",
//     listener: mockListener,
//     height: "400px",
//     datavalue: `
//       <h2>Monthly Newsletter - January 2024</h2>
//       <p>Dear Subscribers,</p>
//       <p>Welcome to our monthly newsletter! Here's what's new:</p>
//       <h3>🎉 Product Updates</h3>
//       <ul>
//         <li>New feature release: Dark mode</li>
//         <li>Performance improvements</li>
//         <li>Bug fixes and stability updates</li>
//       </ul>
//       <h3>📰 Company News</h3>
//       <p>We're excited to announce our expansion into new markets!</p>
//       <p>Best regards,<br/>The Team</p>
//     `,
//   },
// };

// export const EmailTemplateExample: Story = {
//   render: Template,
//   args: {
//     name: "emailTemplate",
//     listener: mockListener,
//     height: "350px",
//     datavalue: `
//       <p>Hi [Name],</p>
//       <p>Thank you for your interest in our product!</p>
//       <p>We wanted to reach out to let you know about:</p>
//       <ul>
//         <li><strong>Exclusive offer</strong> - 20% off your first purchase</li>
//         <li><strong>Free trial</strong> - Try premium features for 30 days</li>
//         <li><strong>Priority support</strong> - Get help when you need it</li>
//       </ul>
//       <p>Click <a href="#">here</a> to get started.</p>
//       <p>Best regards,<br/>Sales Team</p>
//     `,
//   },
// };

// export const InteractiveEditor: Story = {
//   render: () => {
//     const [content, setContent] = useState("<p>Start typing...</p>");
//     const [wordCount, setWordCount] = useState(0);

//     const handleChange = (event: any, widget: any, newValue: string) => {
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = newValue;
//       const text = tempDiv.textContent || tempDiv.innerText || "";
//       const words = text.trim().split(/\s+/).filter(word => word.length > 0);
//       setWordCount(words.length);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={2}>
//           <Typography variant="h6">Interactive Rich Text Editor</Typography>
//           <RichTextEditorDefaultExport
//             name="interactiveEditor"
//             listener={mockListener}
//             datavalue={content}
//             onChange={handleChange}
//             height="300px"
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="body2">
//               Word Count: <strong>{wordCount}</strong>
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveEditor",
//     listener: mockListener,
//   },
// };

// export const WithEventHandlers: Story = {
//   render: () => {
//     const [events, setEvents] = useState<string[]>([]);

//     const addEvent = (eventName: string) => {
//       setEvents(prev => [`${eventName} at ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 5));
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={2}>
//           <Typography variant="h6">Editor with Event Tracking</Typography>
//           <RichTextEditorDefaultExport
//             name="eventEditor"
//             listener={mockListener}
//             onChange={(event, widget, newValue, oldValue) => addEvent("Content Changed")}
//             onBeforerender={(event, widget) => addEvent("Before Render")}
//             height="250px"
//             placeholder="Type to see events..."
//           />
//           <Box p={2} bgcolor="#e3f2fd" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Event Log:
//             </Typography>
//             {events.length === 0 ? (
//               <Typography variant="body2">No events yet</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {events.map((event, index) => (
//                   <Typography key={index} variant="body2" fontFamily="monospace">
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
//     name: "eventEditor",
//     listener: mockListener,
//   },
// };

// export const ControlledEditor: Story = {
//   render: () => {
//     const [editorContent, setEditorContent] = useState("<p>Click a button to load content</p>");

//     const loadSampleContent = (type: string) => {
//       switch (type) {
//         case "simple":
//           setEditorContent("<h3>Simple Content</h3><p>This is a simple paragraph.</p>");
//           break;
//         case "formatted":
//           setEditorContent(
//             "<h2>Formatted Content</h2><p>This has <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item 1</li><li>Item 2</li></ul>"
//           );
//           break;
//         case "complex":
//           setEditorContent(
//             "<h1>Complex Content</h1><p>Multiple paragraphs with <a href='#'>links</a>.</p><blockquote>A quote goes here.</blockquote><p>More content...</p>"
//           );
//           break;
//         case "clear":
//           setEditorContent("");
//           break;
//       }
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={2}>
//           <Typography variant="h6">Controlled Editor</Typography>
//           <Stack direction="row" spacing={1}>
//             <Button variant="outlined" size="small" onClick={() => loadSampleContent("simple")}>
//               Load Simple
//             </Button>
//             <Button variant="outlined" size="small" onClick={() => loadSampleContent("formatted")}>
//               Load Formatted
//             </Button>
//             <Button variant="outlined" size="small" onClick={() => loadSampleContent("complex")}>
//               Load Complex
//             </Button>
//             <Button variant="outlined" size="small" color="error" onClick={() => loadSampleContent("clear")}>
//               Clear
//             </Button>
//           </Stack>
//           <RichTextEditorDefaultExport
//             name="controlledEditor"
//             listener={mockListener}
//             datavalue={editorContent}
//             height="300px"
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "controlledEditor",
//     listener: mockListener,
//   },
// };

// export const MultipleEditors: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1} fontWeight="600">
//               Editor 1: Title
//             </Typography>
//             <RichTextEditorDefaultExport
//               name="multiEditor1"
//               listener={mockListener}
//               height="150px"
//               placeholder="Enter title..."
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1} fontWeight="600">
//               Editor 2: Content
//             </Typography>
//             <RichTextEditorDefaultExport
//               name="multiEditor2"
//               listener={mockListener}
//               height="250px"
//               placeholder="Enter main content..."
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1} fontWeight="600">
//               Editor 3: Summary
//             </Typography>
//             <RichTextEditorDefaultExport
//               name="multiEditor3"
//               listener={mockListener}
//               height="150px"
//               placeholder="Enter summary..."
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "multipleEditors",
//     listener: mockListener,
//   },
// };

// export const CompactEditor: Story = {
//   render: Template,
//   args: {
//     name: "compactEditor",
//     listener: mockListener,
//     width: "500px",
//     height: "200px",
//     placeholder: "Compact editor for quick notes",
//   },
// };

// export const FullWidthEditor: Story = {
//   render: Template,
//   args: {
//     name: "fullWidthEditor",
//     listener: mockListener,
//     width: "100%",
//     height: "400px",
//     placeholder: "Full width editor",
//   },
// };

// export const WithAccessibility: Story = {
//   render: Template,
//   args: {
//     name: "accessibleEditor",
//     listener: mockListener,
//     arialabel: "Rich text editor for article content",
//     hint: "Use toolbar buttons for formatting",
//     placeholder: "Write your article here...",
//     height: "300px",
//   },
// };

// export const DocumentationEditor: Story = {
//   render: Template,
//   args: {
//     name: "docEditor",
//     listener: mockListener,
//     height: "500px",
//     width: "100%",
//     datavalue: `
//       <h1>API Documentation</h1>
//       <h2>Overview</h2>
//       <p>This API provides endpoints for managing user data.</p>
//       <h2>Authentication</h2>
//       <p>All requests require an API key in the header:</p>
//       <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
//       <h2>Endpoints</h2>
//       <h3>GET /users</h3>
//       <p>Retrieves a list of all users.</p>
//       <h3>POST /users</h3>
//       <p>Creates a new user.</p>
//     `,
//   },
// };
