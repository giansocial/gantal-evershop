import Area from '@components/common/Area.js';
import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
function Name() {
    return /*#__PURE__*/ React.createElement("h1", {
        className: "page-name text-center mt-6 mb-4"
    }, _('404 Page Not Found'));
}
function Content({ continueShoppingUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "page-content"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-center"
    }, _('The page you requested does not exist.')), /*#__PURE__*/ React.createElement("div", {
        className: "mt-5 text-center"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: _('Continue shopping'),
        onClick: ()=>window.location.href = continueShoppingUrl,
        variant: "default"
    }, _('Continue shopping'))));
}
export default function NotFound({ continueShoppingUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "page-width mt-6"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "pt-4"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "notfound-page",
        coreComponents: [
            {
                component: {
                    default: Name
                },
                props: {},
                sortOrder: 10,
                id: 'notfound-page-title'
            },
            {
                component: {
                    default: Content
                },
                props: {
                    continueShoppingUrl
                },
                sortOrder: 20,
                id: 'notfound-page-content'
            }
        ]
    })));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    continueShoppingUrl: url(routeId: "homepage")
  }
`;
