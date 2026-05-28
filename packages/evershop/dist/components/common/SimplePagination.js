import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
export function SimplePagination({ total, count, page, hasNext, setPage }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "simple__pagination flex gap-2 items-center"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, count, " of ", total)), /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-2"
    }, page > 1 && /*#__PURE__*/ React.createElement("a", {
        className: "hover:text-interactive border rounded p-1.25 border-divider",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setPage(page - 1);
        }
    }, /*#__PURE__*/ React.createElement(ChevronLeft, {
        width: 15,
        height: 15
    })), page === 1 && /*#__PURE__*/ React.createElement("span", {
        className: "border rounded p-1.25 border-divider text-divider"
    }, /*#__PURE__*/ React.createElement(ChevronLeft, {
        width: 15,
        height: 15
    })), hasNext && /*#__PURE__*/ React.createElement("a", {
        className: "hover:text-interactive border rounded p-1.25 border-divider",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setPage(page + 1);
        }
    }, /*#__PURE__*/ React.createElement(ChevronRight, {
        width: 15,
        height: 15
    })), !hasNext && /*#__PURE__*/ React.createElement("span", {
        className: "border rounded p-1.25 border-divider text-divider"
    }, /*#__PURE__*/ React.createElement(ChevronRight, {
        width: 15,
        height: 15
    }))));
}
