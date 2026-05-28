import { useCartState, CartSyncTrigger } from '@components/frontStore/cart/CartContext.js';
import { DefaultMiniCartDropdown } from '@components/frontStore/cart/DefaultMiniCartDropdown.js';
import { DefaultMiniCartIcon } from '@components/frontStore/cart/DefaultMiniCartIcon.js';
import React, { useCallback, useState, useEffect } from 'react';
export function MiniCart({ cartUrl = '/cart', checkoutUrl = '/checkout', dropdownPosition = 'right', showItemCount = true, CartIconComponent, CartDropdownComponent, className = '', disabled = false }) {
    const { data: cartData, syncStatus } = useCartState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cart = cartData;
    const handleCartClick = useCallback(()=>{
        if (disabled) return;
        setIsDropdownOpen(!isDropdownOpen);
    }, [
        disabled,
        isDropdownOpen,
        cartUrl
    ]);
    const handleDropdownClose = useCallback(()=>{
        setIsDropdownOpen(false);
    }, []);
    useEffect(()=>{
        if (syncStatus.synced && syncStatus.trigger === CartSyncTrigger.ADD_ITEM) {
            setIsDropdownOpen(true);
        }
    }, [
        syncStatus.synced,
        syncStatus.trigger
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: `mini__cart__wrapper relative ${className}`
    }, CartIconComponent ? /*#__PURE__*/ React.createElement(CartIconComponent, {
        totalQty: cart?.totalQty || 0,
        onClick: handleCartClick,
        isOpen: isDropdownOpen,
        disabled: disabled,
        showItemCount: showItemCount,
        syncStatus: syncStatus
    }) : /*#__PURE__*/ React.createElement(DefaultMiniCartIcon, {
        totalQty: cart?.totalQty || 0,
        onClick: handleCartClick,
        isOpen: isDropdownOpen,
        disabled: disabled,
        showItemCount: showItemCount,
        syncStatus: syncStatus
    }), CartDropdownComponent ? /*#__PURE__*/ React.createElement(CartDropdownComponent, {
        cart: cart,
        dropdownPosition: dropdownPosition,
        onClose: handleDropdownClose,
        cartUrl: cartUrl,
        setIsDropdownOpen: setIsDropdownOpen
    }) : /*#__PURE__*/ React.createElement(DefaultMiniCartDropdown, {
        cart: cart,
        isOpen: isDropdownOpen,
        dropdownPosition: dropdownPosition,
        onClose: handleDropdownClose,
        cartUrl: cartUrl,
        checkoutUrl: checkoutUrl,
        setIsDropdownOpen: setIsDropdownOpen
    }));
}
