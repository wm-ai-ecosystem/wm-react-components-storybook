import { useMemo } from "react";
import { shouldShowPanelHeading, shouldShowPagination } from "../utils";
import { UsePanelStructureProps, UsePanelStructureReturn } from "../props";

export const usePanelStructure = ({
  title,
  subheading,
  iconclass,
  exportformat = [],
  headerActions,
  footerActions,
  shownavigation,
  onDemandLoad,
  internalDataset,
  pagesize,
  allowpagesizechange,
  datasource,
}: UsePanelStructureProps): UsePanelStructureReturn => {
  const showPanelHeading = useMemo(
    () => shouldShowPanelHeading(title, subheading, iconclass, exportformat, headerActions),
    [title, subheading, iconclass, exportformat, headerActions]
  );

  const showPagination = useMemo(
    () =>
      shouldShowPagination({
        shownavigation,
        onDemandLoad,
        internalDataset,
        pagesize,
        allowpagesizechange,
        datasource,
      }),
    [shownavigation, onDemandLoad, internalDataset, pagesize, allowpagesizechange, datasource]
  );
  return {
    showPanelHeading,
    showPagination,
  };
};
