import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Button } from '@components/common/ui/Button.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import { XIcon } from 'lucide-react';
import * as React from 'react';
function Dialog({ ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Root, {
        "data-slot": "dialog",
        ...props
    });
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Trigger, {
        "data-slot": "dialog-trigger",
        ...props
    });
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Portal, {
        "data-slot": "dialog-portal",
        ...props
    });
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Close, {
        "data-slot": "dialog-close",
        ...props
    });
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Backdrop, {
        "data-slot": "dialog-overlay",
        className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50', className),
        ...props
    });
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPortal, null, /*#__PURE__*/ React.createElement(DialogOverlay, null), /*#__PURE__*/ React.createElement(DialogPrimitive.Popup, {
        "data-slot": "dialog-content",
        className: cn('bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-6 rounded-xl p-6 text-sm ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-1001 w-full -translate-x-1/2 -translate-y-1/2 outline-none', className),
        ...props
    }, children, showCloseButton && /*#__PURE__*/ React.createElement(DialogPrimitive.Close, {
        "data-slot": "dialog-close",
        render: /*#__PURE__*/ React.createElement(Button, {
            variant: "ghost",
            className: "absolute top-4 right-4",
            size: "icon-sm"
        })
    }, /*#__PURE__*/ React.createElement(XIcon, null), /*#__PURE__*/ React.createElement("span", {
        className: "sr-only"
    }, "Close"))));
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "dialog-header",
        className: cn('gap-2 flex flex-col', className),
        ...props
    });
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "dialog-footer",
        className: cn('gap-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, children, showCloseButton && /*#__PURE__*/ React.createElement(DialogPrimitive.Close, {
        render: /*#__PURE__*/ React.createElement(Button, {
            variant: "outline"
        })
    }, "Close"));
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Title, {
        "data-slot": "dialog-title",
        className: cn('leading-none font-medium', className),
        ...props
    });
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(DialogPrimitive.Description, {
        "data-slot": "dialog-description",
        className: cn('text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3', className),
        ...props
    });
}
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
