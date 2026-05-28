import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { Button } from '@components/common/ui/Button.js';
import { Item, ItemContent, ItemTitle } from '@components/common/ui/Item.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { options, operators, Operator } from './conditionCriterias.js';
import { ValueSelector } from './ValueSelector.js';
function Products({ targetProducts, maxQty }) {
    const { setValue, watch, unregister } = useFormContext();
    const { fields, append, remove, replace } = useFieldArray({
        name: 'target_products.products'
    });
    const watchDiscountType = watch('discount_type');
    const fieldWatch = watch('target_products.products');
    useEffect(()=>{
        replace(targetProducts.map((product)=>({
                key: product.key,
                operator: product.operator,
                value: product.value
            })));
        return ()=>{
            unregister('target_products.products');
        };
    }, []);
    if (watchDiscountType !== 'fixed_discount_to_specific_products' && watchDiscountType !== 'percentage_discount_to_specific_products') {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2 mt-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center"
    }, /*#__PURE__*/ React.createElement("div", null, "Maximum"), /*#__PURE__*/ React.createElement("div", {
        style: {
            width: '100px',
            padding: '0 1rem'
        }
    }, /*#__PURE__*/ React.createElement(NumberField, {
        name: "target_products.maxQty",
        defaultValue: maxQty,
        placeholder: "10",
        required: true,
        validation: {
            required: 'Maximum quantity is required',
            min: {
                value: 0,
                message: 'Maximum quantity must be greater than or equal to 0'
            }
        },
        min: 0,
        wrapperClassName: "form-field mb-0"
    })), /*#__PURE__*/ React.createElement("div", null, "quantity of products are matched bellow conditions(All)"))), /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Key")), /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Operator")), /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Value")), /*#__PURE__*/ React.createElement(TableHead, null, " "))), /*#__PURE__*/ React.createElement(TableBody, null, fields.map((product, index)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: product.id
        }, /*#__PURE__*/ React.createElement(TableCell, null, product.editable ? /*#__PURE__*/ React.createElement(SelectField, {
            name: `target_products.products.${index}.key`,
            wrapperClassName: "form-field mb-0",
            defaultValue: product.key,
            disabled: !product.editable,
            options: options.map((option)=>({
                    value: option.key,
                    label: option.label
                }))
        }) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            name: `target_products.products.${index}.key`,
            readOnly: true,
            wrapperClassName: "form-field mb-0",
            value: product.key
        }), /*#__PURE__*/ React.createElement(InputField, {
            name: `target_products.products.${index}.keylabel`,
            readOnly: true,
            wrapperClassName: "form-field mb-0",
            value: options.find((c)=>c.key === product.key)?.label || 'Unknown'
        }))), /*#__PURE__*/ React.createElement(TableCell, null, product.editable ? /*#__PURE__*/ React.createElement(SelectField, {
            name: `target_products.products.${index}.operator`,
            defaultValue: product.operator,
            options: operators.map((operator)=>({
                    value: operator.key,
                    label: operator.label
                })),
            wrapperClassName: "form-field mb-0",
            placeholder: "Select operator"
        }) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            name: `target_products.products.${index}.operator`,
            readOnly: true,
            wrapperClassName: "form-field mb-0",
            value: product.operator
        }), /*#__PURE__*/ React.createElement(InputField, {
            name: `target_products.products.${index}.operatorlabel`,
            type: "text",
            readOnly: true,
            wrapperClassName: "form-field mb-0",
            value: operators.find((c)=>c.key === fieldWatch[index]?.operator)?.label || 'Unknown'
        }))), /*#__PURE__*/ React.createElement(TableCell, null, fieldWatch[index].key === 'price' && /*#__PURE__*/ React.createElement(NumberField, {
            name: `target_products.products.${index}.value`,
            defaultValue: product.value,
            wrapperClassName: "form-field mb-0"
        }), fieldWatch[index].key !== 'price' && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            name: `target_products.products.${index}.value`,
            value: product.value,
            wrapperClassName: "form-field mb-0"
        }), /*#__PURE__*/ React.createElement(ValueSelector, {
            condition: fieldWatch[index],
            updateCondition: (values)=>{
                setValue(`target_products.products.${index}.value`, values);
            }
        }))), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            className: "text-destructive",
            onClick: (e)=>{
                e.preventDefault();
                remove(index);
            }
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1.5rem",
            height: "1.5rem",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2
        }, /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M18 12H6"
        })))))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2 flex justify-start"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "pl-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline',
        onClick: (e)=>{
            e.preventDefault();
            append({
                key: 'category',
                operator: Operator.EQUAL,
                value: '',
                editable: true
            });
        }
    }, /*#__PURE__*/ React.createElement("span", null, "Add product")))));
}
export function TargetProducts({ products, maxQty }) {
    const { watch } = useFormContext();
    const watchDiscountType = watch('discount_type');
    if (watchDiscountType !== 'fixed_discount_to_specific_products' && watchDiscountType !== 'percentage_discount_to_specific_products') {
        return null;
    }
    return /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline',
        className: "mt-6"
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, "Target Products"), /*#__PURE__*/ React.createElement(Products, {
        targetProducts: products,
        maxQty: maxQty
    })));
}
