import { Slider } from '@components/common/ui/Slider.js';
import { DefaultFilterWrapperRender } from '@components/frontStore/catalog/DefaultFilterWrapperRender.js';
import { useProductFilter } from '@components/frontStore/catalog/ProductFilter.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useState, useMemo } from 'react';
export const DefaultPriceFilterRender = ({ priceRange, currentFilters, setting })=>{
    const { updateFilter } = useProductFilter();
    // Initialize from current filters
    const [localMin, setLocalMin] = useState(()=>{
        const minFilter = currentFilters.find((f)=>f.key === 'min_price');
        return minFilter ? parseInt(minFilter.value) : priceRange.min;
    });
    const [localMax, setLocalMax] = useState(()=>{
        const maxFilter = currentFilters.find((f)=>f.key === 'max_price');
        return maxFilter ? parseInt(maxFilter.value) : priceRange.max;
    });
    const debouncedUpdate = useMemo(()=>{
        let timeoutId;
        return (min, max)=>{
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
                const newFilters = currentFilters.filter((f)=>f.key !== 'min_price' && f.key !== 'max_price');
                if (min > priceRange.min) {
                    newFilters.push({
                        key: 'min_price',
                        operation: 'eq',
                        value: min.toString()
                    });
                }
                if (max < priceRange.max) {
                    newFilters.push({
                        key: 'max_price',
                        operation: 'eq',
                        value: max.toString()
                    });
                }
                updateFilter(newFilters);
            }, 300); // 300ms debounce
        };
    }, [
        currentFilters,
        priceRange,
        updateFilter
    ]);
    // Sync with external filter changes
    React.useEffect(()=>{
        const minFilter = currentFilters.find((f)=>f.key === 'min_price');
        const maxFilter = currentFilters.find((f)=>f.key === 'max_price');
        setLocalMin(minFilter ? parseInt(minFilter.value) : priceRange.min);
        setLocalMax(maxFilter ? parseInt(maxFilter.value) : priceRange.max);
    }, [
        currentFilters,
        priceRange
    ]);
    const handleRangeChange = (values)=>{
        const [min, max] = values;
        setLocalMin(min);
        setLocalMax(max);
        debouncedUpdate(min, max);
    };
    return /*#__PURE__*/ React.createElement(DefaultFilterWrapperRender, {
        title: _('Price')
    }, /*#__PURE__*/ React.createElement("div", {
        className: "price__filter border-b border-gray-200 pb-2 mb-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "price__slider mb-4"
    }, /*#__PURE__*/ React.createElement(Slider, {
        min: priceRange.min,
        max: priceRange.max,
        value: [
            localMin,
            localMax
        ],
        onValueChange: handleRangeChange
    })), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between text-small text-gray-500 mt-2"
    }, /*#__PURE__*/ React.createElement("span", null, priceRange.minText), /*#__PURE__*/ React.createElement("span", null, priceRange.maxText))));
};
