import { ProductListEmptyRender } from '@components/frontStore/catalog/ProductListEmptyRender.js';
import { ProductListItemRender } from '@components/frontStore/catalog/ProductListItemRender.js';
import { ProductListLoadingSkeleton } from '@components/frontStore/catalog/ProductListLoadingSkeleton.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export const ProductList = ({ products = [], imageWidth = 300, imageHeight = 300, isLoading = false, emptyMessage = _('No products found'), className = '', layout = 'grid', gridColumns = 4, showAddToCart = false, customAddToCartRenderer, renderItem })=>{
    if (isLoading) {
        return /*#__PURE__*/ React.createElement(ProductListLoadingSkeleton, {
            count: layout === 'list' ? 5 : gridColumns * 2,
            gridColumns: gridColumns,
            layout: layout
        });
    }
    if (!products || products.length === 0) {
        return /*#__PURE__*/ React.createElement(ProductListEmptyRender, {
            message: emptyMessage
        });
    }
    const layoutClass = layout === 'grid' ? 'product__grid' : 'product__list';
    // Compute responsive grid columns class based on gridColumns
    const gridClassName = (()=>{
        switch(gridColumns){
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 md:grid-cols-2 gap-8';
            case 3:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
            case 4:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
            case 5:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6';
            case 6:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6';
            default:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
        }
    })();
    const styleClasses = layout === 'grid' ? 'grid' : 'flex flex-col';
    const containerClass = `${layoutClass} ${gridClassName} ${className} ${styleClasses}`;
    const itemImageWidth = layout === 'list' ? imageWidth > 150 ? 150 : imageWidth : imageWidth;
    const itemImageHeight = layout === 'list' ? imageHeight > 150 ? 150 : imageHeight : imageHeight;
    return /*#__PURE__*/ React.createElement("div", {
        className: containerClass
    }, products.map((product)=>/*#__PURE__*/ React.createElement("div", {
            key: product.productId,
            className: `product__list__item ${layout === 'list' ? 'product__list__item__list' : 'product__list__item__grid'}`
        }, renderItem ? renderItem(product) : /*#__PURE__*/ React.createElement(ProductListItemRender, {
            product: product,
            imageWidth: itemImageWidth,
            imageHeight: itemImageHeight,
            layout: layout,
            showAddToCart: showAddToCart,
            customAddToCartRenderer: customAddToCartRenderer
        }))));
};
