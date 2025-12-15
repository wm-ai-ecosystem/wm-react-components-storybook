export const ROUTING_BASEPATH = "react-pages";

export const hyperLinkMofify = (link: string) => {
  let hrefLink = "#";
  if (link) {
    const baseRegex = new RegExp(`^/${ROUTING_BASEPATH}(/|$)`);
    if (/^#/.test(link)) {
      const suffix = link.replace(/^#/, "");
      hrefLink = /^\/.*/.test(suffix)
        ? `/${ROUTING_BASEPATH}${suffix}`
        : `/${ROUTING_BASEPATH}/${suffix}`;
    } else if (/^\//.test(link)) {
      hrefLink = baseRegex.test(link) ? link : `/${ROUTING_BASEPATH}${link}`;
    } else {
      hrefLink = link;
    }
  }
  return hrefLink;
};
