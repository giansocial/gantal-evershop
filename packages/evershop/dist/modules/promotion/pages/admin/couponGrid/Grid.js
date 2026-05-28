import { GridPagination } from '@components/admin/grid/GridPagination';
import { DummyColumnHeader } from '@components/admin/grid/header/Dummy';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Status } from '@components/admin/Status.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import { Button } from '@components/common/ui/Button.js';
import { ButtonGroup } from '@components/common/ui/ButtonGroup.js';
import { Card } from '@components/common/ui/Card';
import { CardAction, CardContent, CardHeader } from '@components/common/ui/Card.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/common/ui/Select.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CouponName } from './rows/CouponName.js';
function Actions({ coupons = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const updateCoupons = async (status)=>{
        setIsLoading(true);
        const promises = coupons.filter((coupon)=>selectedIds.includes(coupon.uuid)).map((coupon)=>axios.patch(coupon.updateApi, {
                status,
                coupon: coupon.coupon
            }));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const deleteCoupons = async ()=>{
        setIsLoading(true);
        const promises = coupons.filter((coupon)=>selectedIds.includes(coupon.uuid)).map((coupon)=>axios.delete(coupon.deleteApi));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Disable',
            onAction: ()=>{
                openAlert({
                    heading: `Disable ${selectedIds.length} coupons`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Disable',
                        onAction: async ()=>{
                            await updateCoupons(0);
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
                    heading: `Enable ${selectedIds.length} coupons`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Enable',
                        onAction: async ()=>{
                            await updateCoupons(1);
                        },
                        variant: 'destructive'
                    }
                });
            }
        },
        {
            name: 'Delete',
            onAction: ()=>{
                openAlert({
                    heading: `Delete ${selectedIds.length} coupons`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deleteCoupons();
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
    coupons: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired,
        coupon: PropTypes.string.isRequired
    })).isRequired
};
export default function CouponGrid({ coupons: { items: coupons, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement(Form, {
        submitBtn: false,
        id: "couponGridFilter"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-5 justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "couponGridFilter",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(InputField, {
                            name: "coupon",
                            placeholder: "Search",
                            defaultValue: currentFilters.find((f)=>f.key === 'coupon')?.value,
                            onKeyPress: (e)=>{
                                // If the user press enter, we should submit the form
                                if (e.key === 'Enter') {
                                    const url = new URL(document.location);
                                    const coupon = e.target?.value;
                                    if (coupon) {
                                        url.searchParams.set('coupon[operation]', 'like');
                                        url.searchParams.set('coupon[value]', coupon);
                                    } else {
                                        url.searchParams.delete('coupon[operation]');
                                        url.searchParams.delete('coupon[value]');
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
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(Select, {
                            value: currentFilters.find((f)=>f.key === 'free_shipping')?.value,
                            onValueChange: (value)=>{
                                const url = new URL(document.location);
                                url.searchParams.set('free_shipping', value);
                                window.location.href = url.href;
                            }
                        }, /*#__PURE__*/ React.createElement(SelectTrigger, null, /*#__PURE__*/ React.createElement(SelectValue, null, "Free shipping ?")), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, "Free shipping ?"), /*#__PURE__*/ React.createElement(SelectItem, {
                            value: "1"
                        }, "Free shipping"), /*#__PURE__*/ React.createElement(SelectItem, {
                            value: "0"
                        }, "No free shipping"))))
                },
                sortOrder: 10
            }
        ],
        currentFilters: currentFilters
    }))), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "link",
        onClick: ()=>{
            const url = new URL(document.location);
            url.search = '';
            window.location.href = url.href;
        }
    }, "Clear filter"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        onCheckedChange: (checked)=>{
            if (checked) setSelectedRows(coupons.map((c)=>c.uuid));
            else setSelectedRows([]);
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        id: "couponGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Coupon Code",
                            name: "coupon",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "State Date"
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "End Date"
                        })
                },
                sortOrder: 30
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Status",
                            name: "status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 40
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Used Times",
                            name: "used_time",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 50
            }
        ]
    }))), /*#__PURE__*/ React.createElement(TableBody, null, /*#__PURE__*/ React.createElement(Actions, {
        coupons: coupons,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), coupons.map((c)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: c.couponId
        }, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("div", {
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
            id: "couponGridRow",
            row: c,
            noOuter: true,
            selectedRows: selectedRows,
            setSelectedRows: setSelectedRows,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(CouponName, {
                                url: c.editUrl,
                                name: c.coupon
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, c.startDate?.text || '--')
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, c.endDate?.text || '--')
                    },
                    sortOrder: 30
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                status: parseInt(c.status, 10)
                            })
                    },
                    sortOrder: 40
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(TableCell, null, c.usedTime)
                    },
                    sortOrder: 50
                }
            ]
        }))))), coupons.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center mt-2"
    }, "There is no coupon to display"), /*#__PURE__*/ React.createElement(GridPagination, {
        total: total,
        limit: limit,
        page: page
    })));
}
CouponGrid.propTypes = {
    coupons: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            couponId: PropTypes.number.isRequired,
            uuid: PropTypes.string.isRequired,
            coupon: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
            usedTime: PropTypes.number.isRequired,
            startDate: PropTypes.shape({
                text: PropTypes.string.isRequired
            }),
            endDate: PropTypes.shape({
                text: PropTypes.string.isRequired
            }),
            editUrl: PropTypes.string.isRequired,
            updateApi: PropTypes.string.isRequired,
            deleteApi: PropTypes.string.isRequired
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
    coupons (filters: $filters) {
      items {
        couponId
        uuid
        coupon
        status
        usedTime
        startDate {
          text
        }
        endDate {
          text
        }
        editUrl
        updateApi
        deleteApi
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
