import { FormButtons } from '@components/admin/FormButtons.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import React from 'react';
import { toast } from 'react-toastify';
export default function CmsPageNewForm({ action, gridUrl }) {
    return /*#__PURE__*/ React.createElement(Form, {
        action: action,
        method: "POST",
        onSuccess: (response)=>{
            toast.success('Page created successfully!');
            setTimeout(()=>{
                const editUrl = response.data.links.find((link)=>link.rel === 'edit').href;
                window.location.href = editUrl;
            }, 1500);
        },
        id: "cmsPageNewForm",
        submitBtn: false
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid gap-5 grid-cols-1 w-2/3 mx-auto"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "wideScreen",
        noOuter: true
    })), /*#__PURE__*/ React.createElement(FormButtons, {
        formId: "cmsPageNewForm",
        cancelUrl: gridUrl
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "createCmsPage")
    gridUrl: url(routeId: "cmsPageGrid")
  }
`;
