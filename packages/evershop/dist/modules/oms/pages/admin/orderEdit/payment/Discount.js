import React from 'react';
export function Discount({ discount, code }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex items-start justify-between gap-4"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "text-sm text-muted-foreground min-w-[8.75rem]"
    }, "Discount"), /*#__PURE__*/ React.createElement("div", {
        className: "flex-1 flex items-start justify-between gap-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-sm text-muted-foreground"
    }, code), /*#__PURE__*/ React.createElement("div", {
        className: "font-semibold text-sm text-green-600 dark:text-green-400"
    }, discount)));
}
Discount.defaultProps = {
    code: undefined,
    discount: 0
};
