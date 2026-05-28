import { Editor } from '@components/common/Editor.js';
import React from 'react';
export default function CmsPageView({ page }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "page-width"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "prose prose-base max-w-none"
    }, /*#__PURE__*/ React.createElement("h1", {
        className: "cms__page__heading text-center text-3xl"
    }, page.name), /*#__PURE__*/ React.createElement(Editor, {
        rows: page.content
    })));
}
export const layout = {
    areaId: 'content',
    sortOrder: 1
};
export const query = `
  query Query {
    page: currentCmsPage {
      name
      content
    }
  }
`;
