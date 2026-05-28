import Area from '@components/common/Area.js';
import { useSearch } from '@components/frontStore/catalog/SearchContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function SearchInfo() {
    const { keyword } = useSearch();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "searchInfoBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "page-width"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2 md:mb-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-left "
    }, /*#__PURE__*/ React.createElement("h1", {
        className: "search-name mt-6"
    }, _('Search results for "${keyword}"', {
        keyword
    }))))), /*#__PURE__*/ React.createElement(Area, {
        id: "searchInfoAfter",
        noOuter: true
    }));
}
