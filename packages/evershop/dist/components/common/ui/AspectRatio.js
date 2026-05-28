import { cn } from '@evershop/evershop/lib/util/cn';
import React from 'react';
function AspectRatio({ ratio, className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "aspect-ratio",
        style: {
            '--ratio': ratio
        },
        className: cn('relative aspect-(--ratio)', className),
        ...props
    });
}
export { AspectRatio };
