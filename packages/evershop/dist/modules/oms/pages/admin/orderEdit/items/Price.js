import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function Price({ price, qty }) {
    return /*#__PURE__*/ React.createElement(TableCell, {
        className: "w-32 whitespace-nowrap"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "product-price"
    }, /*#__PURE__*/ React.createElement("span", null, price, " x ", qty)));
}
