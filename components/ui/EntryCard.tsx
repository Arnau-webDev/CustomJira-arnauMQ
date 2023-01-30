import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  return (
    <Card
        sx={{ marginBottom: 1}}
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
