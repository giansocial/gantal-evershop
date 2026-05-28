import Area from '@components/common/Area.js';
import { AppProvider } from '@components/common/context/app.js';
import { Alert } from '@components/common/modal/Alert.js';
import Head from '@components/common/react/Head.js';
import React from 'react';
import { createClient, Provider } from 'urql';
const client = createClient({
    url: window.eContext?.config?.pageMeta?.route?.isAdmin ? '/api/admin/graphql' : '/api/graphql'
});
export function App({ children }) {
    return /*#__PURE__*/ React.createElement(AppProvider, {
        value: window.eContext
    }, /*#__PURE__*/ React.createElement(Provider, {
        value: client
    }, /*#__PURE__*/ React.createElement(Alert, null, /*#__PURE__*/ React.createElement(Head, null), /*#__PURE__*/ React.createElement(Area, {
        id: "body",
        className: "wrapper"
    }))), children);
}
