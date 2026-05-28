import { Image } from '@components/common/Image.js';
import React from 'react';
export default function Banner({ bannerWidget: { src, alignment, width, height, alt } }) {
    // Parse tailwind classes for alignment
    const alignmentClass = alignment === 'left' ? 'justify-start' : alignment === 'center' ? 'justify-center' : 'justify-end';
    return /*#__PURE__*/ React.createElement("div", {
        className: `banner-widget w-full flex ${alignmentClass}`
    }, /*#__PURE__*/ React.createElement(Image, {
        src: src,
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        className: alignmentClass,
        alt: alt,
        priority: true
    }));
}
export const query = `
  query Query($src: String, $alignment: String, $width: Float, $height: Float, $alt: String) {
    bannerWidget(src: $src, alignment: $alignment, width: $width, height: $height, alt: $alt) {
      src
      alignment
      width
      height
      alt
    }
  }
`;
export const variables = `{
  src: getWidgetSetting("src"),
  alignment: getWidgetSetting("alignment"),
  width: getWidgetSetting("width"),
  height: getWidgetSetting("height"),
  alt: getWidgetSetting("alt")
}`;
