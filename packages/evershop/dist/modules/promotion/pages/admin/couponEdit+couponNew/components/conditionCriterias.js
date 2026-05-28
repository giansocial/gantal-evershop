export var Operator = /*#__PURE__*/ function(Operator) {
    Operator["EQUAL"] = "=";
    Operator["NOT_EQUAL"] = "!=";
    Operator["GREATER"] = ">";
    Operator["GREATER_OR_EQUAL"] = ">=";
    Operator["SMALLER"] = "<";
    Operator["SMALLER_OR_EQUAL"] = "<=";
    Operator["IN"] = "IN";
    Operator["NOT_IN"] = "NOT IN";
    return Operator;
}({});
const options = [
    {
        key: 'category',
        label: 'Category'
    },
    {
        key: 'collection',
        label: 'Collection'
    },
    {
        key: 'attribute_group',
        label: 'Attribute Group'
    },
    {
        key: 'sku',
        label: 'Sku'
    },
    {
        key: 'price',
        label: 'Price'
    }
];
const operators = [
    {
        key: "=",
        label: 'Equal'
    },
    {
        key: "!=",
        label: 'Not equal'
    },
    {
        key: ">",
        label: 'Greater'
    },
    {
        key: ">=",
        label: 'Greater or equal'
    },
    {
        key: "<",
        label: 'Smaller'
    },
    {
        key: "<=",
        label: 'Equal or smaller'
    },
    {
        key: "IN",
        label: 'In'
    },
    {
        key: "NOT IN",
        label: 'Not in'
    }
];
export { options, operators };
