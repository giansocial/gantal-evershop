import React from 'react';
export function Total({ total }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex items-start justify-between gap-4 pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "text-base font-semibold min-w-[8.75rem]"
    }, "Total"), /*#__PURE__*/ React.createElement("div", {
        className: "flex-1 flex items-start justify-between gap-2"
    }, /*#__PURE__*/ React.createElement("span", null), /*#__PURE__*/ React.createElement("div", {
        className: "text-base font-bold"
    }, total)));
}
