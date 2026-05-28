import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldError, FieldLabel } from '@components/common/ui/Field.js';
import { InputGroupInput } from '@components/common/ui/InputGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function FileField({ name, label, error, wrapperClassName, helperText, required, validation, maxSize, className, accept, multiple = false, ...props }) {
    const { control, formState: { errors }, watch } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const files = watch(name);
    const formatFileSize = (bytes)=>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const { valueAsNumber, valueAsDate, ...cleanValidation } = validation || {};
    const validationRules = {
        ...cleanValidation,
        ...required && !validation?.required && {
            required: _('${field} is required', {
                field: label || name
            })
        },
        validate: {
            ...validation?.validate,
            fileSize: (fileList)=>{
                if (!maxSize || !fileList || fileList.length === 0) return true;
                for(let i = 0; i < fileList.length; i++){
                    if (fileList[i].size > maxSize) {
                        return _('File size must be less than ${maxSize}', {
                            maxSize: formatFileSize(maxSize)
                        });
                    }
                }
                return true;
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
        render: ({ field: { onChange, value, ...field } })=>/*#__PURE__*/ React.createElement(InputGroupInput, {
                ...field,
                id: fieldId,
                type: "file",
                accept: accept,
                multiple: multiple,
                className: className,
                "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
                onChange: (e)=>{
                    onChange(e.target.files);
                },
                ...props
            })
    }), maxSize && /*#__PURE__*/ React.createElement("p", {
        className: "file-size-hint"
    }, "Maximum file size: ", formatFileSize(maxSize)), files && files.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "file-list"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "file-list-label"
    }, "Selected files:"), /*#__PURE__*/ React.createElement("ul", {
        className: "file-items"
    }, Array.from(files).map((file, index)=>/*#__PURE__*/ React.createElement("li", {
            key: index
        }, file.name, " (", formatFileSize(file.size), ")")))), fieldError && /*#__PURE__*/ React.createElement(FieldError, null, fieldError));
}
