import { Meta } from '@components/common/Meta.js';
import React from 'react';
export function Og({ type = 'website', title, description, image, url, siteName, publishedTime, authors, locale, alternateLocales, twitterCard = 'summary', twitterSite, twitterCreator, twitterImage, includeTwitterTags = true }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
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
    }), type === 'article' && publishedTime && /*#__PURE__*/ React.createElement(Meta, {
        property: "article:published_time",
        content: publishedTime
    }), type === 'article' && authors?.length && authors.map((author, index)=>/*#__PURE__*/ React.createElement(Meta, {
            key: `author-${index}`,
            property: "article:author",
            content: author
        })), locale && /*#__PURE__*/ React.createElement(Meta, {
        property: "og:locale",
        content: locale
    }), alternateLocales?.length && alternateLocales.map((alternateLocale, index)=>/*#__PURE__*/ React.createElement(Meta, {
            key: `locale-${index}`,
            property: "og:locale:alternate",
            content: alternateLocale
        })), includeTwitterTags && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:card",
        content: twitterCard
    }), title && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:title",
        content: title
    }), description && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:description",
        content: description
    }), twitterSite && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:site",
        content: twitterSite
    }), twitterCreator && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:creator",
        content: twitterCreator
    }), twitterImage && /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:image",
        content: twitterImage
    })));
}
