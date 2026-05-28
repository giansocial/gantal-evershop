import React from 'react';
export const ProductListEmptyRender = ({ message })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "empty-product-list"
    }, typeof message === 'string' ? /*#__PURE__*/ React.createElement("p", null, message) : message);
};
