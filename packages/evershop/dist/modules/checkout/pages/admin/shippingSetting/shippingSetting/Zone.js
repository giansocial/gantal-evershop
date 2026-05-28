import { CardContent } from '@components/common/ui/Card.js';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '@components/common/ui/Dialog.js';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';
import { Methods } from './Methods.js';
import { ZoneForm } from './ZoneForm.js';
function Zone({ zone, reload }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    return /*#__PURE__*/ React.createElement(CardContent, {
        className: "space-y-3 pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-xs uppercase font-semibold"
    }, zone.name), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-5"
    }, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, "Edit Zone"), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Edit Shipping Zone")), /*#__PURE__*/ React.createElement(ZoneForm, {
        formMethod: "PATCH",
        saveZoneApi: zone.updateApi,
        onSuccess: ()=>setDialogOpen(false),
        reload: reload,
        zone: zone
    }))), /*#__PURE__*/ React.createElement("a", {
        className: "text-destructive",
        href: "#",
        onClick: async (e)=>{
            e.preventDefault();
            try {
                const response = await axios.delete(zone.deleteApi);
                if (response.status === 200) {
                    // Toast success
                    toast.success('Zone removed successfully');
                    // Delay for 2 seconds
                    setTimeout(()=>{
                        // Reload page
                        window.location.reload();
                    }, 1500);
                } else {
                    // Toast error
                    toast.error('Failed to remove zone');
                }
            } catch (error) {
                // Toast error
                toast.error('Failed to remove zone');
            }
        }
    }, "Remove Zone"))), /*#__PURE__*/ React.createElement("div", {
        className: "divide-y border rounded border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "p-5"
    }, /*#__PURE__*/ React.createElement(MapPin, {
        width: 20,
        height: 20
    })), /*#__PURE__*/ React.createElement("div", {
        className: "grow px-2"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("b", null, zone.country?.name || 'Worldwide')), /*#__PURE__*/ React.createElement("div", null, zone.provinces.slice(0, 3).map((province)=>province.name).join(', '), zone.provinces.length > 3 && '...'))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grow px-2"
    }, /*#__PURE__*/ React.createElement(Methods, {
        methods: zone.methods,
        reload: reload,
        addMethodApi: zone.addMethodApi
    })))));
}
export { Zone };
