import { Image } from '@components/common/Image.js';
import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
export function Thumbnail({ src, name }) {
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "grid-thumbnail text-border border border-divider p-2 rounded flex justify-center",
        style: {
            width: '4rem',
            height: '4rem'
        }
    }, src && /*#__PURE__*/ React.createElement(Image, {
        className: "self-center",
        src: src,
        alt: name || '',
        width: 100,
        height: 100
    }), !src && /*#__PURE__*/ React.createElement("svg", {
        className: "self-center",
        xmlns: "http://www.w3.org/2000/svg",
        width: "2rem",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    }))));
}
