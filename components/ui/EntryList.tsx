import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntryCard } from '.';
import { StatusEntryType } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import style from './EntryList.module.css';

interface Props {
  status: StatusEntryType;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, dropEntry } = useContext(EntriesContext);

  const { isDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const cardId = event.dataTransfer.getData('entryId');
    const droppedEntry = entries.find((entry) => entry._id === cardId)!;
    droppedEntry.status = status;
    dropEntry(droppedEntry);
  };
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={isDragging ? style['is-dragging'] : ''}
    >
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
