import Area from '@components/common/Area.js';
import { Editor } from '@components/common/form/Editor.js';
import { InputField } from '@components/common/form/InputField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import './General.scss';
import React from 'react';
export default function General({ collection }) {
    const fields = [
        {
            component: {
                default: /*#__PURE__*/ React.createElement(InputField, {
                    name: "name",
                    label: "Collection Name",
                    placeholder: "Enter Collection Name",
                    defaultValue: collection?.name || '',
                    required: true
                })
            },
            sortOrder: 10,
            id: 'name'
        },
        {
            component: {
                default: /*#__PURE__*/ React.createElement(InputField, {
                    name: "code",
                    label: "Collection Code",
                    defaultValue: collection?.code || '',
                    required: true,
                    validation: {
                        required: 'Collection code is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_-]+$/,
                            message: 'Collection code must be alphanumeric and can include underscores or dashes.'
                        }
                    },
                    placeholder: "Collection Code"
                })
            },
            sortOrder: 15,
            id: 'code'
        },
        {
            component: {
                default: /*#__PURE__*/ React.createElement(Editor, {
                    name: "description",
                    label: "Description",
                    value: collection?.description || []
                })
            },
            sortOrder: 30
        }
    ];
    return /*#__PURE__*/ React.createElement(Card, {
        title: "General"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "General Information"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage general information about the collection.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "collectionEditGeneral",
        coreComponents: fields,
        className: "space-y-2"
    })));
}
export const layout = {
    areaId: 'collectionFormInner',
    sortOrder: 10
};
export const query = `
  query Query {
    collection(code: getContextValue("collectionCode", null)) {
      collectionId
      name
      code
      description
    }
  }
`;
