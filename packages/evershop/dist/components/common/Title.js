/* eslint-disable no-console */ import React from 'react';
/**
 * Validates title content for SEO and accessibility best practices
 */ const validateTitle = (title, maxLength)=>{
    if (process.env.NODE_ENV === 'development') {
        // Check for empty title
        if (!title || title.trim().length === 0) {
            console.warn('Title: Empty title detected. This is bad for SEO and accessibility.');
            return;
        }
        // Check for very short titles
        if (title.length < 3) {
            console.warn('Title: Very short title detected. Consider making it more descriptive.');
        }
        // Check for very long titles
        const recommendedMaxLength = maxLength || 60;
        if (title.length > recommendedMaxLength) {
            console.warn(`Title: Title exceeds recommended length of ${recommendedMaxLength} characters (${title.length}). May be truncated in search results.`);
        }
        // Check for keyword stuffing patterns
        const words = title.toLowerCase().split(/\s+/);
        const wordCount = words.reduce((acc, word)=>{
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});
        const repeatedWords = Object.entries(wordCount).filter(([word, count])=>count > 2 && word.length > 3);
        if (repeatedWords.length > 0) {
            console.warn('Title: Potential keyword stuffing detected. Repeated words:', repeatedWords.map(([word])=>word).join(', '));
        }
        // Check for common bad patterns
        if (title.includes('||') || title.includes('>>') || title.includes('<<')) {
            console.warn('Title: Unusual separators detected. Consider using standard separators like " - " or " | ".');
        }
        // Check if title starts/ends with separator characters
        if (/^[-|•·]|\s[-|•·]\s*$/.test(title)) {
            console.warn('Title: Title appears to start or end with separator characters.');
        }
    }
};
/**
 * Formats the complete title string with optional prefix/suffix
 */ const formatTitle = (title, prefix, suffix, separator = ' - ', maxLength)=>{
    const parts = [];
    if (prefix) parts.push(prefix);
    parts.push(title);
    if (suffix) parts.push(suffix);
    let formattedTitle = parts.join(separator);
    // Truncate if needed
    if (maxLength && formattedTitle.length > maxLength) {
        // Try to truncate at word boundaries
        const truncated = formattedTitle.substring(0, maxLength - 3);
        const lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > formattedTitle.length * 0.7) {
            formattedTitle = truncated.substring(0, lastSpace) + '...';
        } else {
            formattedTitle = truncated + '...';
        }
    }
    return formattedTitle;
};
/**
 * Title component that renders an HTML <title> element with SEO and accessibility best practices.
 *
 * The title element is crucial for:
 * - SEO: Search engines use it as the clickable headline in search results
 * - Accessibility: Screen readers announce the page title when users navigate to the page
 * - User Experience: Displayed in browser tabs and bookmarks
 *
 * SEO Best Practices:
 * - Keep titles between 30-60 characters (55-60 optimal for Google)
 * - Make each page title unique within your site
 * - Put important keywords first
 * - Avoid keyword stuffing
 * - Use descriptive, readable titles that entice clicks
 *
 * @example
 * // Basic usage
 * <Title title="About Us" />
 *
 * @example
 * // With site branding
 * <Title
 *   title="Product Details"
 *   suffix="EverShop"
 *   separator=" | "
 * />
 *
 * @example
 * // E-commerce product page
 * <Title
 *   title="iPhone 14 Pro Max - 256GB Space Black"
 *   suffix="TechStore"
 *   maxLength={60}
 * />
 *
 * @example
 * // Blog post
 * <Title
 *   title="10 Tips for Better React Performance"
 *   suffix="Developer Blog"
 * />
 *
 * @example
 * // Error page
 * <Title
 *   title="Page Not Found (404)"
 *   suffix="EverShop"
 * />
 */ export function Title({ title, prefix, suffix, separator = ' - ', maxLength, ...otherProps }) {
    // Format the complete title
    const formattedTitle = formatTitle(title, prefix, suffix, separator, maxLength);
    // Validate in development
    validateTitle(formattedTitle, maxLength);
    return /*#__PURE__*/ React.createElement("title", otherProps, formattedTitle);
}
/**
 * Convenience component for product page titles
 */ export function ProductTitle({ productName, category, brand, siteName, separator = ' - ', maxLength = 60, ...props }) {
    const titleParts = [
        productName
    ];
    if (category) titleParts.push(category);
    if (brand) titleParts.push(brand);
    const title = titleParts.join(' ');
    return /*#__PURE__*/ React.createElement(Title, {
        title: title,
        suffix: siteName,
        separator: separator,
        maxLength: maxLength,
        ...props
    });
}
/**
 * Convenience component for category/collection page titles
 */ export function CategoryTitle({ categoryName, itemCount, siteName, separator = ' - ', maxLength = 60, ...props }) {
    let title = categoryName;
    if (itemCount !== undefined) {
        title += ` (${itemCount} items)`;
    }
    return /*#__PURE__*/ React.createElement(Title, {
        title: title,
        suffix: siteName,
        separator: separator,
        maxLength: maxLength,
        ...props
    });
}
/**
 * Convenience component for error page titles
 */ export function ErrorTitle({ errorCode, errorMessage, siteName, separator = ' - ', ...props }) {
    const title = errorMessage ? `${errorMessage} (${errorCode})` : `Error ${errorCode}`;
    return /*#__PURE__*/ React.createElement(Title, {
        title: title,
        suffix: siteName,
        separator: separator,
        ...props
    });
}
/**
 * Convenience component for search result page titles
 */ export function SearchTitle({ query, resultCount, siteName, separator = ' - ', maxLength = 60, ...props }) {
    let title = `Search: ${query}`;
    if (resultCount !== undefined) {
        title += ` (${resultCount} results)`;
    }
    return /*#__PURE__*/ React.createElement(Title, {
        title: title,
        suffix: siteName,
        separator: separator,
        maxLength: maxLength,
        ...props
    });
}
