import Area from '@components/common/Area.js';
import { Card, CardContent, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { useCartDispatch, useCartState } from '@components/frontStore/cart/CartContext.js';
import { useCheckout, useCheckoutDispatch } from '@components/frontStore/checkout/CheckoutContext.js';
import { ShippingMethods } from '@components/frontStore/checkout/shipment/ShippingMethods.js';
import CustomerAddressForm from '@components/frontStore/customer/address/addressForm/Index.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { MapPin } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
export function Shipment() {
    const { data: { shippingAddress, noShippingRequired, availableShippingMethods, shippingMethod: selectedShippingMethod }, loadingStates: { fetchingShippingMethods } } = useCartState();
    // Early return if no shipping is required
    if (noShippingRequired) {
        return null;
    }
    const { addShippingAddress, addShippingMethod, fetchAvailableShippingMethods } = useCartDispatch();
    const { form } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    // Use useWatch for better performance and cleaner code
    const watchedShippingAddress = useWatch({
        control: form.control,
        name: 'shippingAddress'
    });
    const dirtyFields = form.formState.dirtyFields;
    const debounceTimeoutRef = useRef(null);
    const lastFetchParamsRef = useRef(// Initialize with current shipping address if available
    shippingAddress ? {
        country: shippingAddress.country?.code,
        province: shippingAddress.province?.code,
        postcode: shippingAddress.postcode || undefined
    } : null);
    useEffect(()=>{
        const fetchShippingMethods = async ()=>{
            try {
                const country = form.getValues('shippingAddress.country');
                const province = form.getValues('shippingAddress.province');
                const postcode = form.getValues('shippingAddress.postcode');
                if (!country) {
                    return;
                }
                // Check if parameters have actually changed
                const currentParams = {
                    country,
                    province,
                    postcode
                };
                const lastParams = lastFetchParamsRef.current;
                if (lastParams && lastParams.country === country && lastParams.province === province && lastParams.postcode === postcode) {
                    // Parameters haven't changed, skip API call
                    return;
                }
                // Cache the current parameters
                lastFetchParamsRef.current = currentParams;
                await fetchAvailableShippingMethods({
                    country,
                    province,
                    postcode
                });
            } catch (error) {
                toast.error(error instanceof Error ? error.message : _('Failed to update shipment'));
            }
        };
        if (watchedShippingAddress && dirtyFields.shippingAddress) {
            // Clear existing timeout
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            // Set new timeout
            debounceTimeoutRef.current = setTimeout(()=>{
                fetchShippingMethods();
            }, 800);
        }
        // Cleanup function
        return ()=>{
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [
        watchedShippingAddress,
        dirtyFields.shippingAddress
    ]); // Clean dependency array
    const updateShipment = async (method)=>{
        try {
            const validate = await form.trigger('shippingAddress');
            if (!validate) {
                return false;
            }
            const shippingAddress = form.getValues('shippingAddress');
            await addShippingAddress(shippingAddress);
            await addShippingMethod(method.code, method.name);
            updateCheckoutData({
                shippingAddress,
                shippingMethod: method.code
            });
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : _('Failed to update shipment'));
            return false;
        }
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutShipmentBefore"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "checkout__shipment space-y-6 mt-6"
    }, /*#__PURE__*/ React.createElement(Card, {
        className: "transition-all overflow-hidden duration-200"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React.createElement(MapPin, {
        className: "w-5 h-5"
    }), /*#__PURE__*/ React.createElement("span", null, _('Shipping Address'))))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        areaId: "checkoutShippingAddressForm",
        fieldNamePrefix: "shippingAddress",
        address: shippingAddress
    }))), /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutShippingMethodsBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(ShippingMethods, {
        methods: availableShippingMethods?.map((method)=>({
                ...method,
                isSelected: method.code === selectedShippingMethod
            })),
        shippingAddress: shippingAddress,
        onSelect: updateShipment,
        isLoading: fetchingShippingMethods
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutShippingMethodsAfter",
        noOuter: true
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutShipmentAfter"
    }));
}
