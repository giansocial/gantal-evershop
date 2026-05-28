import { Area } from '@components/common/Area.js';
import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { ShoppingBag } from 'lucide-react';
import React from 'react';
export const DefaultMiniCartDropdownEmpty = ({ setIsDropdownOpen })=>/*#__PURE__*/ React.createElement("div", {
        className: "minicart__empty p-8 text-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartEmptyBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(ShoppingBag, {
        width: 48,
        height: 48,
        className: "mx-auto text-muted-foreground mb-4"
    }), /*#__PURE__*/ React.createElement("p", {
        className: "text-muted-foreground mb-4"
    }, _('Your cart is empty')), /*#__PURE__*/ React.createElement(Button, {
        variant: "default",
        onClick: ()=>setIsDropdownOpen(false),
        size: 'lg'
    }, _('Continue Shopping')), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartEmptyAfter",
        noOuter: true
    }));
