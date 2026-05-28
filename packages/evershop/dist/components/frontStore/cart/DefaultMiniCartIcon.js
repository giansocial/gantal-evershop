import { ShoppingBag } from 'lucide-react';
import React from 'react';
export const DefaultMiniCartIcon = ({ totalQty, onClick, isOpen, disabled = false, showItemCount = true, syncStatus })=>{
    return /*#__PURE__*/ React.createElement("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        className: `mini-cart-icon relative ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isOpen ? 'active' : ''}`,
        "aria-label": `Shopping cart with ${totalQty} items`
    }, syncStatus.syncing ? /*#__PURE__*/ React.createElement("div", {
        className: "w-6 h-6 flex items-center justify-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "animate-spin rounded-full h-4 w-4 border-2 border-border"
    })) : /*#__PURE__*/ React.createElement(ShoppingBag, {
        className: "w-5 h-5 text-foreground hover:text-primary"
    }), showItemCount && totalQty > 0 && !syncStatus.syncing && /*#__PURE__*/ React.createElement("span", {
        className: "absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-normal"
    }, totalQty > 99 ? '99+' : totalQty));
};
