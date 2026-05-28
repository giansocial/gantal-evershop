import { Button } from '@components/common/ui/Button.js';
import React from 'react';
export default function NewProductButton({ newProductUrl }) {
    return /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>window.location.href = newProductUrl,
        title: "New Product"
    }, "New Product");
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    newProductUrl: url(routeId: "productNew")
  }
`;
