import { Button } from '@components/common/ui/Button.js';
import React from 'react';
export default function NewCouponButton({ newCouponUrl }) {
    return /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>window.location.href = newCouponUrl,
        title: "New Coupon"
    }, ' ', "New Coupon", ' ');
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    newCouponUrl: url(routeId: "couponNew")
  }
`;
