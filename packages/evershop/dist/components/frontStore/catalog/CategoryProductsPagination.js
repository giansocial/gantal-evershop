import { useCategory } from '@components/frontStore/catalog/CategoryContext.js';
import { Pagination, DefaultPaginationRenderer } from '@components/frontStore/Pagination.js';
import React from 'react';
export function CategoryProductsPagination() {
    const { showProducts, products } = useCategory();
    if (!showProducts) {
        return null;
    }
    const page = products.currentFilters.find((filter)=>filter.key === 'page');
    const limit = products.currentFilters.find((filter)=>filter.key === 'limit');
    return /*#__PURE__*/ React.createElement(Pagination, {
        total: products.total,
        limit: limit ? parseInt(limit.value, 10) : 20,
        currentPage: parseInt(page?.value || '1', 10)
    }, (paginationProps)=>/*#__PURE__*/ React.createElement(DefaultPaginationRenderer, {
            renderProps: paginationProps
        }));
}
