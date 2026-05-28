import { Button } from '@components/common/ui/Button.js';
import { ButtonGroup } from '@components/common/ui/ButtonGroup.js';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@components/common/ui/Pagination.js';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/common/ui/Select.js';
import React from 'react';
export function GridPagination({ total, limit, page }) {
    const limitInput = React.useRef(null);
    React.useEffect(()=>{
        if (limitInput.current) {
            limitInput.current.value = limit.toString();
        }
    }, []);
    const onKeyPress = (e)=>{
        e.preventDefault();
        let pageNumber = parseInt(e.target.value, 10);
        if (page < 1) pageNumber = 1;
        if (page > Math.ceil(total / limit)) pageNumber = Math.ceil(total / limit);
        const url = new URL(window.location.href);
        url.searchParams.set('page', pageNumber.toString());
        window.location.href = url.href;
    };
    const onPrev = (e)=>{
        e.preventDefault();
        const prev = page - 1;
        if (page === 1) return;
        const url = new URL(window.location.href);
        url.searchParams.set('page', prev.toString());
        window.location.href = url.href;
    };
    const onNext = (e)=>{
        e.preventDefault();
        const next = page + 1;
        if (page * limit >= total) return;
        const url = new URL(window.location.href);
        url.searchParams.set('page', next.toString());
        window.location.href = url.href;
    };
    const onFirst = (e)=>{
        e.preventDefault();
        if (page === 1) return;
        const url = new URL(window.location.href);
        url.searchParams.delete('page');
        window.location.href = url.href;
    };
    const onLast = (e)=>{
        e.preventDefault();
        if (page === Math.ceil(total / limit)) return;
        const url = new URL(window.location.href);
        url.searchParams.set('page', Math.ceil(total / limit).toString());
        window.location.href = url.href;
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "pagination flex w-full mt-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between w-full space-x-2"
    }, /*#__PURE__*/ React.createElement(ButtonGroup, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline'
    }, "Show"), /*#__PURE__*/ React.createElement(Select, {
        value: limit.toString(),
        onValueChange: (value)=>{
            const url = new URL(window.location.href);
            url.searchParams.set('limit', value?.toString() || '10');
            window.location.href = url.href;
        }
    }, /*#__PURE__*/ React.createElement(SelectTrigger, {
        className: "w-20"
    }, /*#__PURE__*/ React.createElement(SelectValue, null, limit)), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, "Limit"), /*#__PURE__*/ React.createElement(SelectItem, {
        value: "50"
    }, "50"), /*#__PURE__*/ React.createElement(SelectItem, {
        value: "100"
    }, "100"), /*#__PURE__*/ React.createElement(SelectItem, {
        value: "150"
    }, "150"), /*#__PURE__*/ React.createElement(SelectItem, {
        value: "200"
    }, "200"))))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement(Pagination, null, /*#__PURE__*/ React.createElement(PaginationContent, null, /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationPrevious, {
        onClick: (e)=>{
            onPrev(e);
        }
    })), page > 1 && /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationLink, {
        isActive: page === 1,
        onClick: (e)=>{
            onFirst(e);
        }
    }, "1")), page >= 3 && /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationEllipsis, null)), /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationLink, {
        isActive: true
    }, page)), page < Math.ceil(total / limit) - 1 && /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationEllipsis, null)), page * limit < total && /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationLink, {
        isActive: page === Math.ceil(total / limit),
        onClick: (e)=>{
            onLast(e);
        }
    }, Math.ceil(total / limit))), /*#__PURE__*/ React.createElement(PaginationNext, {
        onClick: onNext
    }))))));
}
