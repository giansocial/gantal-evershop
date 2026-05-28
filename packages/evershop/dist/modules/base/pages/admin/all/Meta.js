import { Meta } from '@components/common/Meta.js';
import { Title } from '@components/common/Title.js';
import React from 'react';
export default function SeoMeta({ pageInfo: { title, description } }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Title, {
        title: title
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "description",
        content: description
    }));
}
export const layout = {
    areaId: 'head',
    sortOrder: 5
};
export const query = `
  query query {
    pageInfo {
      title
      description
    }
  }
`;
