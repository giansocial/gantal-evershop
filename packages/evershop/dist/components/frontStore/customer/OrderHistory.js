import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { useCustomer } from '@components/frontStore/customer/CustomerContext.jsx';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
const OrderDetail = ({ order })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "order border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "order-inner grid grid-cols-1 md:grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "order-items col-span-2"
    }, order.items.map((item)=>/*#__PURE__*/ React.createElement("div", {
            className: "order-item mb-2 flex gap-5 items-center",
            key: item.productSku
        }, /*#__PURE__*/ React.createElement("div", {
            className: "thumbnail border border-divider p-2 rounded"
        }, item.thumbnail && /*#__PURE__*/ React.createElement(Image, {
            width: 50,
            height: 50,
            style: {
                maxWidth: '6rem'
            },
            src: item.thumbnail,
            alt: item.productName
        }), !item.thumbnail && /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
            width: 50,
            height: 50
        })), /*#__PURE__*/ React.createElement("div", {
            className: "order-item-info"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "order-item-name font-semibold"
        }, item.productName), /*#__PURE__*/ React.createElement("div", {
            className: "order-item-sku italic"
        }, _('Sku'), ": #", item.productSku), /*#__PURE__*/ React.createElement("div", {
            className: "order-item-qty"
        }, item.qty, " x ", item.productPrice.text))))), /*#__PURE__*/ React.createElement("div", {
        className: "order-total col-span-1"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "order-header"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "order-number"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "font-bold"
    }, _('Order'), ": #", order.orderNumber), /*#__PURE__*/ React.createElement("span", {
        className: "italic pl-2"
    }, order.createdAt.text))), /*#__PURE__*/ React.createElement("div", {
        className: "order-total-value font-bold"
    }, _('Total'), ":", order.grandTotal.text))));
};
export default function OrderHistory({ title }) {
    const { customer } = useCustomer();
    const orders = customer?.orders || [];
    return /*#__PURE__*/ React.createElement("div", {
        className: "order-history divide-y"
    }, title && /*#__PURE__*/ React.createElement("h2", {
        className: "order-history-title border-border"
    }, title), orders.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "order-history-empty"
    }, _('You have not placed any orders yet')), orders.map((order)=>/*#__PURE__*/ React.createElement("div", {
            className: "order-history-order border-divider py-5",
            key: order.orderId
        }, /*#__PURE__*/ React.createElement(OrderDetail, {
            order: order,
            key: order.orderId
        }))));
}
