import { DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';

import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

import { dateFunctions } from '../../utils';

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {

  const { startDragging, stopDragging } = useContext( UIContext );
  const router = useRouter();

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    startDragging();
  }

  const handleDragEnd = () => {
    stopDragging();
  }

  const handleNavigation = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
        onClick={handleNavigation}
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
                <Typography variant='body2'>
                  Created {dateFunctions.getFormatDistanceToNow(entry.createdAt)} ago
                </Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
};
