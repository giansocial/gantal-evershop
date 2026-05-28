import { AppProvider } from '@components/common/context/app.js';
import ServerHtml from '@components/common/react/server/Server.js';
import React from 'react';
import { renderToString } from 'react-dom/server.js';
function renderHtml(route, js, css, contextData, langeCode) {
    const source = renderToString(/*#__PURE__*/ React.createElement(AppProvider, {
        value: JSON.parse(contextData)
    }, /*#__PURE__*/ React.createElement(ServerHtml, {
        route: route,
        js: js,
        css: css,
        appContext: `var eContext = ${contextData}`
    })));
    return `<!DOCTYPE html><html id="root" lang="${langeCode}">${source}</html>`;
}
export { renderHtml };
