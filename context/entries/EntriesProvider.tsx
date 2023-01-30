import { PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';

import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe praesentium quo corrupti adipisci sit eum laborum, aperiam architecto sequi deserunt veniam facilis cum quam velit dolorem nobis ullam laboriosam. Consequatur?',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'In Progress: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe praesentium quo corrupti adipisci sit eum laborum, aperiam architecto sequi deserunt veniam facilis cum quam velit dolorem nobis ullam laboriosam. Consequatur?',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Completed: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe praesentium quo corrupti adipisci sit eum laborum, aperiam architecto sequi deserunt veniam facilis cum quam velit dolorem nobis ullam laboriosam. Consequatur?',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ],
}

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  return (
    <EntriesContext.Provider value={{
       ...state
    }}>
        { children }
    </EntriesContext.Provider>
  )
};