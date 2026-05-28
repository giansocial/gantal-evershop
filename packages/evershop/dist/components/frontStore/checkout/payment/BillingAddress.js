import { Button } from '@components/common/ui/Button.js';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import { Label } from '@components/common/ui/Label.js';
import { RadioGroup, RadioGroupItem } from '@components/common/ui/RadioGroup.js';
import { useCheckout, useCheckoutDispatch } from '@components/frontStore/checkout/CheckoutContext.js';
import CustomerAddressForm from '@components/frontStore/customer/address/addressForm/Index.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
export function BillingAddress({ billingAddress, addBillingAddress, addingBillingAddress, noShippingRequired }) {
    const { form, checkoutData } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    const { setValue, getValues, trigger, formState: { disabled } } = form;
    const shippingAddress = useWatch({
        control: form.control,
        name: 'shippingAddress'
    });
    const billingAddressField = useWatch({
        control: form.control,
        name: 'billingAddress'
    });
    const [useSameAddress, setUseSameAddress] = useState(!noShippingRequired);
    useEffect(()=>{
        if (useSameAddress && shippingAddress) {
            updateCheckoutData({
                billingAddress: shippingAddress
            });
        } else if (!useSameAddress) {
            setValue('billingAddress', billingAddress);
        }
    }, [
        useSameAddress,
        checkoutData.shippingAddress
    ]);
    useEffect(()=>{
        if (!useSameAddress) {
            const billingAddress = {
                ...getValues('billingAddress')
            };
            updateCheckoutData({
                billingAddress
            });
        }
    }, [
        billingAddressField
    ]);
    const handleAddressOptionChange = (value)=>{
        const isSameAddress = value === 'same';
        if (isSameAddress === useSameAddress || disabled) {
            return;
        }
        setUseSameAddress(isSameAddress);
        if (!isSameAddress) {
            updateCheckoutData({
                billingAddress: undefined
            });
        } else if (checkoutData.shippingAddress) {
            updateCheckoutData({
                billingAddress: checkoutData.shippingAddress
            });
        }
    };
    const handleGoToPayment = async ()=>{
        const isValid = await trigger('billingAddress');
        if (isValid && addBillingAddress) {
            const billingAddressData = getValues('billingAddress');
            await addBillingAddress(billingAddressData);
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "billing-address-section"
    }, /*#__PURE__*/ React.createElement(Item, {
        className: "py-0 px-0"
    }, /*#__PURE__*/ React.createElement(ItemContent, {
        className: "gap-2"
    }, /*#__PURE__*/ React.createElement(ItemTitle, null, _('Billing Address')), /*#__PURE__*/ React.createElement(RadioGroup, {
        value: useSameAddress ? 'same' : 'different',
        onValueChange: (value)=>{
            handleAddressOptionChange(value);
        }
    }, !noShippingRequired ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, /*#__PURE__*/ React.createElement(RadioGroupItem, {
        id: "same-address",
        value: "same"
    }), /*#__PURE__*/ React.createElement(Label, {
        htmlFor: "same-address"
    }, _('Same as shipping address')))))), /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, /*#__PURE__*/ React.createElement(RadioGroupItem, {
        id: "different-address",
        value: "different"
    }), /*#__PURE__*/ React.createElement(Label, {
        htmlFor: "different-address"
    }, _('Use a different billing address')))), !useSameAddress && /*#__PURE__*/ React.createElement(ItemDescription, {
        className: "text-inherit mt-3 overflow-visible"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-inherit bg-white"
    }, /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        areaId: "checkoutBillingAddressForm",
        fieldNamePrefix: "billingAddress",
        address: undefined
    }), noShippingRequired && /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>handleGoToPayment(),
        variant: "default",
        isLoading: addingBillingAddress
    }, _('Continue to payment'))))))) : /*#__PURE__*/ React.createElement(ItemDescription, {
        className: "text-inherit mt-3 overflow-visible"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-inherit bg-white"
    }, /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        areaId: "checkoutBillingAddressForm",
        fieldNamePrefix: "billingAddress",
        address: undefined
    }), noShippingRequired && /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>handleGoToPayment(),
        variant: "default",
        isLoading: addingBillingAddress,
        className: "mt-4"
    }, _('Continue to payment'))))))));
}
