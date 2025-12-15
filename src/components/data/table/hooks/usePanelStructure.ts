import { useMemo } from "react";
import { shouldShowPanelHeading, shouldShowPagination } from "../utils";
import { UsePanelStructureProps, UsePanelStructureReturn } from "../props";

export const usePanelStructure = ({
  title,
  subheading,
  iconclass,
  exportOptions = [],
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
    () => shouldShowPanelHeading(title, subheading, iconclass, exportOptions, headerActions),
    [title, subheading, iconclass, exportOptions, headerActions]
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
