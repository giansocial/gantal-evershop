import React, { createContext, useContext } from 'react';
const ProductContext = /*#__PURE__*/ createContext(undefined);
export const ProductProvider = ({ children, product })=>{
    return /*#__PURE__*/ React.createElement(ProductContext.Provider, {
        value: product
    }, children);
};
export const useProduct = ()=>{
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
