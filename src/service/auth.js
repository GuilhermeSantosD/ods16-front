export const TOKEN_KEY = "auth-token";
export const TOKEN_EXPIRATION = "validity-token"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
    const today = new Date();
    const expiration = today.setDate(today.getDate() + 2).toString()
    localStorage.setItem(TOKEN_EXPIRATION, expiration)
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
}
