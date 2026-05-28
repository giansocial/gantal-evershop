import { NumberField } from '@components/common/form/NumberField.js';
import { Button } from '@components/common/ui/Button.js';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
export function PriceBasedPrice({ lines }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'price_based_cost'
    });
    // Initialize the field array with existing lines if it's empty
    React.useEffect(()=>{
        if (fields.length === 0 && lines.length > 0) {
            lines.forEach((line)=>{
                append({
                    min_price: line.minPrice?.value || undefined,
                    cost: line.cost?.value || undefined
                });
            });
        }
    }, [
        lines,
        fields.length,
        append
    ]);
    // Ensure there's at least one row
    React.useEffect(()=>{
        if (lines.length === 0) {
            append({
                min_price: undefined,
                cost: undefined
            });
        }
    }, [
        lines.length,
        append
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "my-5"
    }, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Min Price"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Shipping Cost"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Action"))), /*#__PURE__*/ React.createElement(TableBody, null, fields.map((field, index)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: field.id,
            className: "border-border py-5"
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `price_based_cost.${index}.min_price`,
            placeholder: "Min Price",
            required: true,
            validation: {
                required: 'Min price is required'
            }
        })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `price_based_cost.${index}.cost`,
            placeholder: "Shipping Cost",
            required: true,
            validation: {
                required: 'Shipping cost is required'
            }
        })), /*#__PURE__*/ React.createElement(TableCell, null, fields.length > 1 && /*#__PURE__*/ React.createElement("button", {
            type: "button",
            onClick: ()=>remove(index),
            className: "text-destructive"
        }, "Delete"))))), /*#__PURE__*/ React.createElement(TableFooter, {
        className: "border-border"
    }, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableCell, {
        colSpan: 3,
        className: "border-none"
    }, /*#__PURE__*/ React.createElement(Button, {
        type: "button",
        size: 'sm',
        variant: 'outline',
        onClick: ()=>{
            append({
                min_weight: undefined,
                cost: undefined
            });
        }
    }, "+ Add Line"))))));
}
