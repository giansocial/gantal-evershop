import { useAppDispatch } from '@components/common/context/app.js';
import { Pagination as PaginationUI, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@components/common/ui/Pagination.js';
import React, { useState, useEffect, useCallback } from 'react';
export const PaginationContext = /*#__PURE__*/ React.createContext(null);
export const usePagination = ()=>{
    const context = React.useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};
export const usePaginationLogic = (total, limit, initialPage, onPageChange, scrollToTop = true, scrollBehavior = 'smooth')=>{
    const AppContextDispatch = useAppDispatch();
    const [page, setPage] = useState(initialPage);
    const [isLoading, setIsLoading] = useState(false);
    const totalPages = Math.ceil(total / limit);
    useEffect(()=>{
        setPage(initialPage);
    }, [
        initialPage
    ]);
    const navigateToPage = useCallback(async (pageNum)=>{
        if (isLoading) return;
        let validPage;
        if (pageNum < 1) validPage = 1;
        else if (pageNum > totalPages) validPage = totalPages;
        else validPage = pageNum;
        if (validPage === page) return;
        setIsLoading(true);
        try {
            const url = new URL(window.location.href, window.location.origin);
            url.searchParams.set('page', validPage.toString());
            url.searchParams.append('ajax', 'true');
            setPage(validPage);
            await AppContextDispatch.fetchPageData(url);
            url.searchParams.delete('ajax');
            history.pushState(null, '', url);
            if (scrollToTop) {
                window.scrollTo({
                    top: 0,
                    behavior: scrollBehavior
                });
            }
            onPageChange?.(validPage);
        } catch (error) {
            setPage(page);
        } finally{
            setIsLoading(false);
        }
    }, [
        AppContextDispatch,
        page,
        totalPages,
        isLoading,
        onPageChange,
        scrollToTop,
        scrollBehavior
    ]);
    const goToPage = useCallback((pageNum)=>navigateToPage(pageNum), [
        navigateToPage
    ]);
    const goToNext = useCallback(()=>navigateToPage(page + 1), [
        navigateToPage,
        page
    ]);
    const goToPrev = useCallback(()=>navigateToPage(page - 1), [
        navigateToPage,
        page
    ]);
    const goToFirst = useCallback(()=>navigateToPage(1), [
        navigateToPage
    ]);
    const goToLast = useCallback(()=>navigateToPage(totalPages), [
        navigateToPage,
        totalPages
    ]);
    const getPageNumbers = useCallback((range = 5)=>{
        const pages = [];
        const half = Math.floor(range / 2);
        let start = Math.max(1, page - half);
        const end = Math.min(totalPages, start + range - 1);
        // Adjust start if we're near the end
        if (end - start + 1 < range) {
            start = Math.max(1, end - range + 1);
        }
        for(let i = start; i <= end; i++){
            pages.push(i);
        }
        return pages;
    }, [
        page,
        totalPages
    ]);
    const isCurrentPage = useCallback((pageNum)=>pageNum === page, [
        page
    ]);
    const isValidPage = useCallback((pageNum)=>pageNum >= 1 && pageNum <= totalPages, [
        totalPages
    ]);
    const getDisplayText = useCallback(()=>{
        const start = (page - 1) * limit + 1;
        const end = Math.min(page * limit, total);
        return `Showing ${start}-${end} of ${total} results`;
    }, [
        page,
        limit,
        total
    ]);
    const getPageInfo = useCallback(()=>{
        const start = (page - 1) * limit + 1;
        const end = Math.min(page * limit, total);
        return {
            showing: `${start}-${end}`,
            total: total.toString()
        };
    }, [
        page,
        limit,
        total
    ]);
    return {
        currentPage: page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        startItem: (page - 1) * limit + 1,
        endItem: Math.min(page * limit, total),
        goToPage,
        goToNext,
        goToPrev,
        goToFirst,
        goToLast,
        getPageNumbers,
        isCurrentPage,
        isValidPage,
        isLoading,
        getDisplayText,
        getPageInfo
    };
};
// Main Pagination component with render prop pattern
export function Pagination({ total, limit, currentPage, children, onPageChange, scrollToTop = true, scrollBehavior = 'smooth' }) {
    const paginationLogic = usePaginationLogic(total, limit, currentPage, onPageChange, scrollToTop, scrollBehavior);
    // Prepare render props
    const renderProps = {
        // Pagination data
        currentPage: paginationLogic.currentPage,
        totalPages: paginationLogic.totalPages,
        total,
        limit,
        hasNext: paginationLogic.hasNext,
        hasPrev: paginationLogic.hasPrev,
        startItem: paginationLogic.startItem,
        endItem: paginationLogic.endItem,
        // Navigation functions
        goToPage: paginationLogic.goToPage,
        goToNext: paginationLogic.goToNext,
        goToPrev: paginationLogic.goToPrev,
        goToFirst: paginationLogic.goToFirst,
        goToLast: paginationLogic.goToLast,
        // Utility functions
        getPageNumbers: paginationLogic.getPageNumbers,
        isCurrentPage: paginationLogic.isCurrentPage,
        isValidPage: paginationLogic.isValidPage,
        // State
        isLoading: paginationLogic.isLoading,
        // Display helpers
        getDisplayText: paginationLogic.getDisplayText,
        getPageInfo: paginationLogic.getPageInfo
    };
    const contextValue = React.useMemo(()=>({
            goToPage: paginationLogic.goToPage
        }), [
        paginationLogic.goToPage
    ]);
    return /*#__PURE__*/ React.createElement(PaginationContext.Provider, {
        value: contextValue
    }, children(renderProps));
}
// Default pagination renderer component (maintains original design)
export const DefaultPaginationRenderer = ({ renderProps, className = '', showInfo = false })=>{
    const { currentPage, totalPages, hasNext, hasPrev, goToNext, goToPrev, goToPage, getPageNumbers, isCurrentPage, isLoading, getDisplayText } = renderProps;
    const pageNumbers = getPageNumbers(7);
    const showStartEllipsis = pageNumbers[0] > 1;
    const showEndEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;
    return /*#__PURE__*/ React.createElement("div", {
        className: `products-pagination ${className}`
    }, showInfo && /*#__PURE__*/ React.createElement("div", {
        className: "pagination-info text-center text-muted-foreground mb-4"
    }, getDisplayText()), /*#__PURE__*/ React.createElement(PaginationUI, null, /*#__PURE__*/ React.createElement(PaginationContent, null, hasPrev && /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationPrevious, {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            if (!isLoading) goToPrev();
        },
        "aria-disabled": isLoading,
        className: isLoading ? 'pointer-events-none opacity-50' : ''
    })), showStartEllipsis && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationLink, {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            if (!isLoading) goToPage(1);
        },
        "aria-disabled": isLoading,
        className: isLoading ? 'pointer-events-none opacity-50' : ''
    }, "1")), /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationEllipsis, null))), pageNumbers.map((p)=>/*#__PURE__*/ React.createElement(PaginationItem, {
            key: p
        }, /*#__PURE__*/ React.createElement(PaginationLink, {
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                if (!isLoading && !isCurrentPage(p)) goToPage(p);
            },
            isActive: isCurrentPage(p),
            "aria-disabled": isLoading || isCurrentPage(p),
            className: isLoading || isCurrentPage(p) ? 'pointer-events-none opacity-50' : ''
        }, p))), showEndEllipsis && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationEllipsis, null)), /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationLink, {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            if (!isLoading) goToPage(totalPages);
        },
        "aria-disabled": isLoading,
        className: isLoading ? 'pointer-events-none opacity-50' : ''
    }, totalPages))), hasNext && /*#__PURE__*/ React.createElement(PaginationItem, null, /*#__PURE__*/ React.createElement(PaginationNext, {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            if (!isLoading) goToNext();
        },
        "aria-disabled": isLoading,
        className: isLoading ? 'pointer-events-none opacity-50' : ''
    })))), isLoading && /*#__PURE__*/ React.createElement("div", {
        className: "pagination-loading text-center mt-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
    })));
};
// Compact pagination renderer
export const CompactPaginationRenderer = ({ renderProps, className = '' })=>{
    const { currentPage, totalPages, hasNext, hasPrev, goToNext, goToPrev, getPageInfo, isLoading } = renderProps;
    const { showing, total } = getPageInfo();
    return /*#__PURE__*/ React.createElement("div", {
        className: `compact-pagination flex items-center justify-between ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "pagination-info text-sm text-gray-600"
    }, "Showing ", showing, " of ", total), /*#__PURE__*/ React.createElement("div", {
        className: "pagination-controls flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: goToPrev,
        disabled: !hasPrev || isLoading,
        className: "px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    }, "Previous"), /*#__PURE__*/ React.createElement("span", {
        className: "text-sm text-gray-600"
    }, "Page ", currentPage, " of ", totalPages), /*#__PURE__*/ React.createElement("button", {
        onClick: goToNext,
        disabled: !hasNext || isLoading,
        className: "px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    }, "Next")));
};
export const InputPaginationRenderer = ({ renderProps, className = '' })=>{
    const { currentPage, totalPages, hasNext, hasPrev, goToNext, goToPrev, goToPage, goToFirst, goToLast, getDisplayText, isLoading } = renderProps;
    const [inputPage, setInputPage] = React.useState(currentPage.toString());
    React.useEffect(()=>{
        setInputPage(currentPage.toString());
    }, [
        currentPage
    ]);
    const handleInputSubmit = (e)=>{
        e.preventDefault();
        const page = parseInt(inputPage);
        if (!isNaN(page)) {
            goToPage(page);
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: `input-pagination ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-center text-sm text-gray-600 mb-4"
    }, getDisplayText()), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-center space-x-4"
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: goToFirst,
        disabled: !hasPrev || isLoading,
        className: "px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
    }, "First"), /*#__PURE__*/ React.createElement("button", {
        onClick: goToPrev,
        disabled: !hasPrev || isLoading,
        className: "px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
    }, "←"), /*#__PURE__*/ React.createElement("form", {
        onSubmit: handleInputSubmit,
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "text-sm"
    }, "Page"), /*#__PURE__*/ React.createElement("input", {
        type: "number",
        min: "1",
        max: totalPages,
        value: inputPage,
        onChange: (e)=>setInputPage(e.target.value),
        className: "w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center",
        disabled: isLoading
    }), /*#__PURE__*/ React.createElement("span", {
        className: "text-sm"
    }, "of ", totalPages), /*#__PURE__*/ React.createElement("button", {
        type: "submit",
        className: "px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50",
        disabled: isLoading
    }, "Go")), /*#__PURE__*/ React.createElement("button", {
        onClick: goToNext,
        disabled: !hasNext || isLoading,
        className: "px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
    }, "→"), /*#__PURE__*/ React.createElement("button", {
        onClick: goToLast,
        disabled: !hasNext || isLoading,
        className: "px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
    }, "Last")));
};
