import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import React from 'react';
function Collapsible({ ...props }) {
    return /*#__PURE__*/ React.createElement(CollapsiblePrimitive.Root, {
        "data-slot": "collapsible",
        ...props
    });
}
function CollapsibleTrigger({ ...props }) {
    return /*#__PURE__*/ React.createElement(CollapsiblePrimitive.Trigger, {
        "data-slot": "collapsible-trigger",
        ...props
    });
}
function CollapsibleContent({ ...props }) {
    return /*#__PURE__*/ React.createElement(CollapsiblePrimitive.Panel, {
        "data-slot": "collapsible-content",
        ...props
    });
}
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
