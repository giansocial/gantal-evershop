import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/common/ui/Select.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function SelectField({ name, label, error, helperText, required, validation, options, placeholder, wrapperClassName, className, defaultValue, disabled, id, onChange: onChangeCallback }) {
    const { control, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = id || `field-${name}`;
    const hasDefaultValue = defaultValue !== undefined && defaultValue !== null && defaultValue !== '';
    const validationRules = {
        ...validation,
        ...required && !validation?.required && {
            required: {
                value: true,
                message: _('${field} is required', {
                    field: label || name
                })
            },
            validate: {
                ...validation?.validate,
                notEmpty: (value)=>{
                    if (required && (value === '' || value === null || value === undefined)) {
                        return _('${field} is required', {
                            field: label || name
                        });
                    }
                    return true;
                }
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
        defaultValue: hasDefaultValue ? defaultValue : '',
        render: ({ field })=>/*#__PURE__*/ React.createElement(Select, {
                value: options.find((o)=>o.value === field.value) ?? null,
                onValueChange: (value)=>{
                    const newValue = value?.value === '' ? '' : value?.value;
                    field.onChange(newValue);
                    if (onChangeCallback && value !== null) {
                        onChangeCallback(value.value);
                    }
                },
                disabled: disabled
            }, /*#__PURE__*/ React.createElement(SelectTrigger, {
                id: fieldId,
                className: className,
                "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined
            }, /*#__PURE__*/ React.createElement(SelectValue, null, options.find((o)=>String(o.value) === String(field.value))?.label || placeholder)), /*#__PURE__*/ React.createElement(SelectContent, null, placeholder && /*#__PURE__*/ React.createElement(SelectItem, {
                value: "",
                disabled: true
            }, placeholder), options.map((option)=>/*#__PURE__*/ React.createElement(SelectItem, {
                    key: option.value,
                    value: option,
                    disabled: option.disabled
                }, option.label))))
    }), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
