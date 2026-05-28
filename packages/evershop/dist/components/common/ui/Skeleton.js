import { cn } from '@evershop/evershop/lib/util/cn';
import React from 'react';
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "skeleton",
        className: cn('bg-muted rounded-md animate-pulse', className),
        ...props
    });
}
export { Skeleton };
