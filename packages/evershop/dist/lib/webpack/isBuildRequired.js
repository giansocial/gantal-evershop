export const isBuildRequired = (route)=>{
    if (!route) {
        return false;
    }
    if (route.isApi || [
        'staticAsset',
        'adminStaticAsset'
    ].includes(route.id)) {
        return false;
    } else {
        return true;
    }
};
