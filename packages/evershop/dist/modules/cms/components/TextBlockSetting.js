import { Editor } from '@components/common/form/Editor.js';
import { InputField } from '@components/common/form/InputField.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export default function TextBlockSetting({ textWidget: { text, className } }) {
    const { register, watch, setValue } = useFormContext();
    const editorValue = watch('temp_editor_text');
    React.useEffect(()=>{
        if (editorValue) {
            setValue('settings.text', JSON.stringify(editorValue));
        }
    }, [
        editorValue,
        setValue
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement(InputField, {
        label: "Custom CSS classes",
        name: "settings.className",
        defaultValue: className,
        helperText: "Custom CSS classes for the text block"
    }), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...register('settings.text'),
        defaultValue: typeof text === 'string' ? text : JSON.stringify(text)
    }), /*#__PURE__*/ React.createElement(Editor, {
        name: "temp_editor_text",
        label: "Content",
        value: typeof text === 'string' ? JSON.parse(text) : text
    }));
}
export const query = `
  query Query($text: String, $className: String) {
    textWidget(text: $text, className: $className) {
      text
      className
    }
  }
`;
export const variables = `{
  text: getWidgetSetting("text"),
  className: getWidgetSetting("className")
}`;
