import Spinner from '@components/admin/Spinner.jsx';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogTrigger } from '@components/common/ui/Dialog.js';
import React from 'react';
import { useQuery } from 'urql';
import { Zone } from './Zone.js';
import { ZoneForm } from './ZoneForm.js';
const ZonesQuery = `
  query Zones {
    shippingZones {
      uuid
      name
      country {
        name
        code
      }
      provinces {
        name
        code
      }
      methods {
        methodId
        uuid
        name
        cost {
          text
          value
        }
        priceBasedCost {
          minPrice {
            value
            text
          }
          cost {
            value
            text
          }
        }
        weightBasedCost {
          minWeight {
            value
            text
          }
          cost {
            value
            text
          }
        }
        isEnabled
        conditionType
        calculateApi
        max
        min
        updateApi
        deleteApi
      }
      updateApi
      deleteApi
      addMethodApi
    }
  }
`;
export function Zones({ createShippingZoneApi }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: ZonesQuery,
        requestPolicy: 'network-only'
    });
    if (fetching) return /*#__PURE__*/ React.createElement(Spinner, {
        width: '2rem',
        height: '2rem'
    });
    if (error) return /*#__PURE__*/ React.createElement("div", {
        className: "text-destructive"
    }, "Error loading zones");
    if (!data || !data.shippingZones) return /*#__PURE__*/ React.createElement("div", null, "No zones found");
    const reload = ()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, data.shippingZones.map((zone)=>/*#__PURE__*/ React.createElement(Zone, {
            zone: zone,
            reload: reload,
            key: zone.uuid
        })), /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end pr-5"
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, null, "Create New Zone"))), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(ZoneForm, {
        formMethod: "POST",
        saveZoneApi: createShippingZoneApi,
        onSuccess: ()=>{
            setDialogOpen(false);
        },
        reload: reload
    }))));
}
