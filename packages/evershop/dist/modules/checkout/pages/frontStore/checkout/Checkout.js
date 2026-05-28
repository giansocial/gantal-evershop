import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { CartItems } from '@components/frontStore/cart/CartItems.js';
import { CartSummaryItemsList } from '@components/frontStore/cart/CartSummaryItems.js';
import { CartTotalSummary } from '@components/frontStore/cart/CartTotalSummary.js';
import { CheckoutButton } from '@components/frontStore/checkout/CheckoutButton.js';
import { CheckoutProvider } from '@components/frontStore/checkout/CheckoutContext.js';
import { ContactInformation } from '@components/frontStore/checkout/ContactInformation.js';
import { Payment } from '@components/frontStore/checkout/Payment.js';
import { Shipment } from '@components/frontStore/checkout/Shipment.js';
import React from 'react';
import './Checkout.scss';
import { useForm } from 'react-hook-form';
export default function CheckoutPage({ placeOrderApi, checkoutSuccessUrl }) {
    const [disabled, setDisabled] = React.useState(false);
    const form = useForm({
        disabled: disabled,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {}
    });
    return /*#__PURE__*/ React.createElement(CheckoutProvider, {
        form: form,
        enableForm: ()=>setDisabled(false),
        disableForm: ()=>setDisabled(true),
        allowGuestCheckout: true,
        placeOrderApi: placeOrderApi,
        checkoutSuccessUrl: checkoutSuccessUrl
    }, /*#__PURE__*/ React.createElement("div", {
        className: "page-width grid grid-cols-1 md:grid-cols-2 gap-7 pt-8 pb-8"
    }, /*#__PURE__*/ React.createElement(Form, {
        form: form,
        submitBtn: false
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutFormBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(ContactInformation, null), /*#__PURE__*/ React.createElement(Shipment, null), /*#__PURE__*/ React.createElement(Payment, null), /*#__PURE__*/ React.createElement(CheckoutButton, null)), /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutForm",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutFormAfter",
        noOuter: true
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(CartItems, null, ({ items, loading, showPriceIncludingTax })=>/*#__PURE__*/ React.createElement(CartSummaryItemsList, {
            items: items,
            loading: loading,
            showPriceIncludingTax: showPriceIncludingTax
        })), /*#__PURE__*/ React.createElement(CartTotalSummary, null))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    placeOrderApi: url(routeId: "createOrder")
    checkoutSuccessUrl: url(routeId: "checkoutSuccess")
  }
`;
