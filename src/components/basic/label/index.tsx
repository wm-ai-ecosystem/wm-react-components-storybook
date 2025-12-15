import { Fragment, memo } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import DOMPurify from "dompurify";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Box } from "@mui/material";

type ValidTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

interface WmLabelProps extends BaseProps {
  caption?: string | object;
  required?: boolean;
  trustAs?: boolean;
  type?: ValidTagType;
  id?: string;
  htmlFor?: string;
}

interface StyledComponentProps {
  ownerState: {
    type?: ValidTagType;
  };
}

const DEFAULT_CLASS = "app-label";

const StyledLabel = styled(Box, {
  shouldForwardProp: prop => prop !== "ownerState",
})<StyledComponentProps>(() => ({
  display: "inline-block",
}));

const containsHTML = (text: string): boolean => {
  // Check if the string contains HTML tags
  return /<[^>]*>/g.test(text);
};

const parseCaption = (caption: string): Array<{ text?: string; link?: string }> => {
  if (!caption) return [];
  const parts: Array<{ text?: string; link?: string }> = [];
  const pattern = /\[([^\]]+)\]\(([^)]*)\)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(caption)) !== null) {
    const [fullMatch, text, link] = match;
    const startIndex = caption.indexOf(fullMatch);
    if (startIndex > 0) parts.push({ text: caption.slice(0, startIndex) });
    parts.push({ text, link });
    caption = caption.slice(startIndex + fullMatch.length);
  }
  if (caption) parts.push({ text: caption });

  return parts;
};

export const WmLabel = memo(
  (props: WmLabelProps) => {
    const {
      required = false,
      trustAs = false,
      type = "p",
      styles,
      className,
      caption = "Label",
      hint,
      name,
      htmlFor,
      ...rest
    } = props;

    const ownerState = { type };

    const captionString = (
      typeof caption === "string" ? caption : (JSON.stringify(caption) ?? "")
    )?.replace(/&nbsp;|undefined|null/gi, " ");

    // Check if caption contains HTML tags
    const hasHTML = containsHTML(captionString);

    // If trustAs is true OR caption contains HTML, use dangerouslySetInnerHTML
    const shouldRenderAsHTML = trustAs || hasHTML;

    const parts = parseCaption(captionString);

    const sanitizedContent = shouldRenderAsHTML
      ? DOMPurify.sanitize(captionString)
      : parts.map(part =>
          part.link ? `<a target="_blank" href="${part.link}">${part.text}</a>` : part.text
        );

    if (shouldRenderAsHTML) {
      return (
        <StyledLabel
          as={type}
          ownerState={ownerState}
          className={clsx(DEFAULT_CLASS, { required }, className)}
          style={styles}
          title={hint}
          name={name}
          type={type}
          caption={captionString}
          dangerouslySetInnerHTML={{ __html: sanitizedContent as string }}
          {...rest}
        />
      );
    }

    return (
      <StyledLabel
        as={type}
        ownerState={ownerState}
        className={clsx(DEFAULT_CLASS, { required }, className)}
        style={styles}
        title={hint}
        name={name}
        type={type}
        caption={captionString}
        {...rest}
      >
        {parts.map((part, index) =>
          part.link ? (
            <a
              key={index}
              href={part.link}
              target="_blank"
              style={{
                textDecoration: "underline",
                color: "blue",
              }}
            >
              {part.text}
            </a>
          ) : (
            <Fragment key={index}>{part.text}</Fragment>
          )
        )}
      </StyledLabel>
    );
  },
  (prev, current) => {
    const keys: (keyof WmLabelProps)[] = [
      "caption",
      "required",
      "trustAs",
      "type",
      "id",
      "htmlFor",
      "styles",
      "className",
      "hint",
    ];

    return keys.every(key => prev[key] === current[key]);
  }
);

WmLabel.displayName = "WmLabel";

export default withBaseWrapper(WmLabel);
