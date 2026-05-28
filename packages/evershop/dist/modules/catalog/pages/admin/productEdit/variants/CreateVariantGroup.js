import Spinner from '@components/admin/Spinner.js';
import { Button } from '@components/common/ui/Button.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from 'urql';
const AttributesQuery = `
  query Query($filters: [FilterInput]) {
    attributes(filters: $filters) {
      items {
        attributeId
        attributeCode
        attributeName
        options {
          value: attributeOptionId
          text: optionText
        }
      }
    }
  }
`;
export const CreateVariantGroup = ({ currentProductUuid, createVariantGroupApi, onCancel, setGroup })=>{
    const [attributes, setAttributes] = React.useState([]);
    const { getValues } = useFormContext();
    const groupId = getValues('group_id');
    const onCreate = async (e)=>{
        e.preventDefault();
        const response = await fetch(createVariantGroupApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attribute_codes: attributes.map((a)=>a),
                attribute_group_id: groupId
            })
        }).then((r)=>r.json());
        if (!response.error) {
            // Call addItemApi to add the current product to the new variant group
            const addItemApi = response.data.addItemApi;
            const addItemResponse = await fetch(addItemApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: currentProductUuid
                })
            }).then((r)=>r.json());
            if (addItemResponse.error) {
                toast.error(addItemResponse.error.message);
                return;
            }
            setGroup({
                variantGroupId: response.data.variant_group_id,
                addItemApi: response.data.addItemApi,
                attributes: response.data.attributes.map((attribute)=>({
                        attributeCode: attribute.attribute_code,
                        uuid: attribute.uuid,
                        attributeName: attribute.attribute_name,
                        attributeId: attribute.attribute_id,
                        options: attribute.options.map((option)=>({
                                optionId: option.attribute_option_id,
                                optionText: option.option_text
                            }))
                    }))
            });
        } else {
            toast.error(response.error.message);
        }
    };
    const [result] = useQuery({
        query: AttributesQuery,
        variables: {
            filters: [
                {
                    key: 'type',
                    operation: 'eq',
                    value: 'select'
                },
                {
                    key: 'group',
                    operation: 'eq',
                    value: groupId
                }
            ]
        },
        pause: !groupId
    });
    const { data, fetching, error } = result;
    if (fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-center items-center"
        }, /*#__PURE__*/ React.createElement(Spinner, {
            width: 30,
            height: 30
        }));
    }
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, error.message);
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, (data?.attributes?.items || []).length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "space-y-2"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, "Select the list of attribute")), (data?.attributes?.items || []).map((a)=>/*#__PURE__*/ React.createElement("label", {
            key: a.attributeCode,
            className: "flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement(Checkbox, {
            onCheckedChange: (checked)=>{
                if (checked) {
                    setAttributes(attributes.concat(a.attributeCode));
                } else {
                    setAttributes(attributes.filter((attr)=>a.attributeCode !== attr));
                }
            }
        }), /*#__PURE__*/ React.createElement("span", null, a.attributeName))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-5 space-x-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: 'default',
        className: 'hover:cursor-pointer',
        onClick: (e)=>onCreate(e)
    }, "Create"), /*#__PURE__*/ React.createElement(Button, {
        variant: "destructive",
        onClick: (e)=>{
            e.preventDefault();
            onCancel();
        }
    }, "Cancel"))), (data?.attributes?.items || []).length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "alert alert-danger",
        role: "alert"
    }, 'There is no "Select" attribute available.')));
};
