import { useCartState, useCartDispatch } from '@components/frontStore/cart/CartContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { produce } from 'immer';
import React, { createContext, useReducer, useContext, useCallback, useMemo, useRef } from 'react';
const initialState = {
    orderPlaced: false,
    orderId: undefined,
    loadingStates: {
        placingOrder: false
    },
    allowGuestCheckout: false,
    checkoutData: {},
    registeredPaymentComponents: {} // Initialize empty payment component registry
};
// Reducer with Immer for immutable updates
const checkoutReducer = (state, action)=>{
    return produce(state, (draft)=>{
        switch(action.type){
            case 'SET_PLACING_ORDER':
                draft.loadingStates.placingOrder = action.payload;
                break;
            case 'SET_ORDER_PLACED':
                draft.orderPlaced = true;
                draft.orderId = action.payload.orderId;
                draft.loadingStates.placingOrder = false;
                break;
            case 'SET_CHECKOUT_DATA':
                draft.checkoutData = action.payload;
                break;
            case 'UPDATE_CHECKOUT_DATA':
                draft.checkoutData = {
                    ...draft.checkoutData,
                    ...action.payload
                };
                break;
            case 'CLEAR_CHECKOUT_DATA':
                draft.checkoutData = {};
                break;
            case 'REGISTER_PAYMENT_COMPONENT':
                draft.registeredPaymentComponents[action.payload.code] = action.payload.component;
                break;
        }
    });
};
// Contexts
const CheckoutContext = /*#__PURE__*/ createContext(undefined);
const CheckoutDispatchContext = /*#__PURE__*/ createContext(undefined);
// Retry utility (similar to cart context)
const retry = async (fn, retries = 3, delay = 1000)=>{
    try {
        return await fn();
    } catch (error) {
        if (retries > 0) {
            await new Promise((resolve)=>setTimeout(resolve, delay));
            return retry(fn, retries - 1, delay * 2);
        }
        throw error;
    }
};
export function CheckoutProvider({ children, placeOrderApi, checkoutSuccessUrl, allowGuestCheckout = false, form, enableForm, disableForm }) {
    const [state, dispatch] = useReducer(checkoutReducer, {
        ...initialState,
        allowGuestCheckout
    });
    // Ref so checkout() always reads the latest checkoutData without needing a re-render.
    const checkoutDataRef = useRef(state.checkoutData);
    // Get cart state for computing requiresShipment and cartId
    const cartState = useCartState();
    const cartDispatch = useCartDispatch();
    const cartId = cartState?.data?.uuid;
    // Get payment methods - return the list from cart context
    const getPaymentMethods = useCallback(()=>{
        return (cartState.data?.availablePaymentMethods || []).map((method)=>({
                code: method.code,
                name: method.name
            }));
    }, [
        cartState.data?.availablePaymentMethods
    ]);
    // Get shipping methods - if params provided, fetch dynamically; otherwise return from cart context
    const getShippingMethods = useCallback(async (params)=>{
        if (params) {
            // Fetch shipping methods dynamically based on address
            try {
                await cartDispatch.fetchAvailableShippingMethods(params);
                // Get updated methods from cart state
                const methods = cartState.data?.availableShippingMethods || [];
                return methods.map((method)=>({
                        code: method.code,
                        name: method.name,
                        cost: method.cost || {
                            value: 0,
                            text: 'Free'
                        }
                    }));
            } catch (error) {
                // Return empty array on error, let the error be handled by cart context
                return [];
            }
        } else {
            // Return the initial shipping methods from cart context
            return (cartState.data?.availableShippingMethods || []).map((method)=>({
                    code: method.code,
                    name: method.name,
                    cost: method.cost || {
                        value: 0,
                        text: 'Free'
                    }
                }));
        }
    }, [
        cartDispatch,
        cartState.data?.availableShippingMethods
    ]);
    // Compute requiresShipment based on cart items
    const requiresShipment = useMemo(()=>{
        // Just return true for now as all products require shipping. We will get back to this when virtual/downloadable products are supported.
        return true;
    }, [
        cartState?.data?.items
    ]);
    // Place order with loading state and error handling (original API - expects data already in cart)
    const placeOrder = useCallback(async ()=>{
        if (!cartId) {
            throw new Error('Cart ID is required to place order');
        }
        dispatch({
            type: 'SET_PLACING_ORDER',
            payload: true
        });
        let response;
        try {
            response = await retry(()=>fetch(placeOrderApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart_id: cartId
                    })
                }));
        } catch (error) {
            dispatch({
                type: 'SET_PLACING_ORDER',
                payload: false
            });
            throw error;
        }
        const json = await response.json();
        if (response.ok) {
            dispatch({
                type: 'SET_PLACING_ORDER',
                payload: false
            });
            throw new Error(json.error?.message || _('Failed to place order'));
        }
        dispatch({
            type: 'SET_ORDER_PLACED',
            payload: {
                orderId: json.data.uuid
            }
        });
        return json.data;
    }, [
        placeOrderApi,
        cartId
    ]);
    // New checkout method with all data submission (cart.checkoutApi)
    const checkout = useCallback(async ()=>{
        if (!cartId) {
            throw new Error(_('Cart ID is required to checkout'));
        }
        // Trigger form validation
        const isValid = await form.trigger(undefined, {
            shouldFocus: true
        });
        if (!isValid) {
            return;
        }
        disableForm();
        dispatch({
            type: 'SET_PLACING_ORDER',
            payload: true
        });
        let response;
        try {
            response = await retry(()=>fetch(cartState.data?.checkoutApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart_id: cartId,
                        ...checkoutDataRef.current
                    })
                }));
        } catch (error) {
            enableForm();
            dispatch({
                type: 'SET_PLACING_ORDER',
                payload: false
            });
            throw error;
        }
        const json = await response.json();
        if (!response.ok) {
            enableForm();
            dispatch({
                type: 'SET_PLACING_ORDER',
                payload: false
            });
            throw new Error(json.error?.message || _('Failed to checkout'));
        }
        dispatch({
            type: 'SET_ORDER_PLACED',
            payload: {
                orderId: json.data.uuid
            }
        });
        return json.data;
    }, [
        cartState.data?.checkoutApi,
        cartId,
        form,
        enableForm,
        disableForm
    ]);
    // Checkout data management
    const setCheckoutData = useCallback((data)=>{
        checkoutDataRef.current = data;
        dispatch({
            type: 'SET_CHECKOUT_DATA',
            payload: data
        });
    }, []);
    const updateCheckoutData = useCallback((data)=>{
        checkoutDataRef.current = {
            ...checkoutDataRef.current,
            ...data
        };
        dispatch({
            type: 'UPDATE_CHECKOUT_DATA',
            payload: data
        });
    }, []);
    const clearCheckoutData = useCallback(()=>{
        checkoutDataRef.current = {};
        dispatch({
            type: 'CLEAR_CHECKOUT_DATA'
        });
    }, []);
    // Payment method component registry
    const registerPaymentComponent = useCallback((code, component)=>{
        dispatch({
            type: 'REGISTER_PAYMENT_COMPONENT',
            payload: {
                code,
                component
            }
        });
    }, []);
    const contextValue = useMemo(()=>({
            ...state,
            cartId,
            checkoutSuccessUrl,
            requiresShipment,
            form,
            loading: state.loadingStates.placingOrder
        }), [
        state,
        cartId,
        checkoutSuccessUrl,
        requiresShipment,
        form
    ]);
    const dispatchMethods = useMemo(()=>({
            placeOrder,
            checkout,
            getPaymentMethods,
            getShippingMethods,
            setCheckoutData,
            updateCheckoutData,
            clearCheckoutData,
            registerPaymentComponent,
            enableForm,
            disableForm
        }), [
        placeOrder,
        checkout,
        getPaymentMethods,
        getShippingMethods,
        setCheckoutData,
        updateCheckoutData,
        clearCheckoutData,
        registerPaymentComponent,
        enableForm,
        disableForm
    ]);
    return /*#__PURE__*/ React.createElement(CheckoutDispatchContext.Provider, {
        value: dispatchMethods
    }, /*#__PURE__*/ React.createElement(CheckoutContext.Provider, {
        value: contextValue
    }, children));
}
export const useCheckout = ()=>{
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};
export const useCheckoutDispatch = ()=>{
    const context = useContext(CheckoutDispatchContext);
    if (context === undefined) {
        throw new Error('useCheckoutDispatch must be used within a CheckoutProvider');
    }
    return context;
};
