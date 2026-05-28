import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
import { RateForm } from './RateForm.js';
function Rate({ rate, getTaxClasses }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2 w-1/5"
    }, rate.name), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.country), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.rate, "%"), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.isCompound ? 'Yes' : 'No'), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.priority), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
        }
    }, "Edit")), /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-destructive ml-5",
        onClick: async (e)=>{
            e.preventDefault();
            await fetch(rate.deleteApi, {
                method: 'DELETE'
            });
            await getTaxClasses({
                requestPolicy: 'network-only'
            });
        }
    }, "Delete")), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Edit Tax Rate")), /*#__PURE__*/ React.createElement(RateForm, {
        saveRateApi: rate.updateApi,
        closeModal: ()=>setDialogOpen(false),
        getTaxClasses: getTaxClasses,
        rate: rate
    }))));
}
export { Rate };
