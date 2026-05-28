import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function DummyColumnHeader({ title }) {
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "font-medium uppercase text-xs"
    }, /*#__PURE__*/ React.createElement("span", null, title)));
}
