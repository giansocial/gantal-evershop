import Area from '@components/common/Area.js';
import { SearchProvider } from '@components/frontStore/catalog/SearchContext.js';
import { SearchInfo } from '@components/frontStore/catalog/SearchInfo.js';
import { SearchProducts } from '@components/frontStore/catalog/SearchProducts.js';
import React from 'react';
export default function SearchPage({ search }) {
    return /*#__PURE__*/ React.createElement(SearchProvider, {
        searchData: search
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "searchPageTop",
        className: "search__page__top"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "page-width grid grid-cols-1 "
    }, /*#__PURE__*/ React.createElement(SearchInfo, null), /*#__PURE__*/ React.createElement(SearchProducts, null)), /*#__PURE__*/ React.createElement(Area, {
        id: "searchPageBottom",
        className: "search__page__bottom"
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    search: productSearch {
      keyword
      products {
        items {
          ...Product
        }
        currentFilters {
          key
          operation
          value
        }
        total
      }
    }
}`;
export const fragments = `
  fragment Product on Product {
    productId
    name
    sku
    price {
      regular {
        value
        text
      }
      special {
        value
        text
      }
    }
    inventory {
      isInStock
    }
    image {
      alt
      url
    }
    url
  }
`;
