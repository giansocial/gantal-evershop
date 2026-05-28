import Area from '@components/common/Area.js';
import { Editor } from '@components/common/Editor.js';
import { Image } from '@components/common/Image.js';
import { useCategory } from '@components/frontStore/catalog/CategoryContext.js';
import React from 'react';
export function CategoryInfo() {
    const { name, description, image } = useCategory();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "beforeCategoryInfo"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "mb-2 md:mb-5 category__general"
    }, image && /*#__PURE__*/ React.createElement(Image, {
        className: "category__image mb-5",
        src: image.url,
        alt: image.alt || name,
        width: 1800,
        height: 1029,
        priority: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "category__info prose prose-base page-width"
    }, /*#__PURE__*/ React.createElement("h1", {
        className: "category__name"
    }, name), /*#__PURE__*/ React.createElement("div", {
        className: "category__description"
    }, /*#__PURE__*/ React.createElement(Editor, {
        rows: description
    })))), /*#__PURE__*/ React.createElement(Area, {
        id: "afterCategoryInfo"
    }));
}
