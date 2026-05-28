import Area from '@components/common/Area.js';
import { AppProvider } from '@components/common/context/app.js';
import { Alert } from '@components/common/modal/Alert.js';
import React from 'react';
import { Provider } from 'urql';
export default function Hydrate({ client }) {
    return /*#__PURE__*/ React.createElement(Provider, {
        value: client
    }, /*#__PURE__*/ React.createElement(AppProvider, {
        value: window.eContext
    }, /*#__PURE__*/ React.createElement(Alert, null, /*#__PURE__*/ React.createElement(Area, {
        id: "body",
        className: "wrapper"
    }))));
}
