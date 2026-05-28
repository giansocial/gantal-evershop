import RenderIfTrue from '@components/common/RenderIfTrue.js';
import { Button } from '@components/common/ui/Button.js';
import { CardContent } from '@components/common/ui/Card.js';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
export default function PaypalCaptureButton({ captureAPI, order: { paymentStatus, uuid, paymentMethod } }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const onAction = async ()=>{
        try {
            setIsLoading(true);
            // Use Axios to call the capture API
            const response = await axios.post(captureAPI, {
                order_id: uuid
            });
            if (!response.data.error) {
                // Reload the page
                window.location.reload();
            } else {
                toast.error(response.data.error.message);
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            toast.error(e.message);
        }
    };
    return /*#__PURE__*/ React.createElement(RenderIfTrue, {
        condition: paymentMethod === 'paypal' && paymentStatus.code === 'paypal_authorized'
    }, /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement(Button, {
        onClick: onAction,
        isLoading: isLoading
    }, "Capture Payment"))));
}
export const layout = {
    areaId: 'orderPaymentActions',
    sortOrder: 10
};
export const query = `
  query Query {
    captureAPI: url(routeId: "paypalCaptureAuthorizedPayment")
    order(uuid: getContextValue("orderId")) {
      uuid
      paymentStatus {
        code
      }
      paymentMethod
    }
  }
`;
