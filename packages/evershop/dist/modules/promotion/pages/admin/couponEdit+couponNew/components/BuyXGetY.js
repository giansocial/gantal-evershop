import { ProductSelector } from '@components/admin/ProductSelector.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '@components/common/ui/Dialog.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
const SkuSelector = ({ product, updateProduct })=>{
    const onSelect = (sku)=>{
        updateProduct({
            ...product,
            sku
        });
    };
    return /*#__PURE__*/ React.createElement(Dialog, null, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'link'
    }, product.sku ? /*#__PURE__*/ React.createElement("span", {
        className: "italic"
    }, "‘", product.sku, "’") : /*#__PURE__*/ React.createElement("span", null, "Choose SKU"))), /*#__PURE__*/ React.createElement(DialogContent, {
        className: 'max-w-[80vw]'
    }, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Choose Product SKU")), /*#__PURE__*/ React.createElement(ProductSelector, {
        selectedProducts: [
            product
        ].map((p)=>({
                sku: p.sku,
                uuid: undefined,
                productId: undefined
            })),
        onSelect: onSelect,
        onUnSelect: ()=>{}
    })));
};
const BuyXGetYList = ({ requireProducts })=>{
    const { unregister } = useFormContext();
    const { fields, append, remove, update, replace } = useFieldArray({
        name: 'buyx_gety'
    });
    useEffect(()=>{
        replace(requireProducts.map((product)=>({
                sku: product.sku,
                buyQty: typeof product.buyQty === 'string' ? parseInt(product.buyQty) || 1 : product.buyQty,
                getQty: typeof product.getQty === 'string' ? parseInt(product.getQty) || 1 : product.getQty,
                maxY: typeof product.maxY === 'string' ? parseInt(product.maxY) || 2 : product.maxY,
                discount: typeof product.discount === 'string' ? parseInt(product.discount) || 100 : product.discount
            })));
        return ()=>{
            unregister('buyx_gety'); // Cleanup: unregister field when component unmounts
        };
    }, []);
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Sku")), /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "X")), /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Y")), /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Max of Y")), /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("span", null, "Discount percent")), /*#__PURE__*/ React.createElement(TableHead, null, " "))), /*#__PURE__*/ React.createElement(TableBody, null, fields.map((p, i)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: p.id
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(SkuSelector, {
            product: p,
            updateProduct: (product)=>{
                update(i, {
                    ...p,
                    sku: product.sku
                });
            }
        })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.buy_qty`,
            defaultValue: p.buyQty,
            placeholder: "Buy qty",
            required: true,
            validation: {
                required: 'Buy qty is required'
            }
        })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.get_qty`,
            defaultValue: p.getQty,
            placeholder: "Get qty",
            required: true,
            validation: {
                required: 'Get qty is required'
            }
        })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.max_y`,
            defaultValue: p.maxY,
            placeholder: "Max of Y",
            required: true,
            validation: {
                required: 'Max of Y is required'
            }
        })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.discount`,
            defaultValue: p.discount,
            placeholder: "Discount percent",
            required: true,
            validation: {
                required: 'Discount percent is required'
            },
            unit: "%"
        })), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("a", {
            className: "text-destructive",
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                remove(i);
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
        className: "items-center flex"
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
        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "pl-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            append({
                sku: '',
                buyQty: 1,
                getQty: 1,
                maxY: 2,
                discount: 100
            });
        }
    }, /*#__PURE__*/ React.createElement("span", null, "Add product")))));
};
const BuyXGetY = ({ requireProducts })=>{
    const { watch } = useFormContext();
    const watchDiscountType = watch('discount_type');
    if (watchDiscountType !== 'buy_x_get_y') {
        return null;
    }
    return /*#__PURE__*/ React.createElement(BuyXGetYList, {
        requireProducts: requireProducts
    });
};
export { BuyXGetY };
