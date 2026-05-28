import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
import { ItemVariantOptions } from './ItemVariantOptions.js';
export function Name({ name, productSku, productUrl, variantOptions = [] }) {
    const truncatedName = name.length > 30 ? `${name.substring(0, 30)}...` : name;
    return /*#__PURE__*/ React.createElement(TableCell, {
        className: "w-auto min-w-0"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "product-column overflow-hidden"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-semibold"
    }, /*#__PURE__*/ React.createElement("a", {
        href: productUrl,
        title: name
    }, truncatedName))), /*#__PURE__*/ React.createElement("div", {
        className: "text-muted-foreground"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "font-semibold"
    }, "SKU: "), /*#__PURE__*/ React.createElement("span", null, productSku)), /*#__PURE__*/ React.createElement(ItemVariantOptions, {
        options: variantOptions
    })));
}
