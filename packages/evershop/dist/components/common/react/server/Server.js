import Area from '@components/common/Area.js';
import { Alert } from '@components/common/modal/Alert.js';
import React from 'react';
function ServerHtml({ route, css, js, appContext }) {
    const classes = route.isAdmin ? `admin ${route.id}` : `frontStore ${route.id}`;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("head", null, /*#__PURE__*/ React.createElement("meta", {
        charSet: "utf-8"
    }), /*#__PURE__*/ React.createElement("script", {
        dangerouslySetInnerHTML: {
            __html: appContext
        }
    }), css.map((source, index)=>/*#__PURE__*/ React.createElement("style", {
            key: index,
            dangerouslySetInnerHTML: {
                __html: source
            }
        })), /*#__PURE__*/ React.createElement(Area, {
        noOuter: true,
        id: "head"
    })), /*#__PURE__*/ React.createElement("body", {
        id: "body",
        className: classes
    }, /*#__PURE__*/ React.createElement("div", {
        id: "app"
    }, /*#__PURE__*/ React.createElement(Alert, null, /*#__PURE__*/ React.createElement(Area, {
        id: "body",
        className: "wrapper"
    }))), js.map((src, index)=>/*#__PURE__*/ React.createElement("script", {
            src: src,
            key: index
        }))));
}
export default ServerHtml;
