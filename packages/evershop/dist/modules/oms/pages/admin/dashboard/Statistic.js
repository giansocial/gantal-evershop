import { Card, CardAction, CardDescription, CardHeader, CardTitle, CardContent } from '@components/common/ui/Card.js';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './Statistic.scss';
import { ButtonGroup } from '@components/common/ui/ButtonGroup.js';
import { Button } from '@components/common/ui/Button.js';
export default function SaleStatistic({ api }) {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState('monthly');
    const [fetching, setFetching] = useState(true);
    useEffect(()=>{
        if (window !== undefined) {
            fetch(`${api}?period=${period}`, {
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
    }, [
        period
    ]);
    if (fetching) {
        return /*#__PURE__*/ React.createElement(Card, {
            title: "Sale Statistics"
        }, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Sale Statistics"), /*#__PURE__*/ React.createElement(CardDescription, null, "Overview of sales data over selected periods")), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-wrapper-statistic"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton"
        })));
    } else {
        return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, "Sale Statistics"), /*#__PURE__*/ React.createElement(CardDescription, null, "Overview of sales data over selected periods"), /*#__PURE__*/ React.createElement(CardAction, null, /*#__PURE__*/ React.createElement(ButtonGroup, null, /*#__PURE__*/ React.createElement(Button, {
            onClick: ()=>setPeriod('daily'),
            variant: 'outline'
        }, period === 'daily' ? /*#__PURE__*/ React.createElement("span", {
            className: "text-primary"
        }, "Daily") : 'Daily'), /*#__PURE__*/ React.createElement(Button, {
            onClick: ()=>setPeriod('weekly'),
            variant: 'outline'
        }, period === 'weekly' ? /*#__PURE__*/ React.createElement("span", {
            className: "text-primary"
        }, "Weekly") : 'Weekly'), /*#__PURE__*/ React.createElement(Button, {
            onClick: ()=>setPeriod('monthly'),
            variant: 'outline'
        }, period === 'monthly' ? /*#__PURE__*/ React.createElement("span", {
            className: "text-primary"
        }, "Monthly") : 'Monthly')))), /*#__PURE__*/ React.createElement(CardContent, null, data.length === 0 ? null : /*#__PURE__*/ React.createElement(ResponsiveContainer, {
            width: "100%",
            height: 300
        }, /*#__PURE__*/ React.createElement(AreaChart, {
            data: data,
            margin: {
                top: 5,
                right: 0,
                left: -25,
                bottom: 5
            }
        }, /*#__PURE__*/ React.createElement(XAxis, {
            dataKey: "time"
        }), /*#__PURE__*/ React.createElement(YAxis, null), /*#__PURE__*/ React.createElement(Tooltip, null), /*#__PURE__*/ React.createElement(Area, {
            type: "monotone",
            dataKey: "value",
            stackId: "1",
            stroke: "#8884d8",
            fill: "#8884d8"
        }), /*#__PURE__*/ React.createElement(Area, {
            type: "monotone",
            dataKey: "count",
            stackId: "1",
            stroke: "#82ca9d",
            fill: "#82ca9d"
        })))));
    }
}
SaleStatistic.propTypes = {
    api: PropTypes.string.isRequired
};
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    api: url(routeId: "salestatistic")    
  }
`;
