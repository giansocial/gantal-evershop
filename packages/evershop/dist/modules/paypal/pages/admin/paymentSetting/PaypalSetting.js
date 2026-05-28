import { InputField } from '@components/common/form/InputField.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function PaypalPayment({ setting: { paypalPaymentStatus, paypalDisplayName, paypalClientId, paypalClientSecret, paypalEnvironment, paypalPaymentIntent } }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Paypal Payment"), /*#__PURE__*/ React.createElement(CardDescription, null, "Configure your Paypal payment gateway settings")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Enable?")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(ToggleField, {
        name: "paypalPaymentStatus",
        defaultValue: paypalPaymentStatus,
        trueValue: 1,
        falseValue: 0
    })))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-4 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Dislay Name")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "paypalDisplayName",
        placeholder: "Display Name",
        defaultValue: paypalDisplayName
    })))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-4 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Client ID")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "paypalClientId",
        placeholder: "Client ID",
        defaultValue: paypalClientId
    })))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-4 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Client Secret")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "paypalClientSecret",
        placeholder: "Secret Key",
        defaultValue: paypalClientSecret
    })))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-4 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Environment")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "paypalEnvironment",
        defaultValue: paypalEnvironment,
        options: [
            {
                label: 'Sandbox',
                value: 'https://api-m.sandbox.paypal.com'
            },
            {
                label: 'Live',
                value: 'https://api-m.paypal.com'
            }
        ]
    })))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-4 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Payment mode")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "paypalPaymentIntent",
        defaultValue: paypalPaymentIntent,
        options: [
            {
                label: 'Authorize only',
                value: 'AUTHORIZE'
            },
            {
                label: 'Capture',
                value: 'CAPTURE'
            }
        ]
    })))));
}
export const layout = {
    areaId: 'paymentSetting',
    sortOrder: 15
};
export const query = `
  query Query {
    setting {
      paypalPaymentStatus
      paypalDisplayName
      paypalClientId
      paypalClientSecret
      paypalEnvironment
      paypalPaymentIntent
    }
  }
`;
