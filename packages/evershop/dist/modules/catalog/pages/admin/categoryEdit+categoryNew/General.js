import { CategoryTree } from '@components/admin/CategoryTree.js';
import Area from '@components/common/Area.js';
import { Editor } from '@components/common/form/Editor.js';
import { InputField } from '@components/common/form/InputField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
import './General.scss';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/common/ui/Dialog.js';
import { Button } from '@components/common/ui/Button.js';
import { Label } from '@components/common/ui/Label.js';
import { useFormContext } from 'react-hook-form';
const ParentCategory = ({ parent })=>{
    const { setValue } = useFormContext();
    const [category, setCategory] = React.useState(parent || null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleCategoryChange = (newCategory)=>{
        setCategory(newCategory);
        setValue('parent_id', newCategory?.categoryId || '');
    };
    return /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "my-3 space-y-3"
    }, /*#__PURE__*/ React.createElement(Label, null, "Parent category"), category && /*#__PURE__*/ React.createElement("div", {
        className: "border rounded border-border mb-2 p-2"
    }, category.path.map((item, index)=>/*#__PURE__*/ React.createElement("span", {
            key: item.name,
            className: "text-gray-500"
        }, item.name, index < category.path.length - 1 && ' > ')), /*#__PURE__*/ React.createElement("span", {
        className: "text-interactive pl-5 hover:underline"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setDialogOpen(true);
        }
    }, "Change")), /*#__PURE__*/ React.createElement("span", {
        className: "text-destructive pl-5 hover:underline"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            handleCategoryChange(null);
        }
    }, "Unlink"))), !category && /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        size: "sm",
        onClick: (e)=>{
            e.preventDefault();
            setDialogOpen(true);
        }
    }, "Select category"), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Select Parent Category")), /*#__PURE__*/ React.createElement(CategoryTree, {
        selectedCategories: category ? [
            category
        ] : [],
        onSelect: (c)=>{
            handleCategoryChange(c);
            setDialogOpen(false);
        }
    })), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "parent_id",
        defaultValue: category?.categoryId || ''
    })));
};
export default function General({ category }) {
    const fields = [
        {
            component: {
                default: /*#__PURE__*/ React.createElement(InputField, {
                    name: "name",
                    label: "Category Name",
                    placeholder: "Enter Category Name",
                    defaultValue: category?.name || '',
                    required: true,
                    validation: {
                        required: 'Category name is required'
                    }
                })
            },
            sortOrder: 10,
            id: 'name'
        },
        {
            component: {
                default: ParentCategory
            },
            props: {
                parent: category?.parent,
                currentId: category?.categoryId
            },
            sortOrder: 15,
            id: 'parent'
        },
        {
            component: {
                default: /*#__PURE__*/ React.createElement(Editor, {
                    name: "description",
                    label: "Description",
                    value: category?.description || []
                })
            },
            sortOrder: 30
        }
    ];
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "General"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the general information of the category.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "categoryEditGeneral",
        coreComponents: fields
    })));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    category(id: getContextValue("categoryId", null)) {
      categoryId
      name
      hasChildren
      description
      status
      parent {
        categoryId
        hasChildren
        name
        path {
          name
        }
      }
    }
  }
`;
