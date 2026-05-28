import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
export default function CollectionGridPageHeading() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "w-2/3",
        style: {
            margin: '0 auto'
        }
    }, /*#__PURE__*/ React.createElement(PageHeading, {
        heading: "Collections"
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
