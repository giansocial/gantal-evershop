import { useAppState } from '@components/common/context/app.js';
import { Image } from '@components/common/Image.js';
import React, { useMemo } from 'react';
export const StaticImage = ({ subPath, quality = 75, ...props })=>{
    const { config } = useAppState();
    const baseUrl = config?.pageMeta?.baseUrl || '';
    const imagePath = useMemo(()=>{
        const formattedSubPath = subPath.startsWith('/') ? subPath.substring(1) : subPath;
        return `${baseUrl}/assets/${formattedSubPath}`;
    }, [
        baseUrl,
        subPath
    ]);
    return /*#__PURE__*/ React.createElement(Image, {
        src: imagePath,
        quality: quality,
        ...props
    });
};
