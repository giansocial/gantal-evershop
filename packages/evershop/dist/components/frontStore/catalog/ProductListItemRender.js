import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { Button } from '@components/common/ui/Button.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { toast } from 'react-toastify';
export const ProductListItemRender = ({ product, imageWidth, imageHeight, layout = 'grid', showAddToCart = false, customAddToCartRenderer })=>{
    if (layout === 'list') {
        return /*#__PURE__*/ React.createElement("div", {
            className: "product__list__item__inner group relative overflow-hidden flex gap-4 p-4"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "product__list__image flex-shrink-0"
        }, /*#__PURE__*/ React.createElement("a", {
            href: product.url
        }, product.image && /*#__PURE__*/ React.createElement(Image, {
            src: product.image.url,
            alt: product.image.alt || product.name,
            width: imageWidth || 120,
            height: imageHeight || 120,
            loading: "lazy",
            sizes: "(max-width: 768px) 100vw, 33vw",
            className: "transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg"
        }), !product.image && /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
            width: imageWidth,
            height: imageHeight
        }))), /*#__PURE__*/ React.createElement("div", {
            className: "product__list__info flex-1 flex flex-col justify-between"
        }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h3", {
            className: "product__list__name h5 mb-2"
        }, /*#__PURE__*/ React.createElement("a", {
            href: product.url,
            className: "hover:text-primary transition-colors"
        }, product.name)), /*#__PURE__*/ React.createElement("div", {
            className: "product__list__sku text-sm text-gray-600 mb-2"
        }, _('SKU ${sku}', {
            sku: product.sku
        })), /*#__PURE__*/ React.createElement("div", {
            className: "product__list__price mb-2"
        }, product.price.special && product.price.regular < product.price.special ? /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement("span", {
            className: "regular-price text-sm",
            style: {
                textDecoration: 'line-through',
                color: '#777'
            }
        }, product.price.regular.text), /*#__PURE__*/ React.createElement("span", {
            className: "special-price text-lg font-bold",
            style: {
                color: '#e53e3e'
            }
        }, product.price.special.text)) : /*#__PURE__*/ React.createElement("span", {
            className: "regular-price text-lg font-bold"
        }, product.price.regular.text)), /*#__PURE__*/ React.createElement("div", {
            className: "product__list__stock mb-3"
        }, product.inventory.isInStock ? /*#__PURE__*/ React.createElement("span", {
            className: "text-green-600 text-sm font-medium"
        }, _('In Stock')) : /*#__PURE__*/ React.createElement("span", {
            className: "text-red-600 text-sm font-medium"
        }, _('Out of Stock')))), showAddToCart && /*#__PURE__*/ React.createElement("div", {
            className: "product__list__actions invisible transform translate-y-2 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0"
        }, customAddToCartRenderer ? customAddToCartRenderer(product) : /*#__PURE__*/ React.createElement(AddToCart, {
            product: {
                sku: product.sku,
                isInStock: product.inventory.isInStock
            },
            qty: 1,
            onError: (error)=>toast.error(error)
        }, (state, actions)=>/*#__PURE__*/ React.createElement(Button, {
                disabled: !state.canAddToCart || state.isLoading,
                onClick: (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    actions.addToCart();
                }
            }, state.isLoading ? _('Adding...') : _('Add to Cart'))))));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "product__list__item__inner group overflow-hidden"
    }, /*#__PURE__*/ React.createElement("a", {
        href: product.url,
        className: "product__list__link block"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "product__list__image overflow-hidden flex w-full justify-center"
    }, product.image && /*#__PURE__*/ React.createElement(Image, {
        src: product.image.url,
        alt: product.image.alt || product.name,
        width: imageWidth || 120,
        height: imageHeight || 120,
        sizes: "(max-width: 768px) 100vw, 33vw",
        className: "transition-transform duration-500 ease-in-out group-hover:scale-110"
    }), !product.image && /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
        width: imageWidth,
        height: imageHeight
    })), /*#__PURE__*/ React.createElement("div", {
        className: "product__list__info mt-3"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "product__list__name h5 font-medium"
    }, product.name), /*#__PURE__*/ React.createElement("div", {
        className: "product__list__price"
    }, product.price.special && product.price.regular < product.price.special ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", {
        className: "regular-price"
    }, product.price.regular.text), /*#__PURE__*/ React.createElement("span", {
        className: "special-price"
    }, product.price.special.text)) : /*#__PURE__*/ React.createElement("span", {
        className: "regular-price"
    }, product.price.regular.text)))), showAddToCart && /*#__PURE__*/ React.createElement("div", {
        className: "product__list__actions p-4 invisible transform translate-y-4 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0"
    }, customAddToCartRenderer ? customAddToCartRenderer(product) : /*#__PURE__*/ React.createElement(AddToCart, {
        product: {
            sku: product.sku,
            isInStock: product.inventory.isInStock
        },
        qty: 1,
        onError: (error)=>toast.error(error)
    }, (state, actions)=>/*#__PURE__*/ React.createElement(Button, {
            className: 'w-full',
            disabled: !state.canAddToCart || state.isLoading,
            onClick: (e)=>{
                e.preventDefault();
                e.stopPropagation();
                actions.addToCart();
            }
        }, state.isLoading ? _('Adding...') : _('Add to Cart')))));
};
