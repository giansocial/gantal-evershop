import React from 'react';
export const ImageUploaderSkeleton = ({ itemCount = 5 })=>{
    const items = Array(itemCount).fill(0);
    if (itemCount === 1) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "relative border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 animate-pulse",
            style: {
                aspectRatio: '1/1',
                width: '300px',
                height: '300px'
            }
        }, /*#__PURE__*/ React.createElement("div", {
            className: "absolute top-2 right-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "w-4 h-4 rounded-full bg-gray-200"
        })), /*#__PURE__*/ React.createElement("svg", {
            style: {
                width: '30px',
                height: '30px'
            },
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-5 w-5",
            viewBox: "0 0 20 20",
            fill: "#e5e7eb"
        }, /*#__PURE__*/ React.createElement("path", {
            fillRule: "evenodd",
            d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
            clipRule: "evenodd"
        }))));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-4 gap-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 row-span-2 relative border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 animate-pulse",
        style: {
            aspectRatio: '1/1',
            minHeight: '200px'
        }
    }, /*#__PURE__*/ React.createElement("svg", {
        style: {
            width: '30px',
            height: '30px'
        },
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-5 w-5",
        viewBox: "0 0 20 20",
        fill: "#e5e7eb"
    }, /*#__PURE__*/ React.createElement("path", {
        fillRule: "evenodd",
        d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
        clipRule: "evenodd"
    }))), items.slice(1, itemCount).map((_, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "relative border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 animate-pulse",
            style: {
                aspectRatio: '1/1',
                minHeight: '100px'
            }
        }, /*#__PURE__*/ React.createElement("svg", {
            style: {
                width: '30px',
                height: '30px'
            },
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-5 w-5",
            viewBox: "0 0 20 20",
            fill: "#e5e7eb"
        }, /*#__PURE__*/ React.createElement("path", {
            fillRule: "evenodd",
            d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
            clipRule: "evenodd"
        })))), /*#__PURE__*/ React.createElement("div", {
        className: "border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50",
        style: {
            aspectRatio: '1/1',
            minHeight: '100px'
        }
    }, /*#__PURE__*/ React.createElement("svg", {
        style: {
            width: '30px',
            height: '30px'
        },
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-5 w-5",
        viewBox: "0 0 20 20",
        fill: "#e5e7eb"
    }, /*#__PURE__*/ React.createElement("path", {
        fillRule: "evenodd",
        d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
        clipRule: "evenodd"
    }))));
};
export default {
    ImageUploaderSkeleton
};
