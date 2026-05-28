import React, { createContext, useContext } from 'react';
const CategoryContext = /*#__PURE__*/ createContext(undefined);
export const CategoryProvider = ({ children, category })=>{
    return /*#__PURE__*/ React.createElement(CategoryContext.Provider, {
        value: category
    }, children);
};
export const useCategory = ()=>{
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};
