import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
export function Form({ form: externalForm, action, method = 'POST', formOptions, onSubmit, onSuccess, onError, successMessage = _('Saved successfully!'), errorMessage = _('Something went wrong! Please try again.'), submitBtn = true, submitBtnText = _('Save'), loading = false, children, className, noValidate = true, ...props }) {
    const theForm = externalForm || useForm({
        shouldUnregister: true,
        shouldFocusError: false,
        ...formOptions
    });
    const { handleSubmit, formState: { isSubmitting } } = theForm;
    const defaultSubmit = async (data)=>{
        if (!action) {
            return;
        }
        try {
            const response = await fetch(action, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.error) {
                if (onError) {
                    onError(result.error.message, data);
                } else {
                    toast.error(result.error.message || errorMessage);
                }
            } else if (onSuccess) {
                onSuccess(result, data);
            } else {
                toast.success(successMessage);
            }
        } catch (error) {
            if (onError) {
                onError(errorMessage || (error instanceof Error ? error.message : ''), data);
            } else {
                toast.error(errorMessage || (error instanceof Error ? error.message : ''));
            }
        }
    };
    const [canFocus, setCanFocus] = useState(true);
    const onValidationError = ()=>{
        setCanFocus(true);
    };
    useEffect(()=>{
        if (theForm.formState.errors && canFocus) {
            const elements = Array.from(document.querySelectorAll('[aria-invalid="true"]'));
            elements.sort((a, b)=>a.getBoundingClientRect().top - b.getBoundingClientRect().top);
            if (elements.length > 0) {
                const errorElement = elements[0];
                errorElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                errorElement.focus({
                    preventScroll: true
                });
                setCanFocus(false);
            }
        }
    }, [
        theForm.formState,
        canFocus
    ]);
    const handleFormSubmit = onSubmit || defaultSubmit;
    return /*#__PURE__*/ React.createElement(FormProvider, theForm, /*#__PURE__*/ React.createElement("form", {
        onSubmit: handleSubmit(handleFormSubmit, onValidationError),
        className: className,
        noValidate: noValidate,
        ...props
    }, /*#__PURE__*/ React.createElement("fieldset", {
        disabled: loading
    }, children), submitBtn && /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: submitBtnText,
        type: "submit",
        onClick: ()=>{
            handleSubmit(handleFormSubmit, onValidationError)();
        },
        isLoading: isSubmitting || loading
    }, submitBtnText))));
}
export { useFormContext } from 'react-hook-form';
export { Controller } from 'react-hook-form';
