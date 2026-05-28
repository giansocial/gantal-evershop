import { CategorySelector } from '@components/admin/CategorySelector.js';
import Area from '@components/common/Area.js';
import { Editor } from '@components/common/form/Editor.js';
import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { Button } from '@components/common/ui/Button.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/common/ui/Dialog.js';
import { Label } from '@components/common/ui/Label.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useQuery } from 'urql';
import './General.scss';
import { useFormContext } from 'react-hook-form';
const SKUAndPrice = ({ sku, price, setting })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-2"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "sku",
        label: "SKU",
        placeholder: "Enter SKU",
        defaultValue: sku,
        required: true,
        helperText: _('SKU must be unique')
    }), /*#__PURE__*/ React.createElement(NumberField, {
        name: "price",
        placeholder: "Enter price",
        label: `Price`,
        defaultValue: price?.value,
        unit: setting.storeCurrency,
        min: 0,
        required: true
    }));
};
const CategoryQuery = `
  query Query ($id: Int!) {
    category(id: $id) {
      categoryId
      name
      path {
        name
      }
    }
  }
`;
const ProductCategory = ({ categoryId, onChange, onUnassign })=>{
    const { register } = useFormContext();
    const [result] = useQuery({
        query: CategoryQuery,
        variables: {
            id: categoryId
        }
    });
    const { data, fetching, error } = result;
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, "There was an error fetching categories.", error.message);
    }
    if (fetching) {
        return /*#__PURE__*/ React.createElement("span", null, "Loading...");
    }
    return /*#__PURE__*/ React.createElement("div", null, data.category.path.map((item, index)=>/*#__PURE__*/ React.createElement("span", {
            key: item.name,
            className: "text-gray-500"
        }, item.name, index < data.category.path.length - 1 && ' > ')), /*#__PURE__*/ React.createElement("span", {
        className: "text-interactive pl-5"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            onChange();
        }
    }, "Change"), /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            onUnassign();
        },
        className: "text-destructive ml-5"
    }, "Unassign")), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...register('category_id'),
        value: categoryId
    }));
};
const CategorySelect = ({ product })=>{
    const { setValue } = useFormContext();
    const [category, setCategory] = React.useState(product ? product.category : null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const onSelect = (categoryId)=>{
        setCategory({
            categoryId
        });
        setValue('category_id', categoryId || '');
        setDialogOpen(false);
    };
    return /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement(Label, null, "Category"), category && /*#__PURE__*/ React.createElement("div", {
        className: "border rounded border-border p-2"
    }, /*#__PURE__*/ React.createElement(ProductCategory, {
        categoryId: category.categoryId,
        onChange: ()=>{
            setDialogOpen(true);
        },
        onUnassign: ()=>{
            setCategory(null);
            setValue('category_id', '');
        }
    })), !category && /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        size: "sm",
        onClick: (e)=>{
            e.preventDefault();
            setDialogOpen(true);
        }
    }, "Select category"), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Select Category")), /*#__PURE__*/ React.createElement(CategorySelector, {
        onSelect: onSelect,
        onUnSelect: ()=>{},
        selectedCategories: category ? [
            category
        ] : []
    }))));
};
export default function General({ product, setting, productTaxClasses: { items: taxClasses } }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "General Information"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the general information of the product.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "productEditGeneral",
        className: "flex flex-col gap-2",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(InputField, {
                        name: "name",
                        placeholder: "Enter product name",
                        label: "Product Name",
                        defaultValue: product?.name,
                        required: true,
                        helperText: _('Product name is required')
                    })
                },
                sortOrder: 10,
                id: 'name'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(SKUAndPrice, {
                        sku: product?.sku || '',
                        price: product?.price.regular || {
                            value: undefined
                        },
                        setting: setting
                    })
                },
                sortOrder: 20,
                id: 'SKUAndPrice'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(CategorySelect, {
                        product: product
                    })
                },
                sortOrder: 22,
                id: 'category'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(SelectField, {
                        name: "tax_class",
                        label: "Tax Class",
                        options: taxClasses.map((taxClass)=>({
                                value: taxClass.value,
                                label: taxClass.text
                            })),
                        defaultValue: product?.taxClass || '',
                        required: true,
                        validation: {
                            required: true
                        }
                    })
                },
                sortOrder: 25,
                id: 'tax_class'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(Editor, {
                        name: "description",
                        label: "Description",
                        value: product?.description
                    })
                },
                sortOrder: 30,
                id: 'description'
            }
        ]
    })));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      productId
      uuid
      name
      description
      sku
      taxClass
      price {
        regular {
          value
          currency
        }
      }
      weight {
        value
        unit
      }
      category {
        categoryId
        path {
          name
        }
      }
    }
    setting {
      weightUnit
      storeCurrency
    }
    productTaxClasses: taxClasses {
      items {
        value: taxClassId
        text: name
      }
    }
  }
`;
