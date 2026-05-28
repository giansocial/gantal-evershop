import { CardContent } from '@components/common/ui/Card.js';
import React from 'react';
import { Rates } from './Rates.js';
function TaxClass({ taxClass, getTaxClasses }) {
    return /*#__PURE__*/ React.createElement(CardContent, {
        className: "py-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-xs uppercase font-semibold py-2"
    }, taxClass.name), /*#__PURE__*/ React.createElement("div", {
        className: "divide-y border rounded border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center border-divider mt-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grow px-2"
    }, /*#__PURE__*/ React.createElement(Rates, {
        rates: taxClass.rates,
        addRateApi: taxClass.addRateApi,
        getTaxClasses: getTaxClasses
    })))));
}
export { TaxClass };
