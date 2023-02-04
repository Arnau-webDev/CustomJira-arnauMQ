import { PropsWithChildren, useReducer, useEffect } from 'react';

import { EntriesContext, entriesReducer } from './';

import { Entry, EntryStatus } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  
  const addNewEntry = async ( description: string ) => {
    
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
  
      dispatch({ type: 'Entry - Add-Entry', payload: data });

    } catch(error) {
      console.log({ error });
    }
  };

  const updateEntry = async (entry: Entry) => {

    const { _id: id, description, status } = entry;
    
    dispatch({type: 'Entry - Update-Entry', payload: entry})
    
    try {
      await entriesApi.put<Entry>(`/entries/${id}`, { description, status });

    } catch(error) {
      console.log({ error });
    }

  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: 'Entry - Refresh-Entries', payload: data});
  };

  useEffect(() => {
    refreshEntries();
  }, [])
  

  return (
    <EntriesContext.Provider value={{
       ...state,
       addNewEntry,
       updateEntry
    }}>
        { children }
    </EntriesContext.Provider>
  )
};