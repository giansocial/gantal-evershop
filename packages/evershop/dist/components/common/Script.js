/* eslint-disable no-console */ import React from 'react';
const VALID_REFERRER_POLICIES = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'same-origin',
    'strict-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url'
];
const VALID_CROSSORIGIN_VALUES = [
    'anonymous',
    'use-credentials'
];
function validateScriptProps(props) {
    const errors = [];
    if (!props.src && !props.children) {
        errors.push('Script must have either src attribute or children content');
    }
    if (props.src && props.children) {
        errors.push('Script cannot have both src attribute and children content');
    }
    if (props.async && props.defer) {
        errors.push('Script cannot have both async and defer attributes');
    }
    if (!props.src && props.async) {
        errors.push('async attribute has no effect on inline scripts');
    }
    if (!props.src && props.defer) {
        errors.push('defer attribute has no effect on inline scripts');
    }
    if (props.referrerPolicy && !VALID_REFERRER_POLICIES.includes(props.referrerPolicy)) {
        errors.push(`Invalid referrerPolicy: ${props.referrerPolicy}`);
    }
    if (props.crossOrigin && !VALID_CROSSORIGIN_VALUES.includes(props.crossOrigin)) {
        errors.push(`Invalid crossOrigin: ${props.crossOrigin}`);
    }
    if (props.integrity && !props.src) {
        errors.push('integrity attribute requires src attribute');
    }
    if (props.fetchPriority && ![
        'high',
        'low',
        'auto'
    ].includes(props.fetchPriority)) {
        errors.push(`Invalid fetchPriority: ${props.fetchPriority}`);
    }
    if (props.blocking && props.blocking !== 'render') {
        errors.push('blocking attribute can only be "render"');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function sanitizeScriptProps(props) {
    const allowedAttributes = [
        'src',
        'async',
        'defer',
        'type',
        'crossOrigin',
        'integrity',
        'nonce',
        'referrerPolicy',
        'noModule',
        'fetchPriority',
        'blocking',
        'attributionSrc'
    ];
    const sanitized = Object.keys(props).filter((key)=>allowedAttributes.includes(key) && props[key] !== undefined && props[key] !== null).reduce((obj, key)=>{
        if (typeof props[key] === 'boolean') {
            if (props[key]) {
                obj[key] = key === 'attributionSrc' && props[key] === true ? '' : props[key];
            }
        } else {
            obj[key] = String(props[key]).trim();
        }
        return obj;
    }, {});
    return sanitized;
}
export function Script(props) {
    if (process.env.NODE_ENV === 'development') {
        const validation = validateScriptProps(props);
        if (!validation.isValid) {
            console.error('Script component validation errors:', validation.errors);
            validation.errors.forEach((error)=>console.error(`Script: ${error}`));
        }
    }
    if (!props.src && !props.children) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Script component has no src or children, not rendering');
        }
        return null;
    }
    const sanitizedProps = sanitizeScriptProps(props);
    if (props.src) {
        return /*#__PURE__*/ React.createElement("script", sanitizedProps);
    }
    return /*#__PURE__*/ React.createElement("script", sanitizedProps, props.children);
}
export function ScriptExternal({ src, async = false, defer = false, crossOrigin, integrity, referrerPolicy, fetchPriority = 'auto', nonce }) {
    return /*#__PURE__*/ React.createElement(Script, {
        src: src,
        async: async,
        defer: defer,
        crossOrigin: crossOrigin,
        integrity: integrity,
        referrerPolicy: referrerPolicy,
        fetchPriority: fetchPriority,
        nonce: nonce
    });
}
export function ScriptModule({ src, children, nonce, crossOrigin, integrity, referrerPolicy }) {
    if (src && children) {
        console.error('ScriptModule cannot have both src and children');
        return null;
    }
    if (src) {
        return /*#__PURE__*/ React.createElement(Script, {
            src: src,
            type: "module",
            nonce: nonce,
            crossOrigin: crossOrigin,
            integrity: integrity,
            referrerPolicy: referrerPolicy
        });
    }
    return /*#__PURE__*/ React.createElement(Script, {
        type: "module",
        nonce: nonce,
        crossOrigin: crossOrigin,
        integrity: integrity,
        referrerPolicy: referrerPolicy
    }, children);
}
export function ScriptInline({ children, type = 'text/javascript', nonce }) {
    return /*#__PURE__*/ React.createElement(Script, {
        type: type,
        nonce: nonce
    }, children);
}
export function ScriptJSON({ id, data, nonce }) {
    return /*#__PURE__*/ React.createElement(Script, {
        type: "application/json",
        nonce: nonce,
        ...id && {
            id
        }
    }, JSON.stringify(data, null, 2));
}
export function ScriptImportMap({ imports, scopes, nonce }) {
    const importMap = {};
    if (imports) importMap.imports = imports;
    if (scopes) importMap.scopes = scopes;
    return /*#__PURE__*/ React.createElement(Script, {
        type: "importmap",
        nonce: nonce
    }, JSON.stringify(importMap, null, 2));
}
export function ScriptNoModule({ src, children, async = false, defer = false }) {
    if (src && children) {
        console.error('ScriptNoModule cannot have both src and children');
        return null;
    }
    if (src) {
        return /*#__PURE__*/ React.createElement(Script, {
            src: src,
            noModule: true,
            async: async,
            defer: defer
        });
    }
    return /*#__PURE__*/ React.createElement(Script, {
        noModule: true,
        async: async,
        defer: defer
    }, children);
}
