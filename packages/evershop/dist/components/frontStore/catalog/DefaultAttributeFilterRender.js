import { Button } from '@components/common/ui/Button.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Label } from '@components/common/ui/Label.js';
import { useProductFilter } from '@components/frontStore/catalog/ProductFilter.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useState } from 'react';
export const DefaultAttributeFilterRender = ({ availableAttributes, currentFilters })=>{
    const { updateFilter } = useProductFilter();
    const [searchTerms, setSearchTerms] = useState({});
    const [collapsedAttributes, setCollapsedAttributes] = useState({});
    const handleAttributeChange = (attributeCode, optionId, checked)=>{
        let newFilters = [
            ...currentFilters
        ];
        const existingFilterIndex = newFilters.findIndex((f)=>f.key === attributeCode);
        if (checked) {
            if (existingFilterIndex !== -1) {
                const existingFilter = newFilters[existingFilterIndex];
                const values = existingFilter.value.split(',');
                if (!values.includes(optionId)) {
                    values.push(optionId);
                    newFilters[existingFilterIndex] = {
                        ...existingFilter,
                        value: values.join(',')
                    };
                }
            } else {
                newFilters.push({
                    key: attributeCode,
                    operation: 'in',
                    value: optionId
                });
            }
        } else if (existingFilterIndex !== -1) {
            const existingFilter = newFilters[existingFilterIndex];
            const values = existingFilter.value.split(',').filter((v)=>v !== optionId);
            if (values.length === 0) {
                newFilters = newFilters.filter((f)=>f.key !== attributeCode);
            } else {
                newFilters[existingFilterIndex] = {
                    ...existingFilter,
                    value: values.join(',')
                };
            }
        }
        updateFilter(newFilters);
    };
    const isOptionSelected = (attributeCode, optionId)=>{
        const filter = currentFilters.find((f)=>f.key === attributeCode);
        return filter ? filter.value.split(',').includes(optionId.toString()) : false;
    };
    const getSelectedCount = (attributeCode)=>{
        const filter = currentFilters.find((f)=>f.key === attributeCode);
        return filter ? filter.value.split(',').length : 0;
    };
    const getFilteredOptions = (attribute)=>{
        const searchTerm = searchTerms[attribute.attributeCode] || '';
        if (!searchTerm) return attribute.options;
        return attribute.options.filter((option)=>option.optionText.toLowerCase().includes(searchTerm.toLowerCase()));
    };
    const toggleCollapse = (attributeCode)=>{
        setCollapsedAttributes((prev)=>({
                ...prev,
                [attributeCode]: !prev[attributeCode]
            }));
    };
    const clearAttributeFilter = (attributeCode)=>{
        const newFilters = currentFilters.filter((f)=>f.key !== attributeCode);
        updateFilter(newFilters);
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, availableAttributes.map((attribute)=>{
        const selectedCount = getSelectedCount(attribute.attributeCode);
        const filteredOptions = getFilteredOptions(attribute);
        const isCollapsed = collapsedAttributes[attribute.attributeCode];
        return /*#__PURE__*/ React.createElement("div", {
            key: attribute.attributeCode,
            className: "attribute__filter__section border-b border-border pb-2 mb-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "filter__header flex items-center justify-between mb-3"
        }, /*#__PURE__*/ React.createElement("button", {
            onClick: ()=>toggleCollapse(attribute.attributeCode),
            className: "flex items-center justify-between text-left flex-1 hover:text-primary transition-colors"
        }, /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, attribute.attributeName), /*#__PURE__*/ React.createElement("svg", {
            className: `w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`,
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
        }, /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M19 9l-7 7-7-7"
        }))), selectedCount > 0 && /*#__PURE__*/ React.createElement(Button, {
            variant: 'link',
            onClick: ()=>clearAttributeFilter(attribute.attributeCode),
            className: "hover:text-destructive text-sm transition-colors",
            title: "Clear all"
        }, "✕")), !isCollapsed && /*#__PURE__*/ React.createElement("div", {
            className: "filter__content"
        }, attribute.options.length > 5 && /*#__PURE__*/ React.createElement("div", {
            className: "mb-3"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            value: searchTerms[attribute.attributeCode] || '',
            onCheckedChange: (checked)=>setSearchTerms((prev)=>({
                        ...prev,
                        [attribute.attributeCode]: checked ? checked.toString() : ''
                    }))
        })), /*#__PURE__*/ React.createElement("div", {
            className: "attribute__options space-y-2 max-h-48 overflow-y-auto"
        }, filteredOptions.length > 0 ? filteredOptions.map((option)=>{
            const isSelected = isOptionSelected(attribute.attributeCode, option.optionId.toString());
            return /*#__PURE__*/ React.createElement("div", {
                key: option.optionId,
                className: `flex items-center space-x-2 cursor-pointer py-2`
            }, /*#__PURE__*/ React.createElement(Checkbox, {
                checked: isSelected,
                id: `${attribute.attributeCode}-${option.optionId}`,
                onCheckedChange: (checked)=>handleAttributeChange(attribute.attributeCode, option.optionId.toString(), checked)
            }), /*#__PURE__*/ React.createElement(Label, {
                htmlFor: `${attribute.attributeCode}-${option.optionId}`
            }, option.optionText));
        }) : /*#__PURE__*/ React.createElement("div", {
            className: "text-muted-foreground text-sm text-center py-4"
        }, _('No options found for "${code}"', {
            code: searchTerms[attribute.attributeCode]
        }))), !searchTerms[attribute.attributeCode] && attribute.options.length > 10 && /*#__PURE__*/ React.createElement(Button, {
            variant: 'link',
            className: "text-primary text-sm mt-2 hover:underline"
        }, _('Show all ${count} options', {
            count: attribute.options.length.toString()
        }))));
    }));
};
