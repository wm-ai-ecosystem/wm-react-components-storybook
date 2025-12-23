import React from "react";

export const filterVisibleChildren = (
  children: React.ReactNode,
  hiddenTabNames: Set<string>
): any[] => {
  return React.Children.toArray(children).filter((c: any) => {
    const nm = c?.props?.name;
    const isHidden = nm ? hiddenTabNames.has(nm) : false;
    return c && c.props && c.props.show !== false && !isHidden;
  }) as any[];
};

type RemovePaneParams = {
  type?: string;
  dataset?: any[];
  children: React.ReactNode;
  hiddenTabNames: Set<string>;
  TabName: string;
  selectedIndex: number;
  currentSelectedIndex: React.MutableRefObject<number>;
  panesCountRef: React.MutableRefObject<number>;
  setHiddenTabNames: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedIndex: (index: number) => void;
  saveStateToStorage: (index: number) => void;
};

export const handleRemovePane = ({
  type,
  dataset,
  children,
  hiddenTabNames,
  TabName,
  selectedIndex,
  currentSelectedIndex,
  panesCountRef,
  setHiddenTabNames,
  setSelectedIndex,
  saveStateToStorage,
}: RemovePaneParams): void => {
  // Dynamic mode: mutate dataset
  if (type === "dynamic" && dataset) {
    return;
  }

  // Static mode: mark hidden in internal state and adjust selection if needed
  const visibleBefore = filterVisibleChildren(children, hiddenTabNames);
  const activeName = (visibleBefore[selectedIndex] as any)?.props?.name;

  setHiddenTabNames(prev => {
    const next = new Set(prev);
    next.add(TabName);
    return next;
  });

  if (activeName === TabName) {
    const newIndex = Math.max(0, currentSelectedIndex.current - 1);
    currentSelectedIndex.current = newIndex;
    setSelectedIndex(newIndex);
    saveStateToStorage(newIndex);
  } else {
    setSelectedIndex(currentSelectedIndex.current);
  }
};
