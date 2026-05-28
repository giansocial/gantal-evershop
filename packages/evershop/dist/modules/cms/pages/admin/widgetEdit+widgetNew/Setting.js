import Area from '@components/common/Area.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function Setting({ type }) {
    const areaId = `widget_setting_form`;
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Widget Settings"), /*#__PURE__*/ React.createElement(CardDescription, null, "Configure the settings for the ", type.name, " widget.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: areaId,
        noOurter: true
    })));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 30
};
export const query = `
  query Query {
    type: widgetType(code: getContextValue('type', null)) {
      code
      name
    }
  }
`;
