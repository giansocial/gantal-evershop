import { Button } from '@components/common/ui/Button.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
const FormButtons = ({ cancelUrl, formId })=>{
    const { formState: { isSubmitting } } = useFormContext();
    return /*#__PURE__*/ React.createElement("div", {
        className: "form-submit-button flex border-t border-border mt-4 pt-4 justify-between"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: "destructive",
        onClick: ()=>{
            window.location.href = cancelUrl;
        }
    }, "Cancel"), /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>{
            document.getElementById(formId).dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: isSubmitting
    }, "Save"));
};
export { FormButtons };
