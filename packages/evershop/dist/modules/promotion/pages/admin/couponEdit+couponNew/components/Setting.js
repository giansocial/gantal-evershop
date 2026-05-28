import { DateField } from '@components/common/form/DateField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import React from 'react';
export const Setting = ({ discountAmount, startDate, endDate })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5 form-field-container"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "discount_amount",
        defaultValue: discountAmount,
        placeholder: "Discount amount",
        required: true,
        label: "Discount amount",
        validation: {
            required: 'Discount amount is required'
        }
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(DateField, {
        name: "start_date",
        label: "Start date",
        placeholder: "Start date",
        defaultValue: startDate
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(DateField, {
        placeholder: "End date",
        name: "end_date",
        label: "End date",
        defaultValue: endDate
    })));
};
