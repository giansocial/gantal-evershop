import { Skeleton } from '@components/common/ui/Skeleton.js';
import React from 'react';
export const ProductListSkeleton = ()=>{
    const skeletonItems = Array(5).fill(0);
    return /*#__PURE__*/ React.createElement("div", {
        className: "attribute-group-list-skeleton space-y-2 divide-y"
    }, skeletonItems.map((_, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "attribute-group-skeleton-item border-border pb-2 flex justify-between items-center "
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-5 w-30 rounded"
        })), /*#__PURE__*/ React.createElement("div", {
            className: "select-button"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-6 w-12 rounded"
        })))));
};
