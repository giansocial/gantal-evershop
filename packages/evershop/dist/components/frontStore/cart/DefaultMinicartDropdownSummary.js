import Area from '@components/common/Area.js';
import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function DefaultMiniCartDropdownSummary({ total, cartUrl, checkoutUrl, totalQty }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "minicart__summary flex justify-between items-center mb-3"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "font-medium text-gray-900"
    }, _('Subtotal'), ":"), /*#__PURE__*/ React.createElement("span", {
        className: "font-semibold text-lg text-gray-900"
    }, total || '—')), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryViewCartButtonBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline',
        size: 'lg',
        onClick: ()=>{
            if (cartUrl) {
                window.location.href = cartUrl;
            }
        },
        className: "minicart__viewcart__button w-full "
    }, _('View Cart (${totalQty})', {
        totalQty: totalQty.toString()
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryViewCartButtonAfter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryCheckoutButtonBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Button, {
        variant: 'default',
        size: 'lg',
        onClick: ()=>{
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        },
        className: "minicart__checkout__button w-full "
    }, _('Checkout')), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryCheckoutButtonAfter",
        noOuter: true
    }));
}
