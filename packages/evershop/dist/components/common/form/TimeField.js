import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { InputGroup, InputGroupInput } from '@components/common/ui/InputGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function TimeField({ name, label, error, wrapperClassName, helperText, required, validation, className, min, max, step, ...props }) {
    const { control, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const { valueAsNumber, valueAsDate, ...cleanValidation } = validation || {};
    const validationRules = {
        ...cleanValidation,
        ...required && {
            required: _('${field} is required', {
                field: label || name
            })
        },
        validate: {
            ...validation?.validate,
            minTime: (value)=>{
                if (!min || !value) return true;
                return value >= min || _('Time must be after ${min}', {
                    min: min.toString()
                });
            },
            maxTime: (value)=>{
                if (!max || !value) return true;
                return value <= max || _('Time must be before ${max}', {
                    max: max.toString()
                });
            }
        }
    };
    return /*#__PURE__*/ React.createElement(Field, {
        "data-invalid": fieldError ? 'true' : 'false',
        className: wrapperClassName
    }, label && /*#__PURE__*/ React.createElement(FieldLabel, {
        htmlFor: fieldId
    }, /*#__PURE__*/ React.createElement(React.Fragment, null, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    }))), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        render: ({ field })=>/*#__PURE__*/ React.createElement(InputGroup, null, /*#__PURE__*/ React.createElement(InputGroupInput, {
                ...field,
                value: field.value ?? '',
                id: fieldId,
                type: "time",
                min: min,
                max: max,
                step: step,
                className: className,
                "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
                ...props
            }))
    }), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
