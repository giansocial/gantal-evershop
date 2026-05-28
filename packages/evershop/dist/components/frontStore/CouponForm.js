import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { Button } from '@components/common/ui/Button.js';
import { Coupon } from '@components/frontStore/Coupon.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export function CouponForm() {
    const form = useForm();
    const coupon = form.watch('coupon');
    return /*#__PURE__*/ React.createElement(Coupon, {
        onApplySuccess: ()=>{
            toast.success(_('Coupon applied successfully!'));
        },
        onError: ()=>{
            toast.error(_('Invalid coupon'));
        },
        onRemoveSuccess: ()=>{
            toast.success(_('Coupon removed successfully!'));
        }
    }, (state, actions)=>/*#__PURE__*/ React.createElement("div", {
            className: "coupon-form"
        }, /*#__PURE__*/ React.createElement(Form, {
            form: form,
            method: "POST",
            submitBtn: false
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between gap-3"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "w-4/5"
        }, /*#__PURE__*/ React.createElement(InputField, {
            name: "coupon",
            required: true,
            validation: {
                required: {
                    value: true,
                    message: _('Coupon code is required')
                }
            },
            defaultValue: state.appliedCoupon || '',
            disabled: !!state.appliedCoupon,
            placeholder: _('Enter coupon code'),
            wrapperClassName: "mb-0 form-field"
        })), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-1"
        }, /*#__PURE__*/ React.createElement(Button, {
            isLoading: state.isLoading,
            onClick: async ()=>{
                if (state.appliedCoupon) {
                    await actions.removeCoupon();
                } else {
                    const isValid = await form.trigger();
                    if (isValid) {
                        actions.applyCoupon(coupon);
                    }
                }
            },
            variant: state.appliedCoupon ? 'destructive' : 'default'
        }, state.appliedCoupon ? _('Remove') : _('Apply')))))));
}
