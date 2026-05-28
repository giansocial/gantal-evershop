/* eslint-disable react/prop-types */ import Area from '@components/common/Area';
import React from 'react';
export function AddressSummary({ address }) {
    return /*#__PURE__*/ React.createElement(Area, {
        id: "addressSummary",
        className: "address__summary",
        coreComponents: [
            {
                component: {
                    default: ({ fullName })=>/*#__PURE__*/ React.createElement("div", {
                            className: "full-name"
                        }, fullName)
                },
                props: {
                    fullName: address.fullName
                },
                sortOrder: 10,
                id: 'fullName'
            },
            {
                component: {
                    default: ({ address1 })=>/*#__PURE__*/ React.createElement("div", {
                            className: "address-one"
                        }, address1)
                },
                props: {
                    address1: address.address1
                },
                sortOrder: 20,
                id: 'address1'
            },
            {
                component: {
                    default: ({ city, province, postcode, country })=>/*#__PURE__*/ React.createElement("div", {
                            className: "city-province-postcode"
                        }, /*#__PURE__*/ React.createElement("div", null, `${postcode}, ${city}`), /*#__PURE__*/ React.createElement("div", null, province && /*#__PURE__*/ React.createElement("span", null, province.name, ", "), ' ', /*#__PURE__*/ React.createElement("span", null, country.name)))
                },
                props: {
                    city: address.city,
                    province: address.province,
                    postcode: address.postcode,
                    country: address.country
                },
                sortOrder: 40,
                id: 'cityProvincePostcode'
            },
            {
                component: {
                    default: ({ telephone })=>/*#__PURE__*/ React.createElement("div", {
                            className: "telephone"
                        }, telephone)
                },
                props: {
                    telephone: address.telephone
                },
                sortOrder: 60,
                id: 'telephone'
            }
        ]
    });
}
