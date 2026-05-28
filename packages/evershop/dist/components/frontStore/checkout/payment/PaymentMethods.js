import { Item, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import { Label } from '@components/common/ui/Label.js';
import { RadioGroup, RadioGroupItem } from '@components/common/ui/RadioGroup.js';
import { Skeleton } from '@components/common/ui/Skeleton.js';
import { useCheckout } from '@components/frontStore/checkout/CheckoutContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
// Skeleton component for loading state
function PaymentMethodSkeleton() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "payment-method-skeleton"
    }, [
        1,
        2,
        3,
        4
    ].map((index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "border border-border rounded-lg p-4 mb-3 animate-pulse"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-between"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-3"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "w-4 h-4"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-4 w-20"
        }), /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-3 w-40"
        }))), /*#__PURE__*/ React.createElement("div", {
            className: "text-right space-y-1"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-3 w-12"
        }), /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-4 w-16"
        }))))));
}
export function PaymentMethods({ methods, isLoading }) {
    const { form, registeredPaymentComponents } = useCheckout();
    const { formState, watch, setValue } = form;
    const selectedPaymentMethod = watch('paymentMethod');
    const getPaymentComponent = (methodCode)=>{
        return registeredPaymentComponents[methodCode] || null;
    };
    const renderComponent = (component, props)=>{
        return component ? /*#__PURE__*/ React.createElement(component, props) : null;
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "checkout-payment-methods mt-6"
    }, /*#__PURE__*/ React.createElement(Item, {
        className: "px-0 py-0"
    }, /*#__PURE__*/ React.createElement(ItemContent, {
        className: "gap-2"
    }, /*#__PURE__*/ React.createElement(ItemTitle, null, _('Pick a payment method')), /*#__PURE__*/ React.createElement(ItemDescription, null, isLoading ? /*#__PURE__*/ React.createElement(PaymentMethodSkeleton, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "payment-methods-list"
    }, methods?.length === 0 ? /*#__PURE__*/ React.createElement("div", {
        className: "text-muted-foreground text-center py-8"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, _('No payment methods available'))) : /*#__PURE__*/ React.createElement(RadioGroup, {
        value: selectedPaymentMethod ?? '',
        onValueChange: (value)=>{
            setValue('paymentMethod', value);
        }
    }, methods.map((method)=>{
        const isSelected = selectedPaymentMethod === method.code;
        const component = getPaymentComponent(method.code);
        return /*#__PURE__*/ React.createElement(Item, {
            key: method.code,
            variant: 'outline',
            className: isSelected ? 'border-primary' : ''
        }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, {
            className: "w-full"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-3 w-full"
        }, /*#__PURE__*/ React.createElement(RadioGroupItem, {
            id: `payment-method-${method.code}`,
            value: method.code
        }), /*#__PURE__*/ React.createElement(Label, {
            htmlFor: `payment-method-${method.code}`,
            className: "w-full"
        }, component?.nameRenderer ? renderComponent(component.nameRenderer, {
            isSelected
        }) : _(method.name)))), component?.formRenderer && isSelected && /*#__PURE__*/ React.createElement(ItemDescription, {
            className: "text-inherit overflow-visible"
        }, renderComponent(component.formRenderer, {
            isSelected
        }))));
    }))), formState.errors.paymentMethod && /*#__PURE__*/ React.createElement("div", {
        className: "text-destructive text-sm mt-2"
    }, formState.errors.paymentMethod?.message?.toString() || _('Please select a payment method')))))));
}
