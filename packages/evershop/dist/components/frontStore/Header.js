import Area from '@components/common/Area.js';
import React from 'react';
export function Header() {
    return /*#__PURE__*/ React.createElement("header", {
        className: "header px-6"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "headerTop",
        className: "header__top"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "header__middle grid grid-cols-3"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "headerMiddleLeft",
        className: "header__middle__left flex justify-start items-center"
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "headerMiddleCenter",
        className: "header__middle__center flex justify-center items-center"
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "headerMiddleRight",
        className: "header__middle__right flex justify-end items-center gap-3"
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "headerBottom",
        className: "header__bottom"
    }));
}
