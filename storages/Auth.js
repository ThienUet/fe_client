import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_REFRESH_TOKEN_KEY = 'refresh_token';

const authenticateUser = (token, refresh_token, token_expires, refresh_token_expires) => {
    Cookies.set(AUTH_TOKEN_KEY, token, {expires: token_expires});
    Cookies.set(AUTH_REFRESH_TOKEN_KEY, refresh_token, {expires: refresh_token_expires});
} 

const isUserAuthenticated = () => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    if (!token) return false;
    return true;
}

const deAuthenticatedUser = () => {
    Cookies.remove(AUTH_TOKEN_KEY);
    Cookies.remove(AUTH_REFRESH_TOKEN_KEY);
}

const getToken = () => {
    return Cookies.get(AUTH_TOKEN_KEY);
}

const getUser = () => {
    try {
        const token = getToken();
        return token;
    } catch (error) {
        return null;
    }
}

export {authenticateUser, isUserAuthenticated, deAuthenticatedUser, getToken, getUser};