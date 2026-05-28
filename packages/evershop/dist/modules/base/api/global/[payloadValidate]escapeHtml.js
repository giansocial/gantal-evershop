import escapePayload from '../../services/escapePayload.js';
export default ((request, response, next)=>{
    if (request.method === 'GET') {
        next();
    } else {
        escapePayload(request.body);
        next();
    }
});
