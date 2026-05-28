import React from 'react';
export const DefaultFilterWrapperRender = ({ title, children })=>/*#__PURE__*/ React.createElement("div", {
        className: "filter__section"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "filter__title font-medium mb-3"
    }, title), /*#__PURE__*/ React.createElement("div", {
        className: "filter__content"
    }, children));
