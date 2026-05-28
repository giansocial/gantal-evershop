import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import React from 'react';
import { Method } from './Method.js';
import { MethodForm } from './MethodForm.js';
export function Methods({ reload, methods, addMethodApi }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement("div", {
        className: "my-5 text-xs"
    }, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, {
        className: "text-xs"
    }, /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Method"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Status"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Cost"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Condition"), /*#__PURE__*/ React.createElement(TableHead, {
        className: "border-none"
    }, "Action"))), /*#__PURE__*/ React.createElement(TableBody, null, methods.map((method)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: method.methodId,
            className: "border-divider py-5 text-xs"
        }, /*#__PURE__*/ React.createElement(Method, {
            method: method,
            reload: reload
        }))))), /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'link',
        onClick: (e)=>{
            e.preventDefault();
        }
    }, "+ Add Method"))), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Add Shipping Method"), /*#__PURE__*/ React.createElement(MethodForm, {
        saveMethodApi: addMethodApi,
        onSuccess: ()=>{
            setDialogOpen(false);
        },
        reload: reload
    }))));
}
