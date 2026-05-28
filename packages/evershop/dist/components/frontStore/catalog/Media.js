/* eslint-disable jsx-a11y/click-events-have-key-events */ /* eslint-disable jsx-a11y/no-static-element-interactions */ import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from '@components/common/Image.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import './Media.scss';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
const SliderComponent = Slider;
const PrevArrow = (props)=>{
    const { className, onClick } = props;
    return /*#__PURE__*/ React.createElement("button", {
        className: `${className} custom-arrow prev-arrow`,
        onClick: onClick,
        "aria-label": "Previous slide"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M15 18l-6-6 6-6"
    })));
};
const NextArrow = (props)=>{
    const { className, onClick } = props;
    return /*#__PURE__*/ React.createElement("button", {
        className: `${className} custom-arrow next-arrow`,
        onClick: onClick,
        "aria-label": "Next slide"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M9 18l6-6-6-6"
    })));
};
export const Media = ({ imageSize = {
    width: 600,
    height: 600
}, thumbnailSize = {
    width: 100,
    height: 100
}, modalSize = {
    width: 1200,
    height: 1200
} })=>{
    const product = useProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const mainSliderRef = useRef(null);
    const modalSliderRef = useRef(null);
    const allImages = [];
    const fullscreenWidth = modalSize.width * 1.5;
    const fullscreenHeight = modalSize.height * 1.5;
    if (product.image) {
        allImages.push({
            url: product.image.url,
            alt: product.image.alt || product.name,
            width: imageSize.width,
            height: imageSize.height
        });
    }
    if (product.gallery && Array.isArray(product.gallery)) {
        product.gallery.forEach((img)=>{
            allImages.push({
                url: img.url,
                alt: img.alt || product.name,
                width: imageSize.width,
                height: imageSize.height
            });
        });
    }
    const mainSliderSettings = {
        dots: allImages.length > 1,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: allImages.length > 1,
        fade: false,
        prevArrow: /*#__PURE__*/ React.createElement(PrevArrow, null),
        nextArrow: /*#__PURE__*/ React.createElement(NextArrow, null),
        beforeChange: (_, next)=>{
            setActiveSlide(next);
        },
        customPaging: function(i) {
            return /*#__PURE__*/ React.createElement("div", {
                className: "thumbnail-wrapper"
            }, /*#__PURE__*/ React.createElement(Image, {
                src: allImages[i]?.url,
                alt: `Thumbnail ${i + 1}`,
                width: thumbnailSize.width,
                height: thumbnailSize.height,
                objectFit: "contain"
            }));
        }
    };
    const modalSliderSettings = {
        dots: allImages.length > 1,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: /*#__PURE__*/ React.createElement(PrevArrow, null),
        nextArrow: /*#__PURE__*/ React.createElement(NextArrow, null),
        initialSlide: activeSlide,
        adaptiveHeight: true,
        lazyLoad: 'ondemand',
        fade: false,
        swipe: true,
        beforeChange: ()=>setIsImageLoading(true),
        afterChange: ()=>setIsImageLoading(false),
        customPaging: function(i) {
            return /*#__PURE__*/ React.createElement("div", {
                className: "thumbnail-wrapper"
            }, /*#__PURE__*/ React.createElement(Image, {
                src: allImages[i]?.url,
                alt: `Thumbnail ${i + 1}`,
                width: thumbnailSize.width,
                height: thumbnailSize.height,
                objectFit: "contain"
            }));
        }
    };
    const openModal = (index)=>{
        setActiveSlide(index);
        setIsModalOpen(true);
        setTimeout(()=>{
            if (modalSliderRef.current) {
                modalSliderRef.current.slickGoTo(index);
            }
        }, 100);
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight' && modalSliderRef.current) {
            modalSliderRef.current.slickNext();
        } else if (e.key === 'ArrowLeft' && modalSliderRef.current) {
            modalSliderRef.current.slickPrev();
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "product-media-container"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "main-image-container"
    }, allImages.length > 0 && /*#__PURE__*/ React.createElement(SliderComponent.default, {
        ref: mainSliderRef,
        ...mainSliderSettings,
        className: "product-slider"
    }, allImages.map((image, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "product-image",
            onClick: ()=>openModal(index),
            style: {
                width: imageSize.width,
                height: imageSize.height
            }
        }, /*#__PURE__*/ React.createElement(Image, {
            src: image.url,
            alt: image.alt || 'Product image',
            width: imageSize.width,
            height: imageSize.height,
            objectFit: "scale-down"
        })))), allImages.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "w-full h-full flex items-center justify-center py-24 bg-gray-100"
    }, /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
        className: "w-48 h-48"
    }))), isModalOpen && /*#__PURE__*/ React.createElement("div", {
        className: "product-image-modal"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "modal-overlay",
        onClick: closeModal
    }), /*#__PURE__*/ React.createElement("div", {
        className: "modal-content"
    }, /*#__PURE__*/ React.createElement("button", {
        className: "modal-close",
        onClick: closeModal,
        "aria-label": "Close fullscreen view"
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
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
    }), /*#__PURE__*/ React.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "modal-slider-container"
    }, isImageLoading && /*#__PURE__*/ React.createElement("div", {
        className: "loading-indicator"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "40",
        height: "40",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "spinner"
    }, /*#__PURE__*/ React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "10"
    }), /*#__PURE__*/ React.createElement("path", {
        d: "M12 2a10 10 0 1 0 10 10"
    }))), /*#__PURE__*/ React.createElement(SliderComponent.default, {
        ref: modalSliderRef,
        ...modalSliderSettings
    }, allImages.map((image, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "modal-image"
        }, /*#__PURE__*/ React.createElement(Image, {
            src: image.url,
            alt: image.alt || 'Product image',
            width: fullscreenWidth,
            height: fullscreenHeight,
            objectFit: "contain"
        }))))))));
};
