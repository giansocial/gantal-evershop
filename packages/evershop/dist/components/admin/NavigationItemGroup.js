import { NavigationItem } from '@components/admin/NavigationItem.js';
import Area from '@components/common/Area.jsx';
import React from 'react';
import './NavigationItemGroup.scss';
export function NavigationItemGroup({ id, name, items = [], Icon = null, url = null }) {
    return /*#__PURE__*/ React.createElement("li", {
        className: "root-nav-item nav-item"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "root-label flex justify-between items-center"
    }, Icon && /*#__PURE__*/ React.createElement("span", null, /*#__PURE__*/ React.createElement(Icon, null)), !url && /*#__PURE__*/ React.createElement("span", null, name), url && /*#__PURE__*/ React.createElement("a", {
        href: url
    }, name))), /*#__PURE__*/ React.createElement("ul", {
        className: "item-group"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: id,
        noOuter: true,
        coreComponents: items.map((item)=>({
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(NavigationItem, {
                            Icon: item.Icon,
                            url: item.url,
                            title: item.title
                        })
                }
            }))
    })));
}
NavigationItemGroup.defaultProps = {
    items: [],
    Icon: null,
    url: null
};
