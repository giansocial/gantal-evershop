import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
import { VariantModal } from './VariantModal.js';
export const CreateVariant = ({ variantGroup, createProductApi, refresh })=>{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement("div", {
        className: "mt-3"
    }, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline'
    }, "Add Variant")), /*#__PURE__*/ React.createElement(DialogContent, {
        className: 'sm:max-w-212.5'
    }, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "New Variant"), /*#__PURE__*/ React.createElement(DialogDescription, null, "Create a new variant for this product.")), /*#__PURE__*/ React.createElement(VariantModal, {
        refresh: refresh,
        closeDialog: ()=>setDialogOpen(false),
        variantGroup: variantGroup,
        createProductApi: createProductApi
    }))));
};
