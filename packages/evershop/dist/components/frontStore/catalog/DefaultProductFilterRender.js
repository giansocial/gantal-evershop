import Area from '@components/common/Area.js';
import { Button } from '@components/common/ui/Button.js';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@components/common/ui/Sheet.js';
import { DefaultAttributeFilterRender } from '@components/frontStore/catalog/DefaultAttributeFilterRender.js';
import { DefaultCategoryFilterRender } from '@components/frontStore/catalog/DefaultCategoryFilterRender.js';
import { DefaultPriceFilterRender as PriceFilterRenderer } from '@components/frontStore/catalog/DefaultPriceFilterRender.js';
import { DefaultProductFilterSummary } from '@components/frontStore/catalog/DefaultProductFilterSummary.js';
import { ProductFilterDispatch } from '@components/frontStore/catalog/ProductFilter.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { useState, useMemo } from 'react';
import React from 'react';
export const DefaultProductFilterRender = ({ renderProps, className = '', title = _('Filter Products'), showFilterSummary = true })=>{
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const { currentFilters, availableAttributes, priceRange, categories, setting, removeFilter, updateFilter, clearAllFilters, isLoading, activeFilterCount } = renderProps;
    const defaultComponents = useMemo(()=>{
        const components = [];
        if (priceRange && priceRange.min !== priceRange.max) {
            components.push({
                component: {
                    default: PriceFilterRenderer
                },
                props: {
                    priceRange,
                    currentFilters,
                    setting
                },
                sortOrder: 10,
                id: 'priceFilter'
            });
        }
        if (categories.length > 0) {
            components.push({
                component: {
                    default: DefaultCategoryFilterRender
                },
                props: {
                    categories,
                    currentFilters
                },
                sortOrder: 15,
                id: 'categoryFilter'
            });
        }
        if (availableAttributes.length > 0) {
            components.push({
                component: {
                    default: DefaultAttributeFilterRender
                },
                props: {
                    availableAttributes,
                    currentFilters
                },
                sortOrder: 20,
                id: 'attributeFilter'
            });
        }
        return components;
    }, [
        availableAttributes,
        priceRange,
        categories,
        currentFilters,
        setting
    ]);
    const contextValue = useMemo(()=>({
            updateFilter,
            removeFilter,
            clearAllFilters
        }), [
        updateFilter,
        removeFilter,
        clearAllFilters
    ]);
    return /*#__PURE__*/ React.createElement(ProductFilterDispatch.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setIsMobileFilterOpen(true),
        className: "md:hidden w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
    }, /*#__PURE__*/ React.createElement("svg", {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707l-2 2A1 1 0 0111 21v-6.586a1 1 0 00-.293-.707L4.293 7.293A1 1 0 014 6.586V4z"
    })), /*#__PURE__*/ React.createElement("span", null, _('Filters'))), /*#__PURE__*/ React.createElement(Sheet, {
        open: isMobileFilterOpen,
        onOpenChange: setIsMobileFilterOpen
    }, /*#__PURE__*/ React.createElement(SheetContent, {
        side: "bottom",
        className: "md:hidden max-h-[85vh] border-border"
    }, /*#__PURE__*/ React.createElement(SheetHeader, null, /*#__PURE__*/ React.createElement(SheetTitle, null, _('Filters'))), /*#__PURE__*/ React.createElement("div", {
        className: "flex-1 overflow-y-auto px-4 py-4"
    }, showFilterSummary && /*#__PURE__*/ React.createElement(DefaultProductFilterSummary, {
        availableAttributes: availableAttributes,
        currentFilters: currentFilters,
        priceRange: priceRange,
        categories: categories
    }), /*#__PURE__*/ React.createElement("div", {
        className: isLoading ? 'opacity-75 pointer-events-none' : ''
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "productFilter",
        noOuter: true,
        coreComponents: defaultComponents,
        availableAttributes: availableAttributes,
        priceRange: priceRange,
        currentFilters: currentFilters,
        categories: categories,
        setting: setting
    }))), /*#__PURE__*/ React.createElement(SheetFooter, {
        className: "grid grid-cols-2 gap-3"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: clearAllFilters,
        disabled: isLoading || activeFilterCount === 0,
        className: "flex-1"
    }, _('Clear All')), /*#__PURE__*/ React.createElement(Button, {
        variant: "default",
        onClick: ()=>setIsMobileFilterOpen(false)
    }, _('Apply Filters'))))), /*#__PURE__*/ React.createElement("div", {
        className: `hidden md:block product__filters ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "product__filters__header flex items-center justify-between mb-4"
    }, title && /*#__PURE__*/ React.createElement("h3", {
        className: "font-bold text-lg flex items-center"
    }, title), activeFilterCount > 0 && /*#__PURE__*/ React.createElement("button", {
        onClick: clearAllFilters,
        disabled: isLoading,
        className: "text-sm hover:text-destructive transition-colors disabled:opacity-50"
    }, _('Clear All'))), showFilterSummary && /*#__PURE__*/ React.createElement(DefaultProductFilterSummary, {
        availableAttributes: availableAttributes,
        currentFilters: currentFilters,
        priceRange: priceRange,
        categories: categories
    }), /*#__PURE__*/ React.createElement("div", {
        className: isLoading ? 'opacity-75 pointer-events-none' : ''
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "productFilter",
        noOuter: true,
        coreComponents: defaultComponents,
        availableAttributes: availableAttributes,
        priceRange: priceRange,
        currentFilters: currentFilters,
        categories: categories,
        setting: setting
    }))));
};
