import { ChipItem } from "../props";

export interface SortableChipProps {
  chip: ChipItem;
  index: number;
  readonly: boolean;
  disabled: boolean;
  chipclass: string;
  enablereorder: boolean;
  handleChipClick: (event: React.MouseEvent, chip: ChipItem, index: number) => void;
  handleChipSelect: (chip: ChipItem, index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent, index: number) => void;
  removeItem: (event: React.MouseEvent, chip: ChipItem, index: number) => void;
  setSelectedChipIndex?: (index: number) => void;
  chipsList: ChipItem[];
  setChipsList: React.Dispatch<React.SetStateAction<ChipItem[]>>;
}
