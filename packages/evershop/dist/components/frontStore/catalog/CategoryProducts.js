import Area from '@components/common/Area.js';
import { useCategory } from '@components/frontStore/catalog/CategoryContext.js';
import { ProductList } from '@components/frontStore/catalog/ProductList.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function CategoryProducts() {
    const { showProducts, products } = useCategory();
    if (!showProducts) {
        return null;
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "categoryProductsBefore",
        className: "category__products__before"
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
        id: "categoryProductsAfter",
        className: "category__products__after"
    }));
}
