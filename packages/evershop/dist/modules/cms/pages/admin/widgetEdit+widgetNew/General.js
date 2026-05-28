import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { Card, CardContent } from '@components/common/ui/Card.js';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
const components = {
    DropdownIndicator: null
};
const createOption = (label)=>({
        label,
        value: label
    });
const AreaInput = ({ values, control })=>{
    const [inputValue, setInputValue] = React.useState('');
    const handleKeyDown = (event, onChange, value)=>{
        if (!inputValue) return;
        switch(event.key){
            case 'Enter':
            case 'Tab':
                const newOption = createOption(inputValue);
                onChange([
                    ...value,
                    newOption
                ]);
                setInputValue('');
                event.preventDefault();
                break;
            default:
                break;
        }
    };
    return /*#__PURE__*/ React.createElement(Controller, {
        name: "area",
        control: control,
        defaultValue: values.map((v)=>v.value),
        render: ({ field })=>/*#__PURE__*/ React.createElement(CreatableSelect, {
                components: components,
                inputValue: inputValue,
                isClearable: true,
                isMulti: true,
                menuIsOpen: false,
                onChange: (newValue)=>{
                    const stringArray = newValue ? newValue.map((option)=>option.value) : [];
                    field.onChange(stringArray);
                },
                onInputChange: (newValue)=>setInputValue(newValue),
                onKeyDown: (event)=>handleKeyDown(event, (newOptions)=>{
                        const stringArray = newOptions.map((option)=>option.value);
                        field.onChange(stringArray);
                    }, field.value ? field.value.map((val)=>typeof val === 'string' ? createOption(val) : val) : []),
                placeholder: "Type area and press enter...",
                value: field.value ? field.value.map((val)=>typeof val === 'string' ? createOption(val) : val) : []
            })
    });
};
export default function General({ widget, routes }) {
    const { register, control } = useFormContext();
    const allRoutes = [
        {
            value: 'all',
            label: 'All',
            isAdmin: false,
            isApi: false,
            method: [
                'GET'
            ]
        },
        ...routes
    ];
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        defaultValue: widget?.name,
        label: "Name",
        required: true,
        validation: {
            required: 'Name is required'
        },
        placeholder: "Name"
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "status",
        label: "Status",
        defaultValue: widget?.status,
        required: true,
        validation: {
            required: 'Status is required'
        },
        options: [
            {
                value: 0,
                label: 'Disabled'
            },
            {
                value: 1,
                label: 'Enabled'
            }
        ]
    })), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        role: "group",
        "data-slot": "field",
        "data-orientation": "vertical",
        className: "data-[invalid=true]:text-destructive gap-3 group/field flex w-full flex-col [&>*]:w-full [&>.sr-only]:w-auto"
    }, /*#__PURE__*/ React.createElement("label", {
        "data-slot": "field-label",
        className: "text-sm font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-1 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-3 group/field-label peer/field-label flex w-fit leading-snug has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
    }, "Areas"), /*#__PURE__*/ React.createElement(AreaInput, {
        control: control,
        values: widget?.area?.length ? widget.area.map((a)=>({
                value: a,
                label: a
            })) : []
    }))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement("div", {
        role: "group",
        "data-slot": "field",
        "data-orientation": "vertical",
        className: "data-[invalid=true]:text-destructive gap-3 group/field flex w-full flex-col [&>*]:w-full [&>.sr-only]:w-auto"
    }, /*#__PURE__*/ React.createElement("label", {
        "data-slot": "field-label",
        className: "text-sm font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-1 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-3 group/field-label peer/field-label flex w-fit leading-snug has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
    }, "Pages"), /*#__PURE__*/ React.createElement(Controller, {
        name: "route",
        control: control,
        defaultValue: widget?.route ? widget.route // Keep as string array
         : [],
        render: ({ field })=>/*#__PURE__*/ React.createElement(Select, {
                options: allRoutes.filter((r)=>r.isApi === false && r.isAdmin === false && r.method.includes('GET') && r.method.length === 1),
                hideSelectedOptions: true,
                isMulti: true,
                "aria-label": "Select pages",
                onChange: (selectedOptions)=>{
                    const stringArray = selectedOptions ? selectedOptions.map((option)=>option.value) : [];
                    field.onChange(stringArray);
                },
                value: allRoutes.filter((r)=>field.value?.includes(r.value)),
                className: "page-select relative z-50"
            })
    }))), /*#__PURE__*/ React.createElement(CardContent, {
        className: "pt-3 border-t border-border"
    }, /*#__PURE__*/ React.createElement(NumberField, {
        name: "sort_order",
        label: "Sort Order",
        defaultValue: widget?.sortOrder,
        placeholder: "Sort Order",
        validation: {
            required: 'Sort order is required',
            min: {
                value: 0,
                message: 'Sort order must be a positive number'
            }
        },
        required: true,
        helperText: "The order in which this widget will be displayed. Lower numbers appear first."
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    widget(id: getContextValue("widgetId", null)) {
      name
      status
      sortOrder
      area
      route
    }
    routes {
      value: id
      label: name
      isApi
      isAdmin
      method
    }
  }
`;
