import { EmailField } from '@components/common/form/EmailField.js';
import { Form } from '@components/common/form/Form.js';
import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Mail } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
export const ResetPasswordForm = ({ title, subtitle, action, className, onSuccess })=>{
    const [error, setError] = React.useState(null);
    const form = useForm();
    const { formState: { isSubmitting: loading } } = form;
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-center items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: `reset__password__form ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "reset__password__form__inner"
    }, title && /*#__PURE__*/ React.createElement("h1", {
        className: "reset__password__form__title text-2xl text-center mb-6"
    }, title), subtitle && /*#__PURE__*/ React.createElement("p", {
        className: "reset__password__form__subtitle text-center mb-6"
    }, subtitle), error && /*#__PURE__*/ React.createElement("div", {
        className: "text-destructive mb-2"
    }, error), /*#__PURE__*/ React.createElement(Form, {
        id: "resetPasswordForm",
        form: form,
        action: action,
        method: "POST",
        onSuccess: (response)=>{
            if (!response.error) {
                onSuccess();
            } else {
                setError(response.error.message);
            }
        },
        submitBtn: false
    }, /*#__PURE__*/ React.createElement(EmailField, {
        prefixIcon: /*#__PURE__*/ React.createElement(Mail, {
            className: "h-5 w-5"
        }),
        name: "email",
        label: _('Email'),
        placeholder: _('Email'),
        required: true,
        validation: {
            required: _('Email is required')
        }
    }), /*#__PURE__*/ React.createElement("div", {
        className: "reset__password__form__submit__button flex border-t border-divider mt-2 pt-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        type: "submit",
        variant: 'default',
        onClick: ()=>{
            document.getElementById('resetPasswordForm').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: loading
    }, _('Reset Password')))))));
};
