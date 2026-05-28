import { CheckboxField } from '@components/common/form/CheckboxField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
export default function Shipping({ product, setting }) {
    const shipping = product || {
        noShippingRequired: undefined,
        weight: undefined
    };
    const { control } = useFormContext();
    const noShippingRequired = useWatch({
        control,
        name: 'no_shipping_required',
        defaultValue: shipping.noShippingRequired !== null && shipping.noShippingRequired || false
    });
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Shipping"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the shipping settings of the product.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(CheckboxField, {
        name: "no_shipping_required",
        label: "No shipping required?",
        defaultValue: shipping.noShippingRequired === true,
        helperText: "Select this option if the product is a digital product or service that does not require shipping.",
        wrapperClassName: "mb-0"
    })), /*#__PURE__*/ React.createElement(CardContent, null, !noShippingRequired && /*#__PURE__*/ React.createElement(NumberField, {
        name: "weight",
        placeholder: "Enter weight",
        label: `Weight`,
        defaultValue: shipping.weight?.value,
        unit: setting?.weightUnit,
        required: true,
        validation: {
            min: {
                value: 0,
                message: 'Weight must be a positive number'
            }
        },
        helperText: 'Weight must be a positive number'
    }), noShippingRequired && /*#__PURE__*/ React.createElement(NumberField, {
        name: "weight_no_shipping",
        placeholder: "Enter weight",
        label: `Weight`,
        defaultValue: shipping.weight?.value,
        unit: setting?.weightUnit,
        disabled: true,
        helperText: 'Weight must be a positive number'
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      weight {
        value
        unit
      }
      noShippingRequired
    }
    setting {
      weightUnit
    }
  }
`;
