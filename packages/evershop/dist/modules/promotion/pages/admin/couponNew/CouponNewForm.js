import { FormButtons } from '@components/admin/FormButtons.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
import { toast } from 'react-toastify';
export default function CouponNewForm({ action, gridUrl }) {
    return /*#__PURE__*/ React.createElement(Form, {
        action: action,
        method: "POST",
        id: "couponNewForm",
        onSuccess: (response)=>{
            toast.success('Coupon created successfully!');
            const editUrl = response.data.links.find((link)=>link.rel === 'edit').href;
            window.location.href = editUrl;
        },
        submitBtn: false
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 gap-5"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "General Information"), /*#__PURE__*/ React.createElement(CardDescription, null, "The general information about the coupon.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditGeneral",
        noOuter: true
    }))), /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Discount Type"), /*#__PURE__*/ React.createElement(CardDescription, null, "The type of discount applied by the coupon.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditDiscountType",
        noOuter: true
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Order conditions"), /*#__PURE__*/ React.createElement(CardDescription, null, "The conditions related to the order for the coupon to be applied.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditLeft",
        noOuter: true,
        className: "col-8"
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Customer conditions"), /*#__PURE__*/ React.createElement(CardDescription, null, "The conditions related to the customer for the coupon to be applied.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditRight",
        className: "col-4",
        noOuter: true
    })))))), /*#__PURE__*/ React.createElement(FormButtons, {
        cancelUrl: gridUrl,
        formId: "couponNewForm"
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "createCoupon")
    gridUrl: url(routeId: "couponGrid")
  }
`;
