import React from 'react';
export default function ShippingNote({ setting: { showShippingNote }, order: { shippingNote } }) {
    return showShippingNote ? /*#__PURE__*/ React.createElement("div", {
        className: "shipping-note mt-5"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "italic"
    }, shippingNote)) : null;
}
export const layout = {
    areaId: 'checkoutSuccessSummary',
    sortOrder: 50
};
export const query = `
  query Query {
    order (uuid: getContextValue('orderId')) {
      shippingNote
    }
    setting {
      showShippingNote
    }
  }
`;
