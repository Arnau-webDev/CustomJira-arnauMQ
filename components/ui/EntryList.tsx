import { DragEvent } from 'react';
import { useContext, useMemo } from 'react';
import { EntryCard } from './';

import { UIContext } from '../../context/ui';
import { EntriesContext } from '../../context/entries';

import { EntryStatus } from '../../interfaces';
import { Paper, List, Box } from '@mui/material';

import styles from './EntryList.module.css';

interface EntryListProps {
    status: EntryStatus
}

export const EntryList: React.FC<EntryListProps> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext );
  const { isDragging, stopDragging } = useContext( UIContext );

  const entriesByStatus = useMemo(() => {
      return entries.filter(entry => entry.status === status)
  }, [entries, status]); 

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDropEntry = (e: DragEvent<HTMLDivElement>) => {
      const id = e.dataTransfer.getData('text');
      const entry = entries.find( entry => entry._id === id)!;
      entry.status = status;
      updateEntry( entry );
      stopDragging();
  }

  return (
    <Box 
        component='div'
        onDrop={handleDropEntry}
        onDragOver={ allowDrop }
    >
        <Paper 
            className={ isDragging ? styles.dragging : ''}
            sx={{ 
                height: 'calc(100vh - 250px)',
                overflow: 'scrollbar', 
                backgroundColor: 'transparent', 
                padding: '0 5px',
                border: '1px solid transparent'
            }}
        >
            <List sx={{ opacity: isDragging ? 0.6 : 1, transition: 'all .3s ease' }} >
                {entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry}/>)}
            </List>
        </Paper>
    </Box>
  )
};
