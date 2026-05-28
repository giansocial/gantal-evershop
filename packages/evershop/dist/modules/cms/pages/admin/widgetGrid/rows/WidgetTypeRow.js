import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function WidgetTypeRow({ code, types }) {
    const type = types.find((t)=>t.code === code);
    if (!type) {
        return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", null, "Unknown"));
    } else {
        return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", null, type.name));
    }
}
