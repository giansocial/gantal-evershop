import { Label } from '@components/common/ui/Label.js';
import { Separator } from '@components/common/ui/Separator.js';
import { cn } from '@evershop/evershop/lib/util/cn';
import { cva } from 'class-variance-authority';
import React, { useMemo } from 'react';
function FieldSet({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("fieldset", {
        "data-slot": "field-set",
        className: cn('gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col', className),
        ...props
    });
}
function FieldLegend({ className, variant = 'legend', ...props }) {
    return /*#__PURE__*/ React.createElement("legend", {
        "data-slot": "field-legend",
        "data-variant": variant,
        className: cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className),
        ...props
    });
}
function FieldGroup({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "field-group",
        className: cn('gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col', className),
        ...props
    });
}
const fieldVariants = cva('data-[invalid=true]:text-destructive gap-3 group/field flex w-full', {
    variants: {
        orientation: {
            vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
            horizontal: 'flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
            responsive: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
        }
    },
    defaultVariants: {
        orientation: 'vertical'
    }
});
function Field({ className, orientation = 'vertical', ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        role: "group",
        "data-slot": "field",
        "data-orientation": orientation,
        className: cn(fieldVariants({
            orientation
        }), className),
        ...props
    });
}
function FieldContent({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "field-content",
        className: cn('gap-1 group/field-content flex flex-1 flex-col leading-snug', className),
        ...props
    });
}
function FieldLabel({ className, ...props }) {
    return /*#__PURE__*/ React.createElement(Label, {
        "data-slot": "field-label",
        className: cn('has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-1 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-3 group/field-label peer/field-label flex w-fit leading-snug', 'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col', className),
        ...props
    });
}
function FieldTitle({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "field-label",
        className: cn('gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug', className),
        ...props
    });
}
function FieldDescription({ className, ...props }) {
    return /*#__PURE__*/ React.createElement("p", {
        "data-slot": "field-description",
        className: cn('text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance', 'last:mt-0 nth-last-2:-mt-1', '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4', className),
        ...props
    });
}
function FieldSeparator({ children, className, ...props }) {
    return /*#__PURE__*/ React.createElement("div", {
        "data-slot": "field-separator",
        "data-content": !!children,
        className: cn('-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative', className),
        ...props
    }, /*#__PURE__*/ React.createElement(Separator, {
        className: "absolute inset-0 top-1/2"
    }), children && /*#__PURE__*/ React.createElement("span", {
        className: "text-muted-foreground px-2 bg-background relative mx-auto block w-fit",
        "data-slot": "field-separator-content"
    }, children));
}
function FieldError({ className, children, errors, ...props }) {
    const content = useMemo(()=>{
        if (children) {
            return children;
        }
        if (!errors?.length) {
            return null;
        }
        const uniqueErrors = [
            ...new Map(errors.map((error)=>[
                    error?.message,
                    error
                ])).values()
        ];
        if (uniqueErrors?.length == 1) {
            return uniqueErrors[0]?.message;
        }
        return /*#__PURE__*/ React.createElement("ul", {
            className: "ml-4 flex list-disc flex-col gap-1"
        }, uniqueErrors.map((error, index)=>error?.message && /*#__PURE__*/ React.createElement("li", {
                key: index
            }, error.message)));
    }, [
        children,
        errors
    ]);
    if (!content) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        role: "alert",
        "data-slot": "field-error",
        className: cn('text-destructive text-sm font-normal', className),
        ...props
    }, content);
}
export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle };
