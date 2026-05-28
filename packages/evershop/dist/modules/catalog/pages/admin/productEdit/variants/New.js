import { Button } from '@components/common/ui/Button.js';
import { CardContent } from '@components/common/ui/Card.js';
import React from 'react';
import { CreateVariantGroup } from './CreateVariantGroup.js';
export const New = ({ currentProductUuid, createVariantGroupApi, setGroup })=>{
    const [action, setAction] = React.useState();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(CardContent, null, action === undefined && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "justify-left text-left"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "space-y-2"
    }, /*#__PURE__*/ React.createElement("div", null, "This product has some variants like color or size?"), /*#__PURE__*/ React.createElement(Button, {
        variant: 'secondary',
        onClick: (e)=>{
            e.preventDefault();
            setAction('create');
        }
    }, "Create a variant group")))), action === 'create' && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(CreateVariantGroup, {
        currentProductUuid: currentProductUuid,
        setGroup: setGroup,
        onCancel: ()=>setAction(undefined),
        createVariantGroupApi: createVariantGroupApi
    }))));
};
