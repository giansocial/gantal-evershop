import { Button } from '@components/common/ui/Button.js';
import React from 'react';
export default function NewCategoryButton({ newCateoryUrl }) {
    return /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>window.location.href = newCateoryUrl
    }, "New Category");
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    newCateoryUrl: url(routeId: "categoryNew")
  }
`;
