import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@components/common/ui/Item.js';
import React from 'react';
const WidgetTypes = ({ types })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "space-y-2"
    }, types.map((type, index)=>/*#__PURE__*/ React.createElement(Item, {
            key: index,
            variant: "outline"
        }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, " ", type.name), /*#__PURE__*/ React.createElement(ItemDescription, null, type.description)), /*#__PURE__*/ React.createElement(ItemActions, null, /*#__PURE__*/ React.createElement(Button, {
            variant: "outline",
            size: "sm",
            onClick: (e)=>{
                window.location.href = type.createWidgetUrl;
            }
        }, "Choose")))));
};
export default function NewWidgetButton({ widgetTypes }) {
    return /*#__PURE__*/ React.createElement(Dialog, null, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, null, "New Widget")), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "New Widget")), /*#__PURE__*/ React.createElement(WidgetTypes, {
        types: widgetTypes
    })));
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    widgetTypes {
      code
      name
      description
      createWidgetUrl
    }
  }
`;
