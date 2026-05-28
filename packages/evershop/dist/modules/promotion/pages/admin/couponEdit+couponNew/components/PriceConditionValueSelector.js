import { NumberField } from '@components/common/form/NumberField.js';
import React from 'react';
export const PriceConditionValueSelector = ({ updateCondition, condition })=>{
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: `dummy__` + Math.random().toString(36).substring(2, 15),
        wrapperClassName: "form-field mb-0",
        defaultValue: condition.value,
        placeholder: "Value",
        required: true,
        validation: {
            required: 'Value is required'
        },
        onChange: (value)=>{
            updateCondition(value || 0);
        }
    }));
};
