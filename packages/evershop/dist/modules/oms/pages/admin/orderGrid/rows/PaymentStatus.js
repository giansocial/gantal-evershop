import { Badge } from '@components/common/ui/Badge.js';
import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function PaymentStatus({ status }) {
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(Badge, {
        variant: status.badge || 'default'
    }, status.name));
}
