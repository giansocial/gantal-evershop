import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { Card, CardHeader, CardDescription, CardContent, CardFooter, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function Status({ product }) {
    return /*#__PURE__*/ React.createElement(Card, {
        className: "bg-popover"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Product Status"), /*#__PURE__*/ React.createElement(CardDescription, null, "Set the status and visibility of the product.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "status",
        label: "Status",
        options: [
            {
                value: 0,
                label: 'Disabled'
            },
            {
                value: 1,
                label: 'Enabled'
            }
        ],
        defaultValue: product?.status === 0 ? 0 : 1,
        required: true,
        helperText: "Disabled products will not be visible in the store and cannot be purchased."
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "border-t border-t-border pt-6"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "visibility",
        label: "Visibility",
        options: [
            {
                value: 0,
                label: 'Not visible individually'
            },
            {
                value: 1,
                label: 'Catalog, Search'
            }
        ],
        defaultValue: product?.visibility === 0 ? 0 : 1,
        required: true,
        helperText: "Visibility determines where the product appears in the store. It does not affect the saleability of the product."
    })), /*#__PURE__*/ React.createElement(CardFooter, null));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 10
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      status
      visibility
      category {
        value: categoryId
        label: name
      }
    }
  }
`;
