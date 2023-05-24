import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({children}) {

  const [logged, setLogged] = useState(() => {
    const storedUser = localStorage.getItem('logged');
    return storedUser !== null ? JSON.parse(storedUser) : {
      status: false
    };
  });

  useEffect(() => {
    localStorage.setItem('logged', JSON.stringify(logged));
  }, [logged]);

  const [apiKey] = useState('e1a82cd921e8de94f8d05e061a0abf5f')

  const [requestConfig] = useState({
      method: 'get',
      headers: {
        'x-apisports-key': apiKey
      }
  })

  return (
    <UserContext.Provider value={{logged, setLogged, apiKey, requestConfig}}>
      {children}
    </UserContext.Provider>
  );
}