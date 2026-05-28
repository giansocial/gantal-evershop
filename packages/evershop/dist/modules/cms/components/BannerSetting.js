/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/img-redundant-alt */ import { FileBrowser } from '@components/admin/FileBrowser.js';
import { InputField } from '@components/common/form/InputField.js';
import { Button } from '@components/common/ui/Button.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export default function BannerSetting({ bannerWidget: { src, alignment = 'left', width, height, alt, link } }) {
    const { setValue, watch } = useFormContext();
    const image = watch('settings.src', src);
    const currentAlignment = watch('settings.alignment', alignment);
    const [openFileBrowser, setOpenFileBrowser] = React.useState(false);
    const [imageDimensions, setImageDimensions] = React.useState({
        width: width || 0,
        height: height || 0
    });
    // Function to get image dimensions
    const getImageDimensions = (imageUrl)=>{
        if (!imageUrl) return;
        const img = new Image();
        img.onload = ()=>{
            const newWidth = img.naturalWidth;
            const newHeight = img.naturalHeight;
            setImageDimensions({
                width: newWidth,
                height: newHeight
            });
            // Update form values
            setValue('settings.width', newWidth);
            setValue('settings.height', newHeight);
        };
        img.src = imageUrl;
    };
    // Get dimensions when image changes
    React.useEffect(()=>{
        if (image) {
            getImageDimensions(image);
        }
    }, [
        image
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: `banner-widget space-y-3`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "max-h-96"
    }, openFileBrowser && /*#__PURE__*/ React.createElement(FileBrowser, {
        isMultiple: false,
        onInsert: (file)=>{
            setValue('settings.src', file);
            setOpenFileBrowser(false);
        },
        close: ()=>setOpenFileBrowser(false)
    })), /*#__PURE__*/ React.createElement("div", {
        className: "w-full h-80 border border-gray-300 bg-gray-200 relative overflow-hidden"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjFmMWYxIj48L3JlY3Q+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU1ZTUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"
    }), /*#__PURE__*/ React.createElement("div", {
        className: `flex h-full w-full ${currentAlignment === 'center' ? 'justify-center' : currentAlignment === 'right' ? 'justify-end' : 'justify-start'} p-4`
    }, image && /*#__PURE__*/ React.createElement("div", {
        className: `relative h-full flex items-center w-full ${currentAlignment === 'center' ? 'justify-center' : currentAlignment === 'right' ? 'justify-end' : 'justify-start'}`
    }, /*#__PURE__*/ React.createElement("img", {
        src: image,
        className: "h-auto max-h-full object-contain shadow-md rounded",
        style: {
            maxWidth: '60%' // Consistent size for all alignments
        },
        onLoad: (e)=>{
            // This is a backup in case the useEffect doesn't trigger
            const img = e.target;
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                if (imageDimensions.width !== img.naturalWidth || imageDimensions.height !== img.naturalHeight) {
                    setImageDimensions({
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    });
                    setValue('settings.width', img.naturalWidth);
                    setValue('settings.height', img.naturalHeight);
                }
            }
        },
        alt: "Banner Image"
    }))), /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: (e)=>{
            e.preventDefault();
            setOpenFileBrowser(true);
        },
        className: "absolute bottom-2 right-2 z-10"
    }, "Select Image")), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "settings.src",
        defaultValue: image || ''
    }), /*#__PURE__*/ React.createElement("div", {
        className: "mb-4"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, /*#__PURE__*/ React.createElement("label", null, "Alignment")), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-2"
    }, /*#__PURE__*/ React.createElement("div", {
        onClick: ()=>{
            setValue('settings.alignment', 'left');
        },
        className: `border p-3 flex justify-center items-center cursor-pointer ${currentAlignment === 'left' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ React.createElement("line", {
        x1: "5",
        y1: "6",
        x2: "19",
        y2: "6"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "5",
        y1: "12",
        x2: "12",
        y2: "12"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "5",
        y1: "18",
        x2: "16",
        y2: "18"
    }))), /*#__PURE__*/ React.createElement("div", {
        onClick: ()=>{
            setValue('settings.alignment', 'center');
        },
        className: `border p-3 flex justify-center items-center cursor-pointer ${currentAlignment === 'center' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ React.createElement("line", {
        x1: "5",
        y1: "6",
        x2: "19",
        y2: "6"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "8",
        y1: "12",
        x2: "16",
        y2: "12"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "6",
        y1: "18",
        x2: "18",
        y2: "18"
    }))), /*#__PURE__*/ React.createElement("div", {
        onClick: ()=>{
            setValue('settings.alignment', 'right');
        },
        className: `border p-3 flex justify-center items-center cursor-pointer ${currentAlignment === 'right' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ React.createElement("line", {
        x1: "5",
        y1: "6",
        x2: "19",
        y2: "6"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "12",
        y1: "12",
        x2: "19",
        y2: "12"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "8",
        y1: "18",
        x2: "19",
        y2: "18"
    })))), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "settings.alignment",
        defaultValue: alignment
    })), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "settings.width",
        defaultValue: width || imageDimensions.width
    }), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "settings.height",
        defaultValue: height || imageDimensions.height
    }), /*#__PURE__*/ React.createElement("div", {
        className: "mb-4"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-sm text-gray-500"
    }, "Image dimensions: ", imageDimensions.width, " × ", imageDimensions.height, ' ', "pixels")), /*#__PURE__*/ React.createElement(InputField, {
        type: "text",
        label: "Alt Text",
        placeholder: 'e.g., "Promotional Banner"',
        name: "settings.alt",
        defaultValue: alt
    }), /*#__PURE__*/ React.createElement(InputField, {
        type: "text",
        placeholder: "e.g., https://example.com",
        label: "Banner Link",
        name: "settings.link",
        defaultValue: link || ''
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
