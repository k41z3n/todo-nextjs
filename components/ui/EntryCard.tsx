import { FC } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
} from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}
        >
          <Typography variant="body2">{entry.createAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
