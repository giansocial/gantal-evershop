import { Badge } from '@components/common/ui/Badge.js';
import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function Status({ status }) {
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", null, status === 0 && /*#__PURE__*/ React.createElement(Badge, {
        variant: "destructive"
    }, "Inactive"), status === 1 && /*#__PURE__*/ React.createElement(Badge, {
        variant: "success"
    }, "Active")));
}
