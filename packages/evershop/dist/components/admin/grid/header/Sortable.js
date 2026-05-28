import { TableCell } from '@components/common/ui/Table.js';
import React from 'react';
function Up() {
    return /*#__PURE__*/ React.createElement("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 17 23",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M1 8.5L8.5 1L16 8.5",
        stroke: "black",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M16 14L8.5 21.5L1 14",
        stroke: "#e1e3e5",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }));
}
function Down() {
    return /*#__PURE__*/ React.createElement("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 17 23",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M1 8.5L8.5 1L16 8.5",
        stroke: "#e1e3e5",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M16 14L8.5 21.5L1 14",
        stroke: "black",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }));
}
function None() {
    return /*#__PURE__*/ React.createElement("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 17 23",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M1 8.5L8.5 1L16 8.5",
        stroke: "#e1e3e5",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M16 14L8.5 21.5L1 14",
        stroke: "#e1e3e5",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }));
}
export function SortableHeader({ title, name, currentFilters = [] }) {
    const [currentDirection] = React.useState(()=>{
        const currentOrderBy = currentFilters.find((filter)=>filter.key === 'ob');
        if (!currentOrderBy || currentOrderBy.value !== name) {
            return null;
        } else {
            return currentFilters.find((filter)=>filter.key === 'od')?.value || 'asc';
        }
    });
    const onChange = ()=>{
        const url = new URL(window.location.href);
        url.searchParams.set('ob', name);
        // Get the current direction by checking the currentFilters
        const currentDirection = currentFilters.find((filter)=>filter.key === 'od');
        if (!currentDirection || currentDirection.value === 'asc') {
            url.searchParams.set('od', 'desc');
        } else {
            url.searchParams.set('od', 'asc');
        }
        window.location.href = url.toString();
    };
    return /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
        className: "table-header flex justify-start gap-2 content-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "font-medium uppercase text-xs"
    }, /*#__PURE__*/ React.createElement("span", null, title)), /*#__PURE__*/ React.createElement("div", {
        className: "sort flex items-center"
    }, /*#__PURE__*/ React.createElement("button", {
        type: "button",
        onClick: onChange
    }, currentDirection === 'asc' ? /*#__PURE__*/ React.createElement(Down, null) : currentDirection === 'desc' ? /*#__PURE__*/ React.createElement(Up, null) : /*#__PURE__*/ React.createElement(None, null)))));
}
