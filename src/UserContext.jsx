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

  const [apiKey] = useState('435cc8828981d6abde246ad15e99ee54')

  const [requestUrl] = useState('https://v3.football.api-sports.io')
  const [actualCountry, setActualCountry] = useState({})
  const [actualLeague, setActualLeague] = useState({})
  const [actualTeam, setActualTeam] = useState({})

  return (
    <UserContext.Provider value={{logged, setLogged, apiKey, requestUrl, actualCountry, setActualCountry, actualLeague, setActualLeague, actualTeam, setActualTeam}}>
      {children}
    </UserContext.Provider>
  );
}