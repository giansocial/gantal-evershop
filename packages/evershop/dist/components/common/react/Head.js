import Area from '@components/common/Area';
import React from 'react';
import ReactDOM from 'react-dom';
export default function Head() {
    return /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement(Area, {
        id: "head",
        noOuter: true
    }), document.getElementsByTagName('head')[0]);
}
