import Area from '@components/common/Area.js';
import { useCustomer, useCustomerDispatch } from '@components/frontStore/customer/CustomerContext.jsx';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Mail, User } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';
export default function AccountInfo({ title, showLogout }) {
    const { customer: account } = useCustomer();
    const { logout } = useCustomerDispatch();
    return /*#__PURE__*/ React.createElement("div", {
        className: "account__details divide-y"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center border-border"
    }, title && /*#__PURE__*/ React.createElement("h2", null, title), showLogout && /*#__PURE__*/ React.createElement("a", {
        className: "text-interactive",
        href: "#",
        onClick: async (e)=>{
            e.preventDefault();
            try {
                await logout();
                window.location.href = '/';
            } catch (error) {
                toast.error(error.message);
            }
        }
    }, _('Logout'))), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 gap-2 py-5"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "accountDetails",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement("div", {
                        className: "account__details__name flex gap-2 py-2"
                    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(User, {
                        width: 20,
                        height: 20
                    })), /*#__PURE__*/ React.createElement("div", null, account?.fullName))
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement("div", {
                            className: "account__details__email flex gap-2 py-2"
                        }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Mail, {
                            width: 20,
                            height: 20
                        })), /*#__PURE__*/ React.createElement("div", null, account?.email))
                },
                sortOrder: 15
            }
        ]
    })));
}
