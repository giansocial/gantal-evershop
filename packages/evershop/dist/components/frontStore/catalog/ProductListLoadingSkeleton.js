import React from 'react';
export const ProductListLoadingSkeleton = ({ count = 4, gridColumns = 4, layout = 'grid' })=>{
    if (layout === 'list') {
        return /*#__PURE__*/ React.createElement("div", {
            className: "product-list",
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }
        }, Array.from({
            length: count
        }).map((_, i)=>/*#__PURE__*/ React.createElement("div", {
                key: i,
                className: "product-skeleton product-skeleton-list",
                style: {
                    display: 'flex',
                    gap: '20px'
                }
            }, /*#__PURE__*/ React.createElement("div", {
                className: "skeleton-image",
                style: {
                    flexShrink: 0,
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#f0f0f0'
                }
            }), /*#__PURE__*/ React.createElement("div", {
                className: "skeleton-content",
                style: {
                    flex: 1
                }
            }, /*#__PURE__*/ React.createElement("div", {
                className: "skeleton-name",
                style: {
                    height: '20px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '10px',
                    width: '60%'
                }
            }), /*#__PURE__*/ React.createElement("div", {
                className: "skeleton-sku",
                style: {
                    height: '16px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '10px',
                    width: '30%'
                }
            }), /*#__PURE__*/ React.createElement("div", {
                className: "skeleton-price",
                style: {
                    height: '20px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '10px',
                    width: '25%'
                }
            }), /*#__PURE__*/ React.createElement("div", {
                className: "skeleton-stock",
                style: {
                    height: '16px',
                    backgroundColor: '#f0f0f0',
                    width: '20%'
                }
            })))));
    }
    // Compute responsive grid columns class based on gridColumns
    const className = (()=>{
        switch(gridColumns){
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 md:grid-cols-2';
            case 3:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 4:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
            case 5:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5';
            case 6:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6';
            default:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
        }
    })();
    return /*#__PURE__*/ React.createElement("div", {
        className: `product__list grid gap-8 ${className}`
    }, Array.from({
        length: count
    }).map((_, i)=>/*#__PURE__*/ React.createElement("div", {
            key: i,
            className: "product-skeleton"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-image",
            style: {
                aspectRatio: '1/1',
                backgroundColor: '#f0f0f0',
                marginBottom: '10px'
            }
        }), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-name",
            style: {
                height: '20px',
                backgroundColor: '#f0f0f0',
                marginBottom: '10px',
                width: '80%'
            }
        }), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-price",
            style: {
                height: '20px',
                backgroundColor: '#f0f0f0',
                width: '40%'
            }
        }))));
};
