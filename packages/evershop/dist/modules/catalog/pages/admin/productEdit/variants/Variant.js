import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { Button } from '@components/common/ui/Button.js';
import { Item, ItemContent } from '@components/common/ui/Item.js';
import { TableCell, TableRow } from '@components/common/ui/Table.js';
import React from 'react';
import { EditVariant } from './EditVariant.js';
export const Variant = ({ variant, refresh, variantGroup })=>{
    return /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline',
        size: 'xs'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, variant.product?.image?.url ? /*#__PURE__*/ React.createElement("img", {
        style: {
            maxWidth: '50px',
            height: 'auto'
        },
        src: variant?.product?.image?.url,
        alt: ""
    }) : /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
        className: "size-12"
    })))), variantGroup.attributes.map((a)=>{
        const option = variant.attributes.find((attr)=>attr.attributeCode === a.attributeCode);
        return /*#__PURE__*/ React.createElement(TableCell, {
            key: a.attributeId
        }, /*#__PURE__*/ React.createElement("label", null, option?.optionText || '--'));
    }), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'link',
        className: 'hover:cursor-pointer',
        onClick: (e)=>{
            e.preventDefault();
            window.location.href = variant.product.editUrl;
        }
    }, variant.product?.sku)), /*#__PURE__*/ React.createElement(TableCell, null, variant.product?.price?.regular?.text), /*#__PURE__*/ React.createElement(TableCell, null, variant.product?.inventory?.qty), /*#__PURE__*/ React.createElement(TableCell, null, variant.product?.status === 1 ? /*#__PURE__*/ React.createElement("span", {
        className: "text-primary font-medium"
    }, "Enabled") : /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive font-medium"
    }, "Disabled")), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(EditVariant, {
        variant: variant,
        refresh: refresh,
        variantGroup: variantGroup
    })));
};
