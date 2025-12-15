import React from "react";
import { Chip, Box } from "@mui/material";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { SortableChipProps } from "./props";

const SortableChip: React.FC<SortableChipProps> = ({
  chip,
  index,
  readonly,
  disabled,
  chipclass,
  enablereorder,
  handleChipClick,
  handleChipSelect,
  handleKeyDown,
  removeItem,
  chipsList,
  setChipsList,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: chip.key,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "2px",
    cursor: enablereorder && !readonly && !disabled ? "grab" : "default",
    opacity: isDragging ? 0.5 : 1,
  };

  // Keyboard navigation handlers
  const handleOnKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      removeItem(event as unknown as React.MouseEvent, chip, index);
    }
    event.preventDefault();
    handleKeyDown(event, index);
  };

  const handleChipFocus = (event: React.FocusEvent) => {
    handleChipSelect(chip, index);
  };

  const handleChipBlur = (event: React.FocusEvent) => {
    if (readonly) return;
    const newChipsList = chipsList.map((item, i) => ({
      ...item,
      active: i === index ? false : item.active,
    }));
    setChipsList(newChipsList);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeItem(event, chip, index);
  };

  return (
    <Box
      key={chip.key}
      ref={setNodeRef}
      component="li"
      className={clsx("chip-item", chipclass && !chipclass.includes("bind") ? chipclass : "", {
        active: chip.active,
        disabled: disabled,
      })}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Chip
        className={clsx("app-chip", "sortable-chip", {
          "no-drag": !enablereorder,
          "chip-duplicate bg-danger": chip.isDuplicate,
          "chip-picture": chip.imgSrc,
          active: chip.active,
        })}
        label={chip.displayValue || chip.label}
        avatar={
          chip.imgSrc ? (
            <Box
              component="img"
              data-identifier="img"
              src={chip.imgSrc}
              alt="Chip Image"
              className="button-image-icon"
            />
          ) : undefined
        }
        onDelete={!readonly ? handleDeleteClick : undefined}
        deleteIcon={<Box component="i" className="app-icon wi wi-close"></Box>}
        onClick={event => handleChipClick(event, chip, index)}
        onKeyDown={event => handleOnKeyDown(event, index)}
        onFocus={handleChipFocus}
        onBlur={handleChipBlur}
        tabIndex={readonly ? -1 : 0}
        role="button"
        aria-disabled={disabled}
        disabled={disabled}
      />
    </Box>
  );
};

export default SortableChip;
