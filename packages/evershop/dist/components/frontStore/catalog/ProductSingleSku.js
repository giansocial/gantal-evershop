import Area from '@components/common/Area.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export const ProductSingleSku = ()=>{
    const { sku } = useProduct();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "productSkuBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "product__single__sku"
    }, _('SKU: ${sku}', {
        sku
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "productSkuAfter",
        noOuter: true
    }));
};
