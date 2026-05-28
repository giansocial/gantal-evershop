import { GridPagination } from '@components/admin/grid/GridPagination';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Status } from '@components/admin/Status.js';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import { Button } from '@components/common/ui/Button.js';
import { ButtonGroup } from '@components/common/ui/ButtonGroup.js';
import { Card, CardAction, CardContent, CardHeader } from '@components/common/ui/Card.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/common/ui/Select.js';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@components/common/ui/Table.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CustomerName } from './rows/CustomerName.js';
function Actions({ customers = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const updateCustomers = async (status)=>{
        const promises = customers.filter((customer)=>selectedIds.includes(customer.uuid)).map((customer)=>axios.patch(customer.updateApi, {
                status
            }));
        await Promise.all(promises);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Disable',
            onAction: ()=>{
                openAlert({
                    heading: `Disable ${selectedIds.length} customers`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Disable',
                        onAction: async ()=>{
                            await updateCustomers(0);
                        },
                        variant: 'destructive'
                    }
                });
            }
        },
        {
            name: 'Enable',
            onAction: ()=>{
                openAlert({
                    heading: `Enable ${selectedIds.length} customers`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Enable',
                        onAction: async ()=>{
                            await updateCustomers(1);
                        },
                        variant: 'destructive'
                    }
                });
            }
        }
    ];
    return /*#__PURE__*/ React.createElement(TableRow, null, selectedIds.length === 0 && null, selectedIds.length > 0 && /*#__PURE__*/ React.createElement(TableCell, {
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
    customers: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired
    })).isRequired
};
export default function CustomerGrid({ customers: { items: customers, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement(Form, {
        submitBtn: false,
        id: "customerGridFilter"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-5 justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "customerGridFilter",
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
                    default: ()=>/*#__PURE__*/ React.createElement(Select, {
                            value: currentFilters.find((f)=>f.key === 'status')?.value,
                            onValueChange: (value)=>{
                                const url = new URL(document.location);
                                url.searchParams.set('status', value);
                                window.location.href = url.href;
                            }
                        }, /*#__PURE__*/ React.createElement(SelectTrigger, null, /*#__PURE__*/ React.createElement(SelectValue, null, "Status")), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, "Status"), /*#__PURE__*/ React.createElement(SelectItem, {
                            value: "1"
                        }, "Enabled"), /*#__PURE__*/ React.createElement(SelectItem, {
                            value: "0"
                        }, "Disabled"))))
                },
                sortOrder: 10
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
    }, "Clear filter"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableCell, {
        className: "align-bottom"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        onCheckedChange: (checked)=>{
            if (checked) setSelectedRows(customers.map((c)=>c.uuid));
            else setSelectedRows([]);
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        id: "customerGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Full Name",
                            name: "full_name",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Email",
                            name: "email",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 15
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Status",
                            name: "status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Created At",
                            name: "created_at",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 25
            }
        ]
    }))), /*#__PURE__*/ React.createElement(TableBody, null, /*#__PURE__*/ React.createElement(Actions, {
        customers: customers,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), customers.map((c)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: c.customerId
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            checked: selectedRows.includes(c.uuid),
            onCheckedChange: (checked)=>{
                if (checked) {
                    setSelectedRows(selectedRows.concat([
                        c.uuid
                    ]));
                } else {
                    setSelectedRows(selectedRows.filter((row)=>row !== c.uuid));
                }
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            id: "customerGridRow",
            row: c,
            noOuter: true,
            selectedRows: selectedRows,
            setSelectedRows: setSelectedRows,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(CustomerName, {
                                name: c.fullName,
                                url: c.editUrl
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(TableCell, null, c.email)
                    },
                    sortOrder: 15
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                status: parseInt(c.status, 10)
                            })
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, c.createdAt.text)
                    },
                    sortOrder: 25
                }
            ]
        }))))), customers.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center mt-3"
    }, "There is no customer to display"), /*#__PURE__*/ React.createElement(GridPagination, {
        total: total,
        limit: limit,
        page: page
    })));
}
CustomerGrid.propTypes = {
    customers: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            customerId: PropTypes.number.isRequired,
            uuid: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
            createdAt: PropTypes.shape({
                value: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired
            }).isRequired,
            editUrl: PropTypes.string.isRequired,
            updateApi: PropTypes.string.isRequired
        })).isRequired,
        total: PropTypes.number.isRequired,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            operation: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
};
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
export const query = `
  query Query($filters: [FilterInput]) {
    customers (filters: $filters) {
      items {
        customerId
        uuid
        fullName
        email
        status
        createdAt {
          value
          text
        }
        editUrl
        updateApi
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }
`;
export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
