import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cn } from '@evershop/evershop/lib/util/cn';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';
function Breadcrumb({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("nav", {
        "aria-label": "breadcrumb",
        "data-slot": "breadcrumb",
        className: cn(className),
        ...props
    });
}
function BreadcrumbList({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("ol", {
        "data-slot": "breadcrumb-list",
        className: cn('text-muted-foreground gap-1.5 text-sm sm:gap-2.5 flex flex-wrap items-center break-words', className),
        ...props
    });
}
function BreadcrumbItem({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("li", {
        "data-slot": "breadcrumb-item",
        className: cn('gap-1.5 inline-flex items-center', className),
        ...props
    });
}
function BreadcrumbLink({ className, render, ...props }) {
    return useRender({
        defaultTagName: 'a',
        props: mergeProps({
            className: cn('hover:text-foreground transition-colors', className)
        }, props),
        render,
        state: {
            slot: 'breadcrumb-link'
        }
    });
}
function BreadcrumbPage({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("span", {
        "data-slot": "breadcrumb-page",
        role: "link",
        "aria-disabled": "true",
        "aria-current": "page",
        className: cn('text-foreground font-normal', className),
        ...props
    });
}
function BreadcrumbSeparator({ children, className, ...props }) {
    return /*#__PURE__*/ React.createElement("li", {
        "data-slot": "breadcrumb-separator",
        role: "presentation",
        "aria-hidden": "true",
        className: cn('[&>svg]:size-3.5', className),
        ...props
    }, children ?? /*#__PURE__*/ React.createElement(ChevronRightIcon, null));
}
function BreadcrumbEllipsis({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("span", {
        "data-slot": "breadcrumb-ellipsis",
        role: "presentation",
        "aria-hidden": "true",
        className: cn('size-5 [&>svg]:size-4 flex items-center justify-center', className),
        ...props
    }, /*#__PURE__*/ React.createElement(MoreHorizontalIcon, null), /*#__PURE__*/ React.createElement("span", {
        className: "sr-only"
    }, "More"));
}
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
