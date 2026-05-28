import { Card, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
import { New } from './variants/New.js';
import { Variants } from './variants/Variants.js';
const VariantGroup = ({ product, createVariantGroupApi, createProductApi })=>{
    const [group, setGroup] = React.useState(product?.variantGroup || null);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Variant Group"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the variant group of the product.")), !group && /*#__PURE__*/ React.createElement(New, {
        currentProductUuid: product.uuid,
        createVariantGroupApi: createVariantGroupApi,
        setGroup: setGroup
    }), group && /*#__PURE__*/ React.createElement(Variants, {
        productId: product.productId,
        productUuid: product.uuid,
        variantGroup: group,
        createProductApi: createProductApi
    }));
};
export const layout = {
    areaId: 'leftSide',
    sortOrder: 70
};
export const query = `
query Query {
  product(id: getContextValue('productId', null)) {
    productId
    uuid
    variantGroup {
      variantGroupId
      attributes: variantAttributes {
        attributeId
        attributeCode
        attributeName
        options {
          optionId
          optionText
        }
      }
      addItemApi
    }
  }
  createVariantGroupApi: url(routeId: "createVariantGroup")
  createProductApi: url(routeId: "createProduct")
}
`;
export default VariantGroup;
