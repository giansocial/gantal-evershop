import { SimplePagination } from '@components/common/SimplePagination.js';
import { Button } from '@components/common/ui/Button.js';
import { Input } from '@components/common/ui/Input.js';
import { Check } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'urql';
import { ProductListSkeleton } from './ProductListSkeleton.js';
const SearchQuery = `
  query Query ($filters: [FilterInput!]) {
    products(filters: $filters) {
      items {
        productId
        uuid
        sku
        name
        price {
          regular {
            text
          }
        }
        image {
          url
        }
      }
      total
    }
  }
`;
const isProductSelected = (product, selectedProducts)=>{
    return selectedProducts.some((selected)=>selected?.sku && selected.sku === product.sku || selected?.uuid && selected.uuid === product.uuid || selected?.productId && selected.productId === product.productId);
};
const ProductSelector = ({ onSelect, onUnSelect, selectedProducts })=>{
    const limit = 10;
    const [internalSelectedProducts, setSelectedProducts] = React.useState(selectedProducts || []);
    const [inputValue, setInputValue] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [result, reexecuteQuery] = useQuery({
        query: SearchQuery,
        variables: {
            filters: inputValue ? [
                {
                    key: 'keyword',
                    operation: 'eq',
                    value: inputValue
                },
                {
                    key: 'page',
                    operation: 'eq',
                    value: page.toString()
                },
                {
                    key: 'limit',
                    operation: 'eq',
                    value: limit.toString()
                }
            ] : [
                {
                    key: 'limit',
                    operation: 'eq',
                    value: limit.toString()
                },
                {
                    key: 'page',
                    operation: 'eq',
                    value: page.toString()
                }
            ]
        },
        pause: true
    });
    const selectProduct = async (sku, uuid, productId)=>{
        setSelectedProducts((prev)=>[
                ...prev,
                {
                    sku,
                    uuid,
                    productId
                }
            ]);
        try {
            await onSelect(sku, uuid, productId);
        } catch (e) {
            toast.error(e.message);
        }
    };
    const unSelectProduct = async (sku, uuid, productId)=>{
        if (!onUnSelect) {
            return;
        }
        setSelectedProducts((prev)=>prev.filter((product)=>product?.sku !== sku));
        try {
            await onUnSelect(sku, uuid, productId);
        } catch (e) {
            toast.error(e.message);
        }
    };
    React.useEffect(()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    }, [
        page
    ]);
    React.useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoading(false);
            if (inputValue !== null) {
                reexecuteQuery({
                    requestPolicy: 'network-only'
                });
            }
        }, 1500);
        return ()=>clearTimeout(timer);
    }, [
        inputValue
    ]);
    const { data, fetching, error } = result;
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, "There was an error fetching products.", error.message);
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        value: inputValue || '',
        placeholder: "Search products",
        onChange: (e)=>{
            setInputValue(e.target.value);
            setLoading(true);
        }
    })), (fetching || loading) && /*#__PURE__*/ React.createElement(ProductListSkeleton, null), !fetching && data && !loading && /*#__PURE__*/ React.createElement("div", {
        className: "divide-y"
    }, data.products.items.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 border border-divider rounded flex justify-center items-center"
    }, inputValue ? /*#__PURE__*/ React.createElement("p", null, 'No products found for query "', inputValue, "”") : /*#__PURE__*/ React.createElement("p", null, "You have no products to display")), data.products.items.map((product)=>/*#__PURE__*/ React.createElement("div", {
            key: product.uuid,
            className: "grid grid-cols-8 gap-5 py-2 border-divider items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "col-span-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "text-border border border-divider p-2 rounded flex justify-center w-10 h-10"
        }, product.image?.url && /*#__PURE__*/ React.createElement("img", {
            src: product.image?.url,
            alt: product.name
        }), !product.image?.url && /*#__PURE__*/ React.createElement("svg", {
            className: "self-center",
            xmlns: "http://www.w3.org/2000/svg",
            width: "2rem",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
        }, /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        })))), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-5"
        }, /*#__PURE__*/ React.createElement("h3", null, product.name), /*#__PURE__*/ React.createElement("p", null, product.sku)), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-2 text-right"
        }, !isProductSelected(product, internalSelectedProducts) && /*#__PURE__*/ React.createElement(Button, {
            variant: 'outline',
            onClick: async (e)=>{
                e.preventDefault();
                await selectProduct(product.sku, product.uuid, product.productId);
            }
        }, "Select"), isProductSelected(product, internalSelectedProducts) && /*#__PURE__*/ React.createElement(Button, {
            onClick: (e)=>{
                e.preventDefault();
                unSelectProduct(product.sku, product.uuid, product.productId);
            }
        }, /*#__PURE__*/ React.createElement(Check, {
            width: '1.2rem',
            height: '1.2rem'
        })))))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-5 pt-5"
    }, /*#__PURE__*/ React.createElement(SimplePagination, {
        total: data?.products.total || 0,
        count: data?.products?.items?.length || 0,
        page: page,
        hasNext: limit * page < data?.products.total,
        setPage: setPage
    })));
};
export { ProductSelector };
