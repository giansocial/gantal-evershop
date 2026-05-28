import React from 'react';
export default function RenderIfTrue({ condition, children }) {
    return condition === true ? children : null;
}
