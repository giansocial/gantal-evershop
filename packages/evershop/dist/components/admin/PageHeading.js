import Area from '@components/common/Area.js';
import React from 'react';
import './PageHeading.scss';
function BackIcon({ backUrl }) {
    if (!backUrl) return null;
    return /*#__PURE__*/ React.createElement("a", {
        href: backUrl,
        className: "breadcrum-icon border block border-border rounded mr-2"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "flex items-center justify-center"
    }, /*#__PURE__*/ React.createElement("svg", {
        className: "text-icon",
        viewBox: "0 0 20 20",
        focusable: "false",
        "aria-hidden": "true"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z"
    }))));
}
BackIcon.defaultProps = {
    backUrl: undefined
};
function Heading({ heading }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("h1", {
        className: "page-heading-title"
    }, heading));
}
function PageHeading({ backUrl, heading }) {
    if (!heading) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "page-heading flex justify-between items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start space-x-2 items-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "pageHeadingLeft",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: BackIcon
                },
                props: {
                    backUrl
                },
                sortOrder: 0,
                id: 'breadcrumb'
            },
            {
                component: {
                    default: Heading
                },
                props: {
                    heading
                },
                sortOrder: 0,
                id: 'heading'
            }
        ]
    })), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end space-x-2 items-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "pageHeadingRight",
        noOuter: true,
        coreComponents: []
    })));
}
PageHeading.defaultProps = {
    backUrl: undefined
};
export { PageHeading };
