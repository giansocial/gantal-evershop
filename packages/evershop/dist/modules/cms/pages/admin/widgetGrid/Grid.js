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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Name } from './rows/Name.js';
import { WidgetTypeRow } from './rows/WidgetTypeRow.js';
function Actions({ widgets = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const updatePages = async (status)=>{
        setIsLoading(true);
        const promises = widgets.filter((widget)=>selectedIds.includes(widget.uuid)).map((widget)=>axios.patch(widget.updateApi, {
                status
            }));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const deletePages = async ()=>{
        setIsLoading(true);
        const promises = widgets.filter((widget)=>selectedIds.includes(widget.uuid)).map((widget)=>axios.delete(widget.deleteApi));
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
                    heading: `Disable ${selectedIds.length} widgets`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Disable',
                        onAction: async ()=>{
                            await updatePages(0);
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
                    heading: `Enable ${selectedIds.length} widgets`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Enable',
                        onAction: async ()=>{
                            await updatePages(1);
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
                    heading: `Delete ${selectedIds.length} widgets`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deletePages();
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
    widgets: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired
    })).isRequired
};
export default function WidgetGrid({ widgets: { items, total, currentFilters = [] }, widgetTypes }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement(Form, {
        submitBtn: false,
        id: "widgetGridFilter"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "widgetGridFilter",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(InputField, {
                            name: "name",
                            placeholder: "Search",
                            defaultValue: currentFilters.find((f)=>f.key === 'name')?.value,
                            onKeyPress: (e)=>{
                                // If the user press enter, we should submit the form
                                if (e.key === 'Enter') {
                                    const url = new URL(document.location);
                                    const name = e.target?.value;
                                    if (name) {
                                        url.searchParams.set('name[operation]', 'like');
                                        url.searchParams.set('name[value]', name);
                                    } else {
                                        url.searchParams.delete('name[operation]');
                                        url.searchParams.delete('name[value]');
                                    }
                                    window.location.href = url;
                                }
                            }
                        })
                },
                sortOrder: 10
            }
        ]
    })), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "link",
        onClick: ()=>{
            // Just get the url and remove all query params
            const url = new URL(document.location);
            url.search = '';
            window.location.href = url.href;
        }
    }, "Clear Filters"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        onCheckedChange: (checked)=>{
            if (checked) {
                setSelectedRows(items.map((p)=>p.uuid));
            } else {
                setSelectedRows([]);
            }
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        className: "",
        id: "widgetGridHeader",
        noOuter: true,
        coreComponents: [
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
                            title: "Type",
                            name: "type",
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
            }
        ]
    }))), /*#__PURE__*/ React.createElement(TableBody, null, /*#__PURE__*/ React.createElement(Actions, {
        widgets: items,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), items.map((w, i)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: i
        }, /*#__PURE__*/ React.createElement(TableCell, {
            style: {
                width: '2rem'
            }
        }, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            checked: selectedRows.includes(w.uuid),
            onCheckedChange: (checked)=>{
                if (checked) {
                    setSelectedRows(selectedRows.concat([
                        w.uuid
                    ]));
                } else {
                    setSelectedRows(selectedRows.filter((row)=>row !== w.uuid));
                }
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            className: "",
            id: "widgetGridRow",
            row: w,
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(Name, {
                                url: w.editUrl,
                                name: w.name
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(WidgetTypeRow, {
                                code: w.type,
                                types: widgetTypes
                            })
                    },
                    sortOrder: 15
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                status: parseInt(w.status, 10)
                            })
                    },
                    sortOrder: 20
                }
            ]
        }))))), items.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center mt-2"
    }, "There is no widget to display"), /*#__PURE__*/ React.createElement(GridPagination, {
        total: total,
        limit: limit,
        page: page
    })));
}
WidgetGrid.propTypes = {
    widgets: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            uuid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            editUrl: PropTypes.string.isRequired,
            updateApi: PropTypes.string.isRequired,
            deleteApi: PropTypes.string.isRequired
        })).isRequired,
        total: PropTypes.number.isRequired,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            operation: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }))
    }).isRequired,
    widgetTypes: PropTypes.arrayOf(PropTypes.shape({
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
    widgets (filters: $filters) {
      items {
        widgetId
        uuid
        name
        area
        route
        type
        status
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
    widgetTypes {
      code
      name
    }
  }
`;
export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
