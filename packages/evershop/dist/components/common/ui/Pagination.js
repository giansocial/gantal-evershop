/* eslint-disable jsx-a11y/anchor-has-content */ import { Button } from '@components/common/ui/Button.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';
function Pagination({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("nav", {
        role: "navigation",
        "aria-label": "pagination",
        "data-slot": "pagination",
        className: cn('mx-auto flex w-full justify-center', className),
        ...props
    });
}
function PaginationContent({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("ul", {
        "data-slot": "pagination-content",
        className: cn('gap-1 flex items-center', className),
        ...props
    });
}
function PaginationItem({ ...props }) {
    return /*#__PURE__*/ React.createElement("li", {
        "data-slot": "pagination-item",
        ...props
    });
}
function PaginationLink({ className, isActive, size = 'icon', ...props }) {
    return /*#__PURE__*/ React.createElement(Button, {
        variant: isActive ? 'outline' : 'ghost',
        size: size,
        className: cn(className),
        nativeButton: false,
        render: /*#__PURE__*/ React.createElement("a", {
            "aria-current": isActive ? 'page' : undefined,
            "data-slot": "pagination-link",
            "data-active": isActive,
            ...props
        })
    });
}
function PaginationPrevious({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(PaginationLink, {
        "aria-label": "Go to previous page",
        size: "default",
        className: cn('pl-2!', className),
        ...props
    }, /*#__PURE__*/ React.createElement(ChevronLeftIcon, {
        "data-icon": "inline-start"
    }), /*#__PURE__*/ React.createElement("span", {
        className: "hidden sm:block"
    }, "Previous"));
}
function PaginationNext({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(PaginationLink, {
        "aria-label": "Go to next page",
        size: "default",
        className: cn('pr-2!', className),
        ...props
    }, /*#__PURE__*/ React.createElement("span", {
        className: "hidden sm:block"
    }, "Next"), /*#__PURE__*/ React.createElement(ChevronRightIcon, {
        "data-icon": "inline-end"
    }));
}
function PaginationEllipsis({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        "data-slot": "pagination-ellipsis",
        className: cn("size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center", className),
        ...props
    }, /*#__PURE__*/ React.createElement(MoreHorizontalIcon, null), /*#__PURE__*/ React.createElement("span", {
        className: "sr-only"
    }, "More pages"));
}
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
