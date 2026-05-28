import { FormButtons } from '@components/admin/FormButtons.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import React from 'react';
export default function CmsPageEditForm({ action, gridUrl }) {
    return /*#__PURE__*/ React.createElement(Form, {
        method: "PATCH",
        action: action,
        id: "cmsPageEditForm",
        submitBtn: false
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid gap-5 grid-cols-1 w-2/3 mx-auto"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "wideScreen",
        noOuter: true
    })), /*#__PURE__*/ React.createElement(FormButtons, {
        formId: "cmsPageEditForm",
        cancelUrl: gridUrl
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "updateCmsPage", params: [{key: "id", value: getContextValue("cmsPageUuid")}]),
    gridUrl: url(routeId: "cmsPageGrid")
  }
`;
