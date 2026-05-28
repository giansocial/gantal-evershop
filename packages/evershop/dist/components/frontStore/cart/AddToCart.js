import { useCartDispatch, useCartState } from '@components/frontStore/cart/CartContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useState, useCallback } from 'react';
export const AddToCart = ({ product, qty, onSuccess, onError, children })=>{
    const cartDispatch = useCartDispatch();
    const cartState = useCartState();
    const [localError, setLocalError] = useState(null);
    const canAddToCart = product.isInStock && qty > 0 && !!cartState.data;
    const isLoading = cartState.loading;
    const clearError = useCallback(()=>{
        setLocalError(null);
        cartDispatch.clearError();
    }, [
        cartDispatch
    ]);
    const addToCart = useCallback(async ()=>{
        if (!canAddToCart) {
            const errorMsg = !product.isInStock ? _('Product is out of stock') : !cartState.data ? _('Cart is not initialized') : _('Invalid quantity');
            setLocalError(errorMsg);
            onError?.(errorMsg);
            return;
        }
        try {
            setLocalError(null);
            cartDispatch.clearError();
            await cartDispatch.addItem({
                sku: product.sku,
                qty: qty
            });
            onSuccess?.(qty);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Failed to add item to cart');
            setLocalError(errorMessage);
            onError?.(errorMessage);
        }
    }, [
        canAddToCart,
        product.isInStock,
        product.sku,
        qty,
        cartState.data,
        cartDispatch,
        onSuccess,
        onError
    ]);
    const state = {
        isLoading,
        error: localError || cartState.data?.error || null,
        canAddToCart,
        isInStock: product.isInStock
    };
    const actions = {
        addToCart,
        clearError
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children(state, actions));
};
