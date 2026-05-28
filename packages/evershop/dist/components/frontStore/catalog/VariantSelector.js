import { useAppDispatch, useAppState } from '@components/common/context/app.js';
import { DefaultVariantAttribute, DefaultVariantOptionItem } from '@components/frontStore/catalog/DefaultVariantSelectorRender.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
const processAttributes = (vs, attributes, currentUrl)=>{
    if (!vs) return [];
    const selectedOptions = [];
    let newAttributes;
    newAttributes = attributes.map((attribute)=>{
        const url = new URL(currentUrl);
        const params = new URLSearchParams(url.search).entries();
        const check = Array.from(params).find(([key, value])=>key === attribute.attributeCode && attribute.options.find((option)=>option.optionId === parseInt(value, 10)));
        if (check) {
            const terms = [
                ...selectedOptions,
                {
                    attributeCode: check[0],
                    optionId: parseInt(check[1], 10)
                }
            ];
            const variant = vs.items.find((item)=>terms.every((attr)=>item.attributes.find((term)=>term.attributeCode === attr.attributeCode && parseInt(term.optionId.toString(), 10) === parseInt(attr.optionId.toString(), 10))));
            if (variant) {
                selectedOptions.push({
                    attributeCode: check[0],
                    optionId: parseInt(check[1], 10)
                });
                return {
                    ...attribute,
                    selected: true,
                    selectedOption: parseInt(check[1], 10)
                };
            } else {
                return {
                    ...attribute,
                    selected: false,
                    selectedOption: null
                };
            }
        } else {
            return {
                ...attribute,
                selected: false,
                selectedOption: null
            };
        }
    });
    newAttributes = newAttributes.map((attribute)=>{
        const options = attribute.options.map((option)=>{
            const terms = selectedOptions.filter((selected)=>selected.attributeCode !== attribute.attributeCode).concat({
                attributeCode: attribute.attributeCode,
                optionId: option.optionId
            });
            const variant = vs.items.find((item)=>terms.every((attr)=>item.attributes.find((term)=>term.attributeCode === attr.attributeCode && term.optionId === attr.optionId)));
            return {
                ...option,
                available: !!variant
            };
        });
        return {
            ...attribute,
            options
        };
    });
    return newAttributes;
};
export function VariantSelector({ AttributeRenderer = DefaultVariantAttribute, OptionRenderer = DefaultVariantOptionItem }) {
    const { variantGroup: vs, productId } = useProduct();
    const { config: { pageMeta: { route: { url: currentProductUrl } } } } = useAppState();
    const { register, formState: { errors } } = useFormContext();
    const AppContextDispatch = useAppDispatch();
    const initialAttributes = useMemo(()=>processAttributes(vs, vs?.variantAttributes || [], currentProductUrl), [
        vs,
        currentProductUrl
    ]);
    const [attributes, setAttributes] = React.useState(initialAttributes);
    const attributeRef = React.useRef(initialAttributes);
    const validate = ()=>{
        return !attributeRef.current.find((a)=>a.selected !== true);
    };
    useEffect(()=>{
        const handleProductChange = ()=>{
            const newAttributes = processAttributes(vs, vs?.variantAttributes || [], currentProductUrl);
            setAttributes(newAttributes);
            attributeRef.current = newAttributes;
        };
        handleProductChange();
    }, [
        vs,
        productId
    ]);
    const handleOptionClick = async (attributeCode, optionId)=>{
        const url = new URL(window.location.href);
        url.searchParams.set('ajax', 'true');
        url.searchParams.set(attributeCode, optionId.toString());
        await AppContextDispatch.fetchPageData(url);
        url.searchParams.delete('ajax');
        history.pushState(null, '', url);
    };
    if (!vs || attributes.length === 0) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "variant variant__container grid grid-cols-1 gap-2 mt-5"
    }, attributes.map((attribute)=>{
        const options = attribute.options.filter((v, j, s)=>s.findIndex((o)=>o.optionId === v.optionId) === j && v.productId);
        return /*#__PURE__*/ React.createElement(AttributeRenderer, {
            key: attribute.attributeCode,
            attribute: attribute,
            options: options,
            onSelect: handleOptionClick,
            OptionItem: OptionRenderer
        });
    }), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...register('variant_selected', {
            validate: validate
        })
    }), errors.variant_selected && /*#__PURE__*/ React.createElement("div", {
        className: "text-destructive"
    }, _('Please select variant options')));
}
