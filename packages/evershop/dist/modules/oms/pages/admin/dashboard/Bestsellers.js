import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
import './Bestsellers.scss';
import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { Table, TableRow, TableBody, TableCell } from '@components/common/ui/Table.js';
export default function BestSellers({ bestSellers, listUrl }) {
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Best Sellers"), /*#__PURE__*/ React.createElement(CardDescription, null, "A list of best selling products"), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement("a", {
        href: listUrl,
        className: "text-sm text-primary hover:underline"
    }, "View All Products"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableBody, null, bestSellers.length === 0 && /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableCell, {
        align: "left"
    }, "Look like you just started. No bestsellers yet."), /*#__PURE__*/ React.createElement(TableCell, null, " ")), bestSellers.map((p, i)=>/*#__PURE__*/ React.createElement(TableRow, {
            key: i
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("div", {
            className: " flex justify-left"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-start gap-2 items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "grid-thumbnail text-border border border-divider p-2 rounded"
        }, p.image?.url && /*#__PURE__*/ React.createElement(Image, {
            src: p.image.url,
            alt: p.name,
            width: 50,
            height: 50
        }), !p.image?.url && /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
            width: 50,
            height: 50
        })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
            href: p.editUrl || '',
            className: "font-semibold hover:underline"
        }, p.name))))), /*#__PURE__*/ React.createElement(TableCell, null), /*#__PURE__*/ React.createElement(TableCell, null, p.price.regular.text), /*#__PURE__*/ React.createElement(TableCell, null, p.soldQty, " sold")))))));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 20
};
export const query = `
  query Query {
    bestSellers {
      name
      price {
        regular {
          value
          text
        }
      }
      soldQty
      image {
        url
      }
      editUrl
    }
    listUrl: url(routeId: "productGrid")
  }
`;
