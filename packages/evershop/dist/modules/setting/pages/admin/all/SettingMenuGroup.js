import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { Settings } from 'lucide-react';
import React from 'react';
export default function CmsMenuGroup({ storeSetting }) {
    return /*#__PURE__*/ React.createElement(NavigationItemGroup, {
        id: "settingMenuGroup",
        name: "Setting",
        Icon: ()=>/*#__PURE__*/ React.createElement(Settings, {
                width: 15,
                height: 15
            }),
        url: storeSetting
    });
}
export const layout = {
    areaId: 'adminMenu',
    sortOrder: 500
};
export const query = `
  query Query {
    storeSetting: url(routeId:"storeSetting")
  }
`;
