import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { GiftIcon } from 'lucide-react';
import React from 'react';
export default function CatalogMenuGroup({ couponGrid }) {
    return /*#__PURE__*/ React.createElement(NavigationItemGroup, {
        id: "couponMenuGroup",
        name: "Promotion",
        items: [
            {
                Icon: GiftIcon,
                url: couponGrid,
                title: 'Coupons'
            }
        ]
    });
}
export const layout = {
    areaId: 'adminMenu',
    sortOrder: 50
};
export const query = `
  query Query {
    couponGrid: url(routeId:"couponGrid")
  }
`;
