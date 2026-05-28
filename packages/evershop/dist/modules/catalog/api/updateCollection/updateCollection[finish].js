import updateCollection from '../../services/collection/updateCollection.js';
export default (async (request, response)=>{
    const collection = await updateCollection(Array.isArray(request.params.id) ? request.params.id[0] : request.params.id, request.body, {
        routeId: request.currentRoute.id
    });
    return collection;
});
