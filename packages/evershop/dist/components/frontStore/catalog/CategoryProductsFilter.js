import Area from '@components/common/Area.js';
import { useCategory } from '@components/frontStore/catalog/CategoryContext.js';
import { DefaultProductFilterRender } from '@components/frontStore/catalog/DefaultProductFilterRender.js';
import { ProductFilter } from '@components/frontStore/catalog/ProductFilter.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function CategoryProductsFilter() {
    const category = useCategory();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "beforeFilter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(ProductFilter, {
        currentFilters: category.products.currentFilters,
        availableAttributes: category.availableAttributes,
        categories: category.children,
        priceRange: category.priceRange
    }, (renderProps)=>/*#__PURE__*/ React.createElement(DefaultProductFilterRender, {
            renderProps: renderProps,
            title: _('Product Filters'),
            showFilterSummary: true
        })), /*#__PURE__*/ React.createElement(Area, {
        id: "afterFilter",
        noOuter: true
    }));
}
