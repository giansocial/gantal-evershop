import React, { createContext, useContext } from 'react';
const SearchContext = /*#__PURE__*/ createContext(undefined);
export const SearchProvider = ({ children, searchData })=>{
    return /*#__PURE__*/ React.createElement(SearchContext.Provider, {
        value: searchData
    }, children);
};
export const useSearch = ()=>{
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
