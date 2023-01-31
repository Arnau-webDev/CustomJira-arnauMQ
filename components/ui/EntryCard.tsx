import { DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {

  const { startDragging, stopDragging } = useContext( UIContext );

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    startDragging();
  }

  const handleDragEnd = () => {
    stopDragging();
  }
  
  return (
    <Card
        sx={{ marginBottom: 1}}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // Drag events
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>30 min ago</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
};
