import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { BreadCrumbProps } from "./props";
import withDatasetAwareNavigation, { NavNode } from "@wavemaker/react-runtime/higherOrder/DataNav";

export const BreadCrumb = (props: BreadCrumbProps) => {
  const { className, onBeforenavigate, itemtarget, navNodes = [] } = props;

  function handleBeforeNavigate(e: React.MouseEvent<HTMLAnchorElement>, node: NavNode) {
    if (onBeforenavigate) {
      return onBeforenavigate(props, node);
    }
  }

  const renderNavItem = (node: NavNode, index: number, isLast: boolean = false) => (
    <li key={node.id || index} className={clsx(node.class, { active: isLast })}>
      <>
        {node.icon ? <i className={node.icon} /> : <i />}
        {!isLast ? (
          <Link
            href={node.link || "#"}
            title={node.hint || node.label}
            onClick={e => handleBeforeNavigate(e, node)}
            className={clsx({ "disabled-link": !!node.action })}
          >
            {node.label}
          </Link>
        ) : (
          <Link
            title={node.hint || node.label}
            className="text-muted"
            tabIndex={0}
            aria-current="page"
            href={"#"}
          >
            {node.label}
          </Link>
        )}
      </>
    </li>
  );

  return (
    <ol className={clsx("breadcrumb app-breadcrumb", className)}>
      {navNodes.map((node, index) => renderNavItem(node, index, index === navNodes.length - 1))}
    </ol>
  );
};

export default withDatasetAwareNavigation(BreadCrumb);
