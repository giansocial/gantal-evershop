import React from 'react';
export function NoResult({ keyword = '', resourseLinks = [] }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "items-center text-center"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-xl font-semibold text-muted-foreground"
    }, 'No results for "', keyword, '"'), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 mt-2"
    }, resourseLinks.map((link, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "flex space-x-2 justify-center items-center"
        }, /*#__PURE__*/ React.createElement("a", {
            href: link.url,
            className: "text-divider hover:underline"
        }, link.name)))));
}
