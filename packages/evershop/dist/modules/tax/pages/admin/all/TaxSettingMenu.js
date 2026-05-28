import { Button } from '@components/common/ui/Button.js';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import { Settings } from 'lucide-react';
import React from 'react';
export default function TaxSettingMenu({ taxSettingUrl }) {
    const isActive = typeof window !== 'undefined' && new URL(taxSettingUrl, window.location.origin).pathname === window.location.pathname;
    return /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline',
        className: cn(isActive && 'bg-primary/5 border-primary/20 dark:bg-primary/10'),
        "data-active": isActive ? 'true' : 'false'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: taxSettingUrl,
        className: cn('uppercase text-xs font-semibold', isActive && 'text-primary')
    }, "Tax Setting"))), /*#__PURE__*/ React.createElement(ItemDescription, null, /*#__PURE__*/ React.createElement("div", null, "Configure tax classes and tax rates"))), /*#__PURE__*/ React.createElement(ItemActions, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        size: "sm",
        onClick: ()=>window.location.href = taxSettingUrl
    }, /*#__PURE__*/ React.createElement(Settings, {
        className: "h-4 w-4 mr-1"
    }))));
}
export const layout = {
    areaId: 'settingPageMenu',
    sortOrder: 20
};
export const query = `
  query Query {
    taxSettingUrl: url(routeId: "taxSetting")
  }
`;
