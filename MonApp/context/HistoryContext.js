import { createContext, useEffect, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryContextProvider = ({ children }) => {
  const [newSearch, setNewSearch] = useState();
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    setHistoryArray((historyArray) => [...historyArray, newSearch]); //prevState
  }, [newSearch,setNewSearch]);

  return (
    <HistoryContext.Provider
      value={{
        historyArray: historyArray.filter(Boolean), // supprimer les valeurs undefind du tableau
        setNewSearch: setNewSearch,
      }}
    >
      {children}
    </HistoryContext.Provider> //propage mise a jour des informations aux enfants
  );
};
