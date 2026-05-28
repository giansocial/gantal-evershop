/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ import { FileBrowser } from '@components/admin/FileBrowser.js';
import { InputField } from '@components/common/form/InputField.js';
import { Button } from '@components/common/ui/Button.js';
import { Checkbox } from '@components/common/ui/Checkbox.js';
import { Input } from '@components/common/ui/Input.js';
import { Item, ItemContent, ItemTitle } from '@components/common/ui/Item.js';
import { Label } from '@components/common/ui/Label.js';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
export default function SlideshowSetting({ slideshowWidget }) {
    const { slides = [], autoplay = true, autoplaySpeed = 3000, arrows = true, dots = true, fullWidth = true, widthValue = 1920, heightValue = 800, heightType = 'auto' } = slideshowWidget || {};
    const { control, setValue, watch } = useFormContext();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'settings.slides'
    });
    const currentSlides = watch('settings.slides', slides);
    const currentAutoplay = watch('settings.autoplay', autoplay);
    const currentAutoplaySpeed = watch('settings.autoplaySpeed', autoplaySpeed);
    const currentArrows = watch('settings.arrows', arrows);
    const currentDots = watch('settings.dots', dots);
    const currentFullWidth = watch('settings.fullWidth', fullWidth);
    useEffect(()=>{
        // Initialize slides with existing data
        setValue('settings.slides', currentSlides?.length ? currentSlides : []);
        // Initialize the autoplay settings
        const handleAutoplay = currentAutoplay === undefined || currentAutoplay === null ? autoplay : Boolean(currentAutoplay);
        setValue('settings.autoplay', handleAutoplay);
        // Initialize the autoplay speed
        const speed = Number(currentAutoplaySpeed) || Number(autoplaySpeed) || 3000;
        setValue('settings.autoplaySpeed', speed);
        // Initialize the arrows setting
        const handleArrows = currentArrows === undefined || currentArrows === null ? arrows : Boolean(currentArrows);
        setValue('settings.arrows', handleArrows);
        // Initialize the dots setting
        const handleDots = currentDots === undefined || currentDots === null ? dots : Boolean(currentDots);
        setValue('settings.dots', handleDots);
        // Initialize the fullWidth setting
        const handleFullWidth = currentFullWidth === undefined || currentFullWidth === null ? fullWidth : Boolean(currentFullWidth);
        setValue('settings.fullWidth', handleFullWidth);
        // Always use adaptive height for the slideshow
        setValue('settings.heightType', 'auto');
        // Process all slides to detect image dimensions if they don't have them yet
        if (currentSlides?.length) {
            currentSlides.forEach((slide, index)=>{
                if (slide.image && (!slide.width || !slide.height)) {
                    getImageDimensions(slide.image, index);
                }
            });
        }
    }, []);
    const [activeSlideIndex, setActiveSlideIndex] = React.useState(null);
    const [openFileBrowser, setOpenFileBrowser] = React.useState(false);
    // Function to get image dimensions
    const getImageDimensions = (imageUrl, slideIndex)=>{
        if (!imageUrl) return;
        const img = new Image();
        img.onload = ()=>{
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            // Update the current slides with the new dimensions
            const newSlides = [
                ...currentSlides
            ];
            newSlides[slideIndex] = {
                ...newSlides[slideIndex],
                width,
                height
            };
            setValue('settings.slides', newSlides);
        };
        img.src = imageUrl;
    };
    const handleImageSelect = (image)=>{
        if (activeSlideIndex !== null) {
            setValue(`settings.slides.${activeSlideIndex}.image`, image);
            // Detect image dimensions when a new image is selected
            getImageDimensions(image, activeSlideIndex);
            setOpenFileBrowser(false);
        }
    };
    const addSlide = ()=>{
        const newSlide = {
            id: uuidv4(),
            image: '',
            width: 0,
            height: 0,
            headline: '',
            subText: '',
            buttonText: '',
            buttonLink: '',
            buttonColor: '#3B82F6' // Default blue color
        };
        append(newSlide);
        setTimeout(()=>{
            setActiveSlideIndex(fields.length);
        }, 50);
    };
    const moveUp = (index)=>{
        if (index > 0) {
            move(index, index - 1);
            setActiveSlideIndex(index - 1);
        }
    };
    const moveDown = (index)=>{
        if (index < fields.length - 1) {
            move(index, index + 1);
            setActiveSlideIndex(index + 1);
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "slideshow-widget"
    }, openFileBrowser && /*#__PURE__*/ React.createElement("div", {
        className: "max-h-96"
    }, /*#__PURE__*/ React.createElement(FileBrowser, {
        isMultiple: false,
        onInsert: handleImageSelect,
        close: ()=>setOpenFileBrowser(false)
    })), /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline'
    }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(ItemTitle, null, "Slideshow Settings"), /*#__PURE__*/ React.createElement("div", {
        className: "space-y-2 mt-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 md:col-span-1 space-y-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center mb-4"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        id: "arrows",
        checked: Boolean(currentArrows),
        onCheckedChange: (checked)=>{
            setValue('settings.arrows', checked);
        },
        className: "mr-2 h-4 w-4"
    }), /*#__PURE__*/ React.createElement(Label, {
        htmlFor: "arrows"
    }, "Show Navigation Arrows")), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center"
    }, /*#__PURE__*/ React.createElement(Checkbox, {
        id: "autoplay",
        checked: Boolean(currentAutoplay),
        onCheckedChange: (checked)=>{
            setValue('settings.autoplay', checked);
        },
        className: "mr-2 h-4 w-4"
    }), /*#__PURE__*/ React.createElement(Label, {
        htmlFor: "autoplay",
        className: "text-sm"
    }, "Enable Autoplay")), Boolean(currentAutoplay) && /*#__PURE__*/ React.createElement(InputField, {
        type: "number",
        label: "Autoplay Speed (ms)",
        name: "settings.autoplaySpeed",
        defaultValue: Number(autoplaySpeed) || 3000,
        placeholder: "e.g., 3000 for 3 seconds",
        validation: {
            min: {
                value: 1000,
                message: 'Minimum speed is 1000ms'
            }
        }
    })), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 md:col-span-1"
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center mb-2"
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-lg font-medium"
    }, "Slides"), /*#__PURE__*/ React.createElement(Button, {
        onClick: addSlide,
        variant: 'outline'
    }, "Add New Slide")), fields.length > 0 ? /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4"
    }, fields.map((slide, index)=>/*#__PURE__*/ React.createElement("div", {
            key: slide.id,
            onClick: ()=>setActiveSlideIndex(index),
            className: `relative border border-border rounded overflow-hidden cursor-pointer ${activeSlideIndex === index ? 'ring-2 ring-blue-500' : ''}`
        }, /*#__PURE__*/ React.createElement("div", {
            className: "aspect-[16/9] bg-gray-100 flex items-center justify-center"
        }, currentSlides[index]?.image ? /*#__PURE__*/ React.createElement("img", {
            src: currentSlides[index].image,
            alt: `Slide ${index + 1}`,
            className: "w-full h-full object-cover"
        }) : /*#__PURE__*/ React.createElement("div", {
            className: "text-gray-400"
        }, "No Image")), /*#__PURE__*/ React.createElement("div", {
            className: "p-2 bg-white border-t border-border"
        }, /*#__PURE__*/ React.createElement("p", {
            className: "text-sm font-medium truncate"
        }, currentSlides[index]?.headline || `Slide ${index + 1}`), /*#__PURE__*/ React.createElement("div", {
            className: "flex mt-2"
        }, /*#__PURE__*/ React.createElement(Button, {
            variant: 'outline',
            size: 'sm',
            onClick: (e)=>{
                e.stopPropagation();
                moveUp(index);
            },
            disabled: index === 0,
            className: `mr-1 p-1`
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, /*#__PURE__*/ React.createElement("path", {
            d: "M18 15l-6-6-6 6"
        }))), /*#__PURE__*/ React.createElement(Button, {
            type: "button",
            size: 'sm',
            onClick: (e)=>{
                e.stopPropagation();
                moveDown(index);
            },
            disabled: index === fields.length - 1,
            className: `mr-1 p-1`
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, /*#__PURE__*/ React.createElement("path", {
            d: "M6 9l6 6 6-6"
        }))), /*#__PURE__*/ React.createElement(Button, {
            variant: "destructive",
            size: 'sm',
            onClick: (e)=>{
                e.stopPropagation();
                remove(index);
                if (activeSlideIndex === index) {
                    setActiveSlideIndex(null);
                } else if (activeSlideIndex !== null && activeSlideIndex > index) {
                    setActiveSlideIndex(activeSlideIndex - 1);
                }
            }
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, /*#__PURE__*/ React.createElement("path", {
            d: "M3 6h18"
        }), /*#__PURE__*/ React.createElement("path", {
            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
        }), /*#__PURE__*/ React.createElement("path", {
            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
        })))))))) : /*#__PURE__*/ React.createElement("div", {
        className: "bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center mb-4"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-500 mb-4"
    }, "No slides have been added yet."), /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: addSlide
    }, "Add Your First Slide"))), activeSlideIndex !== null && fields[activeSlideIndex] && /*#__PURE__*/ React.createElement("div", {
        className: "bg-white p-4 rounded border border-border"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-sm font-normal mb-4"
    }, "Edit Slide ", activeSlideIndex + 1), /*#__PURE__*/ React.createElement("div", {
        className: "mb-2 border border-border rounded overflow-hidden"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "aspect-[16/9] bg-gray-100 relative"
    }, currentSlides[activeSlideIndex]?.image ? /*#__PURE__*/ React.createElement("div", {
        className: "relative w-full h-full"
    }, /*#__PURE__*/ React.createElement("img", {
        src: currentSlides[activeSlideIndex].image,
        alt: `Slide ${activeSlideIndex + 1}`,
        className: "w-full h-full object-cover",
        onLoad: (e)=>{
            // Additional dimensions detection when the preview image loads
            const img = e.target;
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                if (!currentSlides[activeSlideIndex]?.width || !currentSlides[activeSlideIndex]?.height) {
                    const newSlides = [
                        ...currentSlides
                    ];
                    newSlides[activeSlideIndex] = {
                        ...newSlides[activeSlideIndex],
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    };
                    setValue('settings.slides', newSlides);
                }
            }
        }
    }), /*#__PURE__*/ React.createElement("div", {
        className: "absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
    }, currentSlides[activeSlideIndex]?.headline && /*#__PURE__*/ React.createElement("h3", {
        className: "text-white text-xl md:text-2xl font-bold mb-2"
    }, currentSlides[activeSlideIndex].headline), currentSlides[activeSlideIndex]?.subText && /*#__PURE__*/ React.createElement("p", {
        className: "text-white mb-4"
    }, currentSlides[activeSlideIndex].subText), currentSlides[activeSlideIndex]?.buttonText && /*#__PURE__*/ React.createElement("button", {
        type: "button",
        className: "px-4 py-2 rounded",
        style: {
            backgroundColor: currentSlides[activeSlideIndex].buttonColor || '#3B82F6'
        }
    }, currentSlides[activeSlideIndex].buttonText))) : /*#__PURE__*/ React.createElement("div", {
        className: "w-full h-full flex items-center justify-center"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: ()=>setOpenFileBrowser(true)
    }, "Select Image")), currentSlides[activeSlideIndex]?.image && /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: ()=>setOpenFileBrowser(true),
        className: "absolute bottom-2 right-2"
    }, "Change Image"))), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: `settings.slides.${activeSlideIndex}.image`,
        value: currentSlides && currentSlides[activeSlideIndex]?.image || ''
    }), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: `settings.slides.${activeSlideIndex}.id`,
        value: currentSlides && currentSlides[activeSlideIndex]?.id || uuidv4()
    }), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: `settings.slides.${activeSlideIndex}.width`,
        value: currentSlides[activeSlideIndex]?.width || 0
    }), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        name: `settings.slides.${activeSlideIndex}.height`,
        value: currentSlides[activeSlideIndex]?.height || 0
    }), currentSlides[activeSlideIndex]?.image && /*#__PURE__*/ React.createElement("div", {
        className: "md:col-span-2 mb-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-sm text-gray-500"
    }, currentSlides[activeSlideIndex]?.width && currentSlides[activeSlideIndex]?.height ? /*#__PURE__*/ React.createElement("p", null, "Image dimensions: ", currentSlides[activeSlideIndex].width, ' ', "× ", currentSlides[activeSlideIndex].height, " pixels") : /*#__PURE__*/ React.createElement("p", null, "Detecting image dimensions..."))), /*#__PURE__*/ React.createElement("div", {
        className: "md:col-span-2"
    }, /*#__PURE__*/ React.createElement("label", {
        className: "block mb-1 text-sm"
    }, "Headline"), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        className: "w-full p-2 border border-gray-300 rounded",
        name: `settings.slides.${activeSlideIndex}.headline`,
        value: currentSlides[activeSlideIndex]?.headline || '',
        onChange: (e)=>{
            const newSlides = [
                ...currentSlides
            ];
            newSlides[activeSlideIndex] = {
                ...newSlides[activeSlideIndex],
                headline: e.target.value
            };
            setValue('settings.slides', newSlides);
        },
        placeholder: "e.g., New Collection Available"
    })), /*#__PURE__*/ React.createElement("div", {
        className: "md:col-span-2"
    }, /*#__PURE__*/ React.createElement("label", {
        className: "block mb-1 text-sm"
    }, "Sub Text"), /*#__PURE__*/ React.createElement("textarea", {
        className: "w-full p-2 border border-gray-300 rounded",
        name: `settings.slides.${activeSlideIndex}.subText`,
        value: currentSlides[activeSlideIndex]?.subText || '',
        onChange: (e)=>{
            const newSlides = [
                ...currentSlides
            ];
            newSlides[activeSlideIndex] = {
                ...newSlides[activeSlideIndex],
                subText: e.target.value
            };
            setValue('settings.slides', newSlides);
        },
        placeholder: "e.g., Check out our latest products with special discounts",
        rows: 3
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("label", {
        className: "block mb-1 text-sm"
    }, "Button Text"), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        className: "w-full p-2 border border-gray-300 rounded",
        name: `settings.slides.${activeSlideIndex}.buttonText`,
        value: currentSlides[activeSlideIndex]?.buttonText || '',
        onChange: (e)=>{
            const newSlides = [
                ...currentSlides
            ];
            newSlides[activeSlideIndex] = {
                ...newSlides[activeSlideIndex],
                buttonText: e.target.value
            };
            setValue('settings.slides', newSlides);
        },
        placeholder: "e.g., Shop Now"
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("label", {
        className: "block mb-1 text-sm"
    }, "Button Link"), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        className: "w-full p-2 border border-gray-300 rounded",
        name: `settings.slides.${activeSlideIndex}.buttonLink`,
        value: currentSlides[activeSlideIndex]?.buttonLink || '',
        onChange: (e)=>{
            const newSlides = [
                ...currentSlides
            ];
            newSlides[activeSlideIndex] = {
                ...newSlides[activeSlideIndex],
                buttonLink: e.target.value
            };
            setValue('settings.slides', newSlides);
        },
        placeholder: "e.g., /category/new-arrivals"
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("label", {
        className: "block mb-1 text-sm"
    }, "Button Color"), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "color",
        value: currentSlides[activeSlideIndex]?.buttonColor || '#3B82F6',
        onChange: (e)=>{
            const newSlides = [
                ...currentSlides
            ];
            newSlides[activeSlideIndex] = {
                ...newSlides[activeSlideIndex],
                buttonColor: e.target.value
            };
            setValue('settings.slides', newSlides);
        },
        className: "w-10 h-10 rounded border-border mr-2 cursor-pointer"
    }), /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        value: currentSlides[activeSlideIndex]?.buttonColor || '#3B82F6',
        onChange: (e)=>{
            const newSlides = [
                ...currentSlides
            ];
            newSlides[activeSlideIndex] = {
                ...newSlides[activeSlideIndex],
                buttonColor: e.target.value
            };
            setValue('settings.slides', newSlides);
        },
        placeholder: "#3B82F6"
    }))))));
}
export const query = `
  query Query($slides: [SlideInput], $autoplay: Boolean, $autoplaySpeed: Int, $arrows: Boolean, $dots: Boolean) {
    slideshowWidget(
      slides: $slides, 
      autoplay: $autoplay, 
      autoplaySpeed: $autoplaySpeed, 
      arrows: $arrows, 
      dots: $dots,
    ) {
      slides {
        id
        image
        width
        height
        headline
        subText
        buttonText
        buttonLink
        buttonColor
      }
      autoplay
      autoplaySpeed
      arrows
      dots
    }
  }
`;
export const fragments = `
  fragment SlideData on Slide {
    id
    image
    width
    height
    headline
    subText
    buttonText
    buttonLink
    buttonColor
  }
`;
export const variables = `{
  slides: getWidgetSetting("slides"),
  autoplay: getWidgetSetting("autoplay"),
  autoplaySpeed: getWidgetSetting("autoplaySpeed"),
  arrows: getWidgetSetting("arrows"),
  dots: getWidgetSetting("dots"),
}`;
