import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
export default function CollectionEditPageHeading({ backUrl, collection = {} }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "w-2/3",
        style: {
            margin: '0 auto'
        }
    }, /*#__PURE__*/ React.createElement(PageHeading, {
        backUrl: backUrl,
        heading: collection ? `Editing ${collection.name}` : 'Create a new collection'
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 5
};
export const query = `
  query Query {
    collection(code: getContextValue("collectionCode", null)) {
      name
    }
    backUrl: url(routeId: "collectionGrid")
  }
`;
