import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
export default function CmsGridPageHeading({ backUrl, page }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "w-2/3 mx-auto"
    }, /*#__PURE__*/ React.createElement(PageHeading, {
        backUrl: backUrl,
        heading: page ? `Editing ${page.name}` : 'Create a new page'
    }));
}
CmsGridPageHeading.defaultProps = {
    page: null
};
export const layout = {
    areaId: 'content',
    sortOrder: 5
};
export const query = `
  query Query {
    page: cmsPage(id: getContextValue("cmsPageId", null)) {
      name
    }
    backUrl: url(routeId: "cmsPageGrid")
  }
`;
