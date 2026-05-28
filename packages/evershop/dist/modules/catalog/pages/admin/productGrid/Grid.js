import { GridPagination } from '@components/admin/grid/GridPagination.js';
import { DummyColumnHeader } from '@components/admin/grid/header/Dummy';
import { SortableHeader } from '@components/admin/grid/header/Sortable.js';
import { Thumbnail } from '@components/admin/grid/Thumbnail.js';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ProductNameRow } from './rows/ProductName.js';
function Actions({ products = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const updateProducts = async (status)=>{
        setIsLoading(true);
        const promises = products.filter((product)=>selectedIds.includes(product.uuid)).map((product)=>axios.patch(product.updateApi, {
                status
            }));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const deleteProducts = async ()=>{
        setIsLoading(true);
        const promises = products.filter((product)=>selectedIds.includes(product.uuid)).map((product)=>axios.delete(product.deleteApi));
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
                    heading: `Disable ${selectedIds.length} products`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Disable',
                        onAction: async ()=>{
                            await updateProducts(0);
                        },
                        variant: 'default',
                        isLoading: false
                    }
                });
            }
        },
        {
            name: 'Enable',
            onAction: ()=>{
                openAlert({
                    heading: `Enable ${selectedIds.length} products`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Enable',
                        onAction: async ()=>{
                            await updateProducts(1);
                        },
                        variant: 'default',
                        isLoading: false
                    }
                });
            }
        },
        {
            name: 'Delete',
            onAction: ()=>{
                openAlert({
                    heading: `Delete ${selectedIds.length} products`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deleteProducts();
                        },
                        variant: 'destructive',
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
    products: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired
    })).isRequired
};
export default function ProductGrid({ products: { items: products, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement(Form, {
        submitBtn: false,
        id: "productGridFilter"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-5 justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "productGridFilter",
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
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(Select, {
                            value: currentFilters.find((f)=>f.key === 'type')?.value,
                            onValueChange: (value)=>{
                                const url = new URL(document.location);
                                url.searchParams.set('type', value);
                                window.location.href = url.href;
                            }
                        }, /*#__PURE__*/ React.createElement(SelectTrigger, null, /*#__PURE__*/ React.createElement(SelectValue, null, "Product type")), /*#__PURE__*/ React.createElement(SelectContent, null, /*#__PURE__*/ React.createElement(SelectGroup, null, /*#__PURE__*/ React.createElement(SelectLabel, null, "Product type"), /*#__PURE__*/ React.createElement(SelectItem, {
                            value: "simple"
                        }, "Simple"), /*#__PURE__*/ React.createElement(SelectItem, {
                            value: "configurable"
                        }, "Configurable"))))
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
    }, "Clear Filters"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement(Checkbox, {
        onCheckedChange: (checked)=>{
            if (checked) {
                setSelectedRows(products.map((p)=>p.uuid));
            } else {
                setSelectedRows([]);
            }
        }
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "productGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("div", {
                            className: "table-header id-header"
                        }, /*#__PURE__*/ React.createElement("div", {
                            className: "font-medium uppercase text-xs"
                        }, /*#__PURE__*/ React.createElement("span", null, "Thumbnail"))))
                },
                sortOrder: 5
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Name",
                            name: "name",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Price",
                            name: "price",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 15
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "SKU"
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Stock",
                            name: "qty",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 25
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Status",
                            name: "status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 30
            }
        ]
    }))), /*#__PURE__*/ React.createElement(TableBody, null, /*#__PURE__*/ React.createElement(Actions, {
        products: products,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), products.map((p)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: p.uuid
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            checked: selectedRows.includes(p.uuid),
            onCheckedChange: (checked)=>{
                if (checked) {
                    setSelectedRows(selectedRows.concat([
                        p.uuid
                    ]));
                } else {
                    setSelectedRows(selectedRows.filter((row)=>row !== p.uuid));
                }
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            id: "productGridRow",
            row: p,
            noOuter: true,
            selectedRows: selectedRows,
            setSelectedRows: setSelectedRows,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(Thumbnail, {
                                src: p.image?.url,
                                name: p.name
                            })
                    },
                    sortOrder: 5
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(ProductNameRow, {
                                id: "name",
                                name: p.name,
                                url: p.editUrl
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, p.price?.regular.text)
                    },
                    sortOrder: 15
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, p.sku)
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, p.inventory?.qty)
                    },
                    sortOrder: 25
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                id: "status",
                                status: parseInt(p.status, 10)
                            })
                    },
                    sortOrder: 30
                }
            ]
        }))))), products.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center mt-2"
    }, "There is no product to display"), /*#__PURE__*/ React.createElement(GridPagination, {
        total: total,
        limit: limit,
        page: page
    })));
}
ProductGrid.propTypes = {
    products: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            productId: PropTypes.number,
            uuid: PropTypes.string,
            name: PropTypes.string,
            image: PropTypes.shape({
                thumb: PropTypes.string
            }),
            sku: PropTypes.string,
            status: PropTypes.number,
            inventory: PropTypes.shape({
                qty: PropTypes.number
            }),
            price: PropTypes.shape({
                regular: PropTypes.shape({
                    value: PropTypes.number,
                    text: PropTypes.string
                })
            }),
            editUrl: PropTypes.string,
            updateApi: PropTypes.string,
            deleteApi: PropTypes.string
        })),
        total: PropTypes.number,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            operation: PropTypes.string,
            value: PropTypes.string
        }))
    }).isRequired
};
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
export const query = `
  query Query($filters: [FilterInput]) {
    products (filters: $filters) {
      items {
        productId
        uuid
        name
        image {
          url
          alt
        }
        sku
        status
        inventory {
          qty
        }
        price {
          regular {
            value
            text
          }
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
    newProductUrl: url(routeId: "productNew")
  }
`;
export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
