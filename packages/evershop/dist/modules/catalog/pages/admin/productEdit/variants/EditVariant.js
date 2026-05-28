import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import { Cog } from 'lucide-react';
import React from 'react';
import { VariantModal } from './VariantModal.js';
export const EditVariant = ({ variant, variantGroup, refresh })=>{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'link',
        className: 'hover:cursor-pointer'
    }, /*#__PURE__*/ React.createElement(Cog, {
        className: "w-5 h-5 text-primary"
    }))), /*#__PURE__*/ React.createElement(DialogContent, {
        className: 'sm:max-w-212.5'
    }, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Edit Variant"), /*#__PURE__*/ React.createElement(DialogDescription, null, "Update the variant details and attributes here.")), /*#__PURE__*/ React.createElement(VariantModal, {
        variant: variant,
        variantGroup: variantGroup,
        refresh: refresh,
        closeDialog: ()=>setDialogOpen(false)
    }))));
};
