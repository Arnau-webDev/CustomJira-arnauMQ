import { useContext, useMemo } from 'react';
import { EntryCard } from './';

import { EntriesContext } from '../../context/entries';

import { EntryStatus } from '../../interfaces';
import { Paper, List } from '@mui/material';

interface EntryListProps {
    status: EntryStatus
}

export const EntryList: React.FC<EntryListProps> = ({ status }) => {

  const { entries } = useContext( EntriesContext );

  const entriesByStatus = useMemo(() => {
      return entries.filter(entry => entry.status === status)
  }, [entries]);

  console.log(entriesByStatus);

  return (
    <div >
        <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'auto', backgroundColor: 'transparent', padding: '0 5px' }}>
            <List sx={{ opacity: 1 }}>
                {entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry}/>)}
            </List>

        </Paper>
    </div>
  )
};
