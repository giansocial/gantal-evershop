import Area from '@components/common/Area.js';
import { Form, useFormContext } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { PasswordField } from '@components/common/form/PasswordField.js';
import { Button } from '@components/common/ui/Button.js';
import { useCustomerDispatch } from '@components/frontStore/customer/CustomerContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { cn } from '@evershop/evershop/lib/util/cn';
import { LockKeyhole, Mail } from 'lucide-react';
import React from 'react';
const SubmitButton = ({ formId })=>{
    const { formState: { isSubmitting } } = useFormContext();
    return /*#__PURE__*/ React.createElement("div", {
        className: "form-submit-button flex border-t border-border mt-4 pt-4 justify-between"
    }, /*#__PURE__*/ React.createElement(Button, {
        className: 'w-full',
        size: 'lg',
        onClick: ()=>{
            document.getElementById(formId).dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: isSubmitting
    }, _(isSubmitting ? 'Signing In...' : 'Sign In')));
};
export const CustomerLoginForm = ({ title, subtitle, redirectUrl, onError, className })=>{
    const { login } = useCustomerDispatch();
    return /*#__PURE__*/ React.createElement("div", {
        className: cn(`login__form`, className)
    }, /*#__PURE__*/ React.createElement("div", {
        className: "login__form__inner w-full"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "customerLoginFormTitleBefore",
        noOuter: true
    }), title && /*#__PURE__*/ React.createElement("h1", {
        className: "login__form__title text-2xl text-center mb-6"
    }, _(title)), subtitle && /*#__PURE__*/ React.createElement("p", {
        className: "login__form__subtitle text-center mb-6"
    }, _(subtitle)), /*#__PURE__*/ React.createElement(Area, {
        id: "customerLoginFormTitleAfter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "customerLoginFormBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Form, {
        id: "loginForm",
        method: "POST",
        onSubmit: async (data)=>{
            try {
                await login({
                    email: data.email,
                    password: data.password,
                    ...data
                }, redirectUrl);
            } catch (error) {
                onError?.(error);
            }
        },
        onError: onError,
        submitBtn: false
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "customerLoginForm",
        className: "space-y-3",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(InputField, {
                        prefixIcon: /*#__PURE__*/ React.createElement(Mail, {
                            className: "h-5 w-5"
                        }),
                        label: _('Email'),
                        name: "email",
                        placeholder: _('Email'),
                        required: true,
                        validation: {
                            required: _('Email is required')
                        }
                    })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(PasswordField, {
                        prefixIcon: /*#__PURE__*/ React.createElement(LockKeyhole, {
                            className: "h-5 w-5"
                        }),
                        label: _('Password'),
                        name: "password",
                        placeholder: _('Password'),
                        required: true,
                        validation: {
                            required: _('Password is required')
                        },
                        showToggle: true
                    })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(SubmitButton, {
                        formId: "loginForm"
                    })
                },
                sortOrder: 30
            }
        ]
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "customerLoginFormAfter",
        noOuter: true
    })));
};
