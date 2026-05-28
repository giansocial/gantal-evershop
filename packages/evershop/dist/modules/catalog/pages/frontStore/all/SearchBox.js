import { SearchBox as Search } from '@components/frontStore/catalog/SearchBox.js';
import React from 'react';
export default function SearchBox({ searchPageUrl }) {
    return /*#__PURE__*/ React.createElement(Search, {
        searchPageUrl: searchPageUrl,
        enableAutocomplete: true,
        maxResults: 10
    });
}
export const layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 5
};
export const query = `
  query Query {
    searchPageUrl: url(routeId: "catalogSearch")
  }
`;
