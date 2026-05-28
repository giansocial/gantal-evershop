import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { RadioGroup, RadioGroupItem } from '@components/common/ui/RadioGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function RadioGroupField({ name, options, label, error, wrapperClassName, helperText, className = '', required = false, disabled = false, validation, defaultValue, ...props }) {
    const { control, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...required && !validation?.required && {
            required: _('${field} is required', {
                field: label || name
            })
        }
    };
    return /*#__PURE__*/ React.createElement(Field, {
        "data-invalid": fieldError ? 'true' : 'false',
        className: wrapperClassName
    }, label && /*#__PURE__*/ React.createElement(FieldLabel, null, /*#__PURE__*/ React.createElement(React.Fragment, null, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    }))), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field })=>/*#__PURE__*/ React.createElement(RadioGroup, {
                value: String(field.value ?? ''),
                onValueChange: (value)=>{
                    const option = options.find((o)=>String(o.value) === value);
                    if (option) {
                        field.onChange(option.value);
                    }
                },
                className: className,
                "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined
            }, options.map((option)=>/*#__PURE__*/ React.createElement("div", {
                    key: option.value,
                    className: "flex items-center gap-2"
                }, /*#__PURE__*/ React.createElement(RadioGroupItem, {
                    value: String(option.value),
                    id: `${fieldId}-${option.value}`,
                    disabled: disabled || option.disabled
                }), /*#__PURE__*/ React.createElement(FieldLabel, {
                    htmlFor: `${fieldId}-${option.value}`,
                    className: `text-sm font-normal cursor-pointer ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`
                }, option.label))))
    }), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
