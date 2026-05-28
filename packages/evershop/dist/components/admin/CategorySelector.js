import { SimplePagination } from '@components/common/SimplePagination.js';
import { Button } from '@components/common/ui/Button.js';
import { Input } from '@components/common/ui/Input.js';
import { Skeleton } from '@components/common/ui/Skeleton.js';
import { Check } from 'lucide-react';
import React from 'react';
import { useQuery } from 'urql';
const SearchQuery = `
  query Query ($filters: [FilterInput!]) {
    categories(filters: $filters) {
      items {
        categoryId
        uuid
        name
        path {
          name
        }
      }
      total
    }
  }
`;
const CategoryListSkeleton = ()=>{
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
const isCategorySelected = (category, selectedCategories)=>{
    return selectedCategories.some((selected)=>selected?.categoryId && selected.categoryId === category.categoryId || selected?.uuid && selected.uuid === category.uuid);
};
const CategorySelector = ({ onSelect, onUnSelect, selectedCategories })=>{
    const [internalSelectedCategories, setInternalSelectedCategories] = React.useState(selectedCategories || []);
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
        }, "There was an error fetching categories.", error.message);
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        value: inputValue || '',
        placeholder: "Search categories",
        onChange: (e)=>{
            setInputValue(e.target.value);
            setLoading(true);
        }
    })), (fetching || loading) && /*#__PURE__*/ React.createElement(CategoryListSkeleton, null), !fetching && data && /*#__PURE__*/ React.createElement("div", {
        className: "divide-y"
    }, data.categories.items.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 border border-divider rounded flex justify-center items-center"
    }, inputValue ? /*#__PURE__*/ React.createElement("p", null, 'No categories found for query "', inputValue, "”") : /*#__PURE__*/ React.createElement("p", null, "You have no categories to display")), data.categories.items.map((cat)=>/*#__PURE__*/ React.createElement("div", {
            key: cat.uuid,
            className: "grid grid-cols-8 gap-5 py-2 border-divider items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "col-span-5"
        }, /*#__PURE__*/ React.createElement("h3", null, cat.path.map((item, index)=>/*#__PURE__*/ React.createElement("span", {
                key: item.name,
                className: "text-gray-500"
            }, item.name, index < cat.path.length - 1 && ' > ')))), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-3 text-right"
        }, !isCategorySelected(cat, internalSelectedCategories) && /*#__PURE__*/ React.createElement(Button, {
            variant: 'outline',
            onClick: async (e)=>{
                e.preventDefault();
                setInternalSelectedCategories((prev)=>[
                        ...prev,
                        {
                            categoryId: cat.categoryId,
                            uuid: cat.uuid,
                            name: cat.name
                        }
                    ]);
                onSelect(cat.categoryId, cat.uuid, cat.name);
            }
        }, "Select"), isCategorySelected(cat, internalSelectedCategories) && /*#__PURE__*/ React.createElement(Button, {
            variant: 'default',
            onClick: (e)=>{
                e.preventDefault();
                setInternalSelectedCategories((prev)=>prev.filter((c)=>c.categoryId !== cat.categoryId && c.uuid !== cat.uuid));
                onUnSelect(cat.categoryId, cat.uuid, cat.name);
            }
        }, /*#__PURE__*/ React.createElement(Check, {
            className: "w-5 h-5"
        }))))))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between gap-5"
    }, /*#__PURE__*/ React.createElement(SimplePagination, {
        total: data?.categories.total || 0,
        count: data?.categories?.items?.length || 0,
        page: page,
        hasNext: limit * page < data?.categories.total,
        setPage: setPage
    })));
};
export { CategorySelector };
