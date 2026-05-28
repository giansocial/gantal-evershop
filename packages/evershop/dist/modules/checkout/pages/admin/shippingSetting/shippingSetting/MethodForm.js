import Spinner from '@components/admin/Spinner.js';
import { Form, useFormContext } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { ReactSelectCreatableField } from '@components/common/form/ReactSelectCreatableField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import { Button } from '@components/common/ui/Button.js';
import { Label } from '@components/common/ui/Label.js';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from 'urql';
import { PriceBasedPrice } from './PriceBasedPrice.js';
import { WeightBasedPrice } from './WeightBasedPrice.js';
const MethodsQuery = `
  query Methods {
    shippingMethods {
      value: uuid
      label: name
      updateApi
    }
    createShippingMethodApi: url(routeId: "createShippingMethod")
  }
`;
function Condition({ method }) {
    const { watch, setValue } = useFormContext();
    const type = watch('condition_type', method?.conditionType || 'price');
    useEffect(()=>{
        setValue('condition_type', method?.conditionType || 'price');
    }, [
        method
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "pt-2 space-y-3"
    }, /*#__PURE__*/ React.createElement(Label, null, "Conditions"), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "condition_type",
        options: [
            {
                value: 'price',
                label: 'Based on order price'
            },
            {
                value: 'weight',
                label: 'Based on order weight'
            }
        ],
        defaultValue: type
    })), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "min",
        label: type === 'price' ? 'Minimum order price' : 'Minimum order weight',
        placeholder: type === 'price' ? 'Minimum order price' : 'Minimum order weight',
        defaultValue: method?.min,
        required: true,
        validation: {
            required: 'Min is required'
        },
        helperText: "This is the minimum order price or weight to apply this condition."
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "max",
        label: type === 'price' ? 'Maximum order price' : 'Maximum order weight',
        placeholder: type === 'price' ? 'Maximum order price' : 'Maximum order weight',
        defaultValue: method?.max,
        validation: {
            required: 'Max is required'
        },
        helperText: "This is the maximum order price or weight to apply this condition."
    }))));
}
const getType = (method)=>{
    if (method?.calculateApi) {
        return 'api';
    }
    if (method?.priceBasedCost) {
        return 'price_based_rate';
    }
    if (method?.weightBasedCost) {
        return 'weight_based_rate';
    }
    return 'flat_rate';
};
const CostSetting = ({ method })=>{
    const { watch } = useFormContext();
    const typeWatch = watch('calculation_type');
    return /*#__PURE__*/ React.createElement(React.Fragment, null, typeWatch === 'flat_rate' && /*#__PURE__*/ React.createElement(NumberField, {
        label: "Flat rate cost",
        name: "cost",
        placeholder: "Shipping cost",
        required: true,
        validation: {
            required: 'Shipping cost is required'
        },
        helperText: "This is the flat rate cost for shipping.",
        defaultValue: method?.cost?.value
    }), typeWatch === 'price_based_rate' && /*#__PURE__*/ React.createElement(PriceBasedPrice, {
        lines: method?.priceBasedCost || []
    }), typeWatch === 'weight_based_rate' && /*#__PURE__*/ React.createElement(WeightBasedPrice, {
        lines: method?.weightBasedCost || []
    }), typeWatch === 'api' && /*#__PURE__*/ React.createElement(InputField, {
        name: "calculate_api",
        placeholder: "Calculate API endpoint",
        required: true,
        validation: {
            required: 'Calculate API is required'
        },
        defaultValue: method?.calculateApi || '',
        helperText: "This is the ID of an internal api to calculate shipping cost."
    }));
};
function MethodForm({ saveMethodApi, onSuccess, reload, method }) {
    const form = useForm({
        shouldUnregister: true
    });
    const [shippingMethod, setShippingMethod] = React.useState({
        ...method,
        updatingName: false
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasCondition, setHasCondition] = React.useState(!!method?.conditionType);
    const [result, reexecuteQuery] = useQuery({
        query: MethodsQuery
    });
    const handleCreate = async (inputValue)=>{
        setIsLoading(true);
        const response = await fetch(result.data.createShippingMethodApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                name: inputValue
            })
        });
        const data = await response.json();
        if (response.ok) {
            await reexecuteQuery({
                requestPolicy: 'network-only'
            });
            form.setValue('method_id', data.data.uuid);
        } else {
            toast.error(data.error.message);
        }
        setIsLoading(false);
    };
    if (result.fetching && !result.data) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-center p-2"
        }, /*#__PURE__*/ React.createElement(Spinner, {
            width: 25,
            height: 25
        }));
    }
    // Find the updateApi for the current method from the query results
    const methodUpdateApi = method ? result.data.shippingMethods.find((m)=>m.value === method.uuid)?.updateApi : null;
    return /*#__PURE__*/ React.createElement(Form, {
        id: "shippingMethodForm",
        method: method ? 'PATCH' : 'POST',
        action: saveMethodApi,
        submitBtn: false,
        onError: (error)=>{
            toast.error(error);
            setIsLoading(false);
        },
        onSuccess: async (response)=>{
            setIsLoading(false);
            if (!response.error) {
                reload();
                onSuccess && onSuccess();
                toast.success('Shipping method saved successfully');
            } else {
                toast.error(response.error.message);
            }
        },
        form: form
    }, /*#__PURE__*/ React.createElement("div", {
        className: "divide-y space-y-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "border-border py-3 space-y-3"
    }, !method ? /*#__PURE__*/ React.createElement(ReactSelectCreatableField, {
        name: "method_id",
        label: "Shipping Method",
        placeholder: "Select or create shipping method",
        isClearable: true,
        isDisabled: isLoading,
        isLoading: isLoading,
        onCreateOption: handleCreate,
        options: result.data.shippingMethods,
        required: true,
        validation: {
            required: 'Shipping method is required'
        }
    }) : /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-2 items-end"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex-1"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "method_name",
        label: "Method name",
        placeholder: "Method name",
        required: true,
        defaultValue: method?.name || '',
        disabled: !shippingMethod.updatingName,
        validation: {
            required: 'Method name is required'
        }
    })), /*#__PURE__*/ React.createElement(Button, {
        variant: shippingMethod.updatingName ? 'default' : 'outline',
        onClick: async (e)=>{
            e.preventDefault();
            if (shippingMethod.updatingName === true) {
                if (!methodUpdateApi) {
                    toast.error('Update API not found');
                    return;
                }
                setIsLoading(true);
                const methodName = form.getValues('method_name');
                const response = await fetch(methodUpdateApi, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        name: methodName
                    })
                });
                const data = await response.json();
                setIsLoading(false);
                if (response.ok) {
                    setShippingMethod({
                        ...shippingMethod,
                        name: data.data.name,
                        updatingName: false
                    });
                    toast.success('Method name updated successfully');
                } else {
                    toast.error(data.error.message);
                }
            } else {
                setShippingMethod({
                    ...shippingMethod,
                    updatingName: true
                });
            }
        },
        isLoading: isLoading
    }, shippingMethod.updatingName ? 'Save' : 'Edit name'))), /*#__PURE__*/ React.createElement(ToggleField, {
        name: "is_enabled",
        label: "Status",
        trueLabel: "Enable",
        falseLabel: "Disable",
        defaultValue: method?.isEnabled || 0
    }), method && /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "method_id",
        defaultValue: method?.uuid || ''
    })), /*#__PURE__*/ React.createElement("div", {
        className: "border-border py-3 space-y-3"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "calculation_type",
        label: "Calculation Type",
        options: [
            {
                label: 'Flat rate',
                value: 'flat_rate'
            },
            {
                label: 'Price based rate',
                value: 'price_based_rate'
            },
            {
                label: 'Weight based rate',
                value: 'weight_based_rate'
            },
            {
                label: 'API calculate',
                value: 'api'
            }
        ],
        defaultValue: getType(method || null)
    }), /*#__PURE__*/ React.createElement(CostSetting, {
        method: method || null
    }), !hasCondition && /*#__PURE__*/ React.createElement(InputField, {
        name: "condition_type",
        type: "hidden",
        defaultValue: "none"
    }), hasCondition && /*#__PURE__*/ React.createElement(Condition, {
        method: method
    }), /*#__PURE__*/ React.createElement(Button, {
        variant: hasCondition ? 'destructive' : 'outline',
        onClick: (e)=>{
            e.preventDefault();
            setHasCondition(!hasCondition);
        }
    }, hasCondition ? 'Remove condition' : 'Add condition')), /*#__PURE__*/ React.createElement("div", {
        className: "border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "default",
        onClick: async ()=>{
            const result = await form.trigger();
            if (!result) {
                return;
            }
            setIsLoading(true);
            document.getElementById('shippingMethodForm').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: isLoading,
        disabled: shippingMethod.updatingName
    }, "Save")))));
}
export { MethodForm };
