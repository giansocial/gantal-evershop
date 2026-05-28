import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { toggleVariants } from '@components/common/ui/Toggle.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import * as React from 'react';
const ToggleGroupContext = /*#__PURE__*/ React.createContext({
    size: 'default',
    variant: 'default',
    spacing: 0,
    orientation: 'horizontal'
});
function ToggleGroup({ className, variant, size, spacing = 0, orientation = 'horizontal', children, ...props }) {
    return /*#__PURE__*/ React.createElement(ToggleGroupPrimitive, {
        "data-slot": "toggle-group",
        "data-variant": variant,
        "data-size": size,
        "data-spacing": spacing,
        "data-orientation": orientation,
        style: {
            '--gap': spacing
        },
        className: cn('rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch', className),
        ...props
    }, /*#__PURE__*/ React.createElement(ToggleGroupContext.Provider, {
        value: {
            variant,
            size,
            spacing,
            orientation
        }
    }, children));
}
function ToggleGroupItem({ className, children, variant = 'default', size = 'default', ...props }) {
    const context = React.useContext(ToggleGroupContext);
    return /*#__PURE__*/ React.createElement(TogglePrimitive, {
        "data-slot": "toggle-group-item",
        "data-variant": context.variant || variant,
        "data-size": context.size || size,
        "data-spacing": context.spacing,
        className: cn('data-[state=on]:bg-muted group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t', toggleVariants({
            variant: context.variant || variant,
            size: context.size || size
        }), className),
        ...props
    }, children);
}
export { ToggleGroup, ToggleGroupItem };
