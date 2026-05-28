import React from 'react';
export function SubTotal({ count, total }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex items-start justify-between gap-4"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "text-sm text-muted-foreground min-w-[8.75rem]"
    }, "Subtotal"), /*#__PURE__*/ React.createElement("div", {
        className: "flex-1 flex items-start justify-between gap-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-sm text-muted-foreground"
    }, count, " items"), /*#__PURE__*/ React.createElement("div", {
        className: "font-semibold text-sm"
    }, total)));
}
