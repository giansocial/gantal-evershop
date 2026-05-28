export var SQLFilterOperation = /*#__PURE__*/ function(SQLFilterOperation) {
    SQLFilterOperation["eq"] = "=";
    SQLFilterOperation["neq"] = "<>";
    SQLFilterOperation["gt"] = ">";
    SQLFilterOperation["gteq"] = ">=";
    SQLFilterOperation["lt"] = "<";
    SQLFilterOperation["lteq"] = "<=";
    SQLFilterOperation["like"] = "ILIKE";
    SQLFilterOperation["nlike"] = "NOT ILIKE";
    SQLFilterOperation["in"] = "IN";
    SQLFilterOperation["nin"] = "NOT IN";
    return SQLFilterOperation;
}({});
// Map the operation to the SQL operation
export const OPERATION_MAP = {
    eq: "=",
    neq: "<>",
    gt: ">",
    gteq: ">=",
    lt: "<",
    lteq: "<=",
    like: "ILIKE",
    nlike: "NOT ILIKE",
    in: "IN",
    nin: "NOT IN"
};
