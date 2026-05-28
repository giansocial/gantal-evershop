import { Area } from '@components/common/Area.js';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@components/common/ui/Sheet.js';
import { CartItems } from '@components/frontStore/cart/CartItems.js';
import { CartTotalSummary } from '@components/frontStore/cart/CartTotalSummary.js';
import { DefaultMiniCartDropdownEmpty } from '@components/frontStore/cart/DefaultMiniCartDropdownEmpty.js';
import { DefaultMiniCartDropdownSummary } from '@components/frontStore/cart/DefaultMinicartDropdownSummary.js';
import { DefaultMiniCartItemList } from '@components/frontStore/cart/DefaultMiniCartItemList.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export const DefaultMiniCartDropdown = ({ cart, isOpen, onClose, cartUrl, checkoutUrl, dropdownPosition = 'right', setIsDropdownOpen })=>{
    const totalQty = cart?.totalQty || 0;
    return /*#__PURE__*/ React.createElement(Sheet, {
        open: isOpen,
        onOpenChange: (open)=>!open && onClose()
    }, /*#__PURE__*/ React.createElement(SheetContent, {
        side: dropdownPosition,
        className: "w-full md:w-1/3 border-border"
    }, /*#__PURE__*/ React.createElement(SheetHeader, {
        className: "border-b border-border"
    }, /*#__PURE__*/ React.createElement(SheetTitle, {
        className: "font-medium text-xl"
    }, _('Your Cart'))), totalQty === 0 ? /*#__PURE__*/ React.createElement(DefaultMiniCartDropdownEmpty, {
        setIsDropdownOpen: setIsDropdownOpen
    }) : /*#__PURE__*/ React.createElement("div", {
        className: "minicart__items__container flex flex-col px-5 justify-between h-full",
        style: {
            height: 'calc(100vh - 150px)'
        }
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartItemsBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "overflow-y-auto mb-8"
    }, /*#__PURE__*/ React.createElement(CartItems, null, ({ items, loading })=>/*#__PURE__*/ React.createElement(DefaultMiniCartItemList, {
            items: items,
            loading: loading
        }))), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartItemsAfter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(CartTotalSummary, null, ({ total })=>/*#__PURE__*/ React.createElement(DefaultMiniCartDropdownSummary, {
            total: total,
            cartUrl: cartUrl || '/cart',
            checkoutUrl: checkoutUrl || '/checkout',
            totalQty: totalQty
        })), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryAfter",
        noOuter: true
    }))));
};
