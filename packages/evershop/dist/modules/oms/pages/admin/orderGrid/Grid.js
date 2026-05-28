import { GridPagination } from '@components/admin/grid/GridPagination';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import { Button } from '@components/common/ui/Button.js';
import { ButtonGroup } from '@components/common/ui/ButtonGroup.js';
import { Card, CardContent, CardHeader, CardAction } from '@components/common/ui/Card.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/common/ui/Select.js';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@components/common/ui/Table.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { OrderNumber } from './rows/OrderNumber.js';
import { PaymentStatus } from './rows/PaymentStatus.js';
import { ShipmentStatus } from './rows/ShipmentStatus.js';
function Actions({ orders = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const fullFillOrders = async ()=>{
        setIsLoading(true);
        const promises = orders.filter((order)=>selectedIds.includes(order.uuid)).map((order)=>axios.post(order.createShipmentApi));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Mark as shipped',
            onAction: ()=>{
                openAlert({
                    heading: `Fullfill ${selectedIds.length} orders`,
                    content: /*#__PURE__*/ React.createElement("div", {
                        className: "form-field mb-0"
                    }, "Are you sure you want to mark the selected orders as shipped?"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Mark as shipped',
                        onAction: async ()=>{
                            await fullFillOrders();
                        },
                        variant: 'default',
                        isLoading
                    }
                });
            }
        }
    ];
    return /*#__PURE__*/ React.createElement(TableRow, null, selectedIds.length === 0 && null, selectedIds.length > 0 && /*#__PURE__*/ React.createElement(TableCell, {
        style: {
            borderTop: 0
        },
        colSpan: "100"
    }, /*#__PURE__*/ React.createElement(ButtonGroup, null, actions.map((action, i)=>/*#__PURE__*/ React.createElement(Button, {
            key: i,
            variant: 'outline',
            onClick: (e)=>{
                e.preventDefault();
                action.onAction();
            }
        }, action.name)))));
}
Actions.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    orders: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        createShipmentApi: PropTypes.string.isRequired
    })).isRequired
};
export default function OrderGrid({ orders: { items: orders, total, currentFilters = [] }, paymentStatusList, shipmentStatusList }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement(Form, {
        submitBtn: false,
        id: "orderGridFilter"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-5 justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "orderGridFilter",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(InputField, {
                            name: "keyword",
                            placeholder: "Search",
                            defaultValue: currentFilters.find((f)=>f.key === 'keyword')?.value,
                            onKeyPress: (e)=>{
                                // If the user press enter, we should submit the form
                                if (e.key === 'Enter') {
                                    const url = new URL(document.location);
                                    const keyword = e.target?.value;
                                    if (keyword) {
                                        url.searchParams.set('keyword', keyword);
                                    } else {
                                        url.searchParams.delete('keyword');
                                    }
                                    window.location.href = url;
                                }
                            }
                        })
                },
                sortOrder: 5
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Select, {
                            value: currentFilters.find((f)=>f.key === 'payment_status') ? currentFilters.find((f)=>f.key === 'payment_status').value : undefined,
                            onValueChange: (value)=>{
                                const url = new URL(document.location);
                                url.searchParams.set('payment_status', value);
                                window.location.href = url;
                            }
                        }, /*#__PURE__*/ React.createElement(SelectTrigger, null, /*#__PURE__*/ React.createElement(SelectValue, null, "Payment Status")), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, "Payment Status"), paymentStatusList.map((status, index)=>/*#__PURE__*/ React.createElement(SelectItem, {
                                key: index,
                                value: status.code
                            }, status.name))))))
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(Select, {
                            value: currentFilters.find((f)=>f.key === 'shipment_status') ? currentFilters.find((f)=>f.key === 'shipment_status').value : undefined,
                            onValueChange: (value)=>{
                                const url = new URL(document.location);
                                url.searchParams.set('shipment_status', value);
                                window.location.href = url;
                            }
                        }, /*#__PURE__*/ React.createElement(SelectTrigger, null, /*#__PURE__*/ React.createElement(SelectValue, null, "Shipment Status")), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, "Shipment Status"), shipmentStatusList.map((status, index)=>/*#__PURE__*/ React.createElement(SelectItem, {
                                key: index,
                                value: status.code
                            }, status.name)))))
                },
                sortOrder: 15
            }
        ],
        currentFilters: currentFilters
    }))), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "link",
        className: 'hover:cursor-pointer',
        onClick: ()=>{
            const url = new URL(document.location);
            url.search = '';
            window.location.href = url.href;
        }
    }, "Clear Filters"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        onCheckedChange: (checked)=>{
            if (checked) {
                setSelectedRows(orders.map((o)=>o.uuid));
            } else {
                setSelectedRows([]);
            }
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        className: "",
        id: "orderGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Order Number",
                            name: "number",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 5
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Date",
                            name: "created_at",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Customer Email",
                            name: "email",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 15
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Shipment Status",
                            name: "shipment_status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Payment Status",
                            name: "payment_status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 25
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Total",
                            name: "total",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 30
            }
        ]
    }))), /*#__PURE__*/ React.createElement(TableBody, null, /*#__PURE__*/ React.createElement(Actions, {
        orders: orders,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), orders.map((o)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: o.orderId
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            checked: selectedRows.includes(o.uuid),
            onCheckedChange: (checked)=>{
                if (checked) {
                    setSelectedRows(selectedRows.concat([
                        o.uuid
                    ]));
                } else {
                    setSelectedRows(selectedRows.filter((row)=>row !== o.uuid));
                }
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            className: "",
            id: "orderGridRow",
            row: o,
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(OrderNumber, {
                                number: o.orderNumber,
                                editUrl: o.editUrl
                            })
                    },
                    sortOrder: 5
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, o.createdAt.text)
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(TableCell, null, o.customerEmail)
                    },
                    sortOrder: 15
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(ShipmentStatus, {
                                status: o.shipmentStatus
                            })
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(PaymentStatus, {
                                status: o.paymentStatus
                            })
                    },
                    sortOrder: 25
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, o.grandTotal.text)
                    },
                    sortOrder: 30
                }
            ]
        }))))), orders.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center"
    }, "There is no order to display"), /*#__PURE__*/ React.createElement(GridPagination, {
        total: total,
        limit: limit,
        page: page
    })));
}
OrderGrid.propTypes = {
    orders: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            orderId: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
            orderNumber: PropTypes.string.isRequired,
            createdAt: PropTypes.shape({
                value: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired
            }).isRequired,
            customerEmail: PropTypes.string.isRequired,
            shipmentStatus: PropTypes.shape({
                name: PropTypes.string.isRequired,
                code: PropTypes.string.isRequired,
                badge: PropTypes.string.isRequired
            }).isRequired,
            paymentStatus: PropTypes.shape({
                name: PropTypes.string.isRequired,
                code: PropTypes.string.isRequired,
                badge: PropTypes.string.isRequired
            }).isRequired,
            grandTotal: PropTypes.shape({
                value: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            }).isRequired,
            editUrl: PropTypes.string.isRequired,
            createShipmentApi: PropTypes.string.isRequired
        })).isRequired,
        total: PropTypes.number.isRequired,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            operation: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,
    paymentStatusList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    shipmentStatusList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
export const query = `
  query Query($filters: [FilterInput]) {
    orders (filters: $filters) {
      items {
        orderId
        uuid
        orderNumber
        createdAt {
          value
          text
        }
        customerEmail
        shipmentStatus {
          name
          code
          badge
        }
        paymentStatus {
          name
          code
          badge
        }
        grandTotal {
          value
          text
        }
        editUrl
        createShipmentApi
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
    paymentStatusList {
      code
      name
    }
    shipmentStatusList {
      code
      name
    }
  }
`;
export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
