import { Button } from '@components/common/ui/Button.js';
import { assign } from '@evershop/evershop/lib/util/assign';
import { produce } from 'immer';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './Alert.scss';
import { Card } from '@components/common/ui/Card';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@components/common/ui/Card.js';
const AlertContext = /*#__PURE__*/ React.createContext();
export const useAlertContext = ()=>React.useContext(AlertContext);
function reducer(state, action) {
    switch(action.type){
        case 'close':
            return {
                ...state,
                showing: false,
                closing: false
            };
        case 'closing':
            return {
                ...state,
                showing: true,
                closing: true
            };
        case 'open':
            return {
                ...state,
                showing: true,
                closing: false
            };
        default:
            throw new Error();
    }
}
const alertReducer = produce((draff, action)=>{
    switch(action.type){
        case 'open':
            draff = {
                ...action.payload
            };
            return draff;
        case 'remove':
            return {};
        case 'update':
            assign(draff, action.payload);
            return draff;
        default:
            throw new Error();
    }
});
function Alert({ children }) {
    const [alert, dispatchAlert] = useReducer(alertReducer, {});
    const [state, dispatch] = useReducer(reducer, {
        showing: false,
        closing: false
    });
    const openAlert = ({ heading, content, primaryAction, secondaryAction })=>{
        dispatchAlert({
            type: 'open',
            payload: {
                heading,
                content,
                primaryAction,
                secondaryAction
            }
        });
        dispatch({
            type: 'open'
        });
    };
    return /*#__PURE__*/ React.createElement(AlertContext.Provider, {
        value: {
            dispatchAlert,
            openAlert,
            closeAlert: ()=>dispatch({
                    type: 'closing'
                })
        }
    }, children, state.showing === true && /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement("div", {
        className: state.closing === false ? 'modal-overlay fadeIn' : 'modal-overlay fadeOut',
        onAnimationEnd: ()=>{
            if (state.closing) {
                dispatch({
                    type: 'close'
                });
                dispatchAlert({
                    type: 'remove'
                });
            }
        }
    }, /*#__PURE__*/ React.createElement("div", {
        key: state.key,
        className: "modal-wrapper flex self-center justify-center",
        "aria-modal": true,
        "aria-hidden": true,
        tabIndex: -1,
        role: "dialog"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "modal"
    }, /*#__PURE__*/ React.createElement(Card, null, alert.heading && /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, null, alert.heading)), /*#__PURE__*/ React.createElement(CardContent, null, alert.content), (alert.primaryAction !== undefined || alert.secondaryAction !== undefined) && /*#__PURE__*/ React.createElement(CardFooter, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end space-x-2 w-full"
    }, alert.primaryAction && /*#__PURE__*/ React.createElement(Button, {
        onClick: alert.primaryAction.onAction,
        variant: alert.primaryAction.variant
    }, alert.primaryAction.title), alert.secondaryAction && /*#__PURE__*/ React.createElement(Button, {
        onClick: alert.secondaryAction.onAction,
        variant: alert.secondaryAction.variant
    }, alert.secondaryAction.title))))))), document.body));
}
Alert.propTypes = {
    children: PropTypes.node.isRequired
};
export { Alert };
