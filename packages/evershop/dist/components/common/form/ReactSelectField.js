import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { cn } from '@evershop/evershop/lib/util/cn';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
export function ReactSelectField({ name, label, error, wrapperClassName = 'form-field', helperText, required, validation, options, className, isMulti = false, defaultValue, ...selectProps }) {
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
        className: wrapperClassName,
        id: `field-${name}`
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
        defaultValue: defaultValue,
        render: ({ field })=>/*#__PURE__*/ React.createElement(Select, {
                ...field,
                ...selectProps,
                inputId: fieldId,
                options: options,
                isMulti: isMulti,
                className: cn(className),
                value: isMulti ? options.filter((option)=>(field.value || defaultValue || [])?.includes(option.value)) : options.find((option)=>option.value === (field.value ?? defaultValue)) || null,
                onChange: (selectedOption)=>{
                    if (isMulti) {
                        const values = selectedOption ? selectedOption.map((option)=>option.value) : [];
                        field.onChange(values);
                    } else {
                        field.onChange(selectedOption ? selectedOption.value : null);
                    }
                },
                classNamePrefix: "react-select",
                "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
                classNames: {
                    control: (state)=>cn('min-h-auto border border-input rounded-md shadow-xs transition-[color,box-shadow]', state.isFocused && 'border-ring ring-[3px] ring-ring/50', fieldError && 'border-destructive ring-[3px] ring-destructive/20'),
                    input: ()=>'outline-none shadow-none',
                    menu: ()=>'bg-popover border border-input rounded-md shadow-md',
                    option: (state)=>cn('px-3 py-2 cursor-pointer', state.isSelected && 'bg-primary text-primary-foreground', state.isFocused && !state.isSelected && 'bg-accent')
                }
            })
    }), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
