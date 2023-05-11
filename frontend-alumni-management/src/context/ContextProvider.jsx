import React from 'react';
import { createContext } from 'react';
import useDb from '../hooks/useDb';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const authContext = useDb();
    return (
        <Context.Provider value={[authContext]}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;