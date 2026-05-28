import { CollectionSelector } from '@components/admin/CollectionSelector.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
export const CollectionConditionValueSelector = ({ selectedValues, updateCondition, isMulti })=>{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const selectedIds = React.useRef(Array.isArray(selectedValues) ? selectedValues.map(Number) : []);
    const onSelect = async (id)=>{
        if (!isMulti) {
            selectedIds.current = [
                id
            ];
            setDialogOpen(false);
            return Promise.resolve();
        }
        const prev = selectedIds.current;
        if (!prev.includes(id)) {
            selectedIds.current = [
                id,
                ...prev
            ];
        }
        return Promise.resolve();
    };
    const onUnSelect = async (id)=>{
        const prev = selectedIds.current;
        selectedIds.current = prev.filter((s)=>s !== id);
        return Promise.resolve();
    };
    return /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: (open)=>setDialogOpen(open),
        onOpenChangeComplete: (open)=>{
            if (!open) {
                updateCondition(selectedIds.current);
            }
        }
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'link'
    }, selectedIds.current.map((id, index)=>/*#__PURE__*/ React.createElement("span", {
            key: id
        }, index === 0 && /*#__PURE__*/ React.createElement("span", {
            className: "italic"
        }, "‘", id, "’"), index === 1 && /*#__PURE__*/ React.createElement("span", null, " and ", selectedIds.current.length - 1, " more"))), selectedIds.current.length === 0 && /*#__PURE__*/ React.createElement("span", null, "Choose Collections"))), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Choose Collections")), /*#__PURE__*/ React.createElement(CollectionSelector, {
        onSelect: onSelect,
        onUnSelect: onUnSelect,
        selectedCollections: selectedIds.current.map((id)=>({
                collectionId: id,
                uuid: undefined
            }))
    })));
};
