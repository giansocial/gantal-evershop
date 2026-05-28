import { Form } from '@components/common/form/Form.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import RenderIfTrue from '@components/common/RenderIfTrue.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function CancelButton({ order: { cancelApi, paymentStatus, shipmentStatus } }) {
    const form = useForm();
    return /*#__PURE__*/ React.createElement(RenderIfTrue, {
        condition: paymentStatus.isCancelable !== false && shipmentStatus.isCancelable !== false
    }, /*#__PURE__*/ React.createElement(Dialog, null, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "destructive"
    }, "Cancel Order")), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Cancel Order")), /*#__PURE__*/ React.createElement(Form, {
        form: form,
        id: "cancelReason",
        method: "POST",
        action: cancelApi,
        submitBtn: false,
        onSuccess: (response)=>{
            if (response.error) {
                toast.error(response.error.message);
            } else {
                // Reload the page
                window.location.reload();
            }
        }
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(TextareaField, {
        name: "reason",
        label: "Reason for cancellation",
        placeholder: "Reason for cancellation",
        required: true,
        validation: {
            required: 'Reason is required'
        }
    }))), /*#__PURE__*/ React.createElement(DialogFooter, null, /*#__PURE__*/ React.createElement(DialogClose, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline"
    }, "Cancel")), /*#__PURE__*/ React.createElement(Button, {
        variant: "default",
        isLoading: form.formState.isSubmitting,
        onClick: async ()=>{
            document.getElementById('cancelReason').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        }
    }, "Submit Cancellation")))));
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 35
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      paymentStatus {
        code
        isCancelable
      }
      shipmentStatus {
        code
        isCancelable
      }
      cancelApi
    }
  }
`;
