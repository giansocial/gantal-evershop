import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/common/ui/Card.js';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import './Lifetimesales.scss';
const COLORS = [
    '#aee9d1',
    '#fed3d1',
    '#a4e8f2'
];
const Dot = ({ variant })=>{
    let bgColor = 'bg-gray-400';
    if (variant === 'info') {
        bgColor = 'bg-blue-400';
    } else if (variant === 'success') {
        bgColor = 'bg-green-400';
    } else if (variant === 'critical') {
        bgColor = 'bg-red-400';
    }
    return /*#__PURE__*/ React.createElement("span", {
        className: `w-3 h-3 rounded-full ${bgColor} inline-block`
    });
};
Dot.propTypes = {
    variant: PropTypes.oneOf([
        'info',
        'success',
        'critical'
    ])
};
export default function LifetimeSale({ api }) {
    const [data, setData] = React.useState({});
    const [fetching, setFetching] = React.useState(true);
    const { orders, total, completed_percentage, cancelled_percentage } = data;
    const chartData = [
        {
            name: 'Completed',
            value: completed_percentage
        },
        {
            name: 'Cancelled',
            value: cancelled_percentage
        },
        {
            name: 'Others',
            value: 100 - completed_percentage - cancelled_percentage
        }
    ];
    React.useEffect(()=>{
        if (window !== undefined) {
            fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response)=>response.json()).then((json)=>{
                setData(json);
                setFetching(false);
            }).catch((error)=>{
                toast.error(error.message);
            });
        }
    }, []);
    if (fetching) {
        return /*#__PURE__*/ React.createElement(Card, {
            title: "Lifetime Sales"
        }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Lifetime Sales")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-wrapper-lifetime"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton"
        }))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-wrapper-lifetime"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-chart"
        }))));
    } else {
        return /*#__PURE__*/ React.createElement(Card, {
            title: "Lifetime Sales"
        }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Lifetime Sales"), /*#__PURE__*/ React.createElement(CardDescription, null, "Overview of total sales and order status over the lifetime of your")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-1 gap-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex space-x-2 items-center"
        }, /*#__PURE__*/ React.createElement(Dot, {
            variant: "info"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "self-center"
        }, orders, " orders")), /*#__PURE__*/ React.createElement("div", {
            className: "flex space-x-2 items-center"
        }, /*#__PURE__*/ React.createElement(Dot, {
            variant: "info"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "self-center"
        }, total, " lifetime sale")), /*#__PURE__*/ React.createElement("div", {
            className: "flex space-x-2 items-center"
        }, /*#__PURE__*/ React.createElement(Dot, {
            variant: "success"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "self-center"
        }, completed_percentage, "% of orders completed")), /*#__PURE__*/ React.createElement("div", {
            className: "flex space-x-2 items-center"
        }, /*#__PURE__*/ React.createElement(Dot, {
            variant: "critical"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "self-center"
        }, cancelled_percentage, "% of orders cancelled")))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            style: {
                height: '200px'
            }
        }, /*#__PURE__*/ React.createElement(ResponsiveContainer, {
            width: "100%",
            height: "100%"
        }, /*#__PURE__*/ React.createElement(PieChart, null, /*#__PURE__*/ React.createElement(Pie, {
            data: chartData,
            labelLine: false,
            fill: "#8884d8",
            dataKey: "value",
            label: true
        }, chartData.map((entry, index)=>/*#__PURE__*/ React.createElement(Cell, {
                key: `cell-${index}`,
                fill: COLORS[index % COLORS.length]
            }))))))));
    }
}
LifetimeSale.propTypes = {
    api: PropTypes.string.isRequired
};
export const layout = {
    areaId: 'rightSide',
    sortOrder: 10
};
export const query = `
  query Query {
    api: url(routeId: "lifetimesales")    
  }
`;
