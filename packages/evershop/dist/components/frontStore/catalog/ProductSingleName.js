import Area from '@components/common/Area.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';
export const ProductSingleName = ()=>{
    const { name } = useProduct();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "productNameBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("h1", {
        className: "product__single__name capitalize"
    }, name), /*#__PURE__*/ React.createElement(Area, {
        id: "productNameAfter",
        noOuter: true
    }));
};
