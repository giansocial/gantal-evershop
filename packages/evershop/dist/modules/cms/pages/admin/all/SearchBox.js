import Spinner from '@components/admin/Spinner.js';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@components/common/ui/InputGroup.js';
import { Search } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useQuery } from 'urql';
import { NoResult } from './search/NoResult.js';
import { Results } from './search/Results.js';
const useClickOutside = (ref, callback)=>{
    const handleClick = (e)=>{
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    React.useEffect(()=>{
        document.addEventListener('click', handleClick);
        return ()=>{
            document.removeEventListener('click', handleClick);
        };
    });
};
const SearchQuery = `
  query Query ($filters: [FilterInput]) {
    customers(filters: $filters) {
      items {
        customerId
        uuid
        fullName
        email
        url: editUrl
      }
    }
    products(filters: $filters) {
      items {
        productId
        uuid
        sku
        name
        url: editUrl
      }
    }
    orders(filters: $filters) {
      items {
        orderId
        uuid
        orderNumber
        url: editUrl
      }
    }
  }
`;
export default function SearchBox({ resourceLinks }) {
    const [keyword, setKeyword] = React.useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const InputRef = useRef(null);
    const clickRef = React.useRef(null);
    const onClickOutside = ()=>{
        if (InputRef.current !== document.activeElement) {
            setShowResult(false);
        }
    };
    useClickOutside(clickRef, onClickOutside);
    const [result, reexecuteQuery] = useQuery({
        query: SearchQuery,
        variables: {
            filters: keyword ? [
                {
                    key: 'keyword',
                    operation: 'eq',
                    value: keyword
                }
            ] : []
        },
        pause: true
    });
    const { data, fetching } = result;
    React.useEffect(()=>{
        setLoading(true);
        if (keyword) {
            setShowResult(true);
        } else {
            setShowResult(false);
        }
        const timer = setTimeout(()=>{
            if (keyword) {
                reexecuteQuery({
                    requestPolicy: 'network-only'
                });
                setLoading(false);
            }
        }, 1500);
        return ()=>clearTimeout(timer);
    }, [
        keyword
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "relative self-center ml-[14.563rem] w-[34.375rem]"
    }, /*#__PURE__*/ React.createElement(InputGroup, {
        className: "bg-[#f1f2f3] rounded-[3px] border-[#f1f2f3]"
    }, /*#__PURE__*/ React.createElement(InputGroupAddon, null, /*#__PURE__*/ React.createElement(Search, null)), /*#__PURE__*/ React.createElement(InputGroupInput, {
        type: "text",
        placeholder: "Search",
        ref: InputRef,
        onChange: (e)=>setKeyword(e.target.value)
    })), showResult && /*#__PURE__*/ React.createElement("div", {
        className: "absolute top-[calc(100%+1rem)] left-0 bg-white rounded-[5px] w-full py-5 px-2.5 border border-border shadow-lg z-50 max-h-[30rem] overflow-y-auto",
        ref: clickRef
    }, (loading || fetching) && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 flex justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        width: 25,
        height: 25
    })), !keyword && /*#__PURE__*/ React.createElement("div", {
        className: "text-center"
    }, /*#__PURE__*/ React.createElement("span", null, "Search for products, order and other resources")), data?.products.items.length === 0 && data?.customers.items.length === 0 && data?.orders.items.length === 0 && keyword && !loading && /*#__PURE__*/ React.createElement(NoResult, {
        keyword: keyword,
        resourseLinks: resourceLinks
    }), data && !loading && !fetching && (data?.products.items.length > 0 || data?.customers.items.length > 0 || data?.orders.items.length > 0) && /*#__PURE__*/ React.createElement(Results, {
        keyword: keyword,
        results: data
    })));
}
export const layout = {
    areaId: 'header',
    sortOrder: 20
};
