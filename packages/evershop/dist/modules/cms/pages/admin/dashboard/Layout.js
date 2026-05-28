import Area from '@components/common/Area';
import React from 'react';
import './Layout.scss';
export default function DashboardLayout() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "leftSide",
        noOuter: true
    })), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "rightSide",
        noOuter: true
    })));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
