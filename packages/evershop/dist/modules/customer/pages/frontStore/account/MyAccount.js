import Area from '@components/common/Area.js';
import AccountInfo from '@components/frontStore/customer/AccountInfo.js';
import { MyAddresses } from '@components/frontStore/customer/MyAddresses.js';
import OrderHistory from '@components/frontStore/customer/OrderHistory.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export default function MyAccount() {
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h1", {
        className: "text-center"
    }, _('My Account')), /*#__PURE__*/ React.createElement("div", {
        className: "page-width mt-7 grid grid-cols-1 md:grid-cols-3 gap-7"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 md:col-span-2"
    }, /*#__PURE__*/ React.createElement(OrderHistory, {
        title: _('Recent Orders')
    })), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1"
    }, /*#__PURE__*/ React.createElement(AccountInfo, {
        title: _('Account Information'),
        showLogout: true
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "page-width mt-7"
    }, /*#__PURE__*/ React.createElement(MyAddresses, {
        title: _('Address Book')
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "accountPageAddressBook",
        noOuter: true
    })));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
