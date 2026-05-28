import { InputField } from '@components/common/form/InputField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function ProvinceAndPostcode({ provinces, province, postcode, getFieldName }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-2 mt-2"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SelectField, {
        defaultValue: province?.code,
        name: getFieldName ? getFieldName('province') : 'address.province',
        label: _('Province'),
        placeholder: _('Province'),
        required: true,
        validation: {
            required: _('Province is required')
        },
        options: provinces
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: getFieldName ? getFieldName('postcode') : 'postcode',
        defaultValue: postcode,
        label: _('Postcode'),
        placeholder: _('Postcode'),
        required: true,
        validation: {
            required: _('Postcode is required')
        }
    })));
}
