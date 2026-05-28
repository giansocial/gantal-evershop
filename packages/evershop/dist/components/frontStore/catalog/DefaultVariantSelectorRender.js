import { Button } from '@components/common/ui/Button.js';
import React from 'react';
const DefaultVariantOptionItem = ({ option, attribute, isSelected, onSelect })=>{
    let className = 'group ';
    if (isSelected) {
        className += 'selected';
    }
    if (option.available === false) {
        className += 'un-available';
    }
    return /*#__PURE__*/ React.createElement("li", {
        key: option.optionId,
        className: className
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: isSelected ? 'default' : 'outline',
        onClick: async (e)=>{
            e.preventDefault();
            if (option.available === false) {
                return;
            }
            await onSelect(attribute.attributeCode, option.optionId);
        },
        className: 'group-[.selected]:border-primary'
    }, option.optionText));
};
const DefaultVariantAttribute = ({ attribute, options, onSelect, OptionItem = DefaultVariantOptionItem })=>{
    return /*#__PURE__*/ React.createElement("div", {
        key: attribute.attributeCode
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2 text-textSubdued uppercase"
    }, /*#__PURE__*/ React.createElement("span", null, attribute.attributeName)), /*#__PURE__*/ React.createElement("ul", {
        className: "variant-option-list flex justify-start gap-2 flex-wrap"
    }, options.map((option)=>/*#__PURE__*/ React.createElement(OptionItem, {
            key: option.optionId,
            option: option,
            attribute: attribute,
            isSelected: attribute.selected && attribute.selectedOption === option.optionId,
            onSelect: onSelect
        }))));
};
export { DefaultVariantAttribute, DefaultVariantOptionItem };
