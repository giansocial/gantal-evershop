import { InputField } from '@components/common/form/InputField.js';
import { ReactSelectField } from '@components/common/form/ReactSelectField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Table, TableBody, TableCell, TableRow } from '@components/common/ui/Table.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
const getGroup = (groups = [], groupId)=>groups.find((group)=>group.groupId === groupId) || groups[0];
const getAttributeOptions = (groups, attributeId)=>{
    const attribute = groups.find((group)=>group.attributes.items.find((attr)=>attr.attribute_id === attributeId))?.attributes.items.find((attr)=>attr.attribute_id === attributeId);
    return attribute ? attribute.options : [];
};
const getAttributeSelectedValues = (attributeIndex, attributeId, attributeType)=>{
    switch(attributeType){
        case 'text':
        case 'textarea':
        case 'date':
        case 'datetime':
            return attributeIndex.find((idx)=>idx.attributeId === attributeId)?.optionText || '';
        case 'select':
            return attributeIndex.find((idx)=>idx.attributeId === attributeId)?.optionId.toString() || '';
        case 'multiselect':
            return attributeIndex.filter((idx)=>idx.attributeId === attributeId).map((idx)=>idx.optionId.toString());
        default:
            return '';
    }
};
export default function Attributes({ product, groups: { items } }) {
    const { unregister, watch } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        name: 'attributes'
    });
    const attributeIndex = product?.attributeIndex || [];
    const currentGroup = watch('group_id', getGroup(items, product?.groupId)?.groupId || undefined);
    useEffect(()=>{
        if (currentGroup) {
            // Unregister all existing attribute fields
            fields.forEach((_, index)=>{
                unregister(`attributes.${index}`);
            });
            // Remove all existing fields
            remove();
            // Get new attributes for the selected group
            const attributes = getGroup(items, currentGroup)?.attributes.items || [];
            const newFields = attributes.map((attribute)=>({
                    attribute_code: attribute.attribute_code,
                    attribute_name: attribute.attribute_name,
                    type: attribute.type,
                    attribute_id: attribute.attribute_id,
                    value: getAttributeSelectedValues(attributeIndex, attribute.attribute_id, attribute.type),
                    is_required: attribute.is_required
                }));
            // Append new fields
            append(newFields);
        }
    }, [
        currentGroup,
        items,
        append,
        remove,
        unregister
    ]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Attribute group"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage the attributes.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", null, product?.variantGroupId && /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col"
    }, /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        defaultValue: product?.groupId,
        name: "group_id"
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-semibold"
    }, getGroup(items, product?.groupId).groupName), /*#__PURE__*/ React.createElement("p", {
        className: "text-muted-foreground italic"
    }, "Can not change the attribute group of a product that is already in a variant group."))), !product?.variantGroupId && /*#__PURE__*/ React.createElement(SelectField, {
        name: "group_id",
        label: "Attribute group",
        options: items.map((group)=>({
                value: group.groupId,
                label: group.groupName
            })),
        defaultValue: product?.groupId || currentGroup,
        required: true
    }))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Table, null, /*#__PURE__*/ React.createElement(TableBody, null, fields.map((attribute, index)=>{
        const validation = attribute.is_required === 1 ? {
            required: `${attribute.attribute_name} is required`
        } : {};
        let Field = null;
        switch(attribute.type){
            case 'text':
                Field = /*#__PURE__*/ React.createElement(InputField, {
                    name: `attributes.${index}.value`,
                    required: attribute.is_required === 1,
                    validation: validation
                });
                break;
            case 'textarea':
                Field = /*#__PURE__*/ React.createElement(TextareaField, {
                    name: `attributes.${index}.value`,
                    required: attribute.is_required === 1,
                    validation: validation
                });
                break;
            case 'select':
                Field = /*#__PURE__*/ React.createElement(SelectField, {
                    name: `attributes.${index}.value`,
                    options: getAttributeOptions(items, attribute.attribute_id),
                    placeholder: "Select an option",
                    validation: validation
                });
                break;
            case 'multiselect':
                Field = /*#__PURE__*/ React.createElement(ReactSelectField, {
                    name: `attributes.${index}.value`,
                    options: getAttributeOptions(items, attribute.attribute_id),
                    placeholder: "Select options",
                    required: attribute.is_required === 1,
                    validation: validation,
                    isMulti: true
                });
                break;
            default:
                Field = /*#__PURE__*/ React.createElement(InputField, {
                    name: `attributes.${index}.value`,
                    required: attribute.is_required === 1,
                    validation: validation,
                    placeholder: _('Enter value for ${attribute}', {
                        attribute: attribute.attribute_name
                    })
                });
                break;
        }
        return /*#__PURE__*/ React.createElement(TableRow, {
            key: attribute.id
        }, /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement("span", null, attribute.attribute_name), attribute.is_required === 1 && /*#__PURE__*/ React.createElement("span", {
            className: "text-destructive pl-1"
        }, "*")), /*#__PURE__*/ React.createElement(TableCell, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            value: attribute.attribute_code,
            name: `attributes.${index}.attribute_code`
        }), Field));
    })))));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 30
};
export const query = `
  query Query ($filters: [FilterInput!]) {
    product(id: getContextValue("productId", null)) {
      groupId
      variantGroupId
      attributeIndex {
        attributeId
        optionId
        optionText
      }
    },
    groups: attributeGroups(filters: $filters) {
      items {
        groupId: attributeGroupId
        groupName
        attributes {
          items {
            attribute_id: attributeId
            attribute_name: attributeName
            attribute_code: attributeCode
            type
            is_required: isRequired
            options {
              value: attributeOptionId
              label: optionText
            }
          }
        }
      }
    }
  }
`;
export const variables = `
{
  filters: [{ key: "limit", operation: 'eq', value: 1000 }]
}`;
