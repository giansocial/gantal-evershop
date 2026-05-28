import React from 'react';
import { AttributeGroupConditionValueSelector } from './AttributeGroupConditionValueSelector.js';
import { CategoryConditionValueSelector } from './CategoryConditionValueSelector.js';
import { CollectionConditionValueSelector } from './CollectionConditionValueSelector.js';
import { Operator } from './conditionCriterias.js';
import { PriceConditionValueSelector } from './PriceConditionValueSelector.js';
import { SkuConditionValueSelector } from './SkuConditionValueSelector.js';
export const ValueSelector = ({ condition, updateCondition })=>{
    switch(condition.key){
        case 'category':
            return /*#__PURE__*/ React.createElement(CategoryConditionValueSelector, {
                selectedValues: Array.isArray(condition.value) ? condition.value.map(Number) : [],
                updateCondition: updateCondition,
                isMulti: condition.operator === Operator.IN || condition.operator === Operator.NOT_IN
            });
        case 'collection':
            return /*#__PURE__*/ React.createElement(CollectionConditionValueSelector, {
                selectedValues: Array.isArray(condition.value) ? condition.value.map(Number) : [],
                updateCondition: updateCondition,
                isMulti: condition.operator === Operator.IN || condition.operator === Operator.NOT_IN
            });
        case 'sku':
            return /*#__PURE__*/ React.createElement(SkuConditionValueSelector, {
                selectedValues: Array.isArray(condition.value) ? condition.value.map(String) : [],
                updateCondition: updateCondition,
                isMulti: condition.operator === Operator.IN || condition.operator === Operator.NOT_IN
            });
        case 'attribute_group':
            return /*#__PURE__*/ React.createElement(AttributeGroupConditionValueSelector, {
                selectedValues: Array.isArray(condition.value) ? condition.value.map(Number) : [],
                updateCondition: updateCondition,
                isMulti: condition.operator === Operator.IN || condition.operator === Operator.NOT_IN
            });
        case 'price':
            return /*#__PURE__*/ React.createElement(PriceConditionValueSelector, {
                updateCondition: updateCondition,
                condition: {
                    ...condition,
                    value: Number(condition.value)
                }
            });
        default:
            return null;
    }
};
