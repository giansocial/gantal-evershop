import { CustomerAddressForm } from '@components/frontStore/customer/address/addressForm/AddressForm.js';
import { AddressFormLoadingSkeleton } from '@components/frontStore/customer/address/addressForm/AddressFormLoadingSkeleton.js';
import React from 'react';
import { useQuery } from 'urql';
const CountriesQuery = `
  query Country {
    allowedCountries  {
      value: code
      label: name
      provinces {
        label: name
        value: code
      }
    }
  }
`;
export default function Index({ address = {}, areaId = 'customerAddressForm', fieldNamePrefix = 'address' }) {
    const [result] = useQuery({
        query: CountriesQuery
    });
    const { data, fetching, error } = result;
    if (fetching) return /*#__PURE__*/ React.createElement(AddressFormLoadingSkeleton, null);
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, error.message);
    }
    return /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        address: address,
        areaId: areaId,
        allowCountries: data.allowedCountries,
        fieldNamePrefix: fieldNamePrefix
    });
}
