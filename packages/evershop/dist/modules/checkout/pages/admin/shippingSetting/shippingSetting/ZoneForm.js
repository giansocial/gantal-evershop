import Spinner from '@components/admin/Spinner.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { ReactSelectField } from '@components/common/form/ReactSelectField.js';
import { Button } from '@components/common/ui/Button.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'urql';
const CountriesQuery = `
  query Country {
    countries {
      value: code
      label: name
      provinces {
        value: code
        label: name
      }
    }
  }
`;
function ZoneForm({ formMethod, saveZoneApi, onSuccess, reload, zone }) {
    const form = useForm();
    const countryWatch = form.watch('country', zone?.country?.code);
    const [{ data, fetching, error }] = useQuery({
        query: CountriesQuery
    });
    // Reset provinces when country changes
    React.useEffect(()=>{
        if (countryWatch !== zone?.country?.code) {
            form.setValue('provinces', []);
        }
    }, [
        countryWatch,
        zone?.country?.code,
        form
    ]);
    if (fetching) return /*#__PURE__*/ React.createElement(Spinner, {
        width: 20,
        height: 20
    });
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, "Error loading countries");
    }
    return /*#__PURE__*/ React.createElement(Form, {
        id: "createShippingZone",
        method: formMethod || 'POST',
        action: saveZoneApi,
        submitBtn: false,
        onSuccess: async ()=>{
            await reload();
            onSuccess();
        },
        form: form
    }, /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        label: "Zone Name",
        "aria-label": "Zone Name",
        placeholder: "Enter zone name",
        required: true,
        validation: {
            required: 'Zone name is required'
        },
        defaultValue: zone?.name
    }), /*#__PURE__*/ React.createElement(ReactSelectField, {
        name: "country",
        label: "Country",
        "aria-label": "Country",
        placeholder: "Select country",
        required: true,
        validation: {
            required: 'Country is required'
        },
        options: data.countries,
        hideSelectedOptions: false,
        isMulti: false,
        defaultValue: zone?.country?.code
    }), /*#__PURE__*/ React.createElement(ReactSelectField, {
        name: "provinces",
        label: "Provinces/States",
        "aria-label": "Provinces/States",
        placeholder: "Select provinces/states",
        options: data.countries.find((c)=>c.value === countryWatch)?.provinces || [],
        hideSelectedOptions: true,
        isMulti: true,
        defaultValue: (zone?.provinces || []).map((province)=>province.code)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "default",
        onClick: ()=>{
            const form = document.getElementById('createShippingZone');
            if (form) {
                form.dispatchEvent(new Event('submit', {
                    cancelable: true,
                    bubbles: true
                }));
            }
        }
    }, "Save"))));
}
export { ZoneForm };
