import React, { useReducer } from "react";

export default function AuthenticationContext(reducer, action, initialState) {
  const AuthContext = React.createContext();

  const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const boundAction = {};

    // for (let key in action) {
    //   boundAction[key] = action[key](dispatch);
    // }

    //       <AuthContext.Provider value={{ state, ...boundAction }}>
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };

  return { AuthContext: AuthContext, AuthProvider: AuthProvider };
}
