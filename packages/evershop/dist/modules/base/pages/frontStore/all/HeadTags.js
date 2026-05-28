import { Og } from '@components/frontStore/Og.js';
import React from 'react';
export default function HeadTags({ pageInfo: { title, description, keywords, canonicalUrl, ogInfo, favicon }, themeConfig: { headTags: { metas, links, scripts, base } } }) {
    React.useEffect(()=>{
        const head = document.querySelector('head');
        scripts.forEach((script)=>{
            const scriptElement = document.createElement('script');
            Object.keys(script).forEach((key)=>{
                if (script[key]) {
                    scriptElement[key] = script[key];
                }
            });
            head?.appendChild(scriptElement);
        });
    }, []);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("title", null, title), /*#__PURE__*/ React.createElement("meta", {
        name: "description",
        content: description
    }), /*#__PURE__*/ React.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
    }), metas.map((meta, index)=>/*#__PURE__*/ React.createElement("meta", {
            key: index,
            ...meta
        })), links.map((link, index)=>/*#__PURE__*/ React.createElement("link", {
            key: index,
            ...link
        })), scripts.map((script, index)=>/*#__PURE__*/ React.createElement("script", {
            key: index,
            ...script
        })), favicon && /*#__PURE__*/ React.createElement("link", {
        rel: "icon",
        href: favicon
    }), keywords && keywords.length > 0 && /*#__PURE__*/ React.createElement("meta", {
        name: "keywords",
        content: keywords.join(', ')
    }), canonicalUrl && /*#__PURE__*/ React.createElement("link", {
        rel: "canonical",
        href: canonicalUrl
    }), base && /*#__PURE__*/ React.createElement("base", base), /*#__PURE__*/ React.createElement(Og, {
        type: ogInfo.type,
        title: title,
        description: description,
        url: ogInfo.url,
        siteName: ogInfo.siteName,
        image: ogInfo.image,
        locale: ogInfo.locale,
        twitterCard: ogInfo.twitterCard,
        twitterSite: ogInfo.twitterSite,
        twitterCreator: ogInfo.twitterCreator,
        twitterImage: ogInfo.twitterImage
    }));
}
export const layout = {
    areaId: 'head',
    sortOrder: 5
};
export const query = `
  query query {
    pageInfo {
      title
      description
      keywords
      canonicalUrl
      favicon
      ogInfo {
        locale
        title
        description
        image
        url
        type
        siteName
        twitterCard
        twitterSite
        twitterCreator
        twitterImage
      }
    }
    themeConfig {
      headTags {
        metas {
          name
          content
          charSet
          httpEquiv
          property
          itemProp
          itemType
          itemID
          lang
        }
        links {
          rel
          href
          sizes
          type
          hrefLang
          media
          title
          as
          crossOrigin
          integrity
          referrerPolicy
        }
        scripts {
          src
          type
          async
          defer
          crossOrigin
          integrity
          noModule
          nonce
        }
        base {
          href
          target
        }
      }
    }
  }
`;
