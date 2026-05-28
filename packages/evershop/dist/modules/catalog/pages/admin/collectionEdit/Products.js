import { ProductListSkeleton } from '@components/admin/ProductListSkeleton.js';
import { ProductSelector } from '@components/admin/ProductSelector.js';
import { Button } from '@components/common/ui/Button.js';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import { Input } from '@components/common/ui/Input.js';
import React from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'urql';
const ProductsQuery = `
  query Query ($code: String!, $filters: [FilterInput!]) {
    collection (code: $code) {
      products (filters: $filters) {
        items {
          productId
          uuid
          name
          sku
          price {
            regular {
              text
            }
          }
          image {
            url
          }
          editUrl
          removeFromCollectionUrl
        }
        total
      }
    }
  }
`;
export default function Products({ collection: { code, addProductApi } }) {
    const [keyword, setKeyword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [removing, setRemoving] = React.useState([]);
    const addProductFunction = async (sku, uuid)=>{
        const response = await fetch(addProductApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: uuid
            }),
            credentials: 'include'
        });
        const data = await response.json();
        if (!data.success) {
            toast.error(data.message);
        } else {
            reexecuteQuery({
                requestPolicy: 'network-only'
            });
        }
    };
    // Run query again when page changes
    const [result, reexecuteQuery] = useQuery({
        query: ProductsQuery,
        variables: {
            code,
            filters: !keyword ? [
                {
                    key: 'page',
                    operation: 'eq',
                    value: page.toString()
                },
                {
                    key: 'limit',
                    operation: 'eq',
                    value: '10'
                }
            ] : [
                {
                    key: 'page',
                    operation: 'eq',
                    value: page.toString()
                },
                {
                    key: 'limit',
                    operation: 'eq',
                    value: '10'
                },
                {
                    key: 'keyword',
                    operation: 'eq',
                    value: keyword
                }
            ]
        },
        pause: true
    });
    React.useEffect(()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    }, []);
    const removeProduct = async (api, uuid)=>{
        setRemoving([
            ...removing,
            uuid
        ]);
        await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });
        setPage(1);
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    };
    React.useEffect(()=>{
        const timer = setTimeout(()=>{
            reexecuteQuery({
                requestPolicy: 'network-only'
            });
            setLoading(false);
        }, 1500);
        return ()=>clearTimeout(timer);
    }, [
        keyword
    ]);
    React.useEffect(()=>{
        if (result.fetching) {
            return;
        }
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    }, [
        page
    ]);
    const { data, fetching, error } = result;
    return /*#__PURE__*/ React.createElement(Dialog, null, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Products"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the products assigned to this collection."), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: "link"
    }, "Add Products")))), error && /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive"
    }, error.message)), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-5"
    }, /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        value: keyword,
        placeholder: "Search products",
        onChange: (e)=>{
            setLoading(true);
            setKeyword(e.target.value);
        }
    })), data && !loading && /*#__PURE__*/ React.createElement(React.Fragment, null, data.collection.products.items.length === 0 && /*#__PURE__*/ React.createElement("div", null, "No product to display."), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("i", null, data.collection.products.total, " items")), /*#__PURE__*/ React.createElement("div", null, data.collection.products.total > 10 && /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-2"
    }, page > 1 && /*#__PURE__*/ React.createElement("a", {
        className: "text-interactive",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setPage(page - 1);
        }
    }, "Previous"), page < data.collection.products.total / 10 && /*#__PURE__*/ React.createElement("a", {
        className: "text-interactive",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setPage(page + 1);
        }
    }, "Next")))), /*#__PURE__*/ React.createElement("div", {
        className: "divide-y"
    }, data.collection.products.items.map((p)=>/*#__PURE__*/ React.createElement("div", {
            key: p.uuid,
            className: "flex justify-between py-2 border-divider items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-items-start gap-5"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "grid-thumbnail text-border border border-divider p-2 rounded flex justify-center w-10 h-10"
        }, p.image?.url && /*#__PURE__*/ React.createElement("img", {
            className: "self-center",
            src: p.image?.url,
            alt: ""
        }), !p.image?.url && /*#__PURE__*/ React.createElement("svg", {
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
        }))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
            href: p.editUrl || '',
            className: "font-semibold hover:underline"
        }, p.name))), /*#__PURE__*/ React.createElement("div", {
            className: "text-right"
        }, /*#__PURE__*/ React.createElement(Button, {
            variant: "destructive",
            onClick: async ()=>{
                await removeProduct(p.removeFromCollectionUrl, p.uuid);
            },
            isLoading: removing.includes(p.uuid)
        }, "Remove")))))), (fetching || loading) && /*#__PURE__*/ React.createElement(ProductListSkeleton, null)))), /*#__PURE__*/ React.createElement(DialogContent, {
        className: "sm:max-w-[90vw] lg:max-w-200"
    }, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Add Products"), /*#__PURE__*/ React.createElement(DialogDescription, null, "Select products to add to this collection.")), data && /*#__PURE__*/ React.createElement(ProductSelector, {
        onSelect: addProductFunction,
        selectedProducts: data.collection.products.items.map((p)=>({
                sku: p.sku,
                uuid: p.uuid,
                productId: p.productId
            }))
    })));
}
export const layout = {
    areaId: 'collectionFormInner',
    sortOrder: 20
};
export const query = `
  query Query {
    collection(code: getContextValue("collectionCode", null)) {
      collectionId
      code
      addProductApi: addProductUrl
    }
  }
`;
