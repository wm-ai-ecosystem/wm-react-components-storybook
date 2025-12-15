// Define keyboard movement constants
export const KEYBOARD_MOVEMENTS = {
  MOVE_UP: "UP-ARROW",
  MOVE_LEFT: "LEFT-ARROW",
  MOVE_RIGHT: "RIGHT-ARROW",
  MOVE_DOWN: "DOWN-ARROW",
  ON_ENTER: "ENTER",
  ON_MOUSE_ENTER: "MOUSE-ENTER",
  ON_MOUSE_LEAVE: "MOUSE-LEAVE",
  ON_TAB: "TAB",
  ON_SHIFT_TAB: "SHIFT-TAB",
  ON_ESCAPE: "ESC",
};

// Define position constants
export const POSITION = {
  DOWN_RIGHT: "down,right",
  DOWN_LEFT: "down,left",
  UP_RIGHT: "up,right",
  UP_LEFT: "up,left",
  INLINE: "inline",
};

// Define layout constants
export const LAYOUT = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  GRID: "grid",
};

// Define autoopen constants
export const AUTO_OPEN = {
  NEVER: "never",
  ACTIVE_PAGE: "activepage",
  ALWAYS: "always",
};

// Define autoclose constants - FIXED to match exactly the string passed as prop
export const AUTO_CLOSE = {
  ALWAYS: "always",
  OUTSIDE_CLICK: "outsideClick", // Now matches exactly the string "outsideClick"
  ON_MOUSE_LEAVE: "onmouseleave",
  NEVER: "never",
};

// Default dataset to use when none is provided
export const DEFAULT_DATASET = [
  { label: "Menu Item 1", link: "#item1", expanded: false },
  { label: "Menu Item 2", link: "#item2", expanded: false },
  { label: "Menu Item 3", link: "#item3", expanded: false },
];

// Constants
export const ANIMATION_CLASSES: Record<AnimationType, Record<PositionType | "name", string>> = {
  scale: {
    name: "wmScaleInLeft",
    "down,right": "wmScaleInLeft",
    "down,left": "wmScaleInRight",
    "up,right": "wmScaleInTopLeft",
    "up,left": "wmScaleInTopRight",
  },
  fade: {
    name: "fadeIn",
    "down,right": "fadeIn",
    "down,left": "fadeIn",
    "up,right": "fadeIn",
    "up,left": "fadeIn",
  },
  slide: {
    name: "wmSlideInDown",
    "down,right": "wmSlideInDown",
    "down,left": "wmSlideInDown",
    "up,right": "wmSlideInUp",
    "up,left": "wmSlideInUp",
  },
};

export const TOOLTIP_ENTER_DELAY = 1500;

export const CARET_CLS = {
  UP: "fa-caret-up",
  DOWN: "fa-caret-down",
};

export const menuAlignClass = {
  "pull-right": "fa-caret-left",
  "dropinline-menu": "fa-caret-down",
  "pull-left": "fa-caret-right",
};
