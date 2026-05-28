import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { Field, FieldLabel } from '@components/common/ui/Field.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
export function ReactSelectCreatableField({ name, label, error, wrapperClassName = 'form-field', helperText, required, validation, options, className, isMulti = false, defaultValue, onCreateOption, formatCreateLabel = (inputValue)=>`Create "${inputValue}"`, ...selectProps }) {
    const { control, unregister, formState: { errors } } = useFormContext();
    const fieldId = `field-${name}`;
    const [dynamicOptions, setDynamicOptions] = React.useState(options);
    React.useEffect(()=>{
        setDynamicOptions(options);
    }, [
        options
    ]);
    React.useEffect(()=>{
        return ()=>{
            unregister(name);
        };
    }, [
        name,
        unregister
    ]);
    const validationRules = {
        ...validation,
        ...required && {
            required: _('${field} is required', {
                field: label || name
            })
        }
    };
    const fieldError = getNestedError(name, errors, error);
    return /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field, fieldState })=>{
            const handleCreateOption = (inputValue)=>{
                const newOption = {
                    value: inputValue.toLowerCase().replace(/\W/g, ''),
                    label: inputValue
                };
                const optionExists = dynamicOptions.some((option)=>option.value === newOption.value || option.label === newOption.label);
                if (!optionExists) {
                    setDynamicOptions((prev)=>{
                        const updated = [
                            ...prev,
                            newOption
                        ];
                        return updated;
                    });
                }
                if (onCreateOption) {
                    onCreateOption(inputValue);
                }
                if (isMulti) {
                    const currentValues = field.value || [];
                    if (!currentValues.includes(newOption.value)) {
                        const newValues = [
                            ...currentValues,
                            newOption.value
                        ];
                        field.onChange(newValues);
                    }
                } else {
                    field.onChange(newOption.value);
                }
            };
            return /*#__PURE__*/ React.createElement(Field, {
                "data-invalid": fieldError ? 'true' : 'false',
                className: wrapperClassName
            }, label && /*#__PURE__*/ React.createElement(FieldLabel, {
                htmlFor: fieldId
            }, label, required && /*#__PURE__*/ React.createElement("span", {
                className: "text-destructive"
            }, "*")), /*#__PURE__*/ React.createElement(CreatableSelect, {
                ...field,
                ...selectProps,
                inputId: fieldId,
                options: dynamicOptions,
                isMulti: isMulti,
                formatCreateLabel: formatCreateLabel,
                onCreateOption: handleCreateOption,
                value: isMulti ? dynamicOptions.filter((option)=>field.value?.includes(option.value)) : dynamicOptions.find((option)=>option.value === field.value) || null,
                onChange: (selectedOption)=>{
                    if (isMulti) {
                        const values = selectedOption ? selectedOption.map((option)=>option.value) : [];
                        field.onChange(values);
                    } else {
                        field.onChange(selectedOption ? selectedOption.value : null);
                    }
                },
                classNamePrefix: "react-select",
                styles: {
                    control: (base, state)=>({
                            ...base,
                            minHeight: 'auto',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            boxShadow: 'none',
                            transition: 'border-color 0.15s ease-in-out',
                            '&:hover': {
                                borderColor: '#d1d5db'
                            },
                            ...state.isFocused && {
                                borderColor: '#3b82f6',
                                boxShadow: '0 0 0 1px rgb(59, 130, 246)'
                            }
                        }),
                    input: (base)=>({
                            ...base,
                            '& input': {
                                boxShadow: 'none !important',
                                outline: 'none !important'
                            }
                        })
                }
            }), fieldError && /*#__PURE__*/ React.createElement("p", {
                id: `${fieldId}-error`,
                className: "field-error"
            }, fieldError), helperText && !fieldError && /*#__PURE__*/ React.createElement("p", {
                id: `${fieldId}-helper`,
                className: "field-helper"
            }, helperText));
        }
    });
}
