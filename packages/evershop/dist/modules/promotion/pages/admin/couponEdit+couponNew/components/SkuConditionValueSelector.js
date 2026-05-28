import { ProductSelector } from '@components/admin/ProductSelector.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
export const SkuConditionValueSelector = ({ selectedValues, updateCondition, isMulti })=>{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const skus = Array.isArray(selectedValues) ? selectedValues : [];
    const selectedSKUs = React.useRef(skus || []);
    const onSelect = (sku)=>{
        if (!isMulti) {
            selectedSKUs.current = [
                sku
            ];
            setDialogOpen(false);
        } else {
            selectedSKUs.current = [
                ...selectedSKUs.current,
                sku
            ];
        }
    };
    const onUnSelect = (sku)=>{
        const prev = selectedSKUs.current;
        selectedSKUs.current = prev.filter((s)=>s !== sku);
    };
    return /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: (open)=>setDialogOpen(open),
        onOpenChangeComplete: (open)=>{
            if (!open) {
                updateCondition(selectedSKUs.current);
            }
        }
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'link'
    }, selectedSKUs.current.map((sku, index)=>/*#__PURE__*/ React.createElement("span", {
            key: sku
        }, index === 0 && /*#__PURE__*/ React.createElement("span", {
            className: "italic"
        }, "‘", sku, "’"), index === 1 && /*#__PURE__*/ React.createElement("span", null, " and ", selectedSKUs.current.length - 1, " more"))), selectedSKUs.current.length === 0 && /*#__PURE__*/ React.createElement("span", null, "Choose SKUs"))), /*#__PURE__*/ React.createElement(DialogContent, {
        className: 'max-w-[80vw]'
    }, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Select Products by SKU")), /*#__PURE__*/ React.createElement(ProductSelector, {
        onSelect: onSelect,
        onUnSelect: onUnSelect,
        selectedProducts: selectedSKUs.current.map((sku)=>({
                sku,
                uuid: undefined,
                productId: undefined
            }))
    })));
};
