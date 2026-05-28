import Area from '@components/common/Area.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import React from 'react';
import { get } from '../../../../../lib/util/get.js';
import { BuyXGetY } from './components/BuyXGetY.js';
import { TargetProducts } from './components/TargetProducts.js';
export default function DiscountType({ coupon }) {
    const targetProducts = get(coupon, 'targetProducts', {});
    const buyxGety = get(coupon, 'buyxGety', []);
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponFormDiscountType",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(RadioGroupField, {
                        required: true,
                        validation: {
                            required: 'Discount type is required'
                        },
                        options: [
                            {
                                value: 'fixed_discount_to_entire_order',
                                label: 'Fixed discount to entire order'
                            },
                            {
                                value: 'percentage_discount_to_entire_order',
                                label: 'Percentage discount to entire order'
                            },
                            {
                                value: 'fixed_discount_to_specific_products',
                                label: 'Fixed discount to specific products'
                            },
                            {
                                value: 'percentage_discount_to_specific_products',
                                label: 'Percentage discount to specific products'
                            },
                            {
                                value: 'buy_x_get_y',
                                label: 'Buy X get Y'
                            }
                        ],
                        defaultValue: get(coupon, 'discountType', ''),
                        name: "discount_type"
                    })
                },
                sortOrder: 10
            }
        ]
    })), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, /*#__PURE__*/ React.createElement(TargetProducts, {
        products: get(targetProducts, 'products', []),
        maxQty: get(targetProducts, 'maxQty', 0)
    }), /*#__PURE__*/ React.createElement(BuyXGetY, {
        requireProducts: buyxGety,
        discountType: get(coupon, 'discountType', '')
    })));
}
export const layout = {
    areaId: 'couponEditDiscountType',
    sortOrder: 30
};
export const query = `
  query Query {
    coupon(id: getContextValue('couponId', null)) {
      discountType
      targetProducts {
        maxQty
        products {
          key
          operator
          value
          qty
        }
      }
      buyxGety {
        sku
        buyQty
        getQty
        maxY
        discount
      }
    }
  }
`;
