import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cn } from '@evershop/evershop/lib/util/cn';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';
import * as React from 'react';
function DropdownMenu({ ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Root, {
        "data-slot": "dropdown-menu",
        ...props
    });
}
function DropdownMenuPortal({ ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Portal, {
        "data-slot": "dropdown-menu-portal",
        ...props
    });
}
function DropdownMenuTrigger({ ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Trigger, {
        "data-slot": "dropdown-menu-trigger",
        ...props
    });
}
function DropdownMenuContent({ align = 'start', alignOffset = 0, side = 'bottom', sideOffset = 4, className, ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Portal, null, /*#__PURE__*/ React.createElement(MenuPrimitive.Positioner, {
        className: "isolate z-50 outline-none",
        align: align,
        alignOffset: alignOffset,
        side: side,
        sideOffset: sideOffset
    }, /*#__PURE__*/ React.createElement(MenuPrimitive.Popup, {
        "data-slot": "dropdown-menu-content",
        className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-md p-1 shadow-md ring-1 duration-100 z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden', className),
        ...props
    })));
}
function DropdownMenuGroup({ ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Group, {
        "data-slot": "dropdown-menu-group",
        ...props
    });
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "dropdown-menu-label",
        "data-inset": inset,
        className: cn('text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:pl-8', className),
        ...props
    });
}
function DropdownMenuItem({ className, inset, variant = 'default', ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Item, {
        "data-slot": "dropdown-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props
    });
}
function DropdownMenuSub({ ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.SubmenuRoot, {
        "data-slot": "dropdown-menu-sub",
        ...props
    });
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.SubmenuTrigger, {
        "data-slot": "dropdown-menu-sub-trigger",
        "data-inset": inset,
        className: cn("focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props
    }, children, /*#__PURE__*/ React.createElement(ChevronRightIcon, {
        className: "ml-auto"
    }));
}
function DropdownMenuSubContent({ align = 'start', alignOffset = -3, side = 'right', sideOffset = 0, className, ...props }) {
    return /*#__PURE__*/ React.createElement(DropdownMenuContent, {
        "data-slot": "dropdown-menu-sub-content",
        className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-24 rounded-md p-1 shadow-lg ring-1 duration-100 w-auto', className),
        align: align,
        alignOffset: alignOffset,
        side: side,
        sideOffset: sideOffset,
        ...props
    });
}
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.CheckboxItem, {
        "data-slot": "dropdown-menu-checkbox-item",
        className: cn("focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        checked: checked,
        ...props
    }, /*#__PURE__*/ React.createElement("span", {
        className: "absolute right-2 flex items-center justify-center pointer-events-none",
        "data-slot": "dropdown-menu-checkbox-item-indicator"
    }, /*#__PURE__*/ React.createElement(MenuPrimitive.CheckboxItemIndicator, null, /*#__PURE__*/ React.createElement(CheckIcon, null))), children);
}
function DropdownMenuRadioGroup({ ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.RadioGroup, {
        "data-slot": "dropdown-menu-radio-group",
        ...props
    });
}
function DropdownMenuRadioItem({ className, children, ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.RadioItem, {
        "data-slot": "dropdown-menu-radio-item",
        className: cn("focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props
    }, /*#__PURE__*/ React.createElement("span", {
        className: "absolute right-2 flex items-center justify-center pointer-events-none",
        "data-slot": "dropdown-menu-radio-item-indicator"
    }, /*#__PURE__*/ React.createElement(MenuPrimitive.RadioItemIndicator, null, /*#__PURE__*/ React.createElement(CheckIcon, null))), children);
}
function DropdownMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(MenuPrimitive.Separator, {
        "data-slot": "dropdown-menu-separator",
        className: cn('bg-border -mx-1 my-1 h-px', className),
        ...props
    });
}
function DropdownMenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("span", {
        "data-slot": "dropdown-menu-shortcut",
        className: cn('text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest', className),
        ...props
    });
}
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent };
