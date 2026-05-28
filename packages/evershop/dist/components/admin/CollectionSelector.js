import { SimplePagination } from '@components/common/SimplePagination.js';
import { Button } from '@components/common/ui/Button.js';
import { Input } from '@components/common/ui/Input.js';
import { Skeleton } from '@components/common/ui/Skeleton.js';
import { Check } from 'lucide-react';
import React from 'react';
import { useQuery } from 'urql';
const SearchQuery = `
  query Query ($filters: [FilterInput!]) {
    collections(filters: $filters) {
      items {
        collectionId
        uuid
        name
      }
      total
    }
  }
`;
const CollectionListSkeleton = ()=>{
    const skeletonItems = Array(5).fill(0);
    return /*#__PURE__*/ React.createElement("div", {
        className: "attribute-group-list-skeleton space-y-2 divide-y"
    }, skeletonItems.map((_, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "attribute-group-skeleton-item border-border pb-2 flex justify-between items-center "
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-5 w-30 rounded"
        })), /*#__PURE__*/ React.createElement("div", {
            className: "select-button"
        }, /*#__PURE__*/ React.createElement(Skeleton, {
            className: "h-6 w-12 rounded"
        })))));
};
const isCollectionSelected = (collection, selectedCollections)=>{
    return selectedCollections.some((selected)=>selected?.collectionId && selected.collectionId === collection.collectionId || selected?.uuid && selected.uuid === collection.uuid);
};
const CollectionSelector = ({ onSelect, onUnSelect, selectedCollections })=>{
    const [internalSelectedCollections, setInternalSelectedCollections] = React.useState(selectedCollections || []);
    const [loading, setLoading] = React.useState(false);
    const limit = 10;
    const [inputValue, setInputValue] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [result, reexecuteQuery] = useQuery({
        query: SearchQuery,
        variables: {
            filters: inputValue ? [
                {
                    key: 'name',
                    operation: 'like',
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
            if (inputValue !== '') {
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
        }, "There was an error fetching collections.", error.message);
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        value: inputValue || '',
        placeholder: "Search collections",
        onChange: (e)=>{
            setInputValue(e.target.value);
            setLoading(true);
        }
    })), (fetching || loading) && /*#__PURE__*/ React.createElement(CollectionListSkeleton, null), !fetching && data && /*#__PURE__*/ React.createElement("div", {
        className: "divide-y"
    }, data.collections.items.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 border border-divider rounded flex justify-center items-center"
    }, inputValue ? /*#__PURE__*/ React.createElement("p", null, 'No collections found for query "', inputValue, "”") : /*#__PURE__*/ React.createElement("p", null, "You have no collections to display")), data.collections.items.map((c)=>/*#__PURE__*/ React.createElement("div", {
            key: c.uuid,
            className: "grid grid-cols-8 gap-5 py-2 border-divider items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "col-span-5"
        }, /*#__PURE__*/ React.createElement("h3", null, c.name)), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-3 text-right"
        }, !isCollectionSelected(c, internalSelectedCollections) && /*#__PURE__*/ React.createElement(Button, {
            variant: "outline",
            onClick: async (e)=>{
                e.preventDefault();
                setInternalSelectedCollections((prev)=>[
                        ...prev,
                        {
                            collectionId: c.collectionId,
                            uuid: c.uuid,
                            name: c.name
                        }
                    ]);
                onSelect(c.collectionId, c.uuid, c.name);
            }
        }, "Select"), isCollectionSelected(c, internalSelectedCollections) && /*#__PURE__*/ React.createElement(Button, {
            variant: "default",
            onClick: (e)=>{
                e.preventDefault();
                setInternalSelectedCollections((prev)=>prev.filter((c)=>c.collectionId !== c.collectionId && c.uuid !== c.uuid));
                onUnSelect(c.collectionId, c.uuid, c.name);
            }
        }, /*#__PURE__*/ React.createElement(Check, {
            width: 20,
            height: 20
        }))))))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-5"
    }, /*#__PURE__*/ React.createElement(SimplePagination, {
        total: data?.collections.total || 0,
        count: data?.collections?.items?.length || 0,
        page: page,
        hasNext: limit * page < data?.collections.total,
        setPage: setPage
    })));
};
export { CollectionSelector };
