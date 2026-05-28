import Area from '@components/common/Area.js';
import { useAppState } from '@components/common/context/app.js';
import { Skeleton } from '@components/common/ui/Skeleton.js';
import { useCartState } from '@components/frontStore/cart/CartContext.js';
import { Coupon } from '@components/frontStore/Coupon.js';
import { CouponForm } from '@components/frontStore/CouponForm.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { CircleX } from 'lucide-react';
import React from 'react';
const SkeletonValue = ({ children, loading = false, className = '' })=>{
    if (!loading) {
        return /*#__PURE__*/ React.createElement(React.Fragment, null, children);
    }
    return /*#__PURE__*/ React.createElement("span", {
        className: `relative ${className}`
    }, /*#__PURE__*/ React.createElement("span", {
        className: "opacity-0"
    }, children), /*#__PURE__*/ React.createElement(Skeleton, {
        className: "absolute top-0 left-0 w-full h-full"
    }));
};
const Total = ({ total, totalTaxAmount, priceIncludingTax, loading = false })=>{
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
    }, _('Total')), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null), /*#__PURE__*/ React.createElement(SkeletonValue, {
        loading: loading,
        className: "grand-total-value"
    }, total)));
};
const Tax = ({ showPriceIncludingTax, amount, loading = false })=>{
    if (showPriceIncludingTax) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row flex justify-between py-2"
    }, /*#__PURE__*/ React.createElement("span", null, _('Tax')), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null), /*#__PURE__*/ React.createElement(SkeletonValue, {
        loading: loading,
        className: "text-right"
    }, amount)));
};
const Subtotal = ({ subTotal, loading = false })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-7 py-2"
    }, /*#__PURE__*/ React.createElement("div", null, _('Sub total')), /*#__PURE__*/ React.createElement(SkeletonValue, {
        loading: loading,
        className: "text-right"
    }, subTotal));
};
const Discount = ({ discountAmount, coupon, loading = false })=>{
    if (!coupon) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "gap-7 py-2"
        }, /*#__PURE__*/ React.createElement(CouponForm, null));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-7 py-2"
    }, /*#__PURE__*/ React.createElement(Coupon, null, (state, actions)=>/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-start items-center gap-2"
        }, /*#__PURE__*/ React.createElement(SkeletonValue, {
            loading: loading,
            className: "text-right"
        }, /*#__PURE__*/ React.createElement("span", null, _('Discount(${coupon})', {
            coupon
        }))), !state.isLoading && /*#__PURE__*/ React.createElement("a", {
            href: "#",
            className: "text-destructive",
            onClick: async (e)=>{
                e.preventDefault();
                await actions.removeCoupon();
            }
        }, /*#__PURE__*/ React.createElement(CircleX, {
            className: "w-3.5 h-3.5"
        }))), /*#__PURE__*/ React.createElement(SkeletonValue, {
            loading: loading,
            className: "text-right"
        }, discountAmount))));
};
const Shipping = ({ method, cost, noShippingRequired, loading = false })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row flex justify-between gap-7 py-2"
    }, noShippingRequired && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", null, _('Shipping')), /*#__PURE__*/ React.createElement("span", {
        className: "text-gray-500 italic font-normal"
    }, _('No shipping required'))), method && !noShippingRequired && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", null, _('Shipping (${method})', {
        method
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SkeletonValue, {
        loading: loading
    }, cost))), !method && !noShippingRequired && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", null, _('Shipping')), /*#__PURE__*/ React.createElement("span", {
        className: "text-gray-500 italic font-normal"
    }, _('Select shipping method'))));
};
const DefaultCartSummary = ({ loading, showPriceIncludingTax, noShippingRequired, subTotal, discountAmount, coupon, shippingMethod, shippingCost, taxAmount, total })=>/*#__PURE__*/ React.createElement("div", {
        className: "cart__total__summary font-semibold"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryBeforeSubTotal",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Subtotal, {
        subTotal: subTotal,
        loading: loading
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryAfterSubTotal",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryBeforeDiscount",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Discount, {
        discountAmount: discountAmount,
        coupon: coupon,
        loading: loading
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryAfterDiscount",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryBeforeShipping",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Shipping, {
        method: shippingMethod,
        cost: shippingCost,
        loading: loading,
        noShippingRequired: noShippingRequired
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryAfterShipping",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryBeforeTax",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Tax, {
        amount: taxAmount,
        showPriceIncludingTax: showPriceIncludingTax,
        loading: loading
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryAfterTax",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryBeforeTotal",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Total, {
        total: total,
        totalTaxAmount: taxAmount,
        priceIncludingTax: showPriceIncludingTax,
        loading: loading
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartSummaryAfterTotal",
        noOuter: true
    }));
function CartTotalSummary({ children }) {
    const { data: cart, loadingStates } = useCartState();
    const { config: { tax: { priceIncludingTax } } } = useAppState();
    const subTotal = priceIncludingTax ? cart?.subTotalInclTax?.text || '' : cart?.subTotal?.text || '';
    const discountAmount = cart?.discountAmount?.text || '';
    const coupon = cart?.coupon;
    const shippingMethod = cart?.shippingMethodName;
    const shippingCost = priceIncludingTax ? cart?.shippingFeeInclTax?.text || '' : cart?.shippingFeeExclTax?.text || '';
    const taxAmount = cart?.totalTaxAmount?.text || '';
    const total = cart?.grandTotal?.text || '';
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 gap-3"
    }, children ? children({
        loading: Object.values(loadingStates).some((state)=>state === true || typeof state === 'string' && state !== null),
        showPriceIncludingTax: priceIncludingTax,
        noShippingRequired: cart?.noShippingRequired || false,
        subTotal,
        discountAmount,
        coupon,
        shippingMethod,
        shippingCost,
        taxAmount,
        total
    }) : /*#__PURE__*/ React.createElement(DefaultCartSummary, {
        loading: Object.values(loadingStates).some((state)=>state === true || typeof state === 'string' && state !== null),
        showPriceIncludingTax: priceIncludingTax,
        noShippingRequired: cart?.noShippingRequired || false,
        subTotal: subTotal,
        discountAmount: discountAmount,
        coupon: coupon,
        shippingMethod: shippingMethod,
        shippingCost: shippingCost,
        taxAmount: taxAmount,
        total: total
    }));
}
export { CartTotalSummary, DefaultCartSummary, Subtotal, Discount, Shipping, Tax, Total };
