import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@components/common/ui/InputGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function PasswordField({ name, label, error, helperText, required, minLength = 6, showToggle = false, validation, wrapperClassName, className, defaultValue, prefixIcon, suffixIcon, ...props }) {
    const { control, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const [showPassword, setShowPassword] = React.useState(false);
    const validationRules = {
        ...validation,
        ...required && !validation?.required && {
            required: _('${field} is required', {
                field: label || name
            })
        },
        minLength: validation?.minLength || {
            value: minLength,
            message: _('Password must be at least ${minLength} characters long', {
                minLength: minLength.toString()
            })
        }
    };
    const renderToggleButton = ()=>showToggle ? /*#__PURE__*/ React.createElement("button", {
            type: "button",
            className: "transition-colors",
            onClick: ()=>setShowPassword(!showPassword),
            tabIndex: -1
        }, showPassword ? /*#__PURE__*/ React.createElement(Eye, {
            className: "h-5 w-5"
        }) : /*#__PURE__*/ React.createElement(EyeClosed, {
            className: "h-5 w-5"
        })) : null;
    const renderInput = ()=>/*#__PURE__*/ React.createElement(Controller, {
            name: name,
            control: control,
            defaultValue: defaultValue,
            rules: validationRules,
            render: ({ field })=>/*#__PURE__*/ React.createElement(InputGroupInput, {
                    ...field,
                    value: field.value ?? '',
                    id: fieldId,
                    type: showToggle && showPassword ? 'text' : 'password',
                    "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                    "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
                    ...props
                })
        });
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
    }, prefixIcon), (suffixIcon || showToggle) && /*#__PURE__*/ React.createElement(InputGroupAddon, {
        align: 'inline-end'
    }, suffixIcon || renderToggleButton())), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
