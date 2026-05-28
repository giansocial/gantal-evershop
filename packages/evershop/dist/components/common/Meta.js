/* eslint-disable no-console */ import React from 'react';
const VALID_HTTP_EQUIV = [
    'content-type',
    'default-style',
    'refresh',
    'x-ua-compatible',
    'content-security-policy'
];
const REQUIRED_CONTENT_ATTRIBUTES = [
    'name',
    'property',
    'itemProp',
    'httpEquiv'
];
function validateMetaProps(props) {
    const errors = [];
    const hasIdentifier = [
        'name',
        'property',
        'itemProp',
        'httpEquiv',
        'charset'
    ].some((attr)=>props[attr] !== undefined);
    if (!hasIdentifier) {
        errors.push('Meta tag must have at least one identifier attribute (name, property, itemProp, httpEquiv, or charset)');
    }
    if (props.charset && props.charset.toLowerCase() !== 'utf-8') {
        errors.push('charset attribute must be "utf-8" for HTML5 documents');
    }
    if (props.itemProp && (props.name || props.httpEquiv || props.charset)) {
        errors.push('itemProp attribute cannot be used with name, http-equiv, or charset attributes');
    }
    const needsContent = REQUIRED_CONTENT_ATTRIBUTES.some((attr)=>props[attr] !== undefined);
    if (needsContent && !props.content) {
        errors.push('Meta tag with name, property, itemProp, or httpEquiv must have content attribute');
    }
    if (props.media && props.name !== 'theme-color') {
        errors.push('media attribute is only valid when name="theme-color"');
    }
    if (props.httpEquiv && !VALID_HTTP_EQUIV.includes(props.httpEquiv)) {
        errors.push(`Invalid httpEquiv value: ${props.httpEquiv}. Valid values: ${VALID_HTTP_EQUIV.join(', ')}`);
    }
    const identifierCount = [
        'name',
        'property',
        'itemProp'
    ].filter((attr)=>props[attr] !== undefined).length;
    if (identifierCount > 1) {
        errors.push('Meta tag cannot have multiple identifier attributes (name, property, itemProp)');
    }
    if (props.itemProp) {
        if (props.itemType && !props.itemType.startsWith('http')) {
            errors.push('itemType should be a valid URL (typically schema.org URL)');
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function sanitizeMetaProps(props) {
    const allowedAttributes = [
        'charset',
        'name',
        'content',
        'httpEquiv',
        'property',
        'itemProp',
        'itemType',
        'itemId',
        'lang',
        'scheme',
        'media'
    ];
    return Object.keys(props).filter((key)=>allowedAttributes.includes(key) && props[key] !== undefined && props[key] !== null).reduce((obj, key)=>{
        obj[key] = String(props[key]).trim();
        return obj;
    }, {});
}
export function Meta(props) {
    if (process.env.NODE_ENV === 'development') {
        const validation = validateMetaProps(props);
        if (!validation.isValid) {
            console.error('Meta component validation errors:', validation.errors);
            validation.errors.forEach((error)=>console.error(`Meta: ${error}`));
        }
    }
    const sanitizedProps = sanitizeMetaProps(props);
    if (Object.keys(sanitizedProps).length === 0) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Meta component has no valid attributes, not rendering');
        }
        return null;
    }
    return /*#__PURE__*/ React.createElement("meta", sanitizedProps);
}
export function MetaCharset({ charset = 'utf-8' } = {}) {
    return /*#__PURE__*/ React.createElement(Meta, {
        charset: charset
    });
}
export function MetaDescription({ description }) {
    return /*#__PURE__*/ React.createElement(Meta, {
        name: "description",
        content: description
    });
}
export function MetaKeywords({ keywords }) {
    const keywordString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    return /*#__PURE__*/ React.createElement(Meta, {
        name: "keywords",
        content: keywordString
    });
}
export function MetaAuthor({ author }) {
    return /*#__PURE__*/ React.createElement(Meta, {
        name: "author",
        content: author
    });
}
export function MetaThemeColor({ color, media }) {
    return /*#__PURE__*/ React.createElement(Meta, {
        name: "theme-color",
        content: color,
        media: media
    });
}
export function MetaViewport({ width = 'device-width', initialScale = 1, maximumScale, userScalable = true }) {
    const parts = [
        `width=${width}`,
        `initial-scale=${initialScale}`
    ];
    if (maximumScale !== undefined) {
        parts.push(`maximum-scale=${maximumScale}`);
    }
    if (!userScalable) {
        parts.push('user-scalable=no');
    }
    return /*#__PURE__*/ React.createElement(Meta, {
        name: "viewport",
        content: parts.join(', ')
    });
}
export function MetaHttpEquiv({ httpEquiv, content }) {
    return /*#__PURE__*/ React.createElement(Meta, {
        httpEquiv: httpEquiv,
        content: content
    });
}
export function MetaOpenGraph({ type, title, description, image, url, siteName }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, type && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:type",
        content: type
    }), title && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:title",
        content: title
    }), description && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:description",
        content: description
    }), image && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:image",
        content: image
    }), url && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:url",
        content: url
    }), siteName && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:site_name",
        content: siteName
    }));
}
export function MetaTwitterCard({ card = 'summary', site, creator, title, description, image }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:card",
        content: card
    }), site && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:site",
        content: site
    }), creator && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:creator",
        content: creator
    }), title && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:title",
        content: title
    }), description && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:description",
        content: description
    }), image && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:image",
        content: image
    }));
}
export function MetaRobots({ index = true, follow = true, noarchive = false, nosnippet = false }) {
    const directives = [
        index ? 'index' : 'noindex',
        follow ? 'follow' : 'nofollow'
    ];
    if (noarchive) directives.push('noarchive');
    if (nosnippet) directives.push('nosnippet');
    return /*#__PURE__*/ React.createElement(Meta, {
        name: "robots",
        content: directives.join(', ')
    });
}
