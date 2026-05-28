import { FormButtons } from '@components/admin/FormButtons.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import React from 'react';
import { toast } from 'react-toastify';
export default function CategoryNewForm({ action, gridUrl }) {
    return /*#__PURE__*/ React.createElement(Form, {
        action: action,
        method: "POST",
        id: "categoryNewForm",
        onSuccess: (response)=>{
            toast.success('Category created successfully!');
            setTimeout(()=>{
                const editUrl = response.data.links.find((link)=>link.rel === 'edit').href;
                window.location.href = editUrl;
            }, 1500);
        },
        submitBtn: false
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "leftSide",
        noOuter: true
    })), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "rightSide",
        noOuter: true
    }))), /*#__PURE__*/ React.createElement(FormButtons, {
        formId: "categoryNewForm",
        cancelUrl: gridUrl
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "createCategory")
    gridUrl: url(routeId: "categoryGrid")
  }
`;
