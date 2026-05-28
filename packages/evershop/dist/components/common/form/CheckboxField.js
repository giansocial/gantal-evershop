import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Field, FieldError, FieldLabel, FieldLegend } from '@components/common/ui/Field.js';
import { Label } from '@components/common/ui/Label.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function CheckboxField({ name, label, error, wrapperClassName, helperText, required, validation, options, defaultValue, direction = 'vertical', className, disabled, ...props }) {
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
    const containerClass = direction === 'horizontal' ? 'checkbox-group horizontal' : 'checkbox-group';
    if (!options || options.length === 0) {
        return /*#__PURE__*/ React.createElement(Field, {
            "data-invalid": fieldError ? 'true' : 'false',
            className: wrapperClassName
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement(Controller, {
            name: name,
            control: control,
            rules: validationRules,
            defaultValue: defaultValue,
            render: ({ field })=>/*#__PURE__*/ React.createElement(Checkbox, {
                    id: fieldId,
                    checked: !!field.value,
                    onCheckedChange: (checked)=>field.onChange(checked),
                    onBlur: field.onBlur,
                    disabled: disabled,
                    className: className,
                    "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                    "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined
                })
        }), label && /*#__PURE__*/ React.createElement(FieldLabel, {
            htmlFor: fieldId,
            className: "text-sm font-normal cursor-pointer"
        }, label, required && /*#__PURE__*/ React.createElement("span", {
            className: "text-destructive"
        }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
            content: helperText,
            position: "top"
        }))), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
    }
    return /*#__PURE__*/ React.createElement(Field, {
        "data-invalid": fieldError ? 'true' : 'false',
        className: wrapperClassName
    }, label && /*#__PURE__*/ React.createElement("fieldset", null, /*#__PURE__*/ React.createElement(FieldLegend, null, /*#__PURE__*/ React.createElement(React.Fragment, null, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    }))), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field })=>/*#__PURE__*/ React.createElement("div", {
                className: containerClass
            }, options.map((option, index)=>{
                const isChecked = Array.isArray(field.value) ? field.value.includes(option.value) : false;
                return /*#__PURE__*/ React.createElement("div", {
                    key: option.value,
                    className: "flex items-center gap-2"
                }, /*#__PURE__*/ React.createElement(Checkbox, {
                    id: `${fieldId}-${index}`,
                    disabled: disabled || option.disabled,
                    checked: isChecked,
                    onCheckedChange: (checked)=>{
                        const currentValues = Array.isArray(field.value) ? field.value : [];
                        if (checked) {
                            field.onChange([
                                ...currentValues,
                                option.value
                            ]);
                        } else {
                            field.onChange(currentValues.filter((val)=>val !== option.value));
                        }
                    },
                    onBlur: field.onBlur,
                    className: className,
                    "aria-invalid": fieldError ? 'true' : 'false',
                    "aria-describedby": fieldError ? `${fieldId}-error` : undefined
                }), /*#__PURE__*/ React.createElement(Label, {
                    htmlFor: `${fieldId}-${index}`,
                    className: `text-sm cursor-pointer ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`
                }, option.label));
            }))
    })), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
