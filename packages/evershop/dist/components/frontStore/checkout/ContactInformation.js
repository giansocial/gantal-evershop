import Area from '@components/common/Area.js';
import { EmailField } from '@components/common/form/EmailField.js';
import { PasswordField } from '@components/common/form/PasswordField.js';
import { Button } from '@components/common/ui/Button.js';
import { Card, CardContent, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import { useCartState } from '@components/frontStore/cart/CartContext.js';
import { useCheckout, useCheckoutDispatch } from '@components/frontStore/checkout/CheckoutContext.js';
import { useCustomer, useCustomerDispatch } from '@components/frontStore/customer/CustomerContext.jsx';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { CircleUser } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const LoggedIn = ({ uuid, fullName, email })=>{
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { logout } = useCustomerDispatch();
    const { updateCheckoutData } = useCheckoutDispatch();
    useEffect(()=>{
        updateCheckoutData({
            customer: {
                id: uuid,
                email: email,
                fullName: fullName
            }
        });
    }, [
        fullName,
        email
    ]);
    const handleLogout = async ()=>{
        if (isLoggingOut) return;
        try {
            setIsLoggingOut(true);
            await logout();
            toast.success(_('Successfully logged out'));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Logout failed');
            toast.error(errorMessage);
        } finally{
            setIsLoggingOut(false);
        }
    };
    return /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("svg", {
        className: "w-4 h-4 text-primary",
        fill: "currentColor",
        viewBox: "0 0 20 20"
    }, /*#__PURE__*/ React.createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
        clipRule: "evenodd"
    })), /*#__PURE__*/ React.createElement("span", {
        className: "text-sm font-medium text-primary"
    }, _('Logged in as'), " ", fullName))), /*#__PURE__*/ React.createElement(ItemDescription, null, email)), /*#__PURE__*/ React.createElement(ItemActions, null, /*#__PURE__*/ React.createElement(Button, {
        onClick: handleLogout,
        disabled: isLoggingOut
    }, isLoggingOut ? _('Logging out...') : _('Logout'))));
};
const Guest = ({ email })=>{
    const [showLogin, setShowLogin] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const { login } = useCustomerDispatch();
    const { form } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    const contactEmail = form.watch('contact.email', email);
    const handleLoginClick = (e)=>{
        e.preventDefault();
        setShowLogin(true);
    };
    useEffect(()=>{
        updateCheckoutData({
            customer: {
                email: contactEmail
            }
        });
    }, [
        contactEmail
    ]);
    const handleLogin = async ()=>{
        if (isLogging) return;
        try {
            setIsLogging(true);
            const isValid = await form.trigger([
                'contact.email',
                'contact.password'
            ]);
            if (!isValid) {
                return;
            }
            const formData = form.getValues();
            const loginEmail = formData?.contact?.email;
            const password = formData?.contact?.password;
            await login({
                email: loginEmail,
                password: password
            }, window.location.href);
            toast.success(_('Successfully logged in'));
            setShowLogin(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Login failed');
            toast.error(errorMessage);
        } finally{
            setIsLogging(false);
        }
    };
    const handleCancelLogin = ()=>{
        setShowLogin(false);
        // Clear password field
        form.setValue('contact.password', '');
    };
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(EmailField, {
        defaultValue: email,
        name: "contact.email",
        label: _('Email'),
        required: true,
        validation: {
            required: _('Email is required')
        },
        placeholder: _('Enter your email')
    }), showLogin && /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, /*#__PURE__*/ React.createElement(PasswordField, {
        name: "contact.password",
        label: _('Password'),
        required: true,
        validation: {
            required: _('Password is required')
        },
        placeholder: _('Enter your password')
    }), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4 flex gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        onClick: handleLogin,
        disabled: isLogging,
        className: "disabled:opacity-50 disabled:cursor-not-allowed"
    }, isLogging ? _('Logging in...') : _('Log in')), /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline',
        onClick: handleCancelLogin
    }, _('Cancel')))), !showLogin && /*#__PURE__*/ React.createElement("p", {
        className: "mt-2"
    }, _('Already have an account?'), ' ', /*#__PURE__*/ React.createElement("button", {
        type: "button",
        onClick: handleLoginClick,
        className: "underline text-primary hover:cursor-pointer"
    }, _('Log in'))));
};
export function ContactInformation() {
    const { customer } = useCustomer();
    const { data: cart } = useCartState();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutContactInformationBefore"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "checkout-contact checkout-step"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React.createElement(CircleUser, {
        className: "w-5 h-5"
    }), /*#__PURE__*/ React.createElement("span", null, _('Contact Information'))))), /*#__PURE__*/ React.createElement(CardContent, null, customer ? /*#__PURE__*/ React.createElement(LoggedIn, {
        fullName: customer.fullName,
        email: customer.email,
        uuid: customer.uuid
    }) : /*#__PURE__*/ React.createElement(Guest, {
        email: cart.customerEmail || ''
    })))), /*#__PURE__*/ React.createElement(Area, {
        id: "checkoutContactInformationAfter"
    }));
}
