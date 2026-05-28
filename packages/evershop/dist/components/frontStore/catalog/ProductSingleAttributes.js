import Area from '@components/common/Area.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
export const ProductSingleAttributes = ()=>{
    const { attributes, sku } = useProduct();
    const list = attributes ? [
        {
            attributeCode: 'sku',
            attributeName: 'SKU',
            optionText: sku
        },
        ...attributes
    ] : [];
    if (!list || list.length === 0) {
        return null;
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "productAttributesBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "product__single__attributes py-3"
    }, /*#__PURE__*/ React.createElement("ul", {
        className: "list-none"
    }, list.map((attribute)=>/*#__PURE__*/ React.createElement("li", {
            key: attribute.attributeCode,
            className: "py-1"
        }, /*#__PURE__*/ React.createElement("strong", null, attribute.attributeName, ": "), ' ', /*#__PURE__*/ React.createElement("span", null, attribute.optionText))))), /*#__PURE__*/ React.createElement(Area, {
        id: "productAttributesAfter",
        noOuter: true
    }));
};
