import { useCartDispatch, useCartState } from '@components/frontStore/cart/CartContext.js';
import React, { useState, useCallback, useEffect, useRef } from 'react';
export const useItemQuantity = ({ initialValue = 1, min = 1, max = Infinity, onChange, cartItemId, debounce = 500, onSuccess, onFailure })=>{
    const [quantity, setInternalQuantity] = useState(initialValue);
    const cartDispatch = useCartDispatch();
    const { loading } = useCartState();
    const previousQuantityRef = useRef(initialValue);
    const debounceTimerRef = useRef(null);
    useEffect(()=>{
        setInternalQuantity(initialValue);
        previousQuantityRef.current = initialValue;
    }, [
        initialValue
    ]);
    const executeCartUpdate = useCallback(async (newQuantity)=>{
        try {
            const currentQuantity = previousQuantityRef.current;
            const diff = newQuantity - currentQuantity;
            if (diff === 0) {
                return;
            }
            const action = diff > 0 ? 'increase' : 'decrease';
            const qty = Math.abs(diff);
            await cartDispatch.updateItem(cartItemId, {
                qty,
                action
            });
            previousQuantityRef.current = newQuantity;
            if (onChange) {
                onChange(newQuantity);
            }
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            // Revert to the last known good state on failure
            setInternalQuantity(previousQuantityRef.current);
            if (onFailure) {
                onFailure(error);
            }
        }
    }, [
        cartItemId,
        cartDispatch,
        onChange,
        onSuccess,
        onFailure
    ]);
    const handleUpdate = useCallback((newQuantity, immediate = false)=>{
        const clampedQuantity = Math.max(min, Math.min(newQuantity, max));
        setInternalQuantity(clampedQuantity);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        if (clampedQuantity === previousQuantityRef.current) {
            return;
        }
        if (immediate || debounce === 0) {
            executeCartUpdate(clampedQuantity);
        } else {
            debounceTimerRef.current = setTimeout(()=>{
                executeCartUpdate(clampedQuantity);
            }, debounce);
        }
    }, [
        min,
        max,
        quantity,
        debounce,
        executeCartUpdate
    ]);
    const increase = useCallback(()=>{
        handleUpdate(quantity + 1);
    }, [
        quantity,
        handleUpdate
    ]);
    const decrease = useCallback(()=>{
        handleUpdate(quantity - 1);
    }, [
        quantity,
        handleUpdate
    ]);
    const setQuantity = useCallback((newQuantity)=>{
        handleUpdate(newQuantity);
    }, [
        handleUpdate
    ]);
    const handleInputChange = (e)=>{
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity)) {
            setInternalQuantity(newQuantity);
        } else if (e.target.value === '') {
            setInternalQuantity(0);
        }
    };
    const handleInputBlur = ()=>{
        handleUpdate(quantity, true);
    };
    return {
        quantity,
        loading,
        increase,
        decrease,
        setQuantity,
        inputProps: {
            value: quantity,
            onChange: handleInputChange,
            onBlur: handleInputBlur,
            type: 'number',
            min,
            max,
            disabled: loading
        }
    };
};
/**
 * Item Quantity Component.
 * @param {ItemQuantityProps} props
 * @returns {ReactNode}
 */ export function ItemQuantity({ children, ...props }) {
    const quantityControls = useItemQuantity(props);
    return children(quantityControls);
}
