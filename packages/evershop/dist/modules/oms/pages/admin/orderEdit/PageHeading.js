import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
export default function OrderEditPageHeading({ backUrl, order }) {
    return /*#__PURE__*/ React.createElement(PageHeading, {
        backUrl: backUrl,
        heading: `Editing #${order.orderNumber}`
    });
}
export const layout = {
    areaId: 'content',
    sortOrder: 5
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId", null)) {
      orderNumber
    }
    backUrl: url(routeId: "orderGrid")
  }
`;
