import React from 'react';
import { TaxClass } from './TaxClass.js';
export function TaxClasses({ getTaxClasses, classes }) {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, classes.map((taxClass)=>/*#__PURE__*/ React.createElement(TaxClass, {
            key: taxClass.uuid,
            taxClass: taxClass,
            getTaxClasses: getTaxClasses
        })));
}
