import { Breadcrumb as BreadcrumbRoot, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@components/common/ui/Breadcrumb.js';
import React from 'react';
function Breadcrumb({ pageInfo: { breadcrumbs } }) {
    return breadcrumbs.length ? /*#__PURE__*/ React.createElement("div", {
        className: "page-width"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "py-5"
    }, /*#__PURE__*/ React.createElement(BreadcrumbRoot, null, /*#__PURE__*/ React.createElement(BreadcrumbList, null, breadcrumbs.map((breadcrumb, index)=>/*#__PURE__*/ React.createElement(React.Fragment, {
            key: index
        }, /*#__PURE__*/ React.createElement(BreadcrumbItem, null, index === breadcrumbs.length - 1 ? /*#__PURE__*/ React.createElement(BreadcrumbPage, null, breadcrumb.title) : /*#__PURE__*/ React.createElement(BreadcrumbLink, {
            href: breadcrumb.url
        }, breadcrumb.title)), index < breadcrumbs.length - 1 && /*#__PURE__*/ React.createElement(BreadcrumbSeparator, null))))))) : null;
}
export const query = `
  query query {
    pageInfo {
      breadcrumbs {
        title
        url
      }
    }
  }
`;
export const layout = {
    areaId: 'content',
    sortOrder: 0
};
export default Breadcrumb;
