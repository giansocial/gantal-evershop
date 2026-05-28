import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function ProductNameRow({ url, name }) {
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        className: "hover:underline font-semibold",
        href: url,
        title: name
    }, name.length > 50 ? `${name.substring(0, 50)}...` : name)));
}
