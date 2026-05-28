import { Toaster as Sonner } from '@evershop/sonner';
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from 'lucide-react';
import React from 'react';
export { toast } from '@evershop/sonner';
const Toaster = ({ ...props })=>{
    return /*#__PURE__*/ React.createElement(Sonner, {
        theme: "light",
        className: "toaster group",
        icons: {
            success: /*#__PURE__*/ React.createElement(CircleCheckIcon, {
                className: "size-4"
            }),
            info: /*#__PURE__*/ React.createElement(InfoIcon, {
                className: "size-4"
            }),
            warning: /*#__PURE__*/ React.createElement(TriangleAlertIcon, {
                className: "size-4"
            }),
            error: /*#__PURE__*/ React.createElement(OctagonXIcon, {
                className: "size-4"
            }),
            loading: /*#__PURE__*/ React.createElement(Loader2Icon, {
                className: "size-4 animate-spin"
            })
        },
        style: {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
            '--border-radius': 'var(--radius)'
        },
        toastOptions: {
            classNames: {
                toast: 'cn-toast'
            }
        },
        ...props
    });
};
export { Toaster };
