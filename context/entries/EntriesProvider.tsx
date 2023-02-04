import { PropsWithChildren, useReducer, useEffect } from 'react';

import { EntriesContext, entriesReducer } from './';

import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  
  const addNewEntry = async ( description: string ) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: 'Entry - Add-Entry', payload: data });

      enqueueSnackbar('Entry Created!', {
        variant: 'info',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });

    } catch(error) {
      console.log({ error });
    }
  };

  const updateEntry = async (entry: Entry, showSnackbar = false) => {

    const { _id: id, description, status } = entry;
    dispatch({type: 'Entry - Update-Entry', payload: entry})
    
    try {
      await entriesApi.put<Entry>(`/entries/${id}`, { description, status });

      if(showSnackbar) {
        enqueueSnackbar('Entry Updated!', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
      }
    } catch(error) {
      console.log({ error });
    }

  };

  const deleteEntry = async (id: string) => {
    dispatch({type: 'Entry - Delete-Entry', payload: id});

    try {
      await entriesApi.delete(`/entries/${id}`);

      enqueueSnackbar('Entry Deleted!', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } 
    catch(error) {
      console.log({ error });
    }
  }

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
       updateEntry,
       deleteEntry

    }}>
        { children }
    </EntriesContext.Provider>
  )
};