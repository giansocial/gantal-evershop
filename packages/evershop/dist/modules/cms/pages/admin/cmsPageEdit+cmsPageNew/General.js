import { Editor } from '@components/common/form/Editor.js';
import { InputField } from '@components/common/form/InputField.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function General({ page }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "General Information"), /*#__PURE__*/ React.createElement(CardDescription, null, "Provide the basic information for the CMS page.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        id: "cms_page_name",
        name: "name",
        label: "Page Name",
        placeholder: "Enter page name",
        defaultValue: page?.name,
        required: true,
        validation: {
            required: 'Page name is required'
        },
        helperText: "This is the name of the CMS page that will be displayed in the admin panel."
    })), /*#__PURE__*/ React.createElement("div", {
        className: "space-y-2"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "status",
        label: "Status",
        options: [
            {
                value: 1,
                label: 'Enabled'
            },
            {
                value: 0,
                label: 'Disabled'
            }
        ],
        defaultValue: page?.status,
        required: true,
        helperText: "Enable this page to make it visible on the frontend."
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("label", {
        htmlFor: "content",
        className: "block mb-2 font-medium"
    }, "Content"), /*#__PURE__*/ React.createElement(Editor, {
        name: "content",
        value: page?.content || []
    })))));
}
export const layout = {
    areaId: 'wideScreen',
    sortOrder: 10
};
export const query = `
  query Query {
    page: cmsPage(id: getContextValue("cmsPageId", null)) {
      cmsPageId
      name
      status
      sortOrder
      content
    }
  }
`;
