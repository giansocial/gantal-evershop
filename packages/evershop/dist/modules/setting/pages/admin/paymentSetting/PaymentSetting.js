import { SettingMenu } from '@components/admin/SettingMenu.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import React from 'react';
export default function PaymentSetting({ saveSettingApi }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "main-content-inner"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-6 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(SettingMenu, null)), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-4"
    }, /*#__PURE__*/ React.createElement(Form, {
        id: "paymentSettingForm",
        method: "POST",
        action: saveSettingApi,
        successMessage: "Payment setting saved"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "paymentSetting",
        className: "grid gap-5"
    })))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    saveSettingApi: url(routeId: "saveSetting")
  }
`;
