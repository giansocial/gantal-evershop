import Spinner from '@components/admin/Spinner.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import { Button } from '@components/common/ui/Button.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from 'urql';
const MethodsQuery = `
  query Methods {
    shippingMethods {
      value: shippingMethodId
      label: name
    }
    createShippingMethodApi: url(routeId: "createShippingMethod")
  }
`;
function RateForm({ saveRateApi, closeModal, getTaxClasses, rate }) {
    const form = useForm({
        shouldUnregister: true
    });
    const [saving, setSaving] = React.useState(false);
    const [result] = useQuery({
        query: MethodsQuery
    });
    if (result.fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-center p-2"
        }, /*#__PURE__*/ React.createElement(Spinner, {
            width: 25,
            height: 25
        }));
    }
    return /*#__PURE__*/ React.createElement(Form, {
        form: form,
        id: "taxRateForm",
        method: rate ? 'PATCH' : 'POST',
        action: saveRateApi,
        submitBtn: false,
        onError: (error)=>{
            toast.error(error);
            setSaving(false);
        },
        onSuccess: async (response)=>{
            if (!response.error) {
                await getTaxClasses({
                    requestPolicy: 'network-only'
                });
                closeModal();
                toast.success('Tax rate has been saved successfully!');
            } else {}
            setSaving(false);
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "py-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        placeholder: "Name",
        required: true,
        validation: {
            required: 'Name is required'
        },
        label: "Name",
        defaultValue: rate?.name
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "rate",
        label: "Rate",
        placeholder: "Rate",
        required: true,
        validation: {
            required: 'Rate is required'
        },
        defaultValue: rate?.rate
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "py-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "country",
        label: "Country",
        placeholder: "Country",
        required: true,
        validation: {
            required: 'Country is required'
        },
        defaultValue: rate?.country,
        helperText: 'Country code (e.g., "US"). Use "*" for all countries.'
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "province",
        label: "Provinces",
        placeholder: "Provinces",
        required: true,
        validation: {
            required: 'Provinces is required'
        },
        defaultValue: rate?.province,
        helperText: 'Province code (e.g., "CA"). Use "*" for all provinces.'
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "postcode",
        label: "Postcode",
        placeholder: "Postcode",
        required: true,
        validation: {
            required: 'Postcode is required'
        },
        defaultValue: rate?.postcode,
        helperText: 'Postcode (e.g., "90210"). Empty for all postcodes.'
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5 mt-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(ToggleField, {
        name: "is_compound",
        label: "Is compound",
        defaultValue: rate?.isCompound || false
    })), /*#__PURE__*/ React.createElement("div", null)), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5 mt-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "priority",
        label: "Priority",
        placeholder: "Priority",
        validation: {
            required: 'Priority is required'
        },
        required: true,
        defaultValue: rate?.priority
    })), /*#__PURE__*/ React.createElement("div", null))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "secondary",
        onClick: closeModal
    }, "Cancel"), /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "default",
        onClick: async ()=>{
            const result = await form.trigger();
            if (!result) {
                return;
            }
            setSaving(true);
            document.getElementById('taxRateForm').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: saving
    }, "Save")));
}
export { RateForm };
