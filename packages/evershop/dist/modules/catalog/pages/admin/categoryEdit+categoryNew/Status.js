import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function Status({ category }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Status"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the status settings of the category.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "status",
        label: "Status",
        options: [
            {
                label: 'Disabled',
                value: 0
            },
            {
                label: 'Enabled',
                value: 1
            }
        ],
        defaultValue: category?.status === 0 ? 0 : 1,
        validation: {
            required: 'This field is required'
        }
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-6 border-t border-border"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "include_in_nav",
        label: "Include in Store Menu?",
        options: [
            {
                label: 'No',
                value: 0
            },
            {
                label: 'Yes',
                value: 1
            }
        ],
        defaultValue: category?.includeInNav === 0 ? 0 : 1,
        validation: {
            required: 'This field is required'
        }
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-6 border-t border-border"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "show_products",
        label: "Show products?",
        options: [
            {
                label: 'No',
                value: 0
            },
            {
                label: 'Yes',
                value: 1
            }
        ],
        defaultValue: category?.showProducts === 0 ? 0 : 1,
        validation: {
            required: 'This field is required'
        }
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    category(id: getContextValue("categoryId", null)) {
      status
      includeInNav
      showProducts
    }
  }
`;
