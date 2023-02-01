import { PropsWithChildren, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';

import { Entry, EntryStatus } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [

    ],
}

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = ( description: string ) => {
    const newEntry: Entry = {
        _id: uuidv4(),
        description,
        status: 'pending',
        createdAt: Date.now()
    }

    dispatch({ type: 'Entry - Add-Entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({type: 'Entry - Update-Entry', payload: entry})
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