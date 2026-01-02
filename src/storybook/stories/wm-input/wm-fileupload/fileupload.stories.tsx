import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import FileUploadDefaultExport from "../../../../components/input/fileupload/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof FileUploadDefaultExport> = {
  title: "Input/FileUpload",
  component: FileUploadDefaultExport,
  argTypes: {
    caption: { control: "text" },
    multiple: { control: "boolean" },
    fileuploadmessage: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    // required: { control: "boolean" },
    contenttype: { control: "text" },
    // extensions: {
    //   control: { type: "select" },
    //   options: ["", "jpg,jpeg,png,gif", "pdf,doc,docx,txt", "mp4,avi,mov", "xls,xlsx,csv"],
    // },
    extensions: { control: "text" },
    // filetype: { control: "text" },
    maxfilesize: { control: "text" },
    // iconclass: { control: "text" },
    // cleariconclass: { control: "text" },
    // cleariconhint: { control: "text" },
    // deleteiconhint: { control: "text" },
    displayname: { control: "text" },
    hint: { control: "text" },
    // arialabel: { control: "text" },
    // tabindex: { control: "number" },
    width: { control: "text" },
    height: { control: "text" },
    // filelistheight: { control: "number" },
    showprogressbar: { control: "boolean" },
    showprogressbarpercentage: { control: "boolean" },
    uploadpath: { control: "text" },
    // destination: { control: "text" },
    // className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16, minHeight: "300px" }}>
    <FileUploadDefaultExport {...args} />
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
    name: "basicUpload",
    caption: "Select File",
    multiple: false,
    disabled: false,
    readonly: false,
    required: false,
    showprogressbar: false,
    showprogressbarpercentage: false,
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600} mb={4}>File Upload Types</Typography>
        </Box>
        <Stack spacing={4}>
          {/* Images */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Images Only</Typography>
            <FileUploadDefaultExport
              name="imagesOnly"
              caption="Select Images"
              multiple={false}
              extensions="jpg,jpeg,png,gif,svg"
              fileuploadmessage="Drop image files here"
            />
          </Box>

          {/* Documents */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Documents Only</Typography>
            <FileUploadDefaultExport
              name="documentsOnly"
              caption="Select Documents"
              multiple={false}
              extensions="pdf,doc,docx,txt"
              fileuploadmessage="Drop document files here"
            />
          </Box>

          {/* Videos */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Videos Only</Typography>
            <FileUploadDefaultExport
              name="videosOnly"
              caption="Select Videos"
              multiple={false}
              extensions="mp4,avi,mov,wmv"
              fileuploadmessage="Drop video files here"
            />
          </Box>

          {/* Audio */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Audio Only</Typography>
            <FileUploadDefaultExport
              name="audioOnly"
              caption="Select Audio"
              multiple={false}
              extensions="mp3,wav,ogg,m4a"
              fileuploadmessage="Drop audio files here"
            />
          </Box>

          {/* Progress Bar Upload */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Upload with Progress Bar</Typography>
            <FileUploadDefaultExport
              name="progressUpload"
              caption="Upload Files"
              multiple={false}
              fileuploadmessage="Drop files here to see progress"
              showprogressbar={true}
              showprogressbarpercentage={true}
            />
          </Box>

          {/* Multi-select */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Multi-Select Files (All Types)</Typography>
            <FileUploadDefaultExport
              name="multiSelect"
              caption="Select Files"
              multiple={true}
              fileuploadmessage="Drop any type of file here"
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args:{
    name: "showcaseFileUpload"
  }
};


// export const ImageFilesOnly: Story = {
//   render: Template,
//   args: {
//     name: "imageOnly",
//     caption: "Select Images",
//     multiple: true,
//     extensions: "jpg,jpeg,png,gif",
//     fileuploadmessage: "Drop image files here",
//   },
// };

// export const DocumentFilesOnly: Story = {
//   render: Template,
//   args: {
//     name: "documentOnly",
//     caption: "Select Documents",
//     multiple: true,
//     extensions: "pdf,doc,docx,txt",
//     fileuploadmessage: "Drop document files here",
//   },
// };

// export const PDFOnly: Story = {
//   render: Template,
//   args: {
//     name: "pdfOnly",
//     caption: "Select PDF",
//     multiple: false,
//     extensions: "pdf",
//     contenttype: "application/pdf",
//   },
// };

// export const ExcelFilesOnly: Story = {
//   render: Template,
//   args: {
//     name: "excelOnly",
//     caption: "Select Excel File",
//     multiple: false,
//     extensions: "xls,xlsx",
//     contenttype: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   },
// };

// export const VideoFilesOnly: Story = {
//   render: Template,
//   args: {
//     name: "videoOnly",
//     caption: "Select Video",
//     multiple: false,
//     extensions: "mp4,avi,mov",
//     contenttype: "video/*",
//   },
// };

// export const WithMaxFileSize: Story = {
//   render: Template,
//   args: {
//     name: "maxSize",
//     caption: "Select File (Max 5MB)",
//     multiple: false,
//     maxfilesize: "5242880", // 5MB in bytes
//   },
// };

// export const WithProgressBar: Story = {
//   render: Template,
//   args: {
//     name: "progressBar",
//     caption: "Select Files",
//     multiple: true,
//     showprogressbar: true,
//     showprogressbarpercentage: true,
//     fileuploadmessage: "Upload with progress tracking",
//   },
// };

// export const MultipleFileUpload: Story = {
//   render: Template,
//   args: {
//     name: "multipleUpload",
//     caption: "Select Files",
//     multiple: true,
//     fileuploadmessage: "Drop files here or click to browse",
//   },
// };

// export const DisabledUpload: Story = {
//   render: Template,
//   args: {
//     name: "disabledUpload",
//     caption: "Upload Disabled",
//     multiple: false,
//     disabled: true,
//   },
// };

// export const ReadonlyUpload: Story = {
//   render: Template,
//   args: {
//     name: "readonlyUpload",
//     caption: "Readonly Upload",
//     multiple: false,
//     readonly: true,
//   },
// };

// export const RequiredUpload: Story = {
//   render: Template,
//   args: {
//     name: "requiredUpload",
//     caption: "Select File (Required)",
//     multiple: false,
//     required: true,
//   },
// };

// export const WithCustomIcon: Story = {
//   render: Template,
//   args: {
//     name: "customIcon",
//     caption: "Upload",
//     multiple: false,
//     iconclass: "fa fa-cloud-upload",
//   },
// };

// export const SingleFileUpload: Story = {
//   render: Template,
//   args: {
//     name: "singleUpload",
//     caption: "Choose File",
//     multiple: false,
//     hint: "Select a single file",
//   },
// };

// export const WithCustomCaption: Story = {
//   render: Template,
//   args: {
//     name: "customCaption",
//     caption: "Upload Document",
//     multiple: false,
//   },
// };

// export const WithCustomMessage: Story = {
//   render: Template,
//   args: {
//     name: "customMessage",
//     caption: "Select Files",
//     multiple: true,
//     fileuploadmessage: "Drag and drop your files here",
//   },
// };

// export const WithCustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "customWidth",
//     caption: "Select File",
//     multiple: false,
//     width: "500px",
//   },
// };

// export const WithCustomHeight: Story = {
//   render: Template,
//   args: {
//     name: "customHeight",
//     caption: "Select Files",
//     multiple: true,
//     height: "200px",
//     fileuploadmessage: "Custom height drop area",
//   },
// };

// export const WithFileListHeight: Story = {
//   render: Template,
//   args: {
//     name: "fileListHeight",
//     caption: "Select Files",
//     multiple: true,
//     filelistheight: 200,
//     fileuploadmessage: "File list height limited to 200px",
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintUpload",
//     caption: "Select File",
//     multiple: false,
//     hint: "Hover to see this tooltip",
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaUpload",
//     caption: "Select File",
//     multiple: false,
//     arialabel: "Upload file button - accessible",
//   },
// };

// export const CustomTabIndex: Story = {
//   render: Template,
//   args: {
//     name: "tabIndexUpload",
//     caption: "Select File",
//     multiple: false,
//     tabindex: 5,
//   },
// };

// export const WithDisplayName: Story = {
//   render: Template,
//   args: {
//     name: "displayNameUpload",
//     caption: "Select File",
//     multiple: false,
//     displayname: "Custom Display Name",
//   },
// };

// export const CustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClassUpload",
//     caption: "Select File",
//     multiple: false,
//     className: "custom-fileupload-class",
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledUpload",
//     caption: "Select File",
//     multiple: false,
//     styles: {
//       border: "2px dashed #2196f3",
//       borderRadius: "8px",
//       padding: "16px",
//       backgroundColor: "#f5f5f5",
//     },
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

//     const handleSelect = (event: any, widget: any, files: File[]) => {
//       setSelectedFiles(files);
//     };

//     const handleDelete = (event: any, widget: any, file: File) => {
//       setSelectedFiles(prev => prev.filter(f => f.name !== file.name));
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive File Upload Demo</Typography>
//           <FileUploadDefaultExport
//             name="interactiveUpload"
//             caption="Select Files"
//             multiple={true}
//             fileuploadmessage="Drop files here or click to browse"
//             onSelect={handleSelect}
//             onDelete={handleDelete}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Selected Files:
//             </Typography>
//             {selectedFiles.length > 0 ? (
//               <ul style={{ margin: 0, paddingLeft: "20px" }}>
//                 {selectedFiles.map((file, index) => (
//                   <li key={index}>
//                     {file.name} ({(file.size / 1024).toFixed(2)} KB)
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <Typography variant="body2" color="text.secondary">
//                 No files selected
//               </Typography>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveDemo",
//   },
// };

// export const FileTypeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           File Type Restrictions
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Images Only (jpg, png, gif)
//             </Typography>
//             <FileUploadDefaultExport
//               name="imagesType"
//               caption="Select Images"
//               multiple={true}
//               extensions="jpg,jpeg,png,gif"
//               fileuploadmessage="Drop image files"
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Documents Only (pdf, doc, docx)
//             </Typography>
//             <FileUploadDefaultExport
//               name="documentsType"
//               caption="Select Documents"
//               multiple={true}
//               extensions="pdf,doc,docx"
//               fileuploadmessage="Drop document files"
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Spreadsheets Only (xls, xlsx, csv)
//             </Typography>
//             <FileUploadDefaultExport
//               name="spreadsheetsType"
//               caption="Select Spreadsheets"
//               multiple={true}
//               extensions="xls,xlsx,csv"
//               fileuploadmessage="Drop spreadsheet files"
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               All Files (No Restriction)
//             </Typography>
//             <FileUploadDefaultExport
//               name="allFilesType"
//               caption="Select Any File"
//               multiple={true}
//               fileuploadmessage="Drop any type of file"
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "fileTypeComparison",
//   },
// };

// export const UploadModeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Single vs Multiple Upload
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Single File Upload
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Only one file can be selected at a time
//             </Typography>
//             <FileUploadDefaultExport
//               name="singleMode"
//               caption="Select One File"
//               multiple={false}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Multiple File Upload with Drag & Drop
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Multiple files can be selected or dropped
//             </Typography>
//             <FileUploadDefaultExport
//               name="multipleMode"
//               caption="Select Multiple Files"
//               multiple={true}
//               fileuploadmessage="Drop multiple files here or click to browse"
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "uploadModeComparison",
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           File Upload States
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State
//             </Typography>
//             <FileUploadDefaultExport
//               name="normalState"
//               caption="Select File"
//               multiple={false}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <FileUploadDefaultExport
//               name="disabledState"
//               caption="Upload Disabled"
//               multiple={false}
//               disabled={true}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <FileUploadDefaultExport
//               name="readonlyState"
//               caption="Readonly Upload"
//               multiple={false}
//               readonly={true}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required Field
//             </Typography>
//             <FileUploadDefaultExport
//               name="requiredState"
//               caption="Select File (Required)"
//               multiple={false}
//               required={true}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "stateComparison",
//   },
// };

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Document Upload Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Profile Photo *
//             </Typography>
//             <FileUploadDefaultExport
//               name="profilePhoto"
//               caption="Upload Photo"
//               multiple={false}
//               extensions="jpg,jpeg,png"
//               maxfilesize="2097152"
//               required={true}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Accepted: JPG, PNG (Max 2MB)
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Resume *
//             </Typography>
//             <FileUploadDefaultExport
//               name="resume"
//               caption="Upload Resume"
//               multiple={false}
//               extensions="pdf,doc,docx"
//               maxfilesize="5242880"
//               required={true}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Accepted: PDF, DOC, DOCX (Max 5MB)
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Supporting Documents
//             </Typography>
//             <FileUploadDefaultExport
//               name="supportingDocs"
//               caption="Upload Documents"
//               multiple={true}
//               extensions="pdf,jpg,jpeg,png"
//               fileuploadmessage="Drop multiple documents here"
//             />
//             <Typography variant="caption" color="text.secondary">
//               Accepted: PDF, JPG, PNG (Multiple files allowed)
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "formExample",
//   },
// };

// export const MediaUploadExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Media Upload Center
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Images
//             </Typography>
//             <FileUploadDefaultExport
//               name="imageMedia"
//               caption="Upload Images"
//               multiple={true}
//               extensions="jpg,jpeg,png,gif,webp"
//               fileuploadmessage="Drop image files here"
//               showprogressbar={true}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Videos
//             </Typography>
//             <FileUploadDefaultExport
//               name="videoMedia"
//               caption="Upload Videos"
//               multiple={true}
//               extensions="mp4,avi,mov,wmv"
//               fileuploadmessage="Drop video files here"
//               maxfilesize="104857600"
//               showprogressbar={true}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Max file size: 100MB per video
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Audio Files
//             </Typography>
//             <FileUploadDefaultExport
//               name="audioMedia"
//               caption="Upload Audio"
//               multiple={true}
//               extensions="mp3,wav,ogg,m4a"
//               fileuploadmessage="Drop audio files here"
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "mediaUploadExample",
//   },
// };

// export const ProfileUploadExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 400 }}>
//         <Typography variant="h6" mb={3}>
//           Profile Picture Upload
//         </Typography>
//         <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//           <Box
//             width={120}
//             height={120}
//             borderRadius="50%"
//             bgcolor="#e0e0e0"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Typography variant="body2" color="text.secondary">
//               No Image
//             </Typography>
//           </Box>
//           <FileUploadDefaultExport
//             name="profilePic"
//             caption="Upload Photo"
//             multiple={false}
//             extensions="jpg,jpeg,png"
//             maxfilesize="2097152"
//           />
//           <Typography variant="caption" color="text.secondary" textAlign="center">
//             JPG or PNG only, max 2MB
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "profileUploadExample",
//   },
// };

// export const BulkUploadExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Bulk File Upload
//         </Typography>
//         <FileUploadDefaultExport
//           name="bulkUpload"
//           caption="Select Multiple Files"
//           multiple={true}
//           fileuploadmessage="Drop files here or click to browse - Upload multiple files at once"
//           showprogressbar={true}
//           showprogressbarpercentage={true}
//           filelistheight={300}
//           height="200px"
//         />
//         <Box mt={2} p={2} bgcolor="#fff3e0" borderRadius={1}>
//           <Typography variant="caption" color="text.secondary">
//             <strong>Tip:</strong> You can select multiple files at once or drag and drop them into the area above.
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "bulkUploadExample",
//   },
// };

// export const AttachmentExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Email Attachments
//         </Typography>
//         <Box
//           p={3}
//           border="1px solid #e0e0e0"
//           borderRadius={2}
//           bgcolor="#fafafa"
//         >
//           <Typography variant="subtitle2" mb={2}>
//             Compose Email
//           </Typography>
//           <Stack spacing={2}>
//             <input
//               type="text"
//               placeholder="To:"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Subject:"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//             <textarea
//               placeholder="Message:"
//               rows={4}
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//                 resize: "vertical",
//               }}
//             />
//             <Box>
//               <Typography variant="caption" color="text.secondary" mb={1} display="block">
//                 Attachments:
//               </Typography>
//               <FileUploadDefaultExport
//                 name="emailAttachments"
//                 caption="Attach Files"
//                 multiple={true}
//                 fileuploadmessage="Drop files to attach"
//               />
//             </Box>
//           </Stack>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "attachmentExample",
//   },
// };

// export const CompactUpload: Story = {
//   render: Template,
//   args: {
//     name: "compactUpload",
//     caption: "Upload",
//     multiple: false,
//     width: "200px",
//     styles: {
//       fontSize: "14px",
//     },
//   },
// };

// export const LargeDropArea: Story = {
//   render: Template,
//   args: {
//     name: "largeDropArea",
//     caption: "Select Files",
//     multiple: true,
//     fileuploadmessage: "Drag and drop files here - Large drop area for easier file dropping",
//     height: "300px",
//     width: "100%",
//     styles: {
//       fontSize: "18px",
//     },
//   },
// };
