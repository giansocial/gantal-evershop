import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export default function Error() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "text-center"
    }, /*#__PURE__*/ React.createElement("h1", null, _('Error')), /*#__PURE__*/ React.createElement("p", null, _('We are sorry. There was an error processing your payment. Your card was not charged. Please try again.')));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
