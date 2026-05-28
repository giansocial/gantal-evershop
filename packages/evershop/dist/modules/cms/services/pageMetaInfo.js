import { getContextValue, setContextValue } from '../../graphql/services/contextHelper.js';
export function setPageMetaInfo(request, info) {
    const current = getContextValue(request, 'pageInfo', {});
    const newInfo = {
        ...current,
        ...info
    };
    setContextValue(request, 'pageInfo', newInfo);
}
export function getPageMetaInfo(request) {
    return getContextValue(request, 'pageInfo', {});
}
