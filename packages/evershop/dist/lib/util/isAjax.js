export function isAjax(request) {
    return request.get('X-Requested-With') === 'XMLHttpRequest';
}
