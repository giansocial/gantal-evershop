import { AddressSummary } from '@components/common/customer/address/AddressSummary.jsx';
import { CheckboxField } from '@components/common/form/CheckboxField.js';
import { Form } from '@components/common/form/Form.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import { Item, ItemActions, ItemContent } from '@components/common/ui/Item.js';
import CustomerAddressForm from '@components/frontStore/customer/address/addressForm/Index.js';
import { useCustomer, useCustomerDispatch } from '@components/frontStore/customer/CustomerContext.jsx';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { toast } from 'react-toastify';
const Address = ({ address })=>{
    const { updateAddress, deleteAddress } = useCustomerDispatch();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const classes = address.isDefault ? 'border-2 border-primary' : '';
    return /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline',
        className: `${classes}`
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(AddressSummary, {
        address: address
    })), /*#__PURE__*/ React.createElement(ItemActions, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col items-start gap-1"
    }, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: (e)=>{
            e.preventDefault();
        }
    }, _('Edit'))), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, _('Edit Address'))), /*#__PURE__*/ React.createElement(Form, {
        id: "customerAddressForm",
        method: "PATCH",
        onSubmit: async (data)=>{
            try {
                await updateAddress(address.addressId, data);
                setDialogOpen(false);
                toast.success(_('Address has been updated successfully!'));
            } catch (error) {
                toast.error(error.message);
            }
        }
    }, /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        address: address,
        fieldNamePrefix: ""
    }), /*#__PURE__*/ React.createElement("div", {
        className: "mt-3"
    }, /*#__PURE__*/ React.createElement(CheckboxField, {
        label: _('Set as default'),
        defaultChecked: address.isDefault,
        name: "is_default"
    })))), /*#__PURE__*/ React.createElement(DialogFooter, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "destructive",
        onClick: async (e)=>{
            e.preventDefault();
            try {
                await deleteAddress(address.addressId);
                toast.success(_('Address has been deleted successfully!'));
            } catch (error) {
                toast.error(error.message);
            }
        }
    }, _('Delete')))))));
};
export function MyAddresses({ title }) {
    const { customer } = useCustomer();
    const { addAddress } = useCustomerDispatch();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    if (!customer) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", null, title && /*#__PURE__*/ React.createElement("div", {
        className: "border-b mb-5 border-gray-200"
    }, /*#__PURE__*/ React.createElement("h2", null, _('Address Book'))), customer.addresses.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "order-history-empty"
    }, _('You have no addresses saved')), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-3"
    }, customer.addresses.map((address)=>/*#__PURE__*/ React.createElement(Address, {
            key: address.uuid,
            address: address
        }))), /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: (e)=>{
            e.preventDefault();
        }
    }, _('Add new address'))), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, _('Add new address'))), /*#__PURE__*/ React.createElement(Form, {
        id: "customerAddressForm",
        method: 'POST',
        onSubmit: async (data)=>{
            try {
                await addAddress(data);
                setDialogOpen(false);
                toast.success(_('Address has been saved successfully!'));
            } catch (error) {
                toast.error(error.message);
            }
        }
    }, /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        address: undefined,
        fieldNamePrefix: ""
    }), /*#__PURE__*/ React.createElement("div", {
        className: "mt-3"
    }, /*#__PURE__*/ React.createElement(CheckboxField, {
        label: _('Set as default'),
        defaultChecked: false,
        name: "is_default"
    }))))));
}
