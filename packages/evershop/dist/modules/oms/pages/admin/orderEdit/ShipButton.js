import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { useAlertContext } from '@components/common/modal/Alert.js';
import RenderIfTrue from '@components/common/RenderIfTrue.js';
import { Button } from '@components/common/ui/Button.js';
import React from 'react';
import { toast } from 'react-toastify';
export default function ShipButton({ order: { noShippingRequired, shipment, createShipmentApi, shipmentStatus }, carriers }) {
    const { openAlert, closeAlert, dispatchAlert } = useAlertContext();
    if (noShippingRequired) {
        return /*#__PURE__*/ React.createElement(Button, {
            disabled: true,
            variant: "secondary"
        }, "No Shipping Required");
    }
    if (shipment) {
        return null;
    } else {
        return /*#__PURE__*/ React.createElement(RenderIfTrue, {
            condition: shipmentStatus.code !== 'canceled'
        }, /*#__PURE__*/ React.createElement(Button, {
            variant: "default",
            onClick: ()=>{
                openAlert({
                    heading: 'Ship Items',
                    content: /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Form, {
                        id: "ship-items",
                        method: "POST",
                        action: createShipmentApi,
                        submitBtn: false,
                        onSuccess: (response)=>{
                            if (response.error) {
                                toast.error(response.error.message);
                                dispatchAlert({
                                    type: 'update',
                                    payload: {
                                        secondaryAction: {
                                            isLoading: false
                                        }
                                    }
                                });
                            } else {
                                // Reload the page
                                window.location.reload();
                            }
                        },
                        onInvalid: ()=>{
                            dispatchAlert({
                                type: 'update',
                                payload: {
                                    secondaryAction: {
                                        isLoading: false
                                    }
                                }
                            });
                        }
                    }, /*#__PURE__*/ React.createElement("div", {
                        className: "grid grid-cols-2 gap-2"
                    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
                        type: "text",
                        name: "tracking_number",
                        label: "Tracking number",
                        placeholder: "Tracking number"
                    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SelectField, {
                        name: "carrier",
                        label: "Carrier",
                        options: carriers
                    }))))),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'outline'
                    },
                    secondaryAction: {
                        title: 'Ship',
                        onAction: ()=>{
                            dispatchAlert({
                                type: 'update',
                                payload: {
                                    secondaryAction: {
                                        isLoading: true
                                    }
                                }
                            });
                            document.getElementById('ship-items').dispatchEvent(new Event('submit', {
                                cancelable: true,
                                bubbles: true
                            }));
                        },
                        variant: 'default',
                        isLoading: false
                    }
                });
            }
        }, "Ship items"));
    }
}
export const layout = {
    areaId: 'order_actions',
    sortOrder: 10
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      noShippingRequired
      shipment {
        shipmentId
        carrier
        trackingNumber
        updateShipmentApi
      }
      shipmentStatus {
        code
      }
      createShipmentApi
    },
    carriers {
      label: name
      value: code
    }
  }
`;
