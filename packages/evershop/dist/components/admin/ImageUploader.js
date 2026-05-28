import React from 'react';
import { toast } from 'react-toastify';
import uniqid from 'uniqid';
import { useQuery } from 'urql';
import { get } from '../../lib/util/get.js';
import './ImageUploader.scss';
import Spinner from '@components/admin/Spinner.js';
import { ImageUploaderSkeleton } from './ImageUploaderSkeleton.js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const Upload = ({ imageUploadUrl, targetPath, onUpload, isSingleMode })=>{
    const [uploading, setUploading] = React.useState(false);
    const onChange = (e)=>{
        setUploading(true);
        e.persist();
        const formData = new FormData();
        for(let i = 0; i < e.target.files.length; i += 1){
            formData.append('images', e.target.files[i]);
        }
        formData.append('targetPath', targetPath || '');
        fetch(imageUploadUrl + (targetPath || ''), {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response)=>{
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('Something wrong. Please try again');
            }
            return response.json();
        }).then(async (response)=>{
            if (!response.error) {
                await onUpload(get(response, 'data.files', []).map((i)=>({
                        uuid: uniqid(),
                        url: i.url,
                        path: i.path
                    })));
            } else {
                toast.error(get(response, 'error.message', 'Failed!'));
            }
        }).catch((error)=>{
            toast.error(error.message);
        }).finally(()=>{
            e.target.value = null;
            setUploading(false);
        });
    };
    const id = uniqid();
    return /*#__PURE__*/ React.createElement("div", {
        className: "uploader grid-item"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "uploader-icon text-primary w-full h-full"
    }, /*#__PURE__*/ React.createElement("label", {
        htmlFor: id,
        className: "w-full h-full flex items-center justify-center cursor-pointer"
    }, uploading ? /*#__PURE__*/ React.createElement(Spinner, {
        width: isSingleMode ? 40 : 25,
        height: isSingleMode ? 40 : 25
    }) : /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-5 w-5",
        viewBox: "0 0 20 20",
        fill: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        fillRule: "evenodd",
        d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
        clipRule: "evenodd"
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "invisible"
    }, /*#__PURE__*/ React.createElement("input", {
        id: id,
        type: "file",
        multiple: true,
        onChange: onChange
    })));
};
const Image = ({ image, allowDelete, onDelete, isFirst, isSingleMode })=>{
    const [deleting, setDeleting] = React.useState(false);
    // Use ref to track if component is mounted
    const isMounted = React.useRef(true);
    // Set up effect for cleanup
    React.useEffect(()=>{
        return ()=>{
            // When component unmounts, set ref to false
            isMounted.current = false;
        };
    }, []);
    // Assign classes based on mode
    const classes = isSingleMode ? 'image border border-border rounded-lg' : `image border border-border rounded-lg grid-item ${isFirst ? 'first-item' : ''}`;
    return /*#__PURE__*/ React.createElement("div", {
        className: classes,
        id: image.uuid
    }, /*#__PURE__*/ React.createElement("div", {
        className: "img"
    }, /*#__PURE__*/ React.createElement("img", {
        src: image.url,
        alt: ""
    })), allowDelete && /*#__PURE__*/ React.createElement("span", {
        role: "button",
        tabIndex: 0,
        className: `remove cursor-pointer text-destructive fill-current ${isSingleMode ? 'single-mode-remove' : ''}`,
        onClick: async ()=>{
            setDeleting(true);
            await onDelete(image);
            // Only update state if component is still mounted
            if (isMounted.current) {
                setDeleting(false);
            }
        },
        onKeyDown: ()=>{}
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: isSingleMode ? '20' : '16',
        height: isSingleMode ? '20' : '16',
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "feather feather-trash-2"
    }, /*#__PURE__*/ React.createElement("polyline", {
        points: "3 6 5 6 21 6"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "10",
        y1: "11",
        x2: "10",
        y2: "17"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "14",
        y1: "11",
        x2: "14",
        y2: "17"
    }))), deleting && /*#__PURE__*/ React.createElement("div", {
        className: "remove"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        width: 15,
        height: 15
    })));
};
const SortableImage = (props)=>{
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.image.uuid
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    return /*#__PURE__*/ React.createElement("div", {
        ref: setNodeRef,
        style: style,
        className: `grid-item ${props.isFirst ? 'first-item' : ''}`,
        ...attributes,
        ...listeners
    }, /*#__PURE__*/ React.createElement(Image, props));
};
const GetUploadApiQuery = `
  query Query ($filters: [FilterInput!]) {
    imageUploadUrl: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
  }
`;
const Images = ({ allowDelete = true, currentImages, imageUploadUrl, onDelete, onUpload, targetPath, isMultiple, allowSwap, onSortEnd })=>{
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8
        }
    }), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
    }));
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (active.id !== over?.id && onSortEnd && currentImages) {
            const oldIndex = currentImages.findIndex((img)=>img.uuid === active.id);
            const newIndex = currentImages.findIndex((img)=>img.uuid === over?.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                onSortEnd(oldIndex, newIndex);
            }
        }
    };
    if (!isMultiple) {
        const hasImage = currentImages && currentImages.length > 0;
        return /*#__PURE__*/ React.createElement("div", {
            className: `single-image-container ${!hasImage ? 'no-image' : ''}`
        }, hasImage ? /*#__PURE__*/ React.createElement(Image, {
            key: currentImages[0].uuid,
            image: currentImages[0],
            onDelete: onDelete,
            allowDelete: allowDelete,
            isSingleMode: true
        }) : null, /*#__PURE__*/ React.createElement(Upload, {
            imageUploadUrl: imageUploadUrl,
            targetPath: targetPath,
            onUpload: onUpload,
            isSingleMode: true
        }));
    } else if (allowSwap && currentImages && currentImages.length > 1) {
        return /*#__PURE__*/ React.createElement(DndContext, {
            sensors: sensors,
            collisionDetection: closestCenter,
            onDragEnd: handleDragEnd
        }, /*#__PURE__*/ React.createElement(SortableContext, {
            items: currentImages.map((img)=>img.uuid)
        }, currentImages.map((image, index)=>/*#__PURE__*/ React.createElement(SortableImage, {
                key: image.uuid,
                image: image,
                onDelete: onDelete,
                allowDelete: allowDelete,
                isFirst: index === 0
            }))), /*#__PURE__*/ React.createElement(Upload, {
            imageUploadUrl: imageUploadUrl,
            targetPath: targetPath,
            onUpload: onUpload
        }));
    }
    // Multi-image mode without drag and drop
    return /*#__PURE__*/ React.createElement(React.Fragment, null, (currentImages || []).map((image, index)=>/*#__PURE__*/ React.createElement(Image, {
            key: image.uuid,
            image: image,
            onDelete: onDelete,
            allowDelete: allowDelete,
            isFirst: index === 0
        })), /*#__PURE__*/ React.createElement(Upload, {
        imageUploadUrl: imageUploadUrl,
        targetPath: targetPath,
        onUpload: onUpload
    }));
};
export function ImageUploader({ currentImages = [], isMultiple = true, allowDelete = true, onDelete, onUpload, allowSwap = true, targetPath, onSortEnd }) {
    const [images, setImages] = React.useState(currentImages.map((image)=>({
            uuid: image.uuid,
            url: image.url,
            path: image.path
        })));
    const handleSortEnd = (oldIndex, newIndex)=>{
        setImages((items)=>{
            return arrayMove(items, oldIndex, newIndex);
        });
        if (onSortEnd) {
            onSortEnd(oldIndex, newIndex);
        }
    };
    const addImage = (imageArray)=>{
        if (!isMultiple) {
            // For single image mode, replace the current image
            setImages(imageArray);
        } else {
            setImages(images.concat(imageArray));
        }
    };
    const removeImage = (imageUuid)=>{
        setImages(images.filter((i)=>i.uuid !== imageUuid));
    };
    const onDeleteFn = async (image)=>{
        if (onDelete) {
            await onDelete(image);
        }
        removeImage(image.uuid);
    };
    const onUploadFn = async (imageArray)=>{
        if (onUpload) {
            await onUpload(imageArray);
        }
        addImage(imageArray);
    };
    const [result] = useQuery({
        query: GetUploadApiQuery
    });
    const { data, fetching, error } = result;
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, "There was an error:", error.message);
    } else if (fetching) {
        return /*#__PURE__*/ React.createElement(ImageUploaderSkeleton, {
            itemCount: isMultiple ? 5 : 1
        });
    } else {
        return /*#__PURE__*/ React.createElement("div", {
            className: "image-uploader-manager"
        }, /*#__PURE__*/ React.createElement("div", {
            id: 'image-uploader-wrapper',
            className: isMultiple ? 'image-list' : ''
        }, /*#__PURE__*/ React.createElement(Images, {
            currentImages: images,
            addImage: addImage,
            imageUploadUrl: data.imageUploadUrl,
            targetPath: targetPath,
            onDelete: onDeleteFn,
            onUpload: onUploadFn,
            allowDelete: allowDelete,
            allowSwap: allowSwap && isMultiple,
            onSortEnd: handleSortEnd,
            isMultiple: isMultiple
        })));
    }
}
