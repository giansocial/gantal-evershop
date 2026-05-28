import React from 'react';
import './NavigationItem.scss';
export function NavigationItem({ Icon, url, title }) {
    const [isActive, setIsActive] = React.useState(false);
    React.useEffect(()=>{
        const checkActive = ()=>{
            const currentUrl = window.location.href;
            const currentUrlObj = new URL(currentUrl);
            const menuUrlObj = new URL(url);
            const currentPath = currentUrlObj.pathname;
            const menuPath = menuUrlObj.pathname;
            if (currentPath === menuPath) {
                setIsActive(true);
                return;
            }
            const menuSegments = menuPath.split('/').filter(Boolean);
            if (menuSegments.length >= 2 && currentPath.startsWith(menuPath + '/')) {
                const remainingPath = currentPath.substring(menuPath.length + 1);
                const nextSegment = remainingPath.split('/')[0];
                const actionWords = [
                    'new',
                    'create',
                    'add'
                ];
                if (!actionWords.includes(nextSegment.toLowerCase())) {
                    setIsActive(true);
                    return;
                }
            }
            setIsActive(false);
        };
        checkActive();
    }, [
        url
    ]);
    return /*#__PURE__*/ React.createElement("li", {
        className: isActive ? 'active nav-item' : 'nav-item'
    }, /*#__PURE__*/ React.createElement("a", {
        href: url,
        className: "flex justify-left"
    }, /*#__PURE__*/ React.createElement("i", {
        className: "menu-icon"
    }, /*#__PURE__*/ React.createElement(Icon, null)), title));
}
