import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { Button } from '@components/common/ui/Button.js';
import React from 'react';
function TaxClassForm({ saveTaxClassApi, closeModal, getTaxClasses }) {
    return /*#__PURE__*/ React.createElement(Form, {
        id: "createTaxClass",
        method: "POST",
        action: saveTaxClassApi,
        submitBtn: false,
        onSuccess: async ()=>{
            await getTaxClasses({
                requestPolicy: 'network-only'
            });
            closeModal();
        }
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        type: "text",
        label: "Tax class name",
        defaultValue: "",
        placeholder: "Enter tax class name",
        required: true,
        validation: {
            required: 'Tax class name is required'
        }
    }), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2 mt-3"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "secondary",
        onClick: closeModal
    }, "Cancel"), /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "default",
        onClick: ()=>{
            document.getElementById('createTaxClass').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        }
    }, "Save")));
}
export { TaxClassForm };
