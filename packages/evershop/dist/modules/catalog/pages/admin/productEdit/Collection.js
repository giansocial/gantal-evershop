import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { TagIcon } from 'lucide-react';
import React from 'react';
export default function Collections({ product: { collections } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        className: "bg-popover"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Collections"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the collections associated with this product.")), /*#__PURE__*/ React.createElement(CardContent, {
        className: "space-y-2"
    }, collections.map((collection)=>/*#__PURE__*/ React.createElement("div", {
            className: "flex justify-start gap-2 items-center align-middle",
            key: collection.uuid
        }, /*#__PURE__*/ React.createElement(TagIcon, {
            width: 16,
            height: 16
        }), /*#__PURE__*/ React.createElement("a", {
            href: collection.editUrl,
            className: "hover:underline"
        }, /*#__PURE__*/ React.createElement("span", null, collection.name)))), collections.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "text-gray-500"
    }, "No collections")));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      collections {
        uuid
        name
        editUrl
      }
    }
  }
`;
