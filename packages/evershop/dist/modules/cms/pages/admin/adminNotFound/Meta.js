import { Meta } from '@components/common/Meta.js';
import { Title } from '@components/common/Title.js';
import React from 'react';
export default function SeoMeta() {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Title, {
        title: "Page Not Found"
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "description",
        content: "Page Not Found"
    }));
}
export const layout = {
    areaId: 'head',
    sortOrder: 1
};
