import { GridPagination } from '@components/admin/grid/GridPagination';
import { DummyColumnHeader } from '@components/admin/grid/header/Dummy';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import { Button } from '@components/common/ui/Button.js';
import { ButtonGroup } from '@components/common/ui/ButtonGroup.js';
import { Card, CardAction, CardContent, CardHeader } from '@components/common/ui/Card.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Table, TableCell, TableRow, TableHeader, TableHead, TableBody } from '@components/common/ui/Table.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CollectionNameRow } from './rows/CollectionNameRow.js';
function Actions({ collections = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const deleteCategories = async ()=>{
        setIsLoading(true);
        const promises = collections.filter((c)=>selectedIds.includes(c.uuid)).map((col)=>axios.delete(col.deleteApi));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Delete',
            onAction: ()=>{
                openAlert({
                    heading: `Delete ${selectedIds.length} collections`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'secondary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deleteCategories();
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
    collections: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired
    })).isRequired
};
export default function CollectionGrid({ collections: { items: collections, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "w-2/3",
        style: {
            margin: '0 auto'
        }
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement(Form, {
        submitBtn: false,
        id: "collectionGridFilter"
    }, /*#__PURE__*/ React.createElement(InputField, {
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
    })), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "link",
        onClick: ()=>{
            // Just get the url and remove all query params
            const url = new URL(document.location);
            url.search = '';
            window.location.href = url.href;
        }
    }, "Clear filters"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        onCheckedChange: (checked)=>{
            if (checked) {
                setSelectedRows(collections.map((c)=>c.uuid));
            } else {
                setSelectedRows([]);
            }
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        className: "",
        id: "collectionGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "ID",
                            id: "collectionId",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 5
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Collection Name",
                            name: "name",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Code",
                            name: "code",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 15
            }
        ]
    }))), /*#__PURE__*/ React.createElement(TableBody, null, /*#__PURE__*/ React.createElement(Actions, {
        collections: collections,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), collections.map((c)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: c.collectionId
        }, /*#__PURE__*/ React.createElement(TableCell, {
            style: {
                width: '2rem'
            }
        }, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            checked: selectedRows.includes(c.uuid),
            onCheckedChange: (checked)=>{
                if (checked) setSelectedRows(selectedRows.concat([
                    c.uuid
                ]));
                else setSelectedRows(selectedRows.filter((r)=>r !== c.uuid));
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            className: "",
            id: "collectionGridRow",
            row: c,
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, c.collectionId.toString())
                    },
                    sortOrder: 5
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(CollectionNameRow, {
                                id: "name",
                                name: c.name,
                                url: c.editUrl
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(TableCell, null, c.code)
                    },
                    sortOrder: 15
                }
            ]
        }))))), collections.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center mt-2"
    }, "There is no collections to display"), /*#__PURE__*/ React.createElement(GridPagination, {
        total: total,
        limit: limit,
        page: page
    }))));
}
CollectionGrid.propTypes = {
    collections: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            collectionId: PropTypes.number.isRequired,
            uuid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            code: PropTypes.string.isRequired,
            editUrl: PropTypes.string.isRequired,
            deleteApi: PropTypes.string.isRequired
        })).isRequired,
        total: PropTypes.number.isRequired,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            operation: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }))
    }).isRequired
};
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
export const query = `
  query Query($filters: [FilterInput]) {
    collections (filters: $filters) {
      items {
        collectionId
        uuid
        name
        code
        editUrl
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
