import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntryCard } from '.';
import { StatusEntryType } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

interface Props {
  status: StatusEntryType;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const { isDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const cardId = event.dataTransfer.getData('entryId')
    console.log(cardId)
  }
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div onDrop={onDrop} onDragOver={allowDrop}>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard entry={entry} key={entry._id} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
