import { useAppState } from '@components/common/context/app';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import PropTypes from 'prop-types';
import React from 'react';
export default function BestCustomers({ listUrl, setting }) {
    const context = useAppState();
    const customers = context.bestCustomers || [];
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Best customers"), /*#__PURE__*/ React.createElement(CardDescription, null, "A list of customers who have placed the most orders"), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement("a", {
        href: listUrl,
        className: "text-sm text-primary hover:underline"
    }, "View all customers"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, "Full name"), /*#__PURE__*/ React.createElement(TableHead, null, "Orders"), /*#__PURE__*/ React.createElement(TableHead, null, "Total"))), /*#__PURE__*/ React.createElement(TableBody, null, customers.map((c, i)=>{
        const grandTotal = new Intl.NumberFormat('en', {
            style: 'currency',
            currency: setting.storeCurrency
        }).format(c.total);
        return /*#__PURE__*/ React.createElement(TableRow, {
            key: i
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("a", {
            href: c.editUrl || ''
        }, c.full_name)), /*#__PURE__*/ React.createElement(TableCell, null, c.orders), /*#__PURE__*/ React.createElement(TableCell, null, grandTotal));
    })))));
}
BestCustomers.propTypes = {
    setting: PropTypes.shape({
        storeCurrency: PropTypes.string
    }).isRequired,
    listUrl: PropTypes.string.isRequired
};
export const query = `
  query Query {
    setting {
      storeCurrency
    }
    listUrl: url(routeId: "productGrid")
  }
`;
