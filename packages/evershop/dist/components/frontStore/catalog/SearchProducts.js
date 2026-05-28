import { Area } from '@components/common/index.js';
import { ProductList } from '@components/frontStore/catalog/ProductList.js';
import { useSearch } from '@components/frontStore/catalog/SearchContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function SearchProducts() {
    const { products } = useSearch();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "searchProductsBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(ProductList, {
        products: products.items,
        layout: "grid",
        gridColumns: 3,
        showAddToCart: true
    }), /*#__PURE__*/ React.createElement("span", {
        className: "product-count italic block mt-5"
    }, _('${count} products', {
        count: products.total.toString()
    }))), /*#__PURE__*/ React.createElement(Area, {
        id: "searchProductsAfter",
        noOuter: true
    }));
}
