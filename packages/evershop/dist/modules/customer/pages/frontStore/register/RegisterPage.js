import { Card, CardContent } from '@components/common/ui/Card.js';
import { CustomerRegistrationForm } from '@components/frontStore/customer/RegistrationForm.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { toast } from 'react-toastify';
export default function RegisterPage({ homeUrl, loginUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col items-center py-10 px-4"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-full max-w-md"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(CustomerRegistrationForm, {
        title: _('Create an account'),
        subtitle: _('Join us for exclusive offers and order tracking'),
        redirectUrl: homeUrl,
        onError: (error)=>{
            toast.error(error);
        },
        className: "w-full"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "text-center mt-4"
    }, /*#__PURE__*/ React.createElement("span", null, _('Already have an account?'), /*#__PURE__*/ React.createElement("a", {
        className: "text-primary hover:underline",
        href: loginUrl
    }, ' ', _('Login'), ' ')))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    loginUrl: url(routeId: "login")
  }
`;
