import React, { useEffect, useState } from 'react';
import './Image.scss';
import { ImageUploader } from '@components/admin/ImageUploader.js';
import { InputField } from '@components/common/form/InputField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { useFormContext } from 'react-hook-form';
export default function Image({ category }) {
    const [image, setImage] = useState(category?.image);
    const { setValue } = useFormContext();
    useEffect(()=>{
        if (image) {
            setValue('image', image.url);
        } else {
            setValue('image', '');
        }
    }, [
        image,
        setValue
    ]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Category Image"), /*#__PURE__*/ React.createElement(CardDescription, null, "Upload an image for the category.")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(ImageUploader, {
        onUpload: (images)=>{
            if (images.length > 0) {
                setImage(images[0]);
            }
        },
        isMultiple: false,
        allowDelete: true,
        onDelete: ()=>{
            setImage(undefined);
        },
        currentImages: image ? [
            image
        ] : [],
        targetPath: `catalog/${Math.floor(Math.random() * (9999 - 1000)) + 1000}/${Math.floor(Math.random() * (9999 - 1000)) + 1000}`
    }), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        value: image?.url,
        name: "image"
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 10
};
export const query = `
  query Query {
    category(id: getContextValue("categoryId", null)) {
      image {
        id: uuid
        url
      }
    }
  }
`;
