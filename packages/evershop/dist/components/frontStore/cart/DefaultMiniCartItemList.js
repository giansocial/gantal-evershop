import { CartSummaryItemsList } from '@components/frontStore/cart/CartSummaryItems.js';
import React from 'react';
export const DefaultMiniCartItemList = ({ items, showPriceIncludingTax = true, loading = false })=>{
    return /*#__PURE__*/ React.createElement(CartSummaryItemsList, {
        items: items,
        loading: loading,
        showPriceIncludingTax: showPriceIncludingTax
    });
};
