import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/common/ui/Tabs.js';
import PropTypes from 'prop-types';
import React from 'react';
export function Results({ keyword, results = {} }) {
    const { customers = [], products = [], orders = [] } = results;
    // Determine which tabs have data
    const availableTabs = [];
    if (products.items.length > 0) availableTabs.push('products');
    if (customers.items.length > 0) availableTabs.push('customers');
    if (orders.items.length > 0) availableTabs.push('orders');
    // Default to first available tab
    const defaultTab = availableTabs[0] || 'products';
    return /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-xl font-semibold"
    }, 'Results for "', keyword, '"'), /*#__PURE__*/ React.createElement(Tabs, {
        defaultValue: defaultTab
    }, /*#__PURE__*/ React.createElement(TabsList, {
        variant: "line"
    }, products.items.length > 0 && /*#__PURE__*/ React.createElement(TabsTrigger, {
        value: "products"
    }, "Products (", products.items.length, ")"), customers.items.length > 0 && /*#__PURE__*/ React.createElement(TabsTrigger, {
        value: "customers"
    }, "Customers (", customers.items.length, ")"), orders.items.length > 0 && /*#__PURE__*/ React.createElement(TabsTrigger, {
        value: "orders"
    }, "Orders (", orders.items.length, ")")), products.items.length > 0 && /*#__PURE__*/ React.createElement(TabsContent, {
        value: "products",
        className: "max-h-60 overflow-y-auto"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col space-y-1"
    }, products.items.map((product, index)=>/*#__PURE__*/ React.createElement("a", {
            href: product.url,
            key: index,
            className: "rounded py-2 px-2 hover:bg-muted block"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-bold"
        }, product.name), /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-muted-foreground"
        }, "#", product.sku))))), customers.items.length > 0 && /*#__PURE__*/ React.createElement(TabsContent, {
        value: "customers",
        className: "max-h-60 overflow-y-auto"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col space-y-1"
    }, customers.items.map((customer, index)=>/*#__PURE__*/ React.createElement("a", {
            href: customer.url,
            key: index,
            className: "rounded py-2 px-2 hover:bg-muted block"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-bold"
        }, customer.fullName), /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-muted-foreground"
        }, customer.email))))), orders.items.length > 0 && /*#__PURE__*/ React.createElement(TabsContent, {
        value: "orders",
        className: "max-h-60 overflow-y-auto"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col space-y-1"
    }, orders.items.map((order, index)=>/*#__PURE__*/ React.createElement("a", {
            href: order.url,
            key: index,
            className: "rounded py-2 px-2 hover:bg-muted block"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-bold"
        }, "#", order.orderNumber), /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-muted-foreground"
        }, order.email)))))));
}
Results.propTypes = {
    keyword: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string
        }))
    }))
};
Results.defaultProps = {
    keyword: undefined,
    results: []
};
