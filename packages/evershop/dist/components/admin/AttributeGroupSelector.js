import { SimplePagination } from '@components/common/SimplePagination.js';
import { Button } from '@components/common/ui/Button.js';
import { Input } from '@components/common/ui/Input.js';
import { Skeleton } from '@components/common/ui/Skeleton.js';
import { Check } from 'lucide-react';
import React from 'react';
import { useQuery } from 'urql';
const SearchQuery = `
  query Query ($filters: [FilterInput!]) {
    attributeGroups(filters: $filters) {
      items {
        attributeGroupId
        uuid
        groupName
      }
      total
    }
  }
`;
const AttributeGroupListSkeleton = ()=>{
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
const isAttributeGroupSelected = (attributeGroup, selectedAttributeGroups)=>{
    return selectedAttributeGroups.some((selected)=>selected?.attributeGroupId && selected.attributeGroupId === attributeGroup.attributeGroupId || selected?.uuid && selected.uuid === attributeGroup.uuid);
};
const AttributeGroupSelector = ({ onSelect, onUnSelect, selectedAttributeGroups })=>{
    const [internalSelectedAttributeGroups, setInternalSelectedAttributeGroups] = React.useState(selectedAttributeGroups || []);
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
        }, "There was an error fetching attribute groups.", error.message);
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-5"
    }, /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        value: inputValue || '',
        placeholder: "Search attribute groups",
        onChange: (e)=>{
            setInputValue(e.target.value);
            setLoading(true);
        }
    })), (fetching || loading) && /*#__PURE__*/ React.createElement(AttributeGroupListSkeleton, null), !fetching && data && /*#__PURE__*/ React.createElement("div", {
        className: "divide-y"
    }, data.attributeGroups.items.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 border border-divider rounded flex justify-center items-center"
    }, inputValue ? /*#__PURE__*/ React.createElement("p", null, 'No attribute groups found for query "', inputValue, "”") : /*#__PURE__*/ React.createElement("p", null, "You have no attribute groups to display")), data.attributeGroups.items.map((a)=>/*#__PURE__*/ React.createElement("div", {
            key: a.uuid,
            className: "grid grid-cols-8 gap-5 py-2 border-divider items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "col-span-5"
        }, /*#__PURE__*/ React.createElement("h3", null, a.groupName)), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-3 text-right"
        }, !isAttributeGroupSelected(a, internalSelectedAttributeGroups) && /*#__PURE__*/ React.createElement(Button, {
            variant: "outline",
            onClick: async (e)=>{
                e.preventDefault();
                setInternalSelectedAttributeGroups((prev)=>[
                        ...prev,
                        {
                            attributeGroupId: a.attributeGroupId,
                            uuid: a.uuid,
                            groupName: a.groupName
                        }
                    ]);
                onSelect(a.attributeGroupId, a.uuid, a.groupName);
            }
        }, "Select"), isAttributeGroupSelected(a, internalSelectedAttributeGroups) && /*#__PURE__*/ React.createElement(Button, {
            onClick: (e)=>{
                e.preventDefault();
                setInternalSelectedAttributeGroups((prev)=>prev.filter((c)=>c.attributeGroupId !== a.attributeGroupId && c.uuid !== a.uuid));
                onUnSelect(a.attributeGroupId, a.uuid, a.groupName);
            }
        }, /*#__PURE__*/ React.createElement(Check, {
            className: "w-5 h-5"
        }))))))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-5 mt-3"
    }, /*#__PURE__*/ React.createElement(SimplePagination, {
        total: data?.attributeGroups.total || 0,
        count: data?.attributeGroups?.items?.length || 0,
        page: page,
        hasNext: limit * page < data?.attributeGroups.total,
        setPage: setPage
    })));
};
export { AttributeGroupSelector };
