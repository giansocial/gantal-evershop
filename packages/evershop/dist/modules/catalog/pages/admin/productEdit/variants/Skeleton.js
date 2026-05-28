import { Table, TableBody, TableCell, TableRow } from '@components/common/ui/Table.js';
import React from 'react';
const SkeletonRow = ()=>/*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-7 h-7 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-5 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-7 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-16 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-10 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-4 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-10 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "w-7 h-5 bg-gray-200 rounded animate-pulse"
    })));
export const Skeleton = ({ rows = 5, className = '' })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: `w-full ${className}`
    }, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableBody, null, Array.from({
        length: rows
    }, (_, index)=>/*#__PURE__*/ React.createElement(SkeletonRow, {
            key: index
        })))));
};
