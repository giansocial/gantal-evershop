import Area from '@components/common/Area.js';
import { Button } from '@components/common/ui/Button.js';
import { useCartState } from '@components/frontStore/cart/CartContext.js';
import { CartItems } from '@components/frontStore/cart/CartItems.js';
import { CartTotalSummary } from '@components/frontStore/cart/CartTotalSummary.js';
import { DefaultCartItemList } from '@components/frontStore/cart/DefaultCartItemList.js';
import { ShoppingCartEmpty } from '@components/frontStore/cart/ShoppingCartEmpty.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
const Title = ({ title })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "mb-7 text-center shopping-cart-header"
    }, /*#__PURE__*/ React.createElement("h1", {
        className: "shopping-cart-title mb-2"
    }, title), /*#__PURE__*/ React.createElement("a", {
        href: "/",
        className: "underline"
    }, _('Continue Shopping')));
};
export default function ShoppingCart({ checkoutUrl }) {
    const { data: cart } = useCartState();
    return /*#__PURE__*/ React.createElement("div", {
        className: "cart page-width"
    }, cart.items.length > 0 ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Title, {
        title: _('Shopping Cart')
    }), /*#__PURE__*/ React.createElement("div", {
        className: "grid gap-10 grid-cols-1 md:grid-cols-4"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 md:col-span-3"
    }, /*#__PURE__*/ React.createElement(CartItems, null, ({ items, showPriceIncludingTax, loading, onRemoveItem })=>/*#__PURE__*/ React.createElement(DefaultCartItemList, {
            items: items,
            showPriceIncludingTax: showPriceIncludingTax,
            loading: loading,
            onRemoveItem: onRemoveItem
        }))), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 md:col-span-1"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "shoppingCartBeforeSummary",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 gap-5 cart-summary"
    }, /*#__PURE__*/ React.createElement("h4", null, _('Order summary')), /*#__PURE__*/ React.createElement(CartTotalSummary, null)), /*#__PURE__*/ React.createElement(Area, {
        id: "shoppingCartBeforeCheckoutButton",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "shopping-cart-checkout-btn flex justify-between mt-5"
    }, /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>window.location.href = checkoutUrl,
        title: _('CHECKOUT'),
        variant: "default",
        size: 'lg',
        className: 'w-full'
    }, _('CHECKOUT'))), /*#__PURE__*/ React.createElement(Area, {
        id: "shoppingCartAfterSummary",
        noOuter: true
    })))) : /*#__PURE__*/ React.createElement(ShoppingCartEmpty, null));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    checkoutUrl: url(routeId: "checkout")
  }
`;
