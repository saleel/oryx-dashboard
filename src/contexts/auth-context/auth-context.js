import React from 'react';

/**
 * @type {{
 * login: Function
 * logout: Function
 * isLoggedIn: () => boolean
 * }}
 */
const defaultValues = { userSession: null };

const AuthContext = React.createContext(defaultValues);


export default AuthContext;
