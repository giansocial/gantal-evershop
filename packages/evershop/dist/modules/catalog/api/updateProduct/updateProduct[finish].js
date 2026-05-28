import updateProduct from '../../services/product/updateProduct.js';
export default (async (request, response)=>{
    const product = await updateProduct(Array.isArray(request.params.id) ? request.params.id[0] : request.params.id, request.body, {
        routeId: request.currentRoute.id
    });
    return product;
});
