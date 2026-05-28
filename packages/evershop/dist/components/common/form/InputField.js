import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@components/common/ui/InputGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function InputField({ name, label, error, helperText, required, validation, wrapperClassName, className, type = 'text', prefixIcon, suffixIcon, defaultValue, ...props }) {
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
    const renderInput = ()=>/*#__PURE__*/ React.createElement(Controller, {
            name: name,
            control: control,
            defaultValue: defaultValue ?? '',
            rules: validationRules,
            render: ({ field })=>/*#__PURE__*/ React.createElement(InputGroupInput, {
                    ...field,
                    id: fieldId,
                    type: type,
                    "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                    "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
                    ...props
                })
        });
    // Special case: hidden inputs don't need labels or error messages
    if (type === 'hidden') {
        return /*#__PURE__*/ React.createElement("div", null, renderInput(), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
    }
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
    }))), /*#__PURE__*/ React.createElement(InputGroup, null, renderInput(), prefixIcon && /*#__PURE__*/ React.createElement(InputGroupAddon, {
        align: 'inline-start'
    }, prefixIcon), suffixIcon && /*#__PURE__*/ React.createElement(InputGroupAddon, {
        align: 'inline-end'
    }, suffixIcon)), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
