import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { Button } from '@components/common/ui/Button.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import { VariantSelector } from '@components/frontStore/catalog/VariantSelector.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export function ProductSingleForm() {
    const { price, sku, inventory: { isInStock } } = useProduct();
    const form = useForm();
    const [addingToCart, setAddingToCart] = React.useState(false);
    return /*#__PURE__*/ React.createElement(Form, {
        id: "productForm",
        method: "POST",
        submitBtn: false,
        form: form
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "productSinglePageForm",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement("div", {
                        className: "product__single__price text-2xl"
                    }, price.regular.text)
                },
                sortOrder: 5,
                id: 'price'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(VariantSelector, null)
                },
                sortOrder: 10,
                id: 'variantSelector'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(AddToCart, {
                        product: {
                            sku: sku,
                            isInStock: isInStock
                        },
                        qty: form.watch('qty') || 1,
                        onSuccess: ()=>{
                        // To show the mini cart after adding a product to cart
                        },
                        onError: (errorMessage)=>{
                            toast.error(errorMessage || _('Failed to add product to cart'));
                        }
                    }, (state, actions)=>/*#__PURE__*/ React.createElement("div", {
                            className: "mt-6 space-y-3"
                        }, state.isInStock === true && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(NumberField, {
                            name: "qty",
                            label: _('Quantity'),
                            className: "w-24",
                            min: 1,
                            required: true,
                            placeholder: _('Quantity'),
                            defaultValue: 1,
                            wrapperClassName: "w-1/2"
                        }), /*#__PURE__*/ React.createElement(Button, {
                            variant: 'default',
                            size: 'lg',
                            onClick: ()=>{
                                form.trigger().then((isValid)=>{
                                    if (isValid) {
                                        setAddingToCart(true);
                                        actions.addToCart();
                                    }
                                }).finally(()=>{
                                    setAddingToCart(false);
                                });
                            },
                            className: "w-full py-6",
                            isLoading: addingToCart || state.isLoading
                        }, _('ADD TO CART'))), state.isInStock === false && /*#__PURE__*/ React.createElement(Button, {
                            onClick: ()=>{},
                            className: "w-full py-6",
                            disabled: true
                        }, _('SOLD OUT'))))
                },
                sortOrder: 30,
                id: 'addToCartButton'
            }
        ]
    }));
}
