import Area from '@components/common/Area.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
const TableContext = /*#__PURE__*/ React.createContext(null);
export function useTableContext() {
    const context = React.useContext(TableContext);
    if (!context) {
        throw new Error('useTableContext must be used within a TableProvider');
    }
    return context;
}
export function TableProvider({ children, name, initialColumns, tableData, onSort, currentSort }) {
    const [columns, setColumns] = React.useState(initialColumns);
    // Update columns when props change
    React.useEffect(()=>{
        setColumns(initialColumns.map((col)=>({
                ...col
            })));
    }, [
        initialColumns
    ]);
    const addColumnBefore = React.useCallback((newColumn, beforeColumnKey)=>{
        setColumns((cols)=>{
            // Find index of the column to insert before
            const index = cols.findIndex((col)=>col.key === beforeColumnKey);
            // If found, insert before it (index), else add to the start
            const position = index !== -1 ? index : 0;
            return [
                ...cols.slice(0, position),
                newColumn,
                ...cols.slice(position)
            ];
        });
    }, []);
    const addColumnAfter = React.useCallback((newColumn, afterColumnKey)=>{
        setColumns((cols)=>{
            // Find index of the column to insert after
            const index = cols.findIndex((col)=>col.key === afterColumnKey);
            // If found, insert after it (index + 1), else add to the end
            const position = index !== -1 ? index + 1 : cols.length;
            return [
                ...cols.slice(0, position),
                newColumn,
                ...cols.slice(position)
            ];
        });
    }, []);
    const removeColumn = React.useCallback((key)=>{
        setColumns((cols)=>cols.map((col)=>col.key === key ? {
                    ...col,
                    isRemoved: true
                } : col));
    }, []);
    const contextValue = {
        columns,
        setColumns,
        tableData,
        currentSort,
        addColumnBefore,
        addColumnAfter,
        removeColumn,
        tableName: name
    };
    return /*#__PURE__*/ React.createElement(TableContext.Provider, {
        value: contextValue
    }, children);
}
export function ExtendableTable({ name, columns, initialData, loading = false, noHeader = false, emptyMessage = _('No data available'), onSort, currentSort, className = '' }) {
    const handleSort = (key)=>{
        if (!onSort) return;
        const direction = currentSort?.key === key && currentSort.direction === 'asc' ? 'desc' : 'asc';
        onSort(key, direction);
    };
    return /*#__PURE__*/ React.createElement(TableProvider, {
        name: name,
        initialColumns: columns,
        tableData: initialData,
        onSort: onSort,
        currentSort: currentSort
    }, /*#__PURE__*/ React.createElement(Area, {
        id: name
    }), /*#__PURE__*/ React.createElement(TableContent, {
        loading: loading,
        noHeader: noHeader,
        onSort: onSort,
        currentSort: currentSort,
        emptyMessage: emptyMessage,
        className: className
    }));
}
// Separate component to use the context
function TableContent({ loading = false, noHeader = false, onSort, currentSort, emptyMessage, className }) {
    const { columns, tableData } = useTableContext();
    const handleSort = (key)=>{
        if (!onSort) return;
        const direction = currentSort?.key === key && currentSort.direction === 'asc' ? 'desc' : 'asc';
        onSort(key, direction);
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Table, {
        className: className
    }, !noHeader && /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, columns.filter((col)=>!col.isRemoved).map((col)=>/*#__PURE__*/ React.createElement(TableHead, {
            key: col.key,
            className: `${col.header.className} ${col.sortable ? 'cursor-pointer' : ''}`,
            onClick: ()=>col.sortable && handleSort(col.key),
            style: {
                width: col.width
            }
        }, /*#__PURE__*/ React.createElement("span", null, col.header.label), col.sortable && currentSort?.key === col.key && /*#__PURE__*/ React.createElement("span", {
            className: "text-blue-500"
        }, currentSort.direction === 'asc' ? '↑' : '↓'))))), /*#__PURE__*/ React.createElement(TableBody, null, tableData.length === 0 ? /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableCell, {
        colSpan: columns.filter((col)=>!col.isRemoved).length
    }, emptyMessage)) : tableData.map((row, rowIndex)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: rowIndex
        }, columns.filter((col)=>!col.isRemoved).map((col)=>/*#__PURE__*/ React.createElement(TableCell, {
                key: col.key,
                className: col.className,
                style: {
                    width: col.width
                }
            }, col.render ? col.render(row, rowIndex, loading) : row[col.key])))))));
}
