import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cn } from '@evershop/evershop/lib/util/cn';
import React from 'react';
function Progress({ className, children, value, ...props }) {
    return /*#__PURE__*/ React.createElement(ProgressPrimitive.Root, {
        value: value,
        "data-slot": "progress",
        className: cn('flex flex-wrap gap-3', className),
        ...props
    }, children, /*#__PURE__*/ React.createElement(ProgressTrack, null, /*#__PURE__*/ React.createElement(ProgressIndicator, null)));
}
function ProgressTrack({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(ProgressPrimitive.Track, {
        className: cn('bg-muted h-1.5 rounded-full relative flex w-full items-center overflow-x-hidden', className),
        "data-slot": "progress-track",
        ...props
    });
}
function ProgressIndicator({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(ProgressPrimitive.Indicator, {
        "data-slot": "progress-indicator",
        className: cn('bg-primary h-full transition-all', className),
        ...props
    });
}
function ProgressLabel({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(ProgressPrimitive.Label, {
        className: cn('text-sm font-medium', className),
        "data-slot": "progress-label",
        ...props
    });
}
function ProgressValue({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(ProgressPrimitive.Value, {
        className: cn('text-muted-foreground ml-auto text-sm tabular-nums', className),
        "data-slot": "progress-value",
        ...props
    });
}
export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
