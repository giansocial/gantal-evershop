import { MiniCart } from '@components/frontStore/cart/MiniCart.js';
import React from 'react';
export default function MiniCartIcon({ cartUrl }) {
    return /*#__PURE__*/ React.createElement(MiniCart, {
        className: "flex justify-center items-center",
        cartUrl: cartUrl
    });
}
export const layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 20
};
export const query = `
  query Query {
    cartUrl: url(routeId: "cart"),
  }
`;
