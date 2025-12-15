import React, { memo, useRef, useEffect, useMemo, forwardRef, useState } from "react";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

interface NavigationProps extends BaseProps {
  dataset?: any[];
  itemicon?: string;
  itemlabel?: string;
  itemhint?: string;
  itemlink?: string;
  itemtarget?: string;
  itembadge?: string;
  itemchildren?: string;
  itemaction?: string;
  itemclass?: string;
  itemid?: string;
  isactive?: string;
  userrole?: string;
  orderby?: string;
  datafield?: string;
  displayfield?: string;
  navNodes?: Array<NavNode>;
  resetNavNodes?: () => void;
  styles?: any;
  className?: string;
}

type DatasetAwareNavProps = NavigationProps & BaseProps;

interface NavNode {
  label: string;
  action?: any;
  badge?: string;
  children?: Array<NavNode>;
  class?: string;
  disabled?: boolean;
  icon?: string;
  id?: string;
  link?: string;
  hint?: string;
  target?: string;
  role?: string;
  value?: any;
  isactive?: boolean;
  expanded?: boolean;
}

const getValidLink = (link?: string): string | undefined => {
  if (!link) return undefined;
  const routRegex = /^(\/|#\/|#)(?!\W).*/;
  if (routRegex.test(link)) {
    const match = link.match(/[\w]+.*/);
    if (match) {
      link = `#/${match[0]}`;
    }
  } else if (link.startsWith("www.")) {
    link = `//${link}`;
  }
  return link;
};

const getElement = (obj: any, key: string): any => obj && obj[key];

const isDefined = (value: any): boolean => value !== undefined;

const validateAccessRoles = (roles: string | undefined, userRoles: string[]): boolean => {
  if (!roles || typeof roles !== "string") return true;
  const roleList = roles.split(",").map(role => role.trim());
  return roleList.some(role => userRoles.includes(role));
};

const createArrayFrom = (value: any): any[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
};

const getOrderedDataset = (dataset: any[], orderby?: string): any[] => {
  if (!orderby) return dataset;

  const [field, direction] = orderby.split(":");

  return dataset.sort((a, b) => {
    const valA = a[field] || a.label || a.value || a;
    const valB = b[field] || b.label || b.value || b;

    let comparison = 0;
    if (valA < valB) comparison = -1;
    if (valA > valB) comparison = 1;

    return direction === "desc" ? -comparison : comparison;
  });
};

const getEvaluatedData = (
  dataObj: any,
  options: { field?: string; bindExpression: any },
  context: any
): any => {
  if (options.bindExpression) {
    return options.bindExpression(context, dataObj);
  }
  if (options.field) {
    return dataObj[options.field];
  }
  return undefined;
};

const getCurrentRouteId = (): string => {
  const path = window.location.pathname.substr(1).split("?")[0];
  const segments = path.split("/");
  return segments[segments.length - 1] || "Main";
};

const findPathToNode = (nodes: NavNode[], targetId: string, path: NavNode[] = []): NavNode[] => {
  for (const node of nodes) {
    if (node.id === targetId || node.link?.includes(targetId)) {
      return [...path, node];
    }

    if (node.children?.length) {
      const foundPath = findPathToNode(node.children, targetId, [...path, node]);
      if (foundPath.length) {
        return foundPath;
      }
    }
  }

  return [];
};

const handleNavigation = (
  item: NavNode,
  event: React.MouseEvent,
  options: {
    onBeforenavigate?: (event: { $event: React.MouseEvent; $item: any }) => boolean | void;
    defaultTarget?: string;
  } = {}
) => {
  const { onBeforenavigate, defaultTarget } = options;

  event.preventDefault();
  const locals = { $item: item.value, $event: event };
  const canNavigate = !(onBeforenavigate?.(locals) === false);
  const linkTarget = item.target || defaultTarget;
  let itemLink = item.link;

  if (itemLink && canNavigate) {
    const queryString = itemLink.split("?")[1];
    const cleanPath = itemLink.replace(/^#?\/?/, "").split("?")[0];
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split("/");

    if (pathSegments.length > 1) {
      pathSegments[pathSegments.length - 1] = cleanPath;
      const newPath = pathSegments.join("/") + (queryString ? `?${queryString}` : "");
      window.location.href = newPath;
    } else {
      window.location.href = `/${cleanPath}${queryString ? `?${queryString}` : ""}`;
    }
  }
};

const withDatasetAwareNavigation = <P extends DatasetAwareNavProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const NavigationWrappedComponent = forwardRef<HTMLDivElement, P>((props, ref) => {
    const {
      dataset,
      itemicon,
      itemlabel,
      itemhint,
      itemlink,
      itemtarget,
      itembadge,
      itemchildren,
      itemaction,
      itemclass,
      itemid,
      isactive,
      userrole,
      orderby,
      datafield,
      displayfield,
      listener,
      styles,
      className,
      ...restProps
    } = props;

    const [navNodes, setNavNodes] = useState<Array<NavNode>>([]);

    const securityService = listener?.appConfig?.SecurityService || { loggedInUser: [] };

    const userRoles = securityService.loggedInUser?.roles || [];

    const binditemlabel = useRef<any>(null);
    const binditemhint = useRef<any>(null);
    const binditemicon = useRef<any>(null);
    const binditemaction = useRef<any>(null);
    const binditembadge = useRef<any>(null);
    const binditemchildren = useRef<any>(null);
    const binditemid = useRef<any>(null);
    const binditemlink = useRef<any>(null);
    const binditemtarget = useRef<any>(null);
    const binduserrole = useRef<any>(null);
    const bindisactive = useRef<any>(null);

    const _itemFieldMap = useRef({
      idField: itemid || "id",
      iconField: itemicon || "icon",
      labelField: itemlabel || "label",
      hintField: itemhint || "hint",
      linkField: itemlink || "link",
      targetField: itemtarget || "target",
      badgeField: itembadge || "badge",
      childrenField: itemchildren || "children",
      classField: itemclass || "class",
      actionField: itemaction || "action",
      isactiveField: isactive || "isactive",
      roleField: userrole || "role",
    });
    useEffect(() => {
      binditemlabel.current = restProps["itemlabel.bind"] || null;
      binditemhint.current = restProps["itemhint.bind"] || null;
      binditemicon.current = restProps["itemicon.bind"] || null;
      binditemaction.current = restProps["itemaction.bind"] || null;
      binditembadge.current = restProps["itembadge.bind"] || null;
      binditemchildren.current = restProps["itemchildren.bind"] || null;
      binditemid.current = restProps["itemid.bind"] || null;
      binditemlink.current = restProps["itemlink.bind"] || null;
      binditemtarget.current = restProps["itemtarget.bind"] || null;
      binduserrole.current = restProps["userrole.bind"] || null;
      bindisactive.current = restProps["isactive.bind"] || null;
    }, [restProps]);

    useEffect(() => {
      resetNodes();
    }, [
      dataset,
      itemicon,
      itemlabel,
      itemhint,
      itemlink,
      itemtarget,
      itembadge,
      itemchildren,
      itemaction,
      itemclass,
      itemid,
      isactive,
      userrole,
      orderby,
      datafield,
      displayfield,
    ]);

    const resetItemFieldMap = () => {
      _itemFieldMap.current = {
        idField: itemid || "id",
        iconField: itemicon || "icon",
        labelField: itemlabel || "label",
        hintField: itemhint || "hint",
        linkField: itemlink || "link",
        targetField: itemtarget || "target",
        badgeField: itembadge || "badge",
        childrenField: itemchildren || "children",
        classField: itemclass || "class",
        actionField: itemaction || "action",
        isactiveField: isactive || "isactive",
        roleField: userrole || "role",
      };
    };

    const getNode = (fields: any, node: any): NavNode => {
      const context = {};

      // Handle different node structures
      let processedNode: NavNode;

      if (typeof node === "string") {
        processedNode = {
          label: node,
          value: node,
          expanded: false,
        };
      } else if (typeof node === "object") {
        const childrenData = getElement(node, fields.childrenField);
        const children = Array.isArray(childrenData)
          ? childrenData.map((child: any) => getNode(fields, child))
          : [];

        processedNode = {
          action:
            getEvaluatedData(
              node,
              { field: itemaction, bindExpression: binditemaction.current },
              context
            ) || getElement(node, fields.actionField),
          badge:
            getEvaluatedData(
              node,
              { field: itembadge, bindExpression: binditembadge.current },
              context
            ) || getElement(node, fields.badgeField),
          children: children,
          class: getElement(node, fields.classField),
          disabled: node.disabled,
          icon:
            getEvaluatedData(
              node,
              { field: itemicon, bindExpression: binditemicon.current },
              context
            ) || getElement(node, fields.iconField),
          id:
            getEvaluatedData(
              node,
              { field: itemid, bindExpression: binditemid.current },
              context
            ) || getElement(node, fields.idField),
          label:
            getEvaluatedData(
              node,
              { field: itemlabel, bindExpression: binditemlabel.current },
              context
            ) ||
            getElement(node, fields.labelField) ||
            node.label ||
            String(node),
          hint:
            getEvaluatedData(
              node,
              { field: itemhint, bindExpression: binditemhint.current },
              context
            ) || getElement(node, fields.hintField),
          link:
            getValidLink(
              getEvaluatedData(
                node,
                { field: itemlink, bindExpression: binditemlink.current },
                context
              ) || getElement(node, fields.linkField)
            ) || node.link,
          target:
            getEvaluatedData(
              node,
              { field: itemtarget, bindExpression: binditemtarget.current },
              context
            ) || getElement(node, fields.targetField),
          role:
            getEvaluatedData(
              node,
              { field: userrole, bindExpression: binduserrole.current },
              context
            ) || getElement(node, fields.roleField),
          isactive:
            getEvaluatedData(
              node,
              { field: isactive, bindExpression: bindisactive.current },
              context
            ) || getElement(node, fields.isactiveField),
          value: datafield && datafield !== "All Fields" ? getElement(node, datafield) : node,
          expanded: false,
        };
      } else {
        processedNode = {
          label: String(node),
          value: node,
          expanded: false,
        };
      }

      return processedNode;
    };

    const prepareNodeDataSet = (nv: any) => {
      if (!nv) return [];

      // Handle comma-separated string
      if (typeof nv === "string") {
        const items = nv
          .split(",")
          .map(item => item.trim())
          .filter(item => item.length > 0);
        return items.map(item => ({
          label: item,
          value: item,
        }));
      }

      // Handle plain object (convert to array of key-value pairs)
      if (nv && typeof nv === "object" && !Array.isArray(nv)) {
        return Object.entries(nv).map(([key, value]) => ({
          label: String(value),
          value: key,
          key: key,
        }));
      }

      // Handle array
      const arrayData = createArrayFrom(nv);
      return arrayData.map((val: any) => {
        if (typeof val === "string") {
          return {
            label: val,
            value: val,
          };
        }
        if (typeof val !== "object") {
          return {
            label: String(val),
            value: val,
          };
        }
        return val;
      });
    };

    const getNodes = (nv = dataset || []): Array<NavNode> => {
      if (!nv || (Array.isArray(nv) && nv.length === 0)) {
        return [];
      }

      let nodes: Array<any> = getOrderedDataset(prepareNodeDataSet(nv), orderby) || [];
      if (nodes.length) {
        const nodeFields = _itemFieldMap.current;

        nodes = nodes.reduce((result: Array<NavNode>, node: any) => {
          if (validateAccessRoles(getElement(node, nodeFields.roleField), userRoles)) {
            result.push(getNode(nodeFields, node));
          }
          return result;
        }, []);
      }
      return nodes;
    };

    const resetNodes = () => {
      resetItemFieldMap();
      const newNodes = getNodes();
      setNavNodes(newNodes);
    };

    return (
      <WrappedComponent
        {...(props as P)}
        ref={ref}
        navNodes={navNodes}
        resetNavNodes={resetNodes}
        handleNavigation={handleNavigation}
      />
    );
  });

  NavigationWrappedComponent.displayName = `withDatasetAwareNavigation(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return withBaseWrapper(NavigationWrappedComponent as unknown as React.ComponentType<BaseProps>);
};

export type { DatasetAwareNavProps, NavNode };
export { handleNavigation };
export default withDatasetAwareNavigation;
