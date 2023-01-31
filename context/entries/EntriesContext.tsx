import { createContext } from 'react';
import { Entry, EntryStatus } from '../../interfaces';

interface ContextProps {
    entries: Entry[],
    addNewEntry: (description: string) => void
}

export const EntriesContext = createContext({} as ContextProps);