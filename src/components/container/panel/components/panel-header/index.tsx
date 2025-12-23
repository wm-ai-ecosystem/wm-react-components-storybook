import React from "react";
import { Box, IconButton, Popover, MenuList, MenuItem } from "@mui/material";
import DOMPurify from "dompurify";

// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ActionItem } from "../../props";
import { PanelHeaderProps } from "./props";
import WmMenu from "@wavemaker/react-runtime/components/navigation/menu";

const PanelHeader: React.FC<PanelHeaderProps> = ({
  title = "Title",
  subheading,
  iconclass = "wi wi-account-circle",
  iconurl,
  iconwidth,
  iconheight,
  iconmargin,
  badgevalue,
  badgetype = "default",
  actions,
  helptext,
  isExpanded,
  isFullscreen,
  collapsible,
  enablefullscreen,
  closable,
  itemlabel,
  itemlink,
  itemicon,
  itemchildren,
  listener,
  onToggleExpand,
  onToggleFullScreen,
  onToggleHelp,
  onClose,
  onActionsclick,
}) => {
  const handleActionItemClick = (item: ActionItem) => {
    onActionsclick?.(item);
  };

  return (
    <Box className="panel-title">
      <Box
        component="a"
        className="panel-toggle"
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
      >
        <Box className="pull-left">
          {iconclass && !iconurl && (
            <Box component="i" className={`app-icon panel-icon ${iconclass}`} />
          )}
          {iconurl && (
            <Box
              component="img"
              data-identifier="img"
              title="iconurl"
              alt="Panel icon"
              className="panel-image-icon"
              src={iconurl}
              style={{
                width: iconwidth || "auto",
                height: iconheight || "auto",
                margin: iconmargin || "0",
              }}
            />
          )}
        </Box>
        <Box className="pull-left">
          {title && (
            <Box
              className="heading"
              title={title}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
            />
          )}
          {subheading && (
            <Box
              className="description"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subheading) }}
            />
          )}
        </Box>
      </Box>

      <Box className="panel-actions">
        {badgevalue && (
          <Box
            component="span"
            className={`app-badge label label-${badgetype}`}
            color={badgetype === "default" ? "primary" : badgetype}
          >
            {badgevalue}
          </Box>
        )}

        {actions && actions.length > 0 && (
          <WmMenu
            type="anchor"
            dataset={actions}
            itemicon={itemicon}
            itemlabel={itemlabel}
            itemlink={itemlink}
            itemchildren={itemchildren}
            panelPosition="left"
            iconclass="wi wi-more-vert"
            name="panel-actions"
            className="icon-position-left dropdown-menu pull-right"
            onActionsclick={handleActionItemClick}
            listener={listener}
            arialabel="dropdown"
          />
        )}

        {helptext && (
          <IconButton
            aria-label="Help"
            className="app-icon panel-action wi"
            title="Help"
            onClick={onToggleHelp}
          >
            <HelpOutlineIcon className="wi-question" />
          </IconButton>
        )}

        {collapsible && (
          <IconButton
            aria-label="Collapse/Expand"
            className="app-icon panel-action wi"
            title={`${listener.appLocale.LABEL_COLLAPSE}/${listener.appLocale.LABEL_EXPAND}`}
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <ExpandLessIcon className="wi-minus" />
            ) : (
              <ExpandMoreIcon className="wi-plus" />
            )}
          </IconButton>
        )}

        {enablefullscreen && (
          <IconButton
            aria-label="Fullscreen/Exit"
            className="app-icon panel-action wi"
            title={`${listener?.appLocale?.LABEL_FULLSCREEN ?? "Fullscreen"}/${listener?.appLocale?.LABEL_EXITFULLSCREEN ?? "Exit Fullscreen"}`}
            onClick={onToggleFullScreen}
          >
            {isFullscreen ? (
              <FullscreenExitIcon className="wi-fullscreen-exit" />
            ) : (
              <FullscreenIcon className="wi-fullscreen" />
            )}
          </IconButton>
        )}

        {closable && (
          <IconButton
            aria-label="Close"
            className="app-icon panel-action"
            title="Close"
            onClick={onClose}
          >
            <CloseIcon className="wi wi-close" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default PanelHeader;
