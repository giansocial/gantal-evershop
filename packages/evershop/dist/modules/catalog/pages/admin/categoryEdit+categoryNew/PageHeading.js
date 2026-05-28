import { PageHeading } from '@components/admin/PageHeading.js';
import React from 'react';
export default function CategoryEditPageHeading({ backUrl, category }) {
    return /*#__PURE__*/ React.createElement(PageHeading, {
        backUrl: backUrl,
        heading: category ? `Editing ${category.name}` : 'Create a new category'
    });
}
CategoryEditPageHeading.defaultProps = {
    category: {}
};
export const layout = {
    areaId: 'content',
    sortOrder: 5
};
export const query = `
  query Query {
    category(id: getContextValue("categoryId", null)) {
      name
    }
    backUrl: url(routeId: "categoryGrid")
  }
`;
