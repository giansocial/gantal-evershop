import Area from '@components/common/Area.js';
import { Editor } from '@components/common/Editor.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export const ProductSingleDescription = ()=>{
    const { description } = useProduct();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "productDescriptionBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "product__single__description mt-8"
    }, /*#__PURE__*/ React.createElement("h3", null, _('Product Description')), /*#__PURE__*/ React.createElement(Editor, {
        rows: description
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "productDescriptionAfter",
        noOuter: true
    }));
};
