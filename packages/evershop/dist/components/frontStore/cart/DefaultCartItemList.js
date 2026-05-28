import { Area } from '@components/common/Area.js';
import { ExtendableTable } from '@components/common/ExtendableTable.js';
import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { ItemQuantity } from '@components/frontStore/cart/ItemQuantity.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export const DefaultCartItemList = ({ items, showPriceIncludingTax = true, loading = false, onSort, currentSort, onRemoveItem })=>{
    const columns = [
        {
            key: 'productInfo',
            header: {
                label: _('Product'),
                className: ''
            },
            className: 'font-medium align-top',
            sortable: false,
            render: (row)=>{
                const priceValue = showPriceIncludingTax ? row.productPriceInclTax?.text : row.productPrice?.text;
                return /*#__PURE__*/ React.createElement("div", {
                    className: "flex justify-start gap-4"
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "shrink-0"
                }, row.thumbnail ? /*#__PURE__*/ React.createElement(Image, {
                    src: row.thumbnail,
                    alt: row.productName,
                    width: 80,
                    height: 80,
                    className: "rounded-md"
                }) : /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
                    width: 80,
                    height: 80
                })), /*#__PURE__*/ React.createElement("div", {
                    className: "font-medium flex flex-col gap-1 items-start h-full min-w-0 flex-1"
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "font-semibold wrap-break-word w-full"
                }, row.productName), row.variantOptions?.map((option)=>/*#__PURE__*/ React.createElement("span", {
                        key: option.optionId,
                        className: "text-xs"
                    }, /*#__PURE__*/ React.createElement("span", null, option.attributeName), ":", ' ', /*#__PURE__*/ React.createElement("span", {
                        className: "text-muted-foreground"
                    }, option.optionText))), /*#__PURE__*/ React.createElement("span", {
                    className: "text-sm text-muted-foreground"
                }, priceValue, " x ", row.qty), /*#__PURE__*/ React.createElement("a", {
                    href: "#",
                    className: "text-destructive text-sm",
                    onClick: (e)=>{
                        e.preventDefault();
                        onRemoveItem?.(row.cartItemId);
                    }
                }, _('Remove')), row.errors?.map((error, index)=>/*#__PURE__*/ React.createElement("span", {
                        key: index,
                        className: "text-xs text-destructive"
                    }, error))));
            }
        },
        {
            key: 'qty',
            header: {
                label: _('Quantity'),
                className: 'text-right'
            },
            sortable: true,
            render: (row)=>{
                return /*#__PURE__*/ React.createElement("div", {
                    className: "flex justify-end"
                }, /*#__PURE__*/ React.createElement(ItemQuantity, {
                    initialValue: row.qty,
                    cartItemId: row.cartItemId,
                    min: 1,
                    max: 99
                }, ({ quantity, increase, decrease })=>/*#__PURE__*/ React.createElement("div", {
                        className: "flex items-center"
                    }, /*#__PURE__*/ React.createElement("button", {
                        onClick: decrease,
                        disabled: loading || quantity <= 1,
                        className: "px-1 disabled:opacity-50 text-lg"
                    }, "−"), /*#__PURE__*/ React.createElement("span", {
                        className: "min-w-12 text-center"
                    }, quantity), /*#__PURE__*/ React.createElement("button", {
                        onClick: increase,
                        disabled: loading,
                        className: "disabled:opacity-50 text-lg"
                    }, "+"))));
            }
        },
        {
            key: 'lineTotal',
            header: {
                label: _('Total'),
                className: 'text-right'
            },
            sortable: true,
            render: (row)=>{
                const totalValue = showPriceIncludingTax ? row.lineTotalInclTax?.text : row.lineTotal?.text;
                return /*#__PURE__*/ React.createElement("div", {
                    className: "text-right"
                }, /*#__PURE__*/ React.createElement("span", {
                    className: "font-bold"
                }, totalValue));
            }
        }
    ];
    const [rows, setRows] = React.useState(items);
    React.useEffect(()=>{
        setRows(items);
    }, [
        items
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "cartItemListBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(ExtendableTable, {
        name: "shoppingCartItems",
        columns: columns,
        initialData: rows,
        loading: loading,
        emptyMessage: _('Your cart is empty'),
        onSort: onSort,
        currentSort: currentSort,
        className: "cart__items__table border-none table-fixed border-spacing-y-2 border-separate w-full"
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "cartItemListAfter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("style", null, `
        .cart__items__table th, .cart__items__table td {
          padding: 0.75rem;
          white-space: normal;
        }
        .cart__items__table th {
          border: none;
        }
        .cart__items__table td {
          border: none;
        }
        .cart__items__table th:first-child,
        .cart__items__table td:first-child {
          width: 60%;
        }
        .cart__items__table th:nth-child(2),
        .cart__items__table td:nth-child(2) {
          width: 25%;
        }
      `));
};
