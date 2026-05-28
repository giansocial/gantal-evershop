import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function CollectionNameRow({ name, url }) {
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        className: "hover:underline font-semibold",
        href: url
    }, name)));
}
