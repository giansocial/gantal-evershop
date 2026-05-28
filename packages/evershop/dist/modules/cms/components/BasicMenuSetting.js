import Spinner from '@components/admin/Spinner.js';
import { CheckboxField } from '@components/common/form/CheckboxField.js';
import { InputField } from '@components/common/form/InputField.js';
import { Button } from '@components/common/ui/Button.js';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '@components/common/ui/Dialog.js';
import { Input } from '@components/common/ui/Input.js';
import { Item, ItemContent } from '@components/common/ui/Item.js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import uniqid from 'uniqid';
import { useQuery } from 'urql';
import './BasicMenuSetting.scss';
const menuQuery = `
  query Query ($filters: [FilterInput]) {
    categories (filters: $filters) {
      items {
        value: uuid,
        label: name
        path {
          name
        }
      }
    }
    cmsPages (filters: $filters) {
      items {
        value: uuid,
        label: name
      }
    }
  }
`;
const SortableMenuItem = ({ item, updateItem, deleteItem, isChild = false })=>{
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id
    });
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    const [itemInEdit, setItemInEdit] = React.useState(item);
    const addChildren = (i)=>{
        updateItem({
            ...item,
            children: [
                ...item.children,
                i
            ]
        });
    };
    const updateItemFunc = (i)=>{
        if (i.id === item.id) {
            updateItem(i);
        } else {
            addChildren(i);
        }
        setDialogOpen(false);
    };
    return /*#__PURE__*/ React.createElement("div", {
        ref: setNodeRef,
        style: style,
        className: "flex justify-between py-2 px-2 bg-white border border-border rounded mb-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start gap-3 items-center"
    }, /*#__PURE__*/ React.createElement("button", {
        type: "button",
        className: "cursor-move p-1",
        ...attributes,
        ...listeners
    }, /*#__PURE__*/ React.createElement("svg", {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "#949494",
        width: 20,
        height: 20
    }, /*#__PURE__*/ React.createElement("g", null, /*#__PURE__*/ React.createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0z"
    }), /*#__PURE__*/ React.createElement("path", {
        fillRule: "nonzero",
        d: "M14 6h2v2h5a1 1 0 0 1 1 1v7.5L16 13l.036 8.062 2.223-2.15L20.041 22H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zm8 11.338V21a1 1 0 0 1-.048.307l-1.96-3.394L22 17.338zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"
    })))), /*#__PURE__*/ React.createElement("div", null, item.name)), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-3 items-center"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline',
        onClick: ()=>{
            setItemInEdit(item);
            setDialogOpen(true);
        },
        size: 'sm'
    }, "Edit"), !isChild && /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline',
        onClick: ()=>{
            setItemInEdit({
                id: uniqid(),
                name: '',
                url: '',
                type: 'category',
                uuid: '',
                children: []
            });
            setDialogOpen(true);
        },
        size: 'sm'
    }, "Add child"), /*#__PURE__*/ React.createElement(Button, {
        variant: 'destructive',
        onClick: ()=>deleteItem(item)
    }, "Delete")), /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, `Edit Menu Item: ${itemInEdit.name}`)), /*#__PURE__*/ React.createElement(MenuSettingPopup, {
        item: itemInEdit,
        updateItem: updateItemFunc
    }))));
};
const MenuSettingPopup = ({ item, updateItem })=>{
    const [currentItem, setCurrentItem] = React.useState(item);
    const [err, setErr] = React.useState(null);
    const [result] = useQuery({
        query: menuQuery,
        variables: {
            filters: []
        }
    });
    const { data, fetching, error } = result;
    if (fetching) {
        return /*#__PURE__*/ React.createElement(Item, {
            variant: 'outline'
        }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement(Spinner, {
            width: 25,
            height: 25
        })));
    }
    if (error) {
        return /*#__PURE__*/ React.createElement(Item, {
            variant: 'outline'
        }, /*#__PURE__*/ React.createElement(ItemContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "text-destructive"
        }, error.message)));
    }
    const groupOptions = [
        {
            label: 'Categories',
            options: data.categories.items.map((i)=>({
                    ...i,
                    label: i.path.map((p)=>p.name).join(' > ')
                }))
        },
        {
            label: 'CMS Pages',
            options: data.cmsPages.items
        },
        {
            label: 'Custom',
            options: currentItem.type === 'custom' ? [
                {
                    value: currentItem.uuid,
                    label: currentItem.uuid
                }
            ] : []
        }
    ];
    const handleCreate = (inputValue)=>{
        setCurrentItem({
            ...item,
            uuid: inputValue,
            name: inputValue,
            url: inputValue,
            type: 'custom'
        });
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-flow-row gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Input, {
        id: "menuName",
        type: "text",
        value: currentItem.name,
        placeholder: "Menu name",
        onChange: (e)=>setCurrentItem({
                ...currentItem,
                name: e.target.value
            }),
        className: "w-full "
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(CreatableSelect, {
        isClearable: true,
        onChange: (newValue)=>{
            setCurrentItem({
                ...currentItem,
                uuid: newValue?.value || '',
                name: newValue?.label || '',
                type: newValue?.__typename === 'Category' ? 'category' : 'page'
            });
        },
        onCreateOption: handleCreate,
        options: groupOptions,
        value: {
            value: currentItem.uuid,
            label: currentItem.type === 'custom' ? currentItem.uuid : [
                ...groupOptions[0].options,
                ...groupOptions[1].options
            ].find((option)=>option.value === currentItem.uuid)?.label || ''
        }
    })), err && /*#__PURE__*/ React.createElement("div", {
        className: "text-destructive"
    }, err), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement(Button, {
        onClick: ()=>{
            if (currentItem.uuid === '') {
                setErr('Please select a menu item');
                return;
            }
            if (currentItem.name === '') {
                setErr('Please enter a name');
                return;
            }
            updateItem(currentItem);
        }
    }, "Save")));
};
export default function BasicMenuSetting({ basicMenuWidget: { menus, isMain, className } }) {
    const { register, setValue } = useFormContext();
    const [items, setItems] = React.useState(menus);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
    }));
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items)=>{
                const oldIndex = items.findIndex((item)=>item.id === active.id);
                const newIndex = items.findIndex((item)=>item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };
    const handleChildDragEnd = (event, parentId)=>{
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items)=>{
                return items.map((item)=>{
                    if (item.id === parentId) {
                        const oldIndex = item.children.findIndex((child)=>child.id === active.id);
                        const newIndex = item.children.findIndex((child)=>child.id === over.id);
                        return {
                            ...item,
                            children: arrayMove(item.children, oldIndex, newIndex)
                        };
                    }
                    return item;
                });
            });
        }
    };
    const updateItem = (item)=>{
        setItems((prevItems)=>{
            const newItems = prevItems.map((prevItem)=>{
                if (prevItem.id === item.id) {
                    return item;
                } else if (prevItem.children.length > 0) {
                    return {
                        ...prevItem,
                        children: prevItem.children.map((child)=>{
                            if (child.id === item.id) {
                                return item;
                            }
                            return child;
                        })
                    };
                }
                return prevItem;
            });
            return newItems;
        });
    };
    const deleteItem = (item)=>{
        setItems((prevItems)=>{
            const newItems = prevItems.filter((prevItem)=>{
                if (prevItem.id === item.id) {
                    return false;
                } else if (prevItem.children.length > 0) {
                    prevItem.children = prevItem.children.filter((child)=>child.id !== item.id);
                }
                return true;
            });
            return newItems;
        });
    };
    useEffect(()=>{
        setValue('settings.menus', items);
    }, [
        items
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(DndContext, {
        sensors: sensors,
        collisionDetection: closestCenter,
        onDragEnd: handleDragEnd
    }, /*#__PURE__*/ React.createElement(SortableContext, {
        items: items.map((item)=>item.id),
        strategy: verticalListSortingStrategy
    }, /*#__PURE__*/ React.createElement("div", {
        className: "space-y-2"
    }, items.map((menu)=>/*#__PURE__*/ React.createElement("div", {
            key: menu.id
        }, /*#__PURE__*/ React.createElement(SortableMenuItem, {
            item: menu,
            updateItem: updateItem,
            deleteItem: deleteItem
        }), menu.children && menu.children.length > 0 && /*#__PURE__*/ React.createElement("div", {
            className: "ml-5 mt-2"
        }, /*#__PURE__*/ React.createElement(DndContext, {
            sensors: sensors,
            collisionDetection: closestCenter,
            onDragEnd: (event)=>handleChildDragEnd(event, menu.id)
        }, /*#__PURE__*/ React.createElement(SortableContext, {
            items: menu.children.map((child)=>child.id),
            strategy: verticalListSortingStrategy
        }, /*#__PURE__*/ React.createElement("div", {
            className: "space-y-1"
        }, menu.children.map((child)=>/*#__PURE__*/ React.createElement(SortableMenuItem, {
                key: child.id,
                item: child,
                updateItem: updateItem,
                deleteItem: deleteItem,
                isChild: true
            }))))))))))), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...register('settings.menus'),
        value: JSON.stringify(items)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "space-y-3"
    }, /*#__PURE__*/ React.createElement(Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen
    }, /*#__PURE__*/ React.createElement(DialogTrigger, null, /*#__PURE__*/ React.createElement(Button, {
        variant: 'outline',
        size: 'sm'
    }, "Add Menu Item")), /*#__PURE__*/ React.createElement(DialogContent, null, /*#__PURE__*/ React.createElement(DialogHeader, null, /*#__PURE__*/ React.createElement(DialogTitle, null, "Add Menu Item")), /*#__PURE__*/ React.createElement(MenuSettingPopup, {
        item: {
            id: uniqid(),
            name: '',
            url: '',
            type: 'category',
            uuid: '',
            children: []
        },
        updateItem: (item)=>{
            setItems((prevItems)=>[
                    ...prevItems,
                    item
                ]);
            setDialogOpen(false);
        }
    }))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(CheckboxField, {
        label: "Is Main Menu?",
        name: "settings.isMain",
        defaultValue: isMain
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        label: "Custom CSS classes",
        name: "settings.className",
        defaultValue: className,
        helperText: "Custom CSS classes for the menu"
    }))));
}
export const query = `
  query Query($settings: JSON) {
    basicMenuWidget(settings: $settings) {
      menus {
        id
        name
        url
        type
        uuid
        children {
          id
          name
          url
          type
          uuid
        }
      }
      isMain
      className
    }
  }
`;
export const variables = `{
  settings: getWidgetSetting()
}`;
