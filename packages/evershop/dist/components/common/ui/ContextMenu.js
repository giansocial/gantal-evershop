import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import { cn } from '@evershop/evershop/lib/util/cn';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';
import * as React from 'react';
function ContextMenu({ ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Root, {
        "data-slot": "context-menu",
        ...props
    });
}
function ContextMenuPortal({ ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Portal, {
        "data-slot": "context-menu-portal",
        ...props
    });
}
function ContextMenuTrigger({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Trigger, {
        "data-slot": "context-menu-trigger",
        className: cn('select-none', className),
        ...props
    });
}
function ContextMenuContent({ className, align = 'start', alignOffset = 4, side = 'right', sideOffset = 0, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Portal, null, /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Positioner, {
        className: "isolate z-50 outline-none",
        align: align,
        alignOffset: alignOffset,
        side: side,
        sideOffset: sideOffset
    }, /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Popup, {
        "data-slot": "context-menu-content",
        className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-36 rounded-md p-1 shadow-md ring-1 duration-100 z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none', className),
        ...props
    })));
}
function ContextMenuGroup({ ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Group, {
        "data-slot": "context-menu-group",
        ...props
    });
}
function ContextMenuLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.GroupLabel, {
        "data-slot": "context-menu-label",
        "data-inset": inset,
        className: cn('text-muted-foreground px-2 py-1.5 text-xs font-medium data-[inset]:pl-8', className),
        ...props
    });
}
function ContextMenuItem({ className, inset, variant = 'default', ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Item, {
        "data-slot": "context-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive focus:*:[svg]:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/context-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props
    });
}
function ContextMenuSub({ ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.SubmenuRoot, {
        "data-slot": "context-menu-sub",
        ...props
    });
}
function ContextMenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.SubmenuTrigger, {
        "data-slot": "context-menu-sub-trigger",
        "data-inset": inset,
        className: cn("focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props
    }, children, /*#__PURE__*/ React.createElement(ChevronRightIcon, {
        className: "ml-auto"
    }));
}
function ContextMenuSubContent({ ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuContent, {
        "data-slot": "context-menu-sub-content",
        className: "shadow-lg",
        side: "right",
        ...props
    });
}
function ContextMenuCheckboxItem({ className, children, checked, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.CheckboxItem, {
        "data-slot": "context-menu-checkbox-item",
        className: cn("focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        checked: checked,
        ...props
    }, /*#__PURE__*/ React.createElement("span", {
        className: "absolute right-2 pointer-events-none"
    }, /*#__PURE__*/ React.createElement(ContextMenuPrimitive.CheckboxItemIndicator, null, /*#__PURE__*/ React.createElement(CheckIcon, null))), children);
}
function ContextMenuRadioGroup({ ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.RadioGroup, {
        "data-slot": "context-menu-radio-group",
        ...props
    });
}
function ContextMenuRadioItem({ className, children, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.RadioItem, {
        "data-slot": "context-menu-radio-item",
        className: cn("focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props
    }, /*#__PURE__*/ React.createElement("span", {
        className: "absolute right-2 pointer-events-none"
    }, /*#__PURE__*/ React.createElement(ContextMenuPrimitive.RadioItemIndicator, null, /*#__PURE__*/ React.createElement(CheckIcon, null))), children);
}
function ContextMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(ContextMenuPrimitive.Separator, {
        "data-slot": "context-menu-separator",
        className: cn('bg-border -mx-1 my-1 h-px', className),
        ...props
    });
}
function ContextMenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("span", {
        "data-slot": "context-menu-shortcut",
        className: cn('text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto text-xs tracking-widest', className),
        ...props
    });
}
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup };
