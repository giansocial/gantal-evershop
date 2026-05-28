import { CircleUser } from 'lucide-react';
import React from 'react';
export default function UserIcon({ customer, accountUrl, loginUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "self-center customer-icon"
    }, /*#__PURE__*/ React.createElement("a", {
        href: customer ? accountUrl : loginUrl
    }, /*#__PURE__*/ React.createElement(CircleUser, {
        className: "w-5 h-5 text-foreground hover:text-primary"
    })));
}
export const layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 10
};
export const query = `
  query Query {
    customer: currentCustomer {
      uuid
      fullName
      email
    }
    accountUrl: url(routeId: "account")
    loginUrl: url(routeId: "login")
  }
`;
