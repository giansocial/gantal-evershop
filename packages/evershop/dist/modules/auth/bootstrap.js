import { request } from 'express';
import { loginUserWithEmail } from './services/loginUserWithEmail.js';
import { logoutUser } from './services/logoutUser.js';
export default (()=>{
    request.loginUserWithEmail = async function login(email, password, callback) {
        await loginUserWithEmail.bind(this)(email, password);
        if (this.session) {
            this.session.save(callback);
        }
    };
    request.logoutUser = function logout(callback) {
        logoutUser.bind(this)();
        if (this.session) {
            this.session.save(callback);
        }
    };
    request.isUserLoggedIn = function isUserLoggedIn() {
        return !!this.session.userID;
    };
    request.getCurrentUser = function getCurrentUser() {
        return this.locals.user;
    };
});
