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

  const [apiKey] = useState('da0f443a048c42d3e571e1e9ef4b2ae3')

  const [requestUrl] = useState('https://v3.football.api-sports.io')
  const [actualCountry, setActualCountry] = useState({})
  const [actualLeague, setActualLeague] = useState({})

  return (
    <UserContext.Provider value={{logged, setLogged, apiKey, requestUrl, actualCountry, setActualCountry, actualLeague, setActualLeague}}>
      {children}
    </UserContext.Provider>
  );
}