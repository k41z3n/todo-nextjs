import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { EntryCard } from '.';
import { StatusEntryType } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props {
  status: StatusEntryType;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  return (
    <div>
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
