import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
export default function CustomerEditPageHeading({ backUrl, customer }) {
    return /*#__PURE__*/ React.createElement(PageHeading, {
        backUrl: backUrl,
        heading: customer ? `Editing ${customer.fullName}` : 'Create A New Customer'
    });
}
CustomerEditPageHeading.defaultProps = {
    customer: null
};
export const layout = {
    areaId: 'content',
    sortOrder: 5
};
export const query = `
  query Query {
    customer(id: getContextValue("customerUuid", null)) {
      fullName
    }
    backUrl: url(routeId: "customerGrid")
  }
`;
