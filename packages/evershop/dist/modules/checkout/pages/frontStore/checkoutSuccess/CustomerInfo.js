import { AddressSummary } from '@components/common/customer/address/AddressSummary.js';
import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export default function CustomerInfo({ order: { orderNumber, customerFullName, customerEmail, paymentMethodName, noShippingRequired, shippingAddress, billingAddress } }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "checkout-success-customer-info"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "thank-you flex justify-start space-x-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "check flex justify-center self-center text-interactive"
    }, /*#__PURE__*/ React.createElement("svg", {
        style: {
            width: '3rem',
            height: '3rem'
        },
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-4 w-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M5 13l4 4L19 7"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("span", {
        style: {
            fontSize: '1.6rem',
            fontWeight: '300'
        }
    }, _('Order #${orderNumber}', {
        orderNumber
    })), /*#__PURE__*/ React.createElement("div", null, _('Thank you ${name}!', {
        name: customerFullName || billingAddress?.fullName
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "customer-info mt-7 mb-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-7"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, /*#__PURE__*/ React.createElement("h3", null, _('Contact information'))), /*#__PURE__*/ React.createElement("div", {
        className: "text-textSubdued"
    }, customerFullName || billingAddress?.fullName), /*#__PURE__*/ React.createElement("div", {
        className: "text-textSubdued"
    }, customerEmail)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, /*#__PURE__*/ React.createElement("h3", null, _('Shipping Address'))), /*#__PURE__*/ React.createElement("div", {
        className: "text-textSubdued"
    }, noShippingRequired ? _('No shipping required') : /*#__PURE__*/ React.createElement(AddressSummary, {
        address: shippingAddress
    }))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, /*#__PURE__*/ React.createElement("h3", null, _('Payment Method'))), /*#__PURE__*/ React.createElement("div", {
        className: "text-textSubdued"
    }, paymentMethodName)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, /*#__PURE__*/ React.createElement("h3", null, _('Billing Address'))), /*#__PURE__*/ React.createElement("div", {
        className: "text-textSubdued"
    }, /*#__PURE__*/ React.createElement(AddressSummary, {
        address: billingAddress
    }))))), /*#__PURE__*/ React.createElement(Button, {
        variant: 'default',
        size: 'lg',
        onClick: ()=>window.location.href = '/',
        title: _('CONTINUE SHOPPING')
    }, _('CONTINUE SHOPPING')));
}
export const layout = {
    areaId: 'checkoutSuccessPageLeft',
    sortOrder: 10
};
export const query = `
  query Query {
    order (uuid: getContextValue('orderId')) {
      orderNumber
      customerFullName
      customerEmail
      paymentMethodName
      noShippingRequired
      shippingNote
      shippingAddress {
        fullName
        postcode
        telephone
        country {
          name
          code
        }
        province {
          name
          code
        }
        city
        address1
        address2
      }
      billingAddress {
        fullName
        postcode
        telephone
        country {
          name
          code
        }
        province {
          name
          code
        }
        city
        address1
        address2
      }
    }
  }
`;
