import Area from '@components/common/Area.js';
import { useAppState } from '@components/common/context/app.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
const Total = ({ total, totalTaxAmount, priceIncludingTax })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary__row grand-total flex justify-between py-2"
    }, priceIncludingTax && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "font-bold"
    }, /*#__PURE__*/ React.createElement("span", null, _('Total'))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", {
        className: "italic font-normal"
    }, "(", _('Inclusive of tax ${totalTaxAmount}', {
        totalTaxAmount
    }), ")"))) || /*#__PURE__*/ React.createElement("span", {
        className: "self-center font-bold"
    }, _('Total')), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null), /*#__PURE__*/ React.createElement("span", null, total)));
};
const Tax = ({ showPriceIncludingTax, amount })=>{
    if (showPriceIncludingTax) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row flex justify-between py-2"
    }, /*#__PURE__*/ React.createElement("span", null, _('Tax')), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null), /*#__PURE__*/ React.createElement("span", null, amount)));
};
const Subtotal = ({ subTotal })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-7 py-2"
    }, /*#__PURE__*/ React.createElement("div", null, _('Sub total')), /*#__PURE__*/ React.createElement("span", null, subTotal));
};
const Discount = ({ discountAmount, coupon })=>{
    if (!coupon) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-7 py-2"
    }, /*#__PURE__*/ React.createElement("div", null, _('Discount(${coupon})', {
        coupon
    })), /*#__PURE__*/ React.createElement("span", null, "- ", discountAmount));
};
const Shipping = ({ method, cost })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row flex justify-between gap-7 py-2"
    }, method && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", null, _('Shipping (${method})', {
        method
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", {
        className: "block"
    }, cost))), !method && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", null, _('Shipping')), /*#__PURE__*/ React.createElement("span", {
        className: "text-gray-500 italic font-normal"
    }, _('No shipping is required for this order'))));
};
const OrderTotalSummary = ({ subTotal, discountAmount, coupon, shippingMethod, shippingCost, taxAmount, total })=>{
    const { config: { tax: { priceIncludingTax } } } = useAppState();
    return /*#__PURE__*/ React.createElement("div", {
        className: "order__total__summary font-semibold"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryBeforeSubTotal",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Subtotal, {
        subTotal: subTotal
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryAfterSubTotal",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryBeforeDiscount",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Discount, {
        discountAmount: discountAmount,
        coupon: coupon
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryAfterDiscount",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryBeforeShipping",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Shipping, {
        method: shippingMethod,
        cost: shippingCost
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryAfterShipping",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryBeforeTax",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Tax, {
        amount: taxAmount,
        showPriceIncludingTax: priceIncludingTax
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryAfterTax",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryBeforeTotal",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Total, {
        total: total,
        totalTaxAmount: taxAmount,
        priceIncludingTax: priceIncludingTax
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "orderSummaryAfterTotal",
        noOuter: true
    }));
};
export { OrderTotalSummary, Subtotal, Discount, Shipping, Tax, Total };
