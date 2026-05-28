import { Button } from '@components/common/ui/Button.js';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import { Settings } from 'lucide-react';
import React from 'react';
export default function ShippingSettingMenu({ shippingSettingUrl }) {
    const isActive = typeof window !== 'undefined' && new URL(shippingSettingUrl, window.location.origin).pathname === window.location.pathname;
    return /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline',
        className: cn(isActive && 'bg-primary/5 border-primary/20 dark:bg-primary/10'),
        "data-active": isActive ? 'true' : 'false'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: shippingSettingUrl,
        className: cn('uppercase text-xs font-semibold', isActive && 'text-primary')
    }, "Shipping Setting"))), /*#__PURE__*/ React.createElement(ItemDescription, null, /*#__PURE__*/ React.createElement("div", null, "Where you ship, shipping methods and delivery fee"))), /*#__PURE__*/ React.createElement(ItemActions, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        size: "sm",
        onClick: ()=>window.location.href = shippingSettingUrl
    }, /*#__PURE__*/ React.createElement(Settings, {
        className: "h-4 w-4 mr-1"
    }))));
}
export const layout = {
    areaId: 'settingPageMenu',
    sortOrder: 15
};
export const query = `
  query Query {
    shippingSettingUrl: url(routeId: "shippingSetting")
  }
`;
