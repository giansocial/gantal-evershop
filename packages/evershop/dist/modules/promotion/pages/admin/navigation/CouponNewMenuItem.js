import { NavigationItem } from '@components/admin/NavigationItem.js';
import { Gift } from 'lucide-react';
import React from 'react';
export default function CouponNewMenuItem({ url }) {
    return /*#__PURE__*/ React.createElement(NavigationItem, {
        Icon: Gift,
        title: "New coupon",
        url: url
    });
}
