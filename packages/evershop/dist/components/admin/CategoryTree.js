import React from 'react';
import { useQuery } from 'urql';
import './CategoryTree.scss';
import RenderIfTrue from '@components/common/RenderIfTrue.jsx';
import { Folder, Minus, Plus } from 'lucide-react';
const categoriesQuery = `
  query Query ($filters: [FilterInput]) {
    categories (filters: $filters) {
      items {
        categoryId,
        name
        hasChildren
        path {
          name
        }
      }
    }
  }
`;
const childrenQuery = `
  query Query ($filters: [FilterInput]) {
    categories (filters: $filters) {
      items {
        categoryId,
        name
        path {
          name
        }
        hasChildren
      }
    }
  }
`;
const Skeleton = ()=>/*#__PURE__*/ React.createElement("ul", {
        className: "skeleton-wrapper-category-tree"
    }, /*#__PURE__*/ React.createElement("li", {
        className: "skeleton mt-2"
    }), /*#__PURE__*/ React.createElement("li", {
        className: "skeleton mt-2"
    }), /*#__PURE__*/ React.createElement("li", {
        className: "skeleton mt-2"
    }), /*#__PURE__*/ React.createElement("li", {
        className: "skeleton mt-2"
    }));
function CategoryItem({ category, selectedCategories, onSelect }) {
    const [expanded, setExpanded] = React.useState(false);
    const [result] = useQuery({
        query: childrenQuery,
        variables: {
            filters: [
                {
                    key: 'parent',
                    operation: 'eq',
                    value: category.categoryId
                }
            ]
        },
        pause: !expanded
    });
    const { data, fetching, error } = result;
    if (error) {
        return /*#__PURE__*/ React.createElement("li", {
            className: "text-destructive"
        }, /*#__PURE__*/ React.createElement("span", null, error.message));
    }
    const className = selectedCategories?.find((item)=>item.categoryId === category.categoryId) ? 'flex justify-start gap-2 items-center p-2 rounded-md bg-green-100 transition-colors duration-500' : 'flex justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-500';
    return /*#__PURE__*/ React.createElement("li", {
        className: "[&_ul]:pl-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: className
    }, category.hasChildren && /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setExpanded(!expanded);
        }
    }, expanded ? /*#__PURE__*/ React.createElement(Minus, {
        width: 15,
        height: 15
    }) : /*#__PURE__*/ React.createElement(Plus, {
        width: 15,
        height: 15
    })), !category.hasChildren && /*#__PURE__*/ React.createElement("span", null, /*#__PURE__*/ React.createElement(Minus, {
        width: 15,
        height: 15
    })), /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            onSelect(category);
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-2 justify-start items-center cursor-pointer"
    }, /*#__PURE__*/ React.createElement(Folder, {
        width: 20,
        height: 20
    }), /*#__PURE__*/ React.createElement("span", {
        className: "text-sm"
    }, category.name)))), data && data.categories.items.length > 0 && expanded && /*#__PURE__*/ React.createElement("div", {
        className: "pb-2"
    }, /*#__PURE__*/ React.createElement("ul", null, data.categories.items.map((child)=>/*#__PURE__*/ React.createElement(CategoryItem, {
            key: child.value,
            category: child,
            selectedCategories: selectedCategories,
            onSelect: onSelect
        })))), /*#__PURE__*/ React.createElement(RenderIfTrue, {
        condition: fetching && expanded
    }, /*#__PURE__*/ React.createElement("div", {
        className: "pb-2"
    }, /*#__PURE__*/ React.createElement(Skeleton, null))));
}
CategoryItem.defaultProps = {
    category: {},
    selectedCategory: {}
};
function CategoryTree({ selectedCategories, onSelect }) {
    const [result] = useQuery({
        query: categoriesQuery,
        variables: {
            filters: [
                {
                    key: 'parent',
                    operation: 'eq',
                    value: null
                }
            ]
        }
    });
    const { data, fetching, error } = result;
    if (fetching) {
        return /*#__PURE__*/ React.createElement(Skeleton, null);
    }
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, error.message);
    }
    if (!data || !data.categories || data.categories.items.length === 0) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "text-gray-400 text-md"
        }, "There is no category");
    }
    return /*#__PURE__*/ React.createElement("ul", {
        className: "category-tree"
    }, data.categories.items.map((category)=>/*#__PURE__*/ React.createElement(CategoryItem, {
            key: category.value,
            category: category,
            selectedCategories: selectedCategories,
            onSelect: onSelect
        })));
}
CategoryTree.defaultProps = {
    selectedCategories: []
};
export { CategoryTree };
