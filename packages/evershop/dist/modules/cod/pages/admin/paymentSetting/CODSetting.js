import { InputField } from '@components/common/form/InputField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function CODPayment({ setting: { codPaymentStatus, codDisplayName } }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Cash On Delivery Payment"), /*#__PURE__*/ React.createElement(CardDescription, null, "Configure your Cash On Delivery payment gateway settings")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Enable?")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 flex justify-start"
    }, /*#__PURE__*/ React.createElement(ToggleField, {
        name: "codPaymentStatus",
        defaultValue: codPaymentStatus,
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
        name: "codDisplayName",
        placeholder: "Display Name",
        defaultValue: codDisplayName
    })))));
}
export const layout = {
    areaId: 'paymentSetting',
    sortOrder: 20
};
export const query = `
  query Query {
    setting {
      codPaymentStatus
      codDisplayName
    }
  }
`;
