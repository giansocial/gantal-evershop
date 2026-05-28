import { SettingMenu } from '@components/admin/SettingMenu.js';
import Spinner from '@components/admin/Spinner.js';
import Area from '@components/common/Area.js';
import { EmailField } from '@components/common/form/EmailField.js';
import { Form, useFormContext } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { TelField } from '@components/common/form/TelField.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Item } from '@components/common/ui/Item.js';
import { Skeleton } from '@components/common/ui/Skeleton.js';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
const ProvincesQuery = `
  query Province($countries: [String]) {
    provinces (countries: $countries) {
      code
      name
      countryCode
    }
  }
`;
const CountriesQuery = `
  query Country($countries: [String]) {
    countries (countries: $countries) {
      code
      name
    }
  }
`;
const Province = ({ selectedCountry = 'US', selectedProvince, allowedCountries = [], fieldName = 'storeProvince' })=>{
    const { setValue } = useFormContext();
    const [result] = useQuery({
        query: ProvincesQuery,
        variables: {
            countries: allowedCountries
        }
    });
    const { data, fetching, error } = result;
    useEffect(()=>{
        if (fetching || !data) return;
        const provinces = data.provinces.filter((p)=>p.countryCode === selectedCountry);
        if (provinces.every((p)=>p.code !== selectedProvince)) {
            setValue(fieldName, '');
        }
    }, [
        selectedCountry,
        fetching
    ]);
    if (fetching) return /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col gap-3"
    }, /*#__PURE__*/ React.createElement(Skeleton, {
        className: "w-1/2 h-5 rounded-md"
    }), /*#__PURE__*/ React.createElement(Skeleton, {
        className: "w-full h-9 rounded-md"
    }));
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, error.message);
    }
    const provinces = data.provinces.filter((p)=>p.countryCode === selectedCountry);
    if (!provinces.length) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SelectField, {
        id: "storeProvince",
        defaultValue: selectedProvince,
        name: fieldName,
        label: "Province",
        placeholder: "Province",
        required: true,
        options: provinces.map((p)=>({
                value: p.code,
                label: p.name
            }))
    }));
};
const Country = ({ selectedCountry, setSelectedCountry, allowedCountries = [], fieldName = 'storeCountry' })=>{
    const onChange = (value)=>{
        setSelectedCountry(value);
    };
    const [result] = useQuery({
        query: CountriesQuery,
        variables: {
            countries: allowedCountries
        }
    });
    const { data, fetching, error } = result;
    if (fetching) return /*#__PURE__*/ React.createElement(Item, {
        variant: 'outline'
    }, /*#__PURE__*/ React.createElement(Spinner, {
        width: '2rem',
        height: '2rem'
    }));
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, error.message);
    }
    return /*#__PURE__*/ React.createElement("div", {
        style: {
            marginTop: '1rem'
        }
    }, /*#__PURE__*/ React.createElement(SelectField, {
        defaultValue: selectedCountry,
        name: fieldName,
        label: "Country",
        placeholder: "Country",
        onChange: onChange,
        required: true,
        options: data.countries.map((c)=>({
                value: c.code,
                label: c.name
            }))
    }));
};
const StorePhoneNumber = ({ storePhoneNumber })=>{
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(TelField, {
        name: "storePhoneNumber",
        label: "Store Phone Number",
        placeholder: "Store Phone Number",
        defaultValue: storePhoneNumber
    }));
};
const StoreEmail = ({ storeEmail })=>{
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(EmailField, {
        name: "storeEmail",
        label: "Store Email",
        placeholder: "Store Email",
        defaultValue: storeEmail
    }));
};
export default function StoreSetting({ saveSettingApi, setting: { storeName, storeDescription, storePhoneNumber, storeEmail, storeCountry, storeAddress, storeCity, storeProvince, storePostalCode } }) {
    const [selectedCountry, setSelectedCountry] = React.useState(()=>{
        const country = storeCountry;
        if (!country) {
            return 'US';
        } else {
            return country;
        }
    });
    return /*#__PURE__*/ React.createElement("div", {
        className: "main-content-inner"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-6 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(SettingMenu, null)), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-4"
    }, /*#__PURE__*/ React.createElement(Form, {
        method: "POST",
        id: "storeSetting",
        action: saveSettingApi
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Store Settings"), /*#__PURE__*/ React.createElement(CardDescription, null, "Configure your store information")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Area, {
        id: "storeInfoSetting",
        className: "space-y-3",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(InputField, {
                        name: "storeName",
                        label: "Store Name",
                        required: true,
                        placeholder: "Store Name",
                        defaultValue: storeName
                    })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(TextareaField, {
                        name: "storeDescription",
                        label: "Store Description",
                        placeholder: "Store Description",
                        defaultValue: storeDescription,
                        required: true
                    })
                },
                sortOrder: 20
            }
        ]
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement(CardTitle, null, "Contact Information"), /*#__PURE__*/ React.createElement(Area, {
        id: "storeContactSetting",
        coreComponents: [
            {
                component: {
                    default: StorePhoneNumber
                },
                props: {
                    storePhoneNumber
                },
                sortOrder: 10
            },
            {
                component: {
                    default: StoreEmail
                },
                props: {
                    storeEmail
                },
                sortOrder: 20
            }
        ],
        className: "grid grid-cols-2 gap-5 mt-5"
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement(CardTitle, null, "Address"), /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement(Country, {
        selectedCountry: storeCountry,
        setSelectedCountry: setSelectedCountry
    }), /*#__PURE__*/ React.createElement(InputField, {
        name: "storeAddress",
        label: "Address",
        defaultValue: storeAddress,
        placeholder: "Store Address"
    })), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5 mt-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "storeCity",
        label: "City",
        defaultValue: storeCity,
        placeholder: "City"
    })), /*#__PURE__*/ React.createElement(Province, {
        selectedProvince: storeProvince,
        selectedCountry: selectedCountry
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "storePostalCode",
        label: "Postal Code",
        defaultValue: storePostalCode,
        placeholder: "Postal Code"
    })))))))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    saveSettingApi: url(routeId: "saveSetting")
    setting {
      storeName
      storeDescription
      storeTimeZone
      storePhoneNumber
      storeEmail
      storeCountry
      storeAddress
      storeCity
      storeProvince
      storePostalCode
    }
  }
`;
