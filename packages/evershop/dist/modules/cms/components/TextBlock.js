import { Editor } from '@components/common/Editor.js';
import React from 'react';
export default function TextBlock({ textWidget: { text, className } }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: `text-block-widget ${className}`
    }, /*#__PURE__*/ React.createElement(Editor, {
        rows: text
    }));
}
export const query = `
  query Query($text: String, $className: String) {
    textWidget(text: $text, className: $className) {
      ...TextBlockWidget
    }
  }
`;
export const fragments = `
  fragment TextBlockWidget on TextBlockWidget {
    text
    className
  }
`;
export const variables = `{
  text: getWidgetSetting("text"),
  className: getWidgetSetting("className")
}`;
