import { getColumnClasses } from '@components/common/form/editor/GetColumnClasses.js';
import { getRowClasses } from '@components/common/form/editor/GetRowClasses.js';
import { Image as ResponsiveImage } from '@components/common/Image.js';
import React from 'react';
import './Editor.scss';
const Paragraph = ({ data })=>{
    return /*#__PURE__*/ React.createElement("p", {
        dangerouslySetInnerHTML: {
            __html: data.text
        }
    });
};
const Header = ({ data })=>{
    const tagName = `h${data.level}`;
    return /*#__PURE__*/ React.createElement(tagName, null, data.text);
};
const List = ({ data })=>{
    const ListTag = data.style === 'ordered' ? 'ol' : 'ul';
    return /*#__PURE__*/ React.createElement(ListTag, null, data.items.map((item, index)=>/*#__PURE__*/ React.createElement("li", {
            key: index
        }, item)));
};
const Quote = ({ data })=>{
    return /*#__PURE__*/ React.createElement("blockquote", null, /*#__PURE__*/ React.createElement("p", null, '"', data.text, '"'), data.caption && /*#__PURE__*/ React.createElement("cite", null, "- ", data.caption));
};
const Image = ({ data, columnSize })=>{
    const { file, caption, withBorder, withBackground, stretched, link } = data;
    const imageStyles = {
        border: withBorder ? '1px solid #ccc' : 'none',
        backgroundColor: withBackground ? '#f9f9f9' : 'transparent',
        width: stretched ? '100%' : 'auto',
        display: 'block',
        maxWidth: '100%',
        margin: '0 auto'
    };
    const imageWidth = file.width || 800;
    const imageHeight = file.height || (file.width ? Math.round(file.width * 0.75) : 600);
    // Calculate responsive sizes based on the columnSize prop
    // columnSize represents the fraction of the row that this column occupies (e.g., 1/2, 1/3, 2/3, etc.)
    let sizesValue;
    sizesValue = '100vw'; // On mobile, always full viewport width
    if (columnSize <= 0.25) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 25vw';
    } else if (columnSize <= 0.34) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 33vw';
    } else if (columnSize <= 0.5) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw';
    } else if (columnSize <= 0.67) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 67vw';
    } else if (columnSize <= 0.75) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 75vw';
    } else {
        sizesValue = '(max-width: 640px) 100vw, 100vw';
    }
    const responsiveSizes = sizesValue;
    const imageElement = /*#__PURE__*/ React.createElement(ResponsiveImage, {
        src: file.url,
        alt: caption || 'Image',
        width: imageWidth,
        height: imageHeight,
        sizes: responsiveSizes,
        style: {
            ...imageStyles
        }
    });
    return /*#__PURE__*/ React.createElement("div", {
        className: "editor-image-container"
    }, link ? /*#__PURE__*/ React.createElement("a", {
        href: link,
        target: "_blank",
        rel: "noopener noreferrer"
    }, imageElement) : imageElement, caption && /*#__PURE__*/ React.createElement("p", {
        style: {
            textAlign: 'center',
            marginTop: '10px'
        }
    }, caption));
};
const RawHtml = ({ data })=>{
    return /*#__PURE__*/ React.createElement("div", {
        dangerouslySetInnerHTML: {
            __html: data.html
        }
    });
};
const RenderEditorJS = ({ blocks, columnSize })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "prose prose-base max-w-none text-base"
    }, blocks.map((block, index)=>{
        switch(block.type){
            case 'paragraph':
                return /*#__PURE__*/ React.createElement(Paragraph, {
                    key: index,
                    data: block.data
                });
            case 'header':
                return /*#__PURE__*/ React.createElement(Header, {
                    key: index,
                    data: block.data
                });
            case 'list':
                return /*#__PURE__*/ React.createElement(List, {
                    key: index,
                    data: block.data
                });
            case 'image':
                return /*#__PURE__*/ React.createElement(Image, {
                    key: index,
                    data: block.data,
                    columnSize: columnSize
                });
            case 'quote':
                return /*#__PURE__*/ React.createElement(Quote, {
                    key: index,
                    data: block.data
                });
            case 'raw':
                return /*#__PURE__*/ React.createElement(RawHtml, {
                    key: index,
                    data: block.data
                });
            default:
                return null;
        }
    }));
};
export function Editor({ rows }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "editor__html space-y-6"
    }, rows.map((row, index)=>{
        const rowClasses = getRowClasses(row.size);
        return /*#__PURE__*/ React.createElement("div", {
            className: `row__container grid ${rowClasses} grid-cols-1 gap-5`,
            key: index
        }, row.columns.map((column, index)=>{
            const columnClasses = getColumnClasses(column.size);
            return /*#__PURE__*/ React.createElement("div", {
                className: `column__container ${columnClasses} col-span-1`,
                key: index
            }, column.data?.blocks && /*#__PURE__*/ React.createElement(RenderEditorJS, {
                blocks: column.data?.blocks,
                columnSize: column.size / row.size
            }));
        }));
    }));
}
