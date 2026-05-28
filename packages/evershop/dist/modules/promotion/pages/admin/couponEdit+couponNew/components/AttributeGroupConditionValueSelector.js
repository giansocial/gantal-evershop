import { AttributeGroupSelector } from '@components/admin/AttributeGroupSelector.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
export const AttributeGroupConditionValueSelector = ({ selectedValues, updateCondition, isMulti })=>{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const skus = Array.isArray(selectedValues) ? selectedValues : [];
    const selectedIds = React.useRef(skus || []);
    const onSelect = (id)=>{
        if (!isMulti) {
            selectedIds.current = [
                id
            ];
            setDialogOpen(false);
        } else {
            const prev = selectedIds.current;
            if (!prev.includes(id)) {
                selectedIds.current = [
                    id,
                    ...prev
                ];
            }
        }
    };
    const onUnSelect = async (id)=>{
        const prev = selectedIds.current;
        selectedIds.current = prev.filter((s)=>s !== id);
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
        }, "‘", id, "’"), index === 1 && /*#__PURE__*/ React.createElement("span", null, " and ", selectedIds.current.length - 1, " more"))), selectedIds.current.length === 0 && /*#__PURE__*/ React.createElement("span", null, "Choose Attribute Groups"))), /*#__PURE__*/ React.createElement(DialogContent, {
        className: 'max-w-[60vw]'
    }, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Choose Attribute Groups")), /*#__PURE__*/ React.createElement(AttributeGroupSelector, {
        onSelect: onSelect,
        onUnSelect: onUnSelect,
        selectedAttributeGroups: selectedIds.current.map((id)=>({
                attributeGroupId: id,
                uuid: undefined
            }))
    })));
};
