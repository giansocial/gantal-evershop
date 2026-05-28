import Area from '@components/common/Area.js';
import { Button } from '@components/common/ui/Button.js';
import React from 'react';
function Name() {
    return /*#__PURE__*/ React.createElement("h1", {
        className: "page-name text-center mt-6 mb-4"
    }, "404 Page Not Found");
}
function Content({ dashboardUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "page-content"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-center"
    }, "The page you requested does not exist."), /*#__PURE__*/ React.createElement("div", {
        className: "mt-5 text-center"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Back To Dashboard",
        onClick: ()=>window.location.href = dashboardUrl,
        variant: 'default'
    }, "Back To Dashboard")));
}
export default function NotFound({ dashboardUrl }) {
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
                    dashboardUrl
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
    dashboardUrl: url(routeId: "dashboard")
  }
`;
