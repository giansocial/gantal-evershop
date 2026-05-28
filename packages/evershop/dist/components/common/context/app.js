import { produce } from 'immer';
import React, { useMemo } from 'react';
const AppStateContext = /*#__PURE__*/ React.createContext({});
const AppContextDispatch = /*#__PURE__*/ React.createContext({});
export function AppProvider({ value, children }) {
    const [data, setData] = React.useState(value);
    const [fetching, setFetching] = React.useState(false);
    const fetchPageData = async (url)=>{
        setFetching(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataResponse = await response.json();
            // Update the entire context using immer
            setData(produce(data, (draft)=>{
                Object.assign(draft, dataResponse.eContext);
                return draft;
            }));
        } catch (error) {} finally{
            setFetching(false);
        }
    };
    React.useEffect(()=>{
        window.onpopstate = async ()=>{
            // Get the current url
            const url = new URL(window.location.href, window.location.origin);
            url.searchParams.append('ajax', 'true');
            await fetchPageData(url.toString());
        };
    }, []);
    const contextDispatchValue = useMemo(()=>({
            setData,
            fetchPageData
        }), [
        setData,
        fetchPageData
    ]);
    const contextValue = useMemo(()=>({
            ...data,
            fetching
        }), [
        data,
        fetching
    ]);
    return /*#__PURE__*/ React.createElement(AppContextDispatch.Provider, {
        value: contextDispatchValue
    }, /*#__PURE__*/ React.createElement(AppStateContext.Provider, {
        value: contextValue
    }, children));
}
export const useAppState = ()=>React.useContext(AppStateContext);
export const useAppDispatch = ()=>React.useContext(AppContextDispatch);
