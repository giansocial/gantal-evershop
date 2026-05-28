import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { PasswordField } from '@components/common/form/PasswordField.js';
import { Button } from '@components/common/ui/Button.js';
import { ResetPasswordForm } from '@components/frontStore/customer/ResetPasswordForm.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';
function Success({ children }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-center items-center h-full"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "reset__password__success flex justify-center items-center pt-10 md:pt-36"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "reset__password__success__inner max-w-md px-4"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-center text-success"
    }, children))));
}
const UpdateForm = ({ token, action, loginUrl })=>{
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(null);
    const form = useForm();
    return success ? /*#__PURE__*/ React.createElement(Success, null, /*#__PURE__*/ React.createElement("div", null, _('Your password has been updated successfully.')), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: _('Go to Login'),
        type: "button",
        onClick: ()=>{
            window.location.href = loginUrl;
        }
    }, _('Go to Login')))) : /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-center items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "update-password-form flex justify-center items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "update-password-form-inner"
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-center mb-5"
    }, _('Enter your new password')), error && /*#__PURE__*/ React.createElement("div", {
        className: "text-critical mb-2"
    }, error), /*#__PURE__*/ React.createElement(Form, {
        form: form,
        id: "updatePasswordForm",
        action: action,
        method: "POST",
        onSuccess: (response)=>{
            if (!response.error) {
                setSuccess(true);
            } else {
                setError(response.error.message);
            }
        },
        submitBtn: false
    }, /*#__PURE__*/ React.createElement(PasswordField, {
        name: "password",
        placeholder: _('Password'),
        required: true,
        validation: {
            required: _('Password is required')
        }
    }), /*#__PURE__*/ React.createElement(InputField, {
        name: "token",
        type: "hidden",
        defaultValue: token
    }), /*#__PURE__*/ React.createElement("div", {
        className: "form-submit-button flex border-t border-divider mt-2 pt-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: _('UPDATE PASSWORD'),
        type: "submit",
        onClick: ()=>{
            document.getElementById('updatePasswordForm').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: form.formState.isSubmitting
    }, _('UPDATE PASSWORD')))))));
};
function ResetForm({ action }) {
    const [success, setSuccess] = React.useState(false);
    const [token, setToken] = React.useState('');
    React.useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        setToken(tokenParam);
    }, []);
    return success ? /*#__PURE__*/ React.createElement(Success, null, _('We have sent you an email with a link to reset your password. Please check your inbox.')) : /*#__PURE__*/ React.createElement(ResetPasswordForm, {
        title: _('Reset Your Password'),
        subtitle: _('Please enter your email to receive a reset link'),
        className: "w-120 max-w-max md:max-w-[80%] bg-white rounded-3xl p-6 shadow-lg border border-divider",
        action: action,
        onSuccess: ()=>{
            setSuccess(true);
        }
    });
}
export default function ResetPasswordPage({ requestAction, updateAction, loginUrl }) {
    const [token, setToken] = React.useState('');
    React.useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        setToken(tokenParam);
    }, []);
    return token ? /*#__PURE__*/ React.createElement(UpdateForm, {
        token: token,
        action: updateAction,
        loginUrl: loginUrl
    }) : /*#__PURE__*/ React.createElement(ResetForm, {
        action: requestAction
    });
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    requestAction: url(routeId: "resetPassword"),
    updateAction: url(routeId: "updatePassword"),
    loginUrl: url(routeId: "login")
  }
`;
