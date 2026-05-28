import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
/**
 * Logout a current user. This function must be accessed from the request object (request.logoutUser(callback))
 */ // Named function expression so .name === 'logoutUser' for the hookable key
const _logoutUser = function logoutUser() {
    this.session.userID = undefined;
    this.locals.user = undefined;
};
export function logoutUser() {
    hookable(_logoutUser.bind(this))();
}
export function hookBeforeLogoutUser(callback, priority = 10) {
    hookBefore('logoutUser', callback, priority);
}
export function hookAfterLogoutUser(callback, priority = 10) {
    hookAfter('logoutUser', callback, priority);
}
