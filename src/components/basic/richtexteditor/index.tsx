import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { EditorOptions, EditorOperation, RichTextEditorProps } from "./props";
import * as lodash from "lodash-es";

const EditorContainer = styled(Box)<{ height?: string | undefined }>(({ theme, height }) => ({
  "& .jodit-workplace": {
    height: height ? `${height} !important` : "auto",
  },
  "& .jodit-container": {
    border: `1px solid ${theme.palette.divider}`,
  },
  "& .jodit-react-container": {
    // Remove only min-height and min-width
    minHeight: "unset !important",
    minWidth: "unset !important",
    maxWidth: "unset !important",
  },
  "& .jodit-status-bar": {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: "none",
  },
  "& .jodit-toolbar": {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: "none",
  },
  "& .jodit-toolbar__box": {
    background: theme.palette.background.paper,
  },
  "& .jodit-toolbar-button": {
    margin: "2px",
  },
  "& div[contenteditable='true']": {
    background: "var(--wm-note-editable-background)",
    color: "var(--wm-note-editable-color)w",
  },
  // Reset problematic global styles that override rich text editor
  "& .jodit-wysiwyg": {
    padding: "unset !important",
    margin: "unset !important",
  },
  "& .jodit-wysiwyg ul, & .jodit-wysiwyg li": {
    paddingLeft: "2em !important",
    margin: "1em 0 !important",
    listStyleType: "unset",
  },
  // Override any global styles that might affect the editor
  "& .jodit-container *": {
    boxSizing: "border-box",
  },
  "& .jodit-wysiwyg ol": {
    listStyleType: "decimal",
    paddingLeft: "2em !important",
    margin: "1em 0 !important",
  },
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  // border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  minHeight: "100px",
  overflowY: "auto",
  "& img": {
    maxWidth: "100%",
  },
  "& table": {
    borderCollapse: "collapse",
    width: "100%",
    margin: theme.spacing(1, 0),
  },
  "& th, & td": {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5),
  },
}));

const HiddenInput = styled("input")({
  display: "none",
});

const WmRichTextEditor = forwardRef<any, RichTextEditorProps>((props, ref) => {
  const {
    name,
    className,
    placeholder = "write here...",
    tabindex = 0,
    datavalue = "",
    readonly = false,
    disabled = false,
    showpreview = false,
    width: propWidth,
    height: propHeight,
    styles,
    onChange,
    onBeforerender,
    hint,
    arialabel,
    listener,
  } = props;

  // Extract dimensions from props or styles, converting numbers to pixel strings
  const getDimension = (value: string | number | undefined): string => {
    if (typeof value === "number") {
      return `${value}px`;
    }
    return value || "";
  };

  // Prioritize styles prop over individual props
  const width = getDimension(styles?.width || propWidth) || "100%";
  const height = getDimension(styles?.height || propHeight);

  // Memoize the actual value calculation
  const actualValue = useMemo(() => datavalue, [datavalue]);

  const [content, setContent] = useState<string>(actualValue || "");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [operationStack, setOperationStack] = useState<EditorOperation[]>([]);
  const [isInternalChange, setIsInternalChange] = useState(false);
  const editorRef = useRef<any>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const lastValueRef = useRef<string>(actualValue || "");
  const isMountedRef = useRef(true);
  const widgetInstance = listener?.Widgets[name];

  // Memoize editor options
  const editorOptions = useMemo<EditorOptions>(
    () => ({
      toolbar: true,
      placeholder: placeholder,
      // minHeight: height ? (typeof height === 'string' && height.endsWith('px') ? parseInt(height, 10) : 100) : 100,
      width: width,
      readOnly: readonly,
      disabled: readonly || disabled,
      statusbar: true,
      toolbarAdaptive: true,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
        "|",
        "table",
        "link",
        "image",
        "video",
      ],
      removeButtons: ["about"],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarSticky: false,
      enableDragAndDropFileToEditor: true,
    }),
    [placeholder, height, width, readonly, disabled]
  );

  // Memoize sanitizeHtml function
  const sanitizeHtml = useCallback((html: string): string => {
    if (!html) return "";
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe", "video", "source"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "controls",
        "src",
        "type",
        "width",
        "height",
      ],
    });
  }, []);

  // Memoize handleEditorChange
  const handleEditorChange = useCallback(
    (newContent: string, isFromUser: boolean = true) => {
      if (!isMountedRef.current || isInternalChange) {
        return;
      }

      const sanitizedContent = sanitizeHtml(newContent);
      lastValueRef.current = sanitizedContent;
      setContent(sanitizedContent);

      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = sanitizedContent;
      }
      if (listener?.onChange) {
        listener.onChange(props.name, {
          datavalue: sanitizedContent,
        });
      }
    },
    [sanitizeHtml, isInternalChange]
  );

  // Memoize handleEditorBlur
  const handleEditorBlur = useCallback(
    (newContent: string, event: any) => {
      handleEditorChange(newContent, true);
    },
    [handleEditorChange]
  );

  // Memoize performEditorOperation
  const performEditorOperation = useCallback(
    (operation: string, value?: any) => {
      if (!isEditorLoaded || !editorRef.current?.editor) {
        setOperationStack(prev => [...prev, { type: operation, value }]);
        return;
      }

      const editor = editorRef.current.editor;

      try {
        switch (operation) {
          case "code":
            if (value === undefined) {
              return editor.isEmpty() ? "" : editor.value;
            } else {
              setIsInternalChange(true);
              const sanitizedValue = sanitizeHtml(value);
              editor.value = sanitizedValue;
              setContent(sanitizedValue);
              lastValueRef.current = sanitizedValue;
              setTimeout(() => setIsInternalChange(false), 100);
              return;
            }
          case "reset":
            setIsInternalChange(true);
            editor.value = "";
            setContent("");
            lastValueRef.current = "";
            setTimeout(() => setIsInternalChange(false), 100);
            return;
          case "focus":
            editor.focus();
            return;
          case "disable":
            editor.disable();
            return;
          case "enable":
            editor.enable();
            return;
          case "placeholder":
            editor.options.placeholder = value;
            return;
          case "height":
            editor.options.height = value;
            if (editor.workplace) {
              editor.workplace.style.height = typeof value === "number" ? `${value}px` : value;
            }
            return;
          case "width":
            editor.options.width = value;
            if (editor.container) {
              editor.container.style.width = typeof value === "number" ? `${value}px` : value;
            }
            return;
          case "undo":
            editor.history.undo();
            return;
          case "createRange":
            return editor.selection.current();
          default:
            return;
        }
      } catch (error) {
        console.error(`Error performing editor operation ${operation}:`, error);
      }
    },
    [isEditorLoaded, sanitizeHtml]
  );

  // Memoize handleOnBeforeRender
  const handleOnBeforeRender = useCallback(() => {
    if (onBeforerender) {
      const syntheticEvent = {
        target: {
          value: "",
        },
        currentTarget: editorRef.current?.editor?.workplace,
      } as React.ChangeEvent<any>;
      onBeforerender(syntheticEvent, widgetInstance);
    }
  }, [onBeforerender]);

  // Create a debounced version of handleOnChange
  const debouncedHandleOnChange = useMemo(
    () =>
      lodash.debounce((newContent: string) => {
        const sanitizedContent = sanitizeHtml(newContent);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = newContent;
        const new_text_content = tempDiv.textContent || tempDiv.innerText || "";

        if (name && widgetInstance) {
          widgetInstance.displayValue = new_text_content;
        }

        if (onChange) {
          tempDiv.innerHTML = lastValueRef.current;
          const old_text_context = tempDiv.textContent || tempDiv.innerText || "";
          const syntheticEvent = {
            target: {
              value: new_text_content,
              name: name,
            },
            currentTarget: editorRef.current?.editor?.workplace,
          } as React.ChangeEvent<any>;

          onChange(syntheticEvent, widgetInstance, new_text_content, old_text_context);
        }
        if (name && widgetInstance) {
          widgetInstance.datavalue = new_text_content;
        }

        lastValueRef.current = sanitizedContent;

        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = sanitizedContent;
        }
      }),
    [name, listener, onChange, sanitizeHtml]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedHandleOnChange.cancel();
    };
  }, [debouncedHandleOnChange]);

  // Memoize handleEditorInit
  const handleEditorInit = useCallback(() => {
    setIsEditorLoaded(true);

    if (editorRef.current?.editor) {
      if (height) {
        const heightValue =
          typeof height === "string" && height.endsWith("px") ? parseInt(height, 10) : height;
        performEditorOperation("height", heightValue);
      }
      if (width) {
        performEditorOperation("width", width);
      }

      const editorElement = editorRef.current.editor.workplace;
      if (editorElement) {
        editorElement.setAttribute("aria-label", arialabel || "Rich Text Editor");
        editorElement.setAttribute("role", "textbox");
        editorElement.setAttribute("aria-multiline", "true");
      }
    }
  }, [arialabel, height, width, performEditorOperation]);

  // Memoize the editor config
  const editorConfig = useMemo(
    () => ({
      ...editorOptions,
      tabIndex: tabindex,
      events: {
        change: debouncedHandleOnChange,
        beforeInit: handleOnBeforeRender,
      },
    }),
    [editorOptions, tabindex, debouncedHandleOnChange, handleOnBeforeRender]
  );

  // Memoize the component's JSX
  const editorJSX = useMemo(
    () => (
      <>
        <EditorContainer
          className={`app-richtexteditor clearfix  ${className}`}
          title={hint}
          style={{ width: width }}
          height={styles?.height}
        >
          <JoditEditor
            ref={editorRef}
            value={content.toString()}
            config={editorConfig}
            onBlur={handleEditorBlur}
            onChange={() => {}} // Empty onChange as we handle it in config
            onReady={handleEditorInit}
          />
          <HiddenInput
            ref={hiddenInputRef}
            className="model-holder"
            disabled={disabled}
            value={content.toString()}
            name={name}
            readOnly
          />
        </EditorContainer>
        {showpreview && (
          <PreviewContainer
            className="ta-preview"
            style={{ width: width }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        )}
      </>
    ),
    [
      content,
      editorConfig,
      handleEditorBlur,
      handleEditorInit,
      hint,
      name,
      sanitizeHtml,
      showpreview,
      width,
    ]
  );

  // Process operation stack after editor is loaded
  useEffect(() => {
    if (isEditorLoaded && operationStack.length > 0) {
      operationStack.forEach(operation => {
        performEditorOperation(operation.type, operation.value);
      });
      setOperationStack([]);
    }
  }, [isEditorLoaded, operationStack, performEditorOperation]);

  // Handle external value changes (two-way binding)
  useEffect(() => {
    if (!isEditorLoaded || isInternalChange) {
      return;
    }

    const newValue = actualValue || "";

    // Only update if the value has actually changed
    if (newValue !== lastValueRef.current && newValue !== content) {
      setIsInternalChange(true);
      performEditorOperation("code", newValue);
      setTimeout(() => setIsInternalChange(false), 100);
    }
  }, [actualValue, isEditorLoaded, content, performEditorOperation, isInternalChange]);

  // Handle datavalue changes
  useEffect(() => {
    if (datavalue != lastValueRef.current) {
      setContent(datavalue);
      lastValueRef.current = datavalue;
    }
  }, [datavalue]);

  // Initialize editor and handle prop changes
  useEffect(() => {
    if (editorRef.current?.editor && isEditorLoaded) {
      // Handle readonly/disabled state changes
      if (readonly || disabled) {
        performEditorOperation("disable");
      } else {
        performEditorOperation("enable");
      }

      // Handle placeholder changes
      if (placeholder) {
        performEditorOperation("placeholder", placeholder);
      }

      // Handle height changes
      if (height) {
        const heightValue =
          typeof height === "string" && height.endsWith("px") ? parseInt(height, 10) : height;
        performEditorOperation("height", heightValue);
      }

      // Handle width changes
      if (width) {
        performEditorOperation("width", width);
      }
    }
  }, [readonly, disabled, placeholder, height, width, performEditorOperation, isEditorLoaded]);

  // Expose editor methods to parent components
  useImperativeHandle(ref, () => ({
    // Get current HTML content
    htmlcontent: () => performEditorOperation("code"),
    // Get current selection position
    getCurrentPosition: () => performEditorOperation("createRange"),
    // Undo last operation
    undo: () => performEditorOperation("undo"),
    // Focus the editor
    focus: () => performEditorOperation("focus"),
    // Get editor instance
    getEditor: () => editorRef.current?.editor,
    // Set editor content
    setContent: (newContent: string) => {
      performEditorOperation("code", newContent);
    },
    // Perform custom editor operation
    performOperation: (operation: string, value?: any) => performEditorOperation(operation, value),
  }));

  // Clean up on unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (editorRef.current?.editor) {
        try {
          editorRef.current.editor.destruct();
        } catch (error) {
          console.error("Error destructing editor:", error);
        }
      }
    };
  }, []);

  return editorJSX;
});

WmRichTextEditor.displayName = "WmRichTextEditor";

export default React.memo(withBaseWrapper(WmRichTextEditor));
