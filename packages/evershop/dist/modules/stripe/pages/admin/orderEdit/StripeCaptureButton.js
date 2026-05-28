import RenderIfTrue from '@components/common/RenderIfTrue';
import { Button } from '@components/common/ui/Button';
import { CardContent } from '@components/common/ui/Card.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
export default function StripeCaptureButton({ captureAPI, order: { paymentStatus, uuid, paymentMethod } }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const onAction = async ()=>{
        setIsLoading(true);
        // Use Axios to call the capture API
        const response = await axios.post(captureAPI, {
            order_id: uuid
        }, {
            validateStatus: false
        });
        if (!response.data.error) {
            // Reload the page
            window.location.reload();
        } else {
            toast.error(response.data.error.message);
        }
        setIsLoading(false);
    };
    return /*#__PURE__*/ React.createElement(RenderIfTrue, {
        condition: paymentStatus.code === 'stripe_authorized' && paymentMethod === 'stripe'
    }, /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement(Button, {
        onClick: onAction,
        isLoading: isLoading
    }, "Capture Payment"))));
}
StripeCaptureButton.propTypes = {
    captureAPI: PropTypes.string.isRequired,
    order: PropTypes.shape({
        paymentStatus: PropTypes.shape({
            code: PropTypes.string.isRequired
        }).isRequired,
        uuid: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired
    }).isRequired
};
export const layout = {
    areaId: 'orderPaymentActions',
    sortOrder: 10
};
export const query = `
  query Query {
    captureAPI: url(routeId: "capturePaymentIntent")
    order(uuid: getContextValue("orderId")) {
      uuid
      paymentStatus {
        code
      }
      paymentMethod
    }
  }
`;
