import { Image } from '@components/common/Image.js';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
function PrevArrow(props) {
    const { onClick } = props;
    return /*#__PURE__*/ React.createElement("button", {
        className: "absolute bottom-[20px] right-[70px] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 md:bottom-[20px] md:right-[70px] md:h-10 md:w-10",
        onClick: onClick,
        "aria-label": "Previous slide",
        type: "button"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-6 w-6 md:h-6 md:w-6"
    }, /*#__PURE__*/ React.createElement("polyline", {
        points: "15 18 9 12 15 6"
    })));
}
function NextArrow(props) {
    const { onClick } = props;
    return /*#__PURE__*/ React.createElement("button", {
        className: "absolute bottom-[20px] right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 md:bottom-[20px] md:right-5 md:h-10 md:w-10",
        onClick: onClick,
        "aria-label": "Next slide",
        type: "button"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-6 w-6 md:h-6 md:w-6"
    }, /*#__PURE__*/ React.createElement("polyline", {
        points: "9 18 15 12 9 6"
    })));
}
function CustomDot(props) {
    const { onClick, active, className } = props;
    const isActive = active || className && className.includes('active');
    return /*#__PURE__*/ React.createElement("button", {
        onClick: onClick,
        className: `mx-1 my-0 h-3 w-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 md:h-3 md:w-3 ${isActive ? '!bg-black scale-125 shadow-md' : '!bg-black/70 !hover:bg-black/90'}`,
        "aria-label": "Go to slide",
        type: "button"
    });
}
const SliderComponent = Slider;
export default function Slideshow({ slideshowWidget: { slides = [], autoplay = true, autoplaySpeed = 3000, arrows = true, dots = true } }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: Boolean(autoplay),
        autoplaySpeed: Number(autoplaySpeed) || 3000,
        arrows: Boolean(arrows),
        fade: false,
        pauseOnHover: true,
        adaptiveHeight: true,
        nextArrow: arrows ? /*#__PURE__*/ React.createElement(NextArrow, null) : undefined,
        prevArrow: arrows ? /*#__PURE__*/ React.createElement(PrevArrow, null) : undefined,
        customPaging: function(i) {
            return /*#__PURE__*/ React.createElement(CustomDot, {
                active: false
            });
        },
        appendDots: (dots)=>/*#__PURE__*/ React.createElement("div", {
                className: "w-full flex justify-center items-center"
            }, /*#__PURE__*/ React.createElement("div", {
                className: "pr-[120px] md:pr-[120px]"
            }, dots)),
        dotsClass: 'slick-dots custom-dots-container'
    };
    if (!slides || slides.length === 0) {
        return null;
    }
    const containerClasses = [
        'slideshow-widget',
        'relative',
        'w-full'
    ].join(' ');
    const containerStyle = {
        height: 'auto',
        maxWidth: '100%'
    };
    const sliderStyle = {
        height: 'auto' // Adaptive height for slider
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: containerClasses,
        style: containerStyle
    }, /*#__PURE__*/ React.createElement(SliderComponent, {
        ...settings,
        style: sliderStyle
    }, slides.map((slide)=>/*#__PURE__*/ React.createElement("div", {
            key: slide.id,
            className: "relative lg:h-auto slide__wrapper !block",
            style: {
                display: 'block'
            }
        }, /*#__PURE__*/ React.createElement("div", {
            className: "relative w-full h-full"
        }, /*#__PURE__*/ React.createElement(Image, {
            src: slide.image,
            alt: slide.headline || 'Slideshow image',
            width: slide.width || 1920,
            height: slide.height || 0,
            style: {
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                objectPosition: 'center'
            },
            sizes: "100vw",
            priority: true
        }), /*#__PURE__*/ React.createElement("div", {
            className: "absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8"
        }, (slide.headline || slide.subText || slide.buttonText && slide.buttonLink) && /*#__PURE__*/ React.createElement("div", {
            className: "p-4 md:p-8 rounded-lg max-w-3xl"
        }, slide.headline && /*#__PURE__*/ React.createElement("h2", {
            className: "text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg"
        }, slide.headline), slide.subText && /*#__PURE__*/ React.createElement("p", {
            className: "text-white text-sm md:text-base lg:text-lg mb-4 md:mb-8 max-w-2xl mx-auto drop-shadow-md"
        }, slide.subText), slide.buttonText && slide.buttonLink && /*#__PURE__*/ React.createElement("a", {
            href: slide.buttonLink,
            className: "inline-block px-6 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 hover:scale-105",
            style: {
                backgroundColor: slide.buttonColor || '#3B82F6'
            }
        }, slide.buttonText))))))));
}
export const query = `
  query Query($slides: [SlideInput], $autoplay: Boolean, $autoplaySpeed: Int, $arrows: Boolean, $dots: Boolean) {
    slideshowWidget(
      slides: $slides,
      autoplay: $autoplay,
      autoplaySpeed: $autoplaySpeed,
      arrows: $arrows,
      dots: $dots
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
  dots: getWidgetSetting("dots")
}`;
