import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button, Chip } from "@mui/material";

import TextareaDefaultExport from "../../../../components/input/textarea/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof TextareaDefaultExport> = {
  title: "Input/Textarea",
  component: TextareaDefaultExport,
  argTypes: {
    datavalue: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    maxchars: { control: "number" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    autofocus: { control: "boolean" },
    // arialabel: { control: "text" },
    limitdisplaytext: { control: "text" },
    regexp: { control: "text" },
    updatedelay: { control: "text" },
    updateon: {
      control: { type: "select" },
      options: ["keypress", "blur"]
    },
    autocapitalize: { control: "boolean" },
    // hint: { control: "text" },
    // width: { control: "text" },
    // height: { control: "text" },
    // className: { control: "text" },
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
    <TextareaDefaultExport {...args} listener={mockListener} />
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

// Basic Examples
export const Basic: Story = {
  render: Template,
  args: {
    name: "basicTextarea",
    placeholder: "Enter your text here...",
    listener: mockListener,
    disabled: false,
    readonly: false,
    autofocus: false,
    autocapitalize: false,
    required: false,
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        {/* Heading */}
        <Typography variant="h6" fontWeight={600}>
          Textarea Showcase
        </Typography>

        {/* RegExp Example */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Regular Expression Validation
          </Typography>

          <TextareaDefaultExport
            name="regexpTextarea"
            placeholder="Only letters, numbers and spaces allowed"
            regexp="^[a-zA-Z0-9\\s]*$"
            listener={mockListener}
          />
        </Box>

        {/* Limit Display Text Types */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Character Limit Display Types
          </Typography>

          <Stack spacing={3}>
            {/* Default format */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Default Format
              </Typography>
              <TextareaDefaultExport
                name="limitDefault"
                placeholder="Max 100 characters"
                maxchars={100}
                limitdisplaytext="undefined / 100"
                listener={mockListener}
              />
            </Box>

            {/* Descriptive format */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Descriptive Text
              </Typography>
              <TextareaDefaultExport
                name="limitDescriptive"
                placeholder="Max 150 characters"
                maxchars={150}
                limitdisplaytext="Characters used: undefined out of 150"
                listener={mockListener}
              />
            </Box>

            {/* Remaining characters format */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Remaining Characters Style
              </Typography>
              <TextareaDefaultExport
                name="limitRemaining"
                placeholder="Max 200 characters"
                maxchars={200}
                limitdisplaytext="Remaining characters: undefined / 200"
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "textareaShowcase",
    listener: mockListener,
  },
};



// export const RegExp: Story = {
//   render: Template,
//   args: {
//     name: "regexpTextarea",
//     placeholder: "Only alphanumeric characters allowed",
//     regexp: "^[a-zA-Z0-9\\s]*$",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     autofocus: false,
//     autocapitalize: false,
//     required: false,
//   },
// };

// export const WithCharacterCounter: Story = {
//   render: Template,
//   args: {
//     name: "charCounterTextarea",
//     placeholder: "Type your message (max 200 characters)",
//     maxchars: 200,
//     limitdisplaytext: "undefined / 200 characters",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     autofocus: false,
//     autocapitalize: false,
//     required: false,
//   },
// };

// // Character Limit Examples
// export const WithMaxChars: Story = {
//   render: Template,
//   args: {
//     name: "maxCharsTextarea",
//     placeholder: "Maximum 100 characters allowed",
//     maxchars: 100,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     autofocus: false,
//     autocapitalize: false,
//     required: false,
//   },
// };

// export const CharacterCounterCustomText: Story = {
//   render: Template,
//   args: {
//     name: "customCounterTextarea",
//     placeholder: "Enter description",
//     maxchars: 150,
//     limitdisplaytext: "Characters used: undefined out of 150",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     autofocus: false,
//     autocapitalize: false,
//     required: false,
//   },
// };

// Validation Examples
// export const Required: Story = {
//   render: Template,
//   args: {
//     name: "requiredTextarea",
//     placeholder: "This field is required *",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const RequiredWithCharLimit: Story = {
//   render: Template,
//   args: {
//     name: "requiredCharLimitTextarea",
//     placeholder: "Required field with 50 character limit *",
//     required: true,
//     maxchars: 50,
//     limitdisplaytext: "undefined / 50",
//     listener: mockListener,
//   },
// };

// // State Variations
// export const Disabled: Story = {
//   render: Template,
//   args: {
//     name: "disabledTextarea",
//     placeholder: "Disabled textarea",
//     datavalue: "This textarea is disabled and cannot be edited.",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const Readonly: Story = {
//   render: Template,
//   args: {
//     name: "readonlyTextarea",
//     placeholder: "Readonly textarea",
//     datavalue: "This textarea is readonly. You can select and copy text but cannot edit it.",
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintTextarea",
//     placeholder: "Hover to see hint",
//     hint: "This is a helpful hint text that appears on hover",
//     listener: mockListener,
//   },
// };

// export const Autofocus: Story = {
//   render: Template,
//   args: {
//     name: "autofocusTextarea",
//     placeholder: "This textarea is auto-focused",
//     autofocus: true,
//     listener: mockListener,
//   },
// };

// // Update Behavior
// export const UpdateOnKeypress: Story = {
//   render: Template,
//   args: {
//     name: "updateKeypressTextarea",
//     placeholder: "Updates on every keypress",
//     updateon: "keypress",
//     listener: mockListener,
//   },
// };

// export const UpdateOnBlur: Story = {
//   render: Template,
//   args: {
//     name: "updateBlurTextarea",
//     placeholder: "Updates when you leave the field",
//     updateon: "blur",
//     listener: mockListener,
//   },
// };

// export const UpdateWithDelay: Story = {
//   render: Template,
//   args: {
//     name: "updateDelayTextarea",
//     placeholder: "Updates after 1 second delay",
//     updateon: "keypress",
//     updatedelay: "1000",
//     listener: mockListener,
//   },
// };

// // State Comparison
// export const StateComparison: Story = {
//   render: () => (
//     <Stack spacing={3} padding={2}>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           Normal
//         </Typography>
//         <TextareaDefaultExport
//           name="normalState"
//           placeholder="Normal textarea"
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           With Value
//         </Typography>
//         <TextareaDefaultExport
//           name="valueState"
//           placeholder="Textarea with value"
//           datavalue="Sample text content"
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           Disabled
//         </Typography>
//         <TextareaDefaultExport
//           name="disabledState"
//           placeholder="Disabled"
//           datavalue="This is disabled"
//           disabled={true}
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           Readonly
//         </Typography>
//         <TextareaDefaultExport
//           name="readonlyState"
//           placeholder="Readonly"
//           datavalue="This is readonly"
//           readonly={true}
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           Required
//         </Typography>
//         <TextareaDefaultExport
//           name="requiredState"
//           placeholder="Required field *"
//           required={true}
//           listener={mockListener}
//         />
//       </Box>
//     </Stack>
//   ),
// };

// // Character Limit Comparison
// export const CharacterLimitComparison: Story = {
//   render: () => (
//     <Stack spacing={3} padding={2} maxWidth={600}>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           50 Character Limit
//         </Typography>
//         <TextareaDefaultExport
//           name="limit50"
//           placeholder="Max 50 characters"
//           maxchars={50}
//           limitdisplaytext="undefined / 50"
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           100 Character Limit
//         </Typography>
//         <TextareaDefaultExport
//           name="limit100"
//           placeholder="Max 100 characters"
//           maxchars={100}
//           limitdisplaytext="undefined / 100"
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           200 Character Limit
//         </Typography>
//         <TextareaDefaultExport
//           name="limit200"
//           placeholder="Max 200 characters"
//           maxchars={200}
//           limitdisplaytext="undefined / 200"
//           listener={mockListener}
//         />
//       </Box>
//     </Stack>
//   ),
// };

// // Interactive Examples
// export const InteractiveTextarea: Story = {
//   render: () => {
//     const [value, setValue] = useState("");
//     const [wordCount, setWordCount] = useState(0);
//     const [charCount, setCharCount] = useState(0);

//     const customListener = {
//       appLocale: {
//         LABEL_ICON: "Icon",
//       },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         const text = data.datavalue || "";
//         setValue(text);
//         setCharCount(data.charlength || 0);
//         setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
//       },
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={2}>
//           Interactive Textarea
//         </Typography>
//         <TextareaDefaultExport
//           name="interactiveTextarea"
//           placeholder="Type your message..."
//           updateon="keypress"
//           listener={customListener}
//         />
//         <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//           <Stack direction="row" spacing={3}>
//             <Box>
//               <Typography variant="body2" color="text.secondary">
//                 Characters
//               </Typography>
//               <Typography variant="h6" color="primary">
//                 {charCount}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography variant="body2" color="text.secondary">
//                 Words
//               </Typography>
//               <Typography variant="h6" color="primary">
//                 {wordCount}
//               </Typography>
//             </Box>
//           </Stack>
//         </Box>
//       </Box>
//     );
//   },
// };

// export const TextStatistics: Story = {
//   render: () => {
//     const [text, setText] = useState("");

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setText(data.datavalue || "");
//       },
//     };

//     const stats = {
//       characters: text.length,
//       charactersNoSpaces: text.replace(/\s/g, "").length,
//       words: text.trim() ? text.trim().split(/\s+/).length : 0,
//       lines: text.split("\n").length,
//       sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={2}>
//           Text Statistics
//         </Typography>
//         <TextareaDefaultExport
//           name="statsTextarea"
//           placeholder="Type or paste your text to see statistics..."
//           updateon="keypress"
//           listener={customListener}
//         />
//         <Box mt={2} p={2} bgcolor="#e3f2fd" borderRadius={1}>
//           <Typography variant="subtitle2" mb={2}>
//             Statistics:
//           </Typography>
//           <Stack direction="row" flexWrap="wrap" gap={2}>
//             <Chip label={`Characters: ${stats.characters}`} color="primary" variant="outlined" />
//             <Chip label={`No Spaces: ${stats.charactersNoSpaces}`} color="primary" variant="outlined" />
//             <Chip label={`Words: ${stats.words}`} color="primary" variant="outlined" />
//             <Chip label={`Lines: ${stats.lines}`} color="primary" variant="outlined" />
//             <Chip label={`Sentences: ${stats.sentences}`} color="primary" variant="outlined" />
//           </Stack>
//         </Box>
//       </Box>
//     );
//   },
// };

// export const CharacterCounterWithProgress: Story = {
//   render: () => {
//     const [value, setValue] = useState("");
//     const maxChars = 250;

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setValue(data.datavalue || "");
//       },
//     };

//     const remaining = maxChars - value.length;
//     const percentUsed = (value.length / maxChars) * 100;

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={2}>
//           Character Counter with Progress
//         </Typography>
//         <TextareaDefaultExport
//           name="progressTextarea"
//           placeholder="Write your review..."
//           maxchars={maxChars}
//           limitdisplaytext={`undefined / ${maxChars} characters`}
//           updateon="keypress"
//           listener={customListener}
//         />
//         <Box mt={2}>
//           <Box display="flex" justifyContent="space-between" mb={1}>
//             <Typography variant="body2" color="text.secondary">
//               {value.length} / {maxChars} characters
//             </Typography>
//             <Typography
//               variant="body2"
//               color={remaining < 20 ? "error" : "text.secondary"}
//             >
//               {remaining} remaining
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               width: "100%",
//               height: 8,
//               bgcolor: "#e0e0e0",
//               borderRadius: 4,
//               overflow: "hidden",
//             }}
//           >
//             <Box
//               sx={{
//                 width: `${percentUsed}%`,
//                 height: "100%",
//                 bgcolor: percentUsed > 90 ? "#f44336" : percentUsed > 70 ? "#ff9800" : "#4caf50",
//                 transition: "all 0.3s ease",
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
// };

// // Real-world Examples
// export const FeedbackForm: Story = {
//   render: () => {
//     const [feedback, setFeedback] = useState("");
//     const [submitted, setSubmitted] = useState(false);

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setFeedback(data.datavalue || "");
//       },
//     };

//     const handleSubmit = () => {
//       if (feedback.trim()) {
//         setSubmitted(true);
//         setTimeout(() => {
//           setSubmitted(false);
//           setFeedback("");
//         }, 3000);
//       }
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={2}>
//           Customer Feedback Form
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={2}>
//           We'd love to hear your thoughts! Please share your feedback below.
//         </Typography>
//         <TextareaDefaultExport
//           name="feedbackForm"
//           placeholder="Tell us about your experience..."
//           maxchars={500}
//           limitdisplaytext="undefined / 500 characters"
//           required={true}
//           updateon="blur"
//           listener={customListener}
//           datavalue={submitted ? "" : feedback}
//         />
//         <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={!feedback.trim() || submitted}
//           >
//             {submitted ? "Submitted!" : "Submit Feedback"}
//           </Button>
//         </Box>
//         {submitted && (
//           <Box mt={2} p={2} bgcolor="#e8f5e9" borderRadius={1}>
//             <Typography variant="body2" color="success.main">
//               ✓ Thank you for your feedback!
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     );
//   },
// };

// export const CommentSection: Story = {
//   render: () => {
//     const [comment, setComment] = useState("");
//     const [comments, setComments] = useState<Array<{ id: number; text: string; time: string }>>([]);

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setComment(data.datavalue || "");
//       },
//     };

//     const handlePostComment = () => {
//       if (comment.trim()) {
//         const newComment = {
//           id: Date.now(),
//           text: comment,
//           time: new Date().toLocaleTimeString(),
//         };
//         setComments([newComment, ...comments]);
//         setComment("");
//       }
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={2}>
//           Comment Section
//         </Typography>
//         <TextareaDefaultExport
//           name="commentSection"
//           placeholder="Write a comment..."
//           maxchars={300}
//           limitdisplaytext="undefined / 300"
//           updateon="keypress"
//           listener={customListener}
//           datavalue={comment}
//         />
//         <Box mt={1} display="flex" justifyContent="flex-end">
//           <Button
//             variant="contained"
//             size="small"
//             onClick={handlePostComment}
//             disabled={!comment.trim()}
//           >
//             Post Comment
//           </Button>
//         </Box>
//         {comments.length > 0 && (
//           <Box mt={3}>
//             <Typography variant="subtitle2" mb={2}>
//               Comments ({comments.length})
//             </Typography>
//             <Stack spacing={2}>
//               {comments.map(c => (
//                 <Box key={c.id} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//                   <Typography variant="body2">{c.text}</Typography>
//                   <Typography variant="caption" color="text.secondary" mt={1}>
//                     Posted at {c.time}
//                   </Typography>
//                 </Box>
//               ))}
//             </Stack>
//           </Box>
//         )}
//       </Box>
//     );
//   },
// };

// export const ProductReview: Story = {
//   render: () => {
//     const [review, setReview] = useState("");
//     const minChars = 50;

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setReview(data.datavalue || "");
//       },
//     };

//     const isValid = review.length >= minChars;

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={2}>
//           Write a Product Review
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={2}>
//           Please write at least {minChars} characters to submit your review.
//         </Typography>
//         <TextareaDefaultExport
//           name="productReview"
//           placeholder="Share your experience with this product..."
//           maxchars={500}
//           limitdisplaytext="undefined / 500 characters"
//           required={true}
//           updateon="keypress"
//           listener={customListener}
//         />
//         <Box mt={2}>
//           {review.length > 0 && review.length < minChars && (
//             <Typography variant="body2" color="warning.main">
//               ⚠ Please write at least {minChars - review.length} more characters
//             </Typography>
//           )}
//           {isValid && (
//             <Typography variant="body2" color="success.main">
//               ✓ Your review meets the minimum length requirement
//             </Typography>
//           )}
//         </Box>
//         <Box mt={2}>
//           <Button variant="contained" disabled={!isValid}>
//             Submit Review
//           </Button>
//         </Box>
//       </Box>
//     );
//   },
// };

// export const NotesEditor: Story = {
//   render: () => {
//     const [notes, setNotes] = useState("");
//     const [savedNotes, setSavedNotes] = useState("");
//     const [lastSaved, setLastSaved] = useState<string | null>(null);

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setNotes(data.datavalue || "");
//       },
//     };

//     const handleSave = () => {
//       setSavedNotes(notes);
//       setLastSaved(new Date().toLocaleString());
//     };

//     const handleClear = () => {
//       setNotes("");
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={2}>
//           Notes Editor
//         </Typography>
//         <TextareaDefaultExport
//           name="notesEditor"
//           placeholder="Write your notes here..."
//           updateon="keypress"
//           updatedelay="500"
//           listener={customListener}
//           datavalue={notes}
//         />
//         <Box mt={2} display="flex" gap={2}>
//           <Button variant="contained" onClick={handleSave} disabled={!notes.trim()}>
//             Save Notes
//           </Button>
//           <Button variant="outlined" onClick={handleClear} disabled={!notes.trim()}>
//             Clear
//           </Button>
//         </Box>
//         {lastSaved && (
//           <Box mt={2} p={2} bgcolor="#e8f5e9" borderRadius={1}>
//             <Typography variant="body2" color="success.main">
//               ✓ Notes saved at {lastSaved}
//             </Typography>
//           </Box>
//         )}
//         {savedNotes && (
//           <Box mt={3}>
//             <Typography variant="subtitle2" mb={1}>
//               Saved Notes:
//             </Typography>
//             <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//               <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
//                 {savedNotes}
//               </Typography>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   },
// };

// export const SupportTicket: Story = {
//   render: () => {
//     const [formData, setFormData] = useState({
//       subject: "",
//       description: "",
//       priority: "medium",
//     });

//     const descriptionListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setFormData(prev => ({ ...prev, description: data.datavalue || "" }));
//       },
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Create Support Ticket
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Issue Description *
//             </Typography>
//             <TextareaDefaultExport
//               name="ticketDescription"
//               placeholder="Please describe your issue in detail..."
//               maxchars={1000}
//               limitdisplaytext="undefined / 1000 characters"
//               required={true}
//               updateon="blur"
//               listener={descriptionListener}
//             />
//           </Box>
//           <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Ticket Preview:
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {formData.description || "No description provided"}
//             </Typography>
//           </Box>
//           <Button variant="contained" disabled={!formData.description.trim()}>
//             Submit Ticket
//           </Button>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const MessageComposer: Story = {
//   render: () => {
//     const [message, setMessage] = useState("");
//     const [recipient, setRecipient] = useState("");
//     const [sent, setSent] = useState(false);

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setMessage(data.datavalue || "");
//       },
//     };

//     const handleSend = () => {
//       if (message.trim() && recipient.trim()) {
//         setSent(true);
//         setTimeout(() => {
//           setSent(false);
//           setMessage("");
//           setRecipient("");
//         }, 3000);
//       }
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Compose Message
//         </Typography>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Message *
//             </Typography>
//             <TextareaDefaultExport
//               name="messageComposer"
//               placeholder="Type your message..."
//               maxchars={500}
//               limitdisplaytext="undefined / 500"
//               required={true}
//               updateon="keypress"
//               listener={customListener}
//               datavalue={sent ? "" : message}
//             />
//           </Box>
//           <Box display="flex" gap={2}>
//             <Button
//               variant="contained"
//               onClick={handleSend}
//               disabled={!message.trim() || sent}
//             >
//               {sent ? "Sent!" : "Send Message"}
//             </Button>
//             <Button variant="outlined" disabled={!message.trim()}>
//               Save Draft
//             </Button>
//           </Box>
//         </Stack>
//         {sent && (
//           <Box mt={2} p={2} bgcolor="#e3f2fd" borderRadius={1}>
//             <Typography variant="body2" color="primary">
//               ✓ Message sent successfully!
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     );
//   },
// };

// export const BlogPostEditor: Story = {
//   render: () => {
//     const [content, setContent] = useState("");
//     const minWords = 50;

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setContent(data.datavalue || "");
//       },
//     };

//     const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
//     const canPublish = wordCount >= minWords;

//     return (
//       <Box style={{ padding: 16, maxWidth: 800 }}>
//         <Typography variant="h6" mb={2}>
//           Blog Post Editor
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={2}>
//           Write at least {minWords} words to publish your post.
//         </Typography>
//         <TextareaDefaultExport
//           name="blogEditor"
//           placeholder="Start writing your blog post..."
//           updateon="keypress"
//           updatedelay="300"
//           listener={customListener}
//         />
//         <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Typography variant="body2" color={canPublish ? "success.main" : "text.secondary"}>
//               Words: {wordCount} / {minWords}
//             </Typography>
//             {!canPublish && wordCount > 0 && (
//               <Typography variant="caption" color="warning.main">
//                 {minWords - wordCount} more words needed
//               </Typography>
//             )}
//           </Box>
//           <Stack direction="row" spacing={2}>
//             <Button variant="outlined">Save Draft</Button>
//             <Button variant="contained" disabled={!canPublish}>
//               Publish Post
//             </Button>
//           </Stack>
//         </Box>
//       </Box>
//     );
//   },
// };
