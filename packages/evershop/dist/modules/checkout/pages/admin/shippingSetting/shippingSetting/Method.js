import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/common/ui/Dialog.js';
import { Cog } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';
import { MethodForm } from './MethodForm.js';
function Method({ method, reload }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.name), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.isEnabled ? /*#__PURE__*/ React.createElement("span", {
        className: "text-green-700"
    }, "Enabled") : /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive"
    }, "Disabled")), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.cost?.text || /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-primary",
        onClick: (e)=>{
            e.preventDefault();
            setDialogOpen(true);
        }
    }, /*#__PURE__*/ React.createElement(Cog, {
        width: 22,
        height: 22
    }))), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.conditionType ? `${method.min || 0} <= ${method.conditionType} <= ${method.max || '∞'}` : 'None'), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-primary",
        onClick: (e)=>{
            e.preventDefault();
            setDialogOpen(true);
        }
    }, "Edit"), /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-destructive ml-5",
        onClick: async (e)=>{
            e.preventDefault();
            try {
                const response = await fetch(method.deleteApi, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    reload();
                    // Toast success
                    toast.success('Method removed successfully');
                } else {
                    // Toast error
                    toast.error('Failed to remove method');
                }
            } catch (error) {
                // Toast error
                toast.error('Failed to remove method');
            }
        }
    }, "Delete"))), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Edit Shipping Method")), /*#__PURE__*/ React.createElement(MethodForm, {
        saveMethodApi: method.updateApi,
        onSuccess: ()=>setDialogOpen(false),
        reload: reload,
        method: method
    })));
}
export { Method };
