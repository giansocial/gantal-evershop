import Area from '@components/common/Area.js';
import { Card, CardContent, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import React from 'react';
export default function CustomerNotes({ order: { shippingNote } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        className: "bg-popover"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Customer notes")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "orderEditCustomerNotes",
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement("div", null, shippingNote || /*#__PURE__*/ React.createElement("span", {
                            className: "text-muted-foreground"
                        }, "No notes from customer"))
                },
                props: {},
                sortOrder: 10,
                id: 'title'
            }
        ],
        noOuter: true
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 10
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      shippingNote
    }
  }
`;
