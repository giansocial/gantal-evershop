/* eslint-disable react/prop-types */ import { useAppDispatch } from '@components/common/context/app.js';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/common/ui/Select.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { cn } from '@evershop/evershop/lib/util/cn';
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import React, { useCallback } from 'react';
const defaultSortOptions = [
    {
        code: '',
        name: _('Default'),
        label: _('Default')
    },
    {
        code: 'price',
        name: _('Price'),
        label: _('Price')
    },
    {
        code: 'name',
        name: _('Name'),
        label: _('Name')
    }
];
export function ProductSorting({ sortOptions = defaultSortOptions, defaultSortBy = '', defaultSortOrder = 'asc', showSortDirection = true, enableUrlUpdate = true, onSortChange, renderSortSelect, renderSortDirection, className = '', disabled = false, count }) {
    const AppContextDispatch = useAppDispatch();
    const [sortBy, setSortBy] = React.useState(()=>{
        // Check if this is browser or server
        if (typeof window !== 'undefined') {
            const params = new URL(document.location.href).searchParams;
            return params.get('ob') || defaultSortBy;
        }
        return defaultSortBy;
    });
    const [sortOrder, setSortOrder] = React.useState(()=>{
        // Check if this is browser or server
        if (typeof window !== 'undefined') {
            const params = new URL(document.location.href).searchParams;
            return params.get('od') || defaultSortOrder;
        }
        return defaultSortOrder;
    });
    const defaultSortChangeHandler = useCallback(async (newSortState)=>{
        if (!enableUrlUpdate) return;
        const currentUrl = window.location.href;
        const url = new URL(currentUrl, window.location.origin);
        if (newSortState.sortBy === '' || newSortState.sortBy === defaultSortBy) {
            url.searchParams.delete('ob');
        } else {
            url.searchParams.set('ob', newSortState.sortBy);
        }
        if (newSortState.sortOrder === defaultSortOrder) {
            url.searchParams.delete('od');
        } else {
            url.searchParams.set('od', newSortState.sortOrder);
        }
        url.searchParams.append('ajax', 'true');
        await AppContextDispatch.fetchPageData(url);
        url.searchParams.delete('ajax');
        history.pushState(null, '', url);
    }, [
        AppContextDispatch,
        enableUrlUpdate,
        defaultSortBy,
        defaultSortOrder
    ]);
    const handleSortChange = onSortChange || defaultSortChangeHandler;
    const onChangeSort = useCallback(async (newSortBy)=>{
        if (disabled) return;
        const newSortState = {
            sortBy: newSortBy,
            sortOrder
        };
        setSortBy(newSortBy);
        await handleSortChange(newSortState);
    }, [
        sortOrder,
        handleSortChange,
        disabled
    ]);
    const onChangeDirection = useCallback(async ()=>{
        if (disabled) return;
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const newSortState = {
            sortBy,
            sortOrder: newOrder
        };
        setSortOrder(newOrder);
        await handleSortChange(newSortState);
    }, [
        sortBy,
        sortOrder,
        handleSortChange,
        disabled
    ]);
    const defaultSortSelect = (props)=>/*#__PURE__*/ React.createElement(Select, {
            value: props.options.find((option)=>option.code === props.value),
            onValueChange: (value)=>props.onChange(value?.code || ''),
            disabled: props.disabled
        }, /*#__PURE__*/ React.createElement(SelectTrigger, {
            className: "w-full"
        }, /*#__PURE__*/ React.createElement(SelectValue, {
            placeholder: _('Select sort')
        })), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, _('Sort By')), props.options.map((option)=>/*#__PURE__*/ React.createElement(SelectItem, {
                key: option.code,
                value: option,
                disabled: option.disabled
            }, option.label || option.name)))));
    const defaultSortDirection = (props)=>/*#__PURE__*/ React.createElement("button", {
            type: "button",
            onClick: props.onToggle,
            disabled: props.disabled,
            className: `sort-direction-btn flex items-center justify-center ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary cursor-pointer'}`,
            "aria-label": `Sort ${props.sortOrder === 'asc' ? 'descending' : 'ascending'}`
        }, props.sortOrder === 'desc' ? /*#__PURE__*/ React.createElement(ArrowDownWideNarrow, {
            className: "w-5 h-5 text-muted-foreground"
        }) : /*#__PURE__*/ React.createElement(ArrowUpWideNarrow, {
            className: "w-5 h-5 text-muted-foreground"
        }));
    const containerContent = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "sort-select grow"
    }, renderSortSelect ? renderSortSelect({
        options: sortOptions,
        value: sortBy,
        onChange: onChangeSort,
        disabled
    }) : defaultSortSelect({
        options: sortOptions,
        value: sortBy,
        onChange: onChangeSort,
        disabled
    })), showSortDirection && /*#__PURE__*/ React.createElement("div", {
        className: "sort-direction self-center"
    }, renderSortDirection ? renderSortDirection({
        sortOrder,
        onToggle: onChangeDirection,
        disabled
    }) : defaultSortDirection({
        sortOrder,
        onToggle: onChangeDirection,
        disabled
    })));
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center border-b border-border pb-2 mb-8"
    }, /*#__PURE__*/ React.createElement("div", null, _('${count} Products', {
        count: count.toString()
    })), /*#__PURE__*/ React.createElement("div", {
        className: cn(`product-sorting flex gap-2 items-center`, className)
    }, containerContent));
}
