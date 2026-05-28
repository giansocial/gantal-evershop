import Area from '@components/common/Area.js';
import { useAppState } from '@components/common/context/app.js';
import { useCartState, useCartDispatch } from '@components/frontStore/cart/CartContext.js';
import React from 'react';
function CartItems({ children }) {
    const { data: cart, loading } = useCartState();
    const { config: { tax: { priceIncludingTax } } } = useAppState();
    const { removeItem } = useCartDispatch();
    const isEmpty = cart?.totalQty === 0;
    const totalItems = cart?.totalQty || 0;
    const handleRemoveItem = async (itemId)=>{
        await removeItem(itemId);
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "cart-items"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "cartItemsBefore",
        noOuter: true
    }), children ? children({
        items: cart?.items || [],
        showPriceIncludingTax: priceIncludingTax,
        loading,
        isEmpty,
        totalItems,
        onRemoveItem: handleRemoveItem
    }) : null, /*#__PURE__*/ React.createElement(Area, {
        id: "cartItemsAfter",
        noOuter: true
    }));
}
export { CartItems };
