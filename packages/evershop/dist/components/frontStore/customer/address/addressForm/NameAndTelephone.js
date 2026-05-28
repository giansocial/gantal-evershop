import { InputField } from '@components/common/form/InputField.js';
import { TelField } from '@components/common/form/TelField.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function NameAndTelephone({ fullName, telephone, getFieldName }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-2"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: getFieldName ? getFieldName('full_name') : 'full_name',
        defaultValue: fullName,
        label: _('Full name'),
        placeholder: _('Full name'),
        required: true,
        validation: {
            required: _('Full name is required')
        }
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(TelField, {
        name: getFieldName ? getFieldName('telephone') : 'telephone',
        defaultValue: telephone,
        label: _('Telephone'),
        placeholder: _('Telephone'),
        required: true,
        validation: {
            required: _('Telephone is required')
        }
    })));
}
