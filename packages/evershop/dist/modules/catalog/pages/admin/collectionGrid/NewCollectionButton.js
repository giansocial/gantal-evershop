import { Button } from '@components/common/ui/Button.js';
import React from 'react';
export default function NewCollectionButton({ newCollectionUrl }) {
    return /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>window.location.href = newCollectionUrl
    }, "New Collection");
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    newCollectionUrl: url(routeId: "collectionNew")
  }
`;
