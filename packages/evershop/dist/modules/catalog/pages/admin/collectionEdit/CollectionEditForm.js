import { FormButtons } from '@components/admin/FormButtons.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import React from 'react';
export default function CollectionEditForm({ action, gridUrl }) {
    return /*#__PURE__*/ React.createElement(Form, {
        action: action,
        method: "PATCH",
        id: "collectionEditForm",
        submitBtn: false
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-2/3",
        style: {
            margin: '0 auto'
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid gap-5"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "collectionFormInner",
        noOuter: true
    })), /*#__PURE__*/ React.createElement(FormButtons, {
        formId: "collectionEditForm",
        cancelUrl: gridUrl
    })));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "updateCollection", params: [{key: "id", value: getContextValue("collectionUuid")}]),
    gridUrl: url(routeId: "collectionGrid")
  }
`;
