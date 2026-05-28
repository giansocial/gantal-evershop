import { SettingMenu } from '@components/admin/SettingMenu.js';
import Spinner from '@components/admin/Spinner.js';
import { Form } from '@components/common/form/Form.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { Button } from '@components/common/ui/Button.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
import { useQuery } from 'urql';
import { TaxClasses } from './components/TaxClasses.js';
import { TaxClassForm } from './components/TaxClassForm.js';
const CountriesQuery = `
  query Country($countries: [String]) {
    countries (countries: $countries) {
      value: code
      label: name
      provinces {
        value: code
        label: name
      }
    }
  }
`;
const TaxClassesQuery = `
  query TaxClasses {
    taxClasses {
      items {
        taxClassId
        uuid
        name
        rates {
          taxRateId
          uuid
          name
          rate
          isCompound
          country
          province
          postcode
          priority
          updateApi
          deleteApi
        }
        addRateApi
      }
    }
  }
`;
export default function TaxSetting({ createTaxClassApi, saveSettingApi, setting }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [countriesQueryData] = useQuery({
        query: CountriesQuery
    });
    const [taxClassesQueryData, reexecuteQuery] = useQuery({
        query: TaxClassesQuery
    });
    if (countriesQueryData.fetching || taxClassesQueryData.fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "main-content-inner"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-6 gap-x-5 grid-flow-row "
        }, /*#__PURE__*/ React.createElement("div", {
            className: "col-span-2"
        }, /*#__PURE__*/ React.createElement(SettingMenu, null)), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-4"
        }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(Spinner, {
            width: 30,
            height: 30
        }))))));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "main-content-inner"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-6 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(SettingMenu, null)), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-4 grid grid-cols-1 gap-5"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Tax calculation configuration"), /*#__PURE__*/ React.createElement(CardDescription, null, "Configure the tax classes that will be available to your customers at checkout.")), /*#__PURE__*/ React.createElement(CardContent, {
        title: "Basic configuration"
    }, /*#__PURE__*/ React.createElement(Form, {
        id: "taxBasicConfig",
        method: "POST",
        action: saveSettingApi,
        successMessage: "Tax setting has been saved successfully!"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SelectField, {
        name: "defaultShippingTaxClassId",
        label: "Shipping tax class",
        defaultValue: setting.defaultShippingTaxClassId,
        placeholder: "None",
        options: [
            {
                value: -1,
                label: 'Proportional allocation based on cart items'
            },
            {
                value: 0,
                label: 'Higest tax rate based on cart items'
            }
        ].concat(taxClassesQueryData.data.taxClasses.items.map((taxClass)=>({
                value: taxClass.taxClassId,
                label: taxClass.name
            })) || []),
        helperText: "This is the tax class applied to shipping costs."
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SelectField, {
        name: "baseCalculationAddress",
        label: "Base calculation address",
        defaultValue: setting.baseCalculationAddress || '',
        options: [
            {
                value: 'shippingAddress',
                label: 'Shipping address'
            },
            {
                value: 'billingAddress',
                label: 'Billing address'
            },
            {
                value: 'storeAddress',
                label: 'Store address'
            }
        ],
        helperText: "This is the address used to calculate tax rates."
    })))))), /*#__PURE__*/ React.createElement(Card, {
        title: "Tax classes"
    }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Tax classes"), /*#__PURE__*/ React.createElement(CardDescription, null, "Manage tax classes and tax rates for different regions.")), /*#__PURE__*/ React.createElement(TaxClasses, {
        classes: taxClassesQueryData.data.taxClasses.items,
        getTaxClasses: reexecuteQuery
    }), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        title: "Create new tax class",
        variant: "outline",
        onClick: ()=>setDialogOpen(true)
    }, "Create new tax class")), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Create New Tax Class")), /*#__PURE__*/ React.createElement(TaxClassForm, {
        saveTaxClassApi: createTaxClassApi,
        closeModal: ()=>setDialogOpen(false),
        getTaxClasses: reexecuteQuery
    })))))))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    createTaxClassApi: url(routeId: "createTaxClass")
    saveSettingApi: url(routeId: "saveSetting")
    setting {
      defaultProductTaxClassId
      defaultShippingTaxClassId
      baseCalculationAddress
    }
  }
`;
