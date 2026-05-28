import { useIsMobile } from '@components/common/ui/hooks/useIsMobile.js';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@components/common/ui/NavigationMenu.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import React from 'react';
export default function BasicMenu({ basicMenuWidget: { menus, isMain, className } }) {
    const [isOpen, setIsOpen] = React.useState(!isMain);
    const isMobile = useIsMobile();
    const [currentPath, setCurrentPath] = React.useState('');
    React.useEffect(()=>{
        setCurrentPath(window.location.pathname);
    }, []);
    const isActive = (url)=>{
        if (url === '/') {
            return currentPath === '/';
        }
        return currentPath.startsWith(url);
    };
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: className
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start gap-4 items-center"
    }, /*#__PURE__*/ React.createElement("nav", {
        className: "p-2 relative md:flex md:justify-center w-full"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center w-full"
    }, isMain && isMobile && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            toggleMenu();
        },
        className: "text-black focus:outline-none"
    }, /*#__PURE__*/ React.createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M4 6h16M4 12h16m-7 6h7"
    })))), /*#__PURE__*/ React.createElement("div", {
        className: cn(isMain ? 'md:flex absolute md:relative -left-10 md:left-0 top-full md:top-auto mt-2 md:mt-0 w-screen md:w-auto p-2 md:p-0 min-w-62.5 bg-white md:bg-transparent z-30' : 'flex relative -left-10 md:left-0 w-screen md:w-auto p-2 md:p-0 min-w-62.5 bg-white md:bg-transparent', isOpen ? 'block' : 'hidden', 'md:flex')
    }, /*#__PURE__*/ React.createElement(NavigationMenu, {
        className: "w-full max-w-full"
    }, /*#__PURE__*/ React.createElement(NavigationMenuList, {
        className: "flex-col md:flex-row items-start md:items-center w-full md:w-auto"
    }, menus.map((item)=>/*#__PURE__*/ React.createElement(NavigationMenuItem, {
            key: item.uuid,
            className: "w-full md:w-auto"
        }, item.children.length > 0 && !isMobile ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(NavigationMenuTrigger, {
            className: "w-full md:w-auto justify-start md:justify-center bg-transparent hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent hover:font-semibold hover:text-primary"
        }, item.name), /*#__PURE__*/ React.createElement(NavigationMenuContent, null, /*#__PURE__*/ React.createElement("ul", {
            className: "flex flex-col min-w-50 p-2"
        }, item.children.map((subItem)=>/*#__PURE__*/ React.createElement("li", {
                key: subItem.uuid
            }, /*#__PURE__*/ React.createElement(NavigationMenuLink, {
                href: subItem.url,
                className: "w-full"
            }, subItem.name)))))) : /*#__PURE__*/ React.createElement(NavigationMenuLink, {
            href: item.url,
            className: "w-full md:w-auto px-4 py-2 hover:text-primary data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent transition-colors data-[active=true]:text-primary data-[active=true]:font-semibold hover:bg-transparent focus:bg-transparent hover:underline text-xl md:text-base",
            "data-active": isActive(item.url)
        }, item.name))))))))));
}
export const query = `
  query Query($settings: JSON) {
    basicMenuWidget(settings: $settings) {
      menus {
        id
        name
        url
        type
        uuid
        children {
          name
          url
          type
          uuid
        }
      }
      isMain
      className
    }
  }
`;
export const variables = `{
  settings: getWidgetSetting()
}`;
