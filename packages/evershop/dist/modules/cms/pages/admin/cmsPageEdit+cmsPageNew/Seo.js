import { InputField } from '@components/common/form/InputField.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function Seo({ page }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "SEO Information"), /*#__PURE__*/ React.createElement(CardDescription, null, "Provide the SEO details for the CMS page.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement(InputField, {
        id: "urlKey",
        name: "url_key",
        label: "URL Key",
        placeholder: "Enter URL key",
        defaultValue: page?.urlKey,
        required: true,
        validation: {
            required: 'URL key is required'
        },
        helperText: "This is the URL path for the CMS page."
    }), /*#__PURE__*/ React.createElement(InputField, {
        id: "metaTitle",
        name: "meta_title",
        label: "Meta Title",
        placeholder: "Enter meta title",
        defaultValue: page?.metaTitle,
        required: true,
        validation: {
            required: 'Meta title is required'
        },
        helperText: "This is the meta title for the CMS page."
    }), /*#__PURE__*/ React.createElement(TextareaField, {
        name: "meta_description",
        label: "Meta Description",
        placeholder: "Enter meta description",
        defaultValue: page?.metaDescription
    }))));
}
export const layout = {
    areaId: 'wideScreen',
    sortOrder: 30
};
export const query = `
  query Query {
    page: cmsPage(id: getContextValue('cmsPageId', null)) {
      urlKey
      metaTitle
      metaKeywords
      metaDescription
    }
  }
`;
