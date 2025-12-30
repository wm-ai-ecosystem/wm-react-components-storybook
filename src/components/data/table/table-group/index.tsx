import React from "react";
import { WmTableGroupProps } from "../props";

/**
 * WmTableGroup component for grouping table columns under a common header.
 * Supports nested groups to create multi-level headers.
 *
 * @example
 * <WmTableGroup name="personalInfo" caption="Personal Information">
 *   <WmTableColumn binding="firstName" caption="First Name" />
 *   <WmTableColumn binding="lastName" caption="Last Name" />
 * </WmTableGroup>
 */
function WmTableGroup({ children }: WmTableGroupProps) {
  // This component is just a marker component for defining table structure
  // The actual rendering logic is handled by the table header component
  return <>{children}</>;
}

export default WmTableGroup;
