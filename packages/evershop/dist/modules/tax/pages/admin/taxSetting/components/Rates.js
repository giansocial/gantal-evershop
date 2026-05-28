import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import React from 'react';
import { Rate } from './Rate.js';
import { RateForm } from './RateForm.js';
export function Rates({ getTaxClasses, rates, addRateApi }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Name"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Country"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Rate"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Compound"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Priority"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Action"))), /*#__PURE__*/ React.createElement(TableBody, null, rates.map((rate)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: rate.uuid,
            className: "border-divider py-5"
        }, /*#__PURE__*/ React.createElement(Rate, {
            rate: rate,
            getTaxClasses: getTaxClasses
        }))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "link",
        onClick: (e)=>{
            e.preventDefault();
            setDialogOpen(true);
        }
    }, "+ Add Rate")), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Add Tax Rate")), /*#__PURE__*/ React.createElement(RateForm, {
        saveRateApi: addRateApi,
        closeModal: ()=>setDialogOpen(false),
        getTaxClasses: getTaxClasses
    })))));
}
