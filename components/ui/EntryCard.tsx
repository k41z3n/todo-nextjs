import { DragEvent, FC, useContext } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
} from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setIsDragging, isDragging } = useContext(UIContext);

  const router = useRouter()

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('entryId', entry._id);
    setIsDragging(true);
  };

  const onDraEnd = () => {
    setIsDragging(false);
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDraEnd}
    >
      <CardActionArea>
        <CardContent>
          {/* <pre>{isDragging ? 'yep' : 'nop'}</pre> */}
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
