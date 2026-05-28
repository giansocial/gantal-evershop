import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { Switch } from '@components/common/ui/Switch.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
export function ToggleField({ name, label, error, helperText, required, validation, wrapperClassName, disabled = false, defaultValue = false, trueValue = true, falseValue = false, trueLabel = 'Yes', falseLabel = 'No', size = 'default', onChange }) {
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
    }, label && /*#__PURE__*/ React.createElement(FieldLabel, {
        htmlFor: fieldId
    }, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive ml-1"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    })), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field })=>{
            const isActive = field.value === trueValue;
            return /*#__PURE__*/ React.createElement("div", {
                className: "flex items-center gap-3"
            }, /*#__PURE__*/ React.createElement(Switch, {
                id: fieldId,
                size: size,
                checked: isActive,
                onCheckedChange: (checked)=>{
                    const newValue = checked ? trueValue : falseValue;
                    field.onChange(newValue);
                    onChange?.(newValue);
                },
                disabled: disabled,
                "aria-invalid": fieldError ? 'true' : 'false',
                "aria-describedby": fieldError ? `${fieldId}-error` : undefined
            }), /*#__PURE__*/ React.createElement("span", {
                className: "text-sm text-muted-foreground"
            }, isActive ? trueLabel : falseLabel));
        }
    }), fieldError && /*#__PURE__*/ React.createElement(FieldError, {
        id: `${fieldId}-error`
    }, fieldError));
}
