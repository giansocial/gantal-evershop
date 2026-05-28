import { Card } from '@components/common/ui/Card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import PropTypes from 'prop-types';
import React from 'react';
export default function OrderHistory({ customer: { orders = [] } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Order History"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Order History"), /*#__PURE__*/ React.createElement(CardDescription, null, "Recently placed orders by this customer")), orders.length < 1 && /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", null, "Customer does not have any order yet.")), orders.length > 0 && /*#__PURE__*/ React.createElement(React.Fragment, null, orders.map((order)=>/*#__PURE__*/ React.createElement(CardContent, {
            key: order.uuid
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between items-center gap-2"
        }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
            className: "font-semibold text-interactive",
            href: order.editUrl
        }, "#", order.orderNumber)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, order.createdAt.text)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, order.paymentStatus.name)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, order.shipmentStatus.name)), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, order.grandTotal.text)))))));
}
OrderHistory.propTypes = {
    customer: PropTypes.shape({
        orders: PropTypes.arrayOf(PropTypes.shape({
            orderNumber: PropTypes.string
        }))
    }).isRequired
};
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    customer(id: getContextValue("customerUuid", null)) {
      orders {
        orderNumber
        uuid
        editUrl
        createdAt {
          text
        }
        shipmentStatus {
          name
        }
        paymentStatus {
          name
        }
        grandTotal {
          text
        }
      }
    }
  }
`;
