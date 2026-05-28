import Area from '@components/common/Area.js';
import React from 'react';
export default function AdminLayout() {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "header"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "header",
        noOuter: true
    })), /*#__PURE__*/ React.createElement("div", {
        className: "content-wrapper"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "admin-navigation"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "adminNavigation",
        noOuter: true
    })), /*#__PURE__*/ React.createElement("div", {
        className: "main-content"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "content",
        className: "main-content-inner"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "footer flex justify-between"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "footerLeft",
        className: "footer-left"
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "footerRight",
        className: "footer-right"
    })))));
}
export const layout = {
    areaId: 'body',
    sortOrder: 10
};
