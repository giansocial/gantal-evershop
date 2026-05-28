import React from 'react';
export function ItemVariantOptions({ options = [] }) {
    if (!Array.isArray(options) || !options || options.length === 0) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "cart-item-variant-options mt-2"
    }, /*#__PURE__*/ React.createElement("ul", null, options.map((o, i)=>/*#__PURE__*/ React.createElement("li", {
            key: i
        }, /*#__PURE__*/ React.createElement("span", {
            className: "attribute-name font-semibold"
        }, o.attributeName, ":", ' '), /*#__PURE__*/ React.createElement("span", null, o.optionText)))));
}
