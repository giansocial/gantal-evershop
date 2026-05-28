import { Editor } from '@components/common/Editor.js';
import { ProductList } from '@components/frontStore/catalog/ProductList.js';
import React from 'react';
export default function CollectionProducts({ collection, collectionProductsWidget: { countPerRow } = {} }) {
    if (!collection) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "pt-7 collection__products__widget"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "page-width"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-center uppercase h5 tracking-widest"
    }, collection?.name), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-center"
    }, collection?.description && /*#__PURE__*/ React.createElement(Editor, {
        rows: collection?.description
    })), /*#__PURE__*/ React.createElement("div", {
        className: "mt-3"
    }, /*#__PURE__*/ React.createElement(ProductList, {
        products: collection?.products?.items,
        gridColumns: countPerRow
    }))));
}
export const query = `
  query Query($collection: String, $count: Int, $countPerRow: Int) {
    collection (code: $collection) {
      collectionId
      name
      description
      products (filters: [{key: "limit", operation: eq, value: $count}]) {
        items {
          ...Product
        }
      }
    }
    collectionProductsWidget(collection: $collection, count: $count, countPerRow: $countPerRow) {
      countPerRow
    }
  }
`;
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
export const variables = `{
  collection: getWidgetSetting("collection"),
  count: getWidgetSetting("count"),
  countPerRow: getWidgetSetting("countPerRow", 4)
}`;
