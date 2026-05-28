import { cn } from '@evershop/evershop/lib/util/cn';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
function Spinner({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(Loader2Icon, {
        role: "status",
        "aria-label": "Loading",
        className: cn('size-4 animate-spin', className),
        ...props
    });
}
export { Spinner };
