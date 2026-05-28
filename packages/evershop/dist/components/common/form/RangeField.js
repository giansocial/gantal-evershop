import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function RangeField({ name, label, error, wrapperClassName, helperText, required, validation, showValue = true, defaultValue, className, min = 0, max = 100, step = 1, ...props }) {
    const { register, formState: { errors }, watch } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const value = watch(name) || min;
    const { valueAsDate, pattern, ...cleanValidation } = validation || {};
    const validationRules = {
        ...cleanValidation,
        ...required && {
            required: _('${field} is required', {
                field: label || name
            })
        },
        valueAsNumber: true
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: `form-field ${wrapperClassName} ${fieldError ? 'error' : ''}`
    }, label && /*#__PURE__*/ React.createElement("label", {
        htmlFor: fieldId
    }, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive"
    }, "*"), showValue && /*#__PURE__*/ React.createElement("span", {
        className: "range-value"
    }, "(", value, ")"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    })), /*#__PURE__*/ React.createElement("input", {
        id: fieldId,
        type: "range",
        min: min,
        max: max,
        step: step,
        ...register(name, validationRules),
        className: className,
        "aria-invalid": fieldError !== undefined ? 'true' : 'false',
        "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
        ...props
    }), /*#__PURE__*/ React.createElement("div", {
        className: "range-labels"
    }, /*#__PURE__*/ React.createElement("span", null, min), /*#__PURE__*/ React.createElement("span", null, max)), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
