import { Card, CardContent, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import { Label } from '@components/common/ui/Label.js';
import { RadioGroup, RadioGroupItem } from '@components/common/ui/RadioGroup.js';
import { useCheckout } from '@components/frontStore/checkout/CheckoutContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Package } from 'lucide-react';
import React from 'react';
// Skeleton component for loading state
function ShippingMethodSkeleton() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "shipping-method-skeleton"
    }, [
        1,
        2,
        3,
        4
    ].map((index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "border border-gray-200 rounded-lg p-4 mb-3 animate-pulse"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-between"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-3"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "w-4 h-4 bg-gray-200 rounded-full"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-20"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "h-3 bg-gray-200 rounded w-40"
        }))), /*#__PURE__*/ React.createElement("div", {
            className: "text-right space-y-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "h-3 bg-gray-200 rounded w-12"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-16"
        }))))));
}
export function ShippingMethods({ methods, shippingAddress, isLoading, onSelect }) {
    const { form } = useCheckout();
    const { formState, setValue, watch } = form;
    const [isProcessing, setIsProcessing] = React.useState(false);
    const currentValue = watch('shippingMethod');
    const handleMethodSelect = async (method)=>{
        if (!onSelect) {
            // If no onSelect function provided, allow normal behavior
            setValue('shippingMethod', method.code);
            return;
        }
        if (isProcessing || formState.disabled) {
            return;
        }
        try {
            setIsProcessing(true);
            const result = await Promise.resolve(onSelect(method));
            if (result) {
                // Only update the form value if onSelect returns true
                setValue('shippingMethod', method.code);
            }
        // If result is false, keep the current selection
        } catch (error) {
        // Keep the current selection on error
        } finally{
            setIsProcessing(false);
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "checkout-shipment",
        "aria-invalid": formState.errors.shippingMethod ? 'true' : 'false',
        tabIndex: -1
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React.createElement(Package, {
        className: "w-5 h-5"
    }), /*#__PURE__*/ React.createElement("span", null, _('Shipping Method'))))), /*#__PURE__*/ React.createElement(CardContent, null, isLoading ? /*#__PURE__*/ React.createElement(ShippingMethodSkeleton, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "shipping-methods-list"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...form.register('shippingMethod', {
            required: true
        }),
        defaultValue: currentValue
    }), methods?.length === 0 ? /*#__PURE__*/ React.createElement("div", {
        className: "text-left"
    }, !shippingAddress?.country || !shippingAddress?.province ? /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "text-sm"
    }, _('Available shipping methods will appear once you provide your address details'))) : /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, _('No shipping methods available')), /*#__PURE__*/ React.createElement("div", {
        className: "text-sm"
    }, _('No shipping options are available for your location')))) : /*#__PURE__*/ React.createElement(RadioGroup, {
        value: currentValue ?? '',
        onValueChange: (value)=>{
            const method = methods.find((m)=>m.code === value);
            if (method) {
                handleMethodSelect(method);
            } else {
                setValue('shippingMethod', value);
            }
        }
    }, methods.map((method)=>/*#__PURE__*/ React.createElement(Item, {
            key: method.code,
            className: `cursor-pointer transition-colors ${currentValue === method.code ? 'border-primary bg-primary-foreground/10 hover:border-primary' : 'border-border'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`
        }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement(RadioGroupItem, {
            id: `shipping-method-${method.code}`,
            value: method.code,
            onChange: ()=>{
                !isProcessing && handleMethodSelect(method);
            },
            disabled: isProcessing
        }), /*#__PURE__*/ React.createElement(Label, {
            htmlFor: `shipping-method-${method.code}`
        }, method.name))), method.description && /*#__PURE__*/ React.createElement(ItemDescription, null, method.description)), /*#__PURE__*/ React.createElement(ItemActions, null, method.cost ? /*#__PURE__*/ React.createElement(React.Fragment, null, method.cost.value > 0 ? /*#__PURE__*/ React.createElement("div", {
            className: "font-medium"
        }, method.cost.text) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-gray-500 line-through"
        }, method.cost.text), /*#__PURE__*/ React.createElement("div", {
            className: "font-medium text-primary"
        }, _('FREE')))) : /*#__PURE__*/ React.createElement("div", {
            className: "font-medium text-gray-900"
        }, _('Contact for pricing'))))))), formState.errors.shippingMethod && /*#__PURE__*/ React.createElement("div", {
        className: "text-destructive text-sm mt-2"
    }, formState.errors.shippingMethod?.message?.toString() || _('Please select a shipping method'))))));
}
