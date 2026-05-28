import { CardContent } from '@components/common/ui/Card.js';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@components/common/ui/Table.js';
import React from 'react';
import { useQuery } from 'urql';
import { CreateVariant } from './CreateVariant.js';
import { Skeleton } from './Skeleton.js';
import { Variant } from './Variant.js';
export const VariantQuery = `
query Query($productId: ID!) {
  product(id: $productId) {
    variantGroup {
      items {
        id
        attributes {
          attributeId
          attributeCode
          optionId
          optionText
        }
        product {
          productId
          uuid
          name
          sku
          qty
          status
          urlKey
          visibility
          price {
            regular {
              value
              currency
              text
            }
          }
          inventory {
            qty
            isInStock
            stockAvailability
            manageStock
          }
          editUrl
          updateApi
          image {
            uuid
            url
          }
          gallery {
            uuid
            url
          }
        }
      }
    }
  }
}
`;
export const Variants = ({ productId, variantGroup, createProductApi })=>{
    const [result, reexecuteQuery] = useQuery({
        query: VariantQuery,
        variables: {
            productId
        }
    });
    const refresh = ()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    };
    const { data, fetching, error } = result;
    if (fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "p-2 flex justify-center items-center"
        }, /*#__PURE__*/ React.createElement(Skeleton, null));
    }
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, error.message);
    }
    return /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
        className: "variant-list overflow-x-scroll"
    }, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableHeader, null, /*#__PURE__*/ React.createElement(TableRow, null, /*#__PURE__*/ React.createElement(TableHead, null, "Image"), variantGroup.attributes.map((attribute)=>/*#__PURE__*/ React.createElement(TableHead, {
            key: attribute.attributeId
        }, attribute.attributeName)), /*#__PURE__*/ React.createElement(TableHead, null, "Sku"), /*#__PURE__*/ React.createElement(TableHead, null, "Price"), /*#__PURE__*/ React.createElement(TableHead, null, "Stock"), /*#__PURE__*/ React.createElement(TableHead, null, "Status"), /*#__PURE__*/ React.createElement(TableHead, null, "Actions"))), /*#__PURE__*/ React.createElement(TableBody, null, (data.product.variantGroup?.items || []).filter((v)=>v.product.productId !== productId).map((v)=>/*#__PURE__*/ React.createElement(Variant, {
            key: v.id,
            variant: v,
            refresh: refresh,
            variantGroup: variantGroup
        }))))), /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement(CreateVariant, {
        variantGroup: variantGroup,
        createProductApi: createProductApi,
        refresh: refresh
    })));
};
