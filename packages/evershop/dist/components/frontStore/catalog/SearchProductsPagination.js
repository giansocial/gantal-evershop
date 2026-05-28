import { Area } from '@components/common/index.js';
import { useSearch } from '@components/frontStore/catalog/SearchContext.js';
import { Pagination, DefaultPaginationRenderer } from '@components/frontStore/Pagination.js';
import React from 'react';
export function SearchProductsPagination() {
    const { products } = useSearch();
    const page = products.currentFilters.find((filter)=>filter.key === 'page');
    const limit = products.currentFilters.find((filter)=>filter.key === 'limit');
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "searchProductsPaginationBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Pagination, {
        total: products.total,
        limit: limit ? parseInt(limit.value, 10) : 20,
        currentPage: parseInt(page?.value || '1', 10)
    }, (paginationProps)=>/*#__PURE__*/ React.createElement(DefaultPaginationRenderer, {
            renderProps: paginationProps
        })), /*#__PURE__*/ React.createElement(Area, {
        id: "searchProductsPaginationAfter",
        noOuter: true
    }));
}
