import Area from '@components/common/Area';
import React from 'react';
import './Navigation.scss';
export default function AdminNavigation() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "admin-nav-container"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "admin-nav"
    }, /*#__PURE__*/ React.createElement("ul", {
        className: "list-unstyled"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "adminMenu",
        noOuter: true
    }))));
}
export const layout = {
    areaId: 'adminNavigation',
    sortOrder: 10
};
