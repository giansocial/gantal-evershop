import { useAppDispatch } from '@components/common/context/app.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { produce } from 'immer';
import React, { createContext, useReducer, useContext, useCallback, useMemo, useEffect } from 'react';
const initialState = {
    customer: undefined,
    isLoading: false
};
const customerReducer = (state, action)=>{
    return produce(state, (draft)=>{
        switch(action.type){
            case 'SET_LOADING':
                draft.isLoading = action.payload;
                break;
            case 'SET_CUSTOMER':
                draft.customer = action.payload;
                draft.isLoading = false;
                break;
            case 'LOGOUT':
                draft.customer = undefined;
                draft.isLoading = false;
                break;
        }
    });
};
const CustomerContext = /*#__PURE__*/ createContext(undefined);
const CustomerDispatchContext = /*#__PURE__*/ createContext(undefined);
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
export function CustomerProvider({ children, loginAPI, registerAPI, logoutAPI, initialCustomer }) {
    const [state, dispatch] = useReducer(customerReducer, {
        ...initialState,
        customer: initialCustomer
    });
    const appDispatch = useAppDispatch();
    // Effect to update customer when initialCustomer prop changes
    useEffect(()=>{
        // Compare by JSON string to handle object changes properly
        const currentCustomerStr = JSON.stringify(state.customer);
        const initialCustomerStr = JSON.stringify(initialCustomer);
        if (initialCustomerStr !== currentCustomerStr) {
            dispatch({
                type: 'SET_CUSTOMER',
                payload: initialCustomer
            });
        }
    }, [
        initialCustomer
    ]);
    // Helper function to get current URL with isAjax=true
    const getCurrentAjaxUrl = useCallback(()=>{
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('ajax', 'true');
        return currentUrl.toString();
    }, []);
    // Login function
    const login = useCallback(async (data, redirectUrl)=>{
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        try {
            const response = await retry(()=>fetch(loginAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error?.message || _('Login failed'));
            }
            // Trigger page data refresh which will update customer via useEffect
            await appDispatch.fetchPageData(getCurrentAjaxUrl());
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
            return true;
        } catch (error) {
            dispatch({
                type: 'SET_LOADING',
                payload: false
            });
            throw error;
        }
    }, [
        loginAPI,
        appDispatch,
        getCurrentAjaxUrl
    ]);
    const register = useCallback(async (data, loginIfSuccess, redirectUrl)=>{
        if (state.customer) {
            throw new Error(_('You are already logged in'));
        }
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        try {
            const response = await retry(()=>fetch(registerAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error?.message || _('Registration failed'));
            }
            // Trigger page data refresh which will update customer via useEffect
            await appDispatch.fetchPageData(getCurrentAjaxUrl());
            if (loginIfSuccess) {
                // Auto login after successful registration
                await login({
                    email: data.email,
                    password: data.password
                }, redirectUrl);
            }
            return true;
        } catch (error) {
            dispatch({
                type: 'SET_LOADING',
                payload: false
            });
            throw error;
        }
    }, [
        registerAPI,
        appDispatch,
        getCurrentAjaxUrl,
        login
    ]);
    // Logout function
    const logout = useCallback(async ()=>{
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        try {
            await retry(()=>fetch(logoutAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }));
            // After successful logout, clear customer data locally
            dispatch({
                type: 'LOGOUT'
            });
        } catch (error) {
            // Even if logout API fails, clear local customer data
            dispatch({
                type: 'LOGOUT'
            });
            throw error;
        } finally{
            dispatch({
                type: 'SET_LOADING',
                payload: false
            });
        }
    }, [
        logoutAPI
    ]);
    // Set customer directly (for external updates)
    const setCustomer = useCallback((customer)=>{
        dispatch({
            type: 'SET_CUSTOMER',
            payload: customer
        });
    }, []);
    // Add address function
    const addAddress = useCallback(async (addressData)=>{
        if (!state.customer?.addAddressApi) {
            throw new Error(_('Add address API not available'));
        }
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        const response = await retry(()=>fetch(state.customer.addAddressApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.error?.message || _('Failed to add address'));
        }
        if (json.error) {
            throw new Error(json.error.message || _('Failed to add address'));
        }
        // Sync with server to get fresh customer data including the new address
        await appDispatch.fetchPageData(getCurrentAjaxUrl());
        // Return the address from the API response for immediate use
        const newAddress = json.data;
        if (!newAddress) {
            throw new Error(_('No address data received'));
        }
        return newAddress;
    }, [
        state.customer,
        appDispatch,
        getCurrentAjaxUrl
    ]);
    // Update address function
    const updateAddress = useCallback(async (addressId, addressData)=>{
        const address = state.customer?.addresses?.find((addr)=>addr.addressId === addressId);
        if (!address?.updateApi) {
            throw new Error(_('Update address API not available'));
        }
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        const response = await retry(()=>fetch(address.updateApi, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.error?.message || _('Failed to update address'));
        }
        if (json.error) {
            throw new Error(json.error.message || _('Failed to update address'));
        }
        // Sync with server to get fresh customer data including the updated address
        await appDispatch.fetchPageData(getCurrentAjaxUrl());
        // Return the address from the API response for immediate use
        const updatedAddress = json.data;
        if (!updatedAddress) {
            throw new Error(_('No address data received'));
        }
        return updatedAddress;
    }, [
        state.customer,
        appDispatch,
        getCurrentAjaxUrl
    ]);
    // Delete address function
    const deleteAddress = useCallback(async (addressId)=>{
        const address = state.customer?.addresses?.find((addr)=>addr.addressId === addressId);
        if (!address?.deleteApi) {
            throw new Error(_('Delete address API not available'));
        }
        dispatch({
            type: 'SET_LOADING',
            payload: true
        });
        const response = await retry(()=>fetch(address.deleteApi, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.error?.message || _('Failed to delete address'));
        }
        if (json.error) {
            throw new Error(json.error.message || _('Failed to delete address'));
        }
        await appDispatch.fetchPageData(getCurrentAjaxUrl());
    }, [
        state.customer,
        appDispatch,
        getCurrentAjaxUrl
    ]);
    const contextValue = useMemo(()=>({
            ...state
        }), [
        state
    ]);
    const dispatchMethods = useMemo(()=>({
            login,
            register,
            logout,
            setCustomer,
            addAddress,
            updateAddress,
            deleteAddress
        }), [
        login,
        logout,
        setCustomer,
        addAddress,
        updateAddress,
        deleteAddress
    ]);
    return /*#__PURE__*/ React.createElement(CustomerDispatchContext.Provider, {
        value: dispatchMethods
    }, /*#__PURE__*/ React.createElement(CustomerContext.Provider, {
        value: contextValue
    }, children));
}
export const useCustomer = ()=>{
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
};
export const useCustomerDispatch = ()=>{
    const context = useContext(CustomerDispatchContext);
    if (context === undefined) {
        throw new Error('useCustomerDispatch must be used within a CustomerProvider');
    }
    return context;
};
