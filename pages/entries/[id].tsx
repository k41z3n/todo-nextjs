import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';

import { GetServerSideProps } from 'next';

import { dbEntries } from '../../database';

import {
  capitalize,
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@mui/material';

import { timeFromToNow } from '../../utils/dateFunctions';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from '../../components/layouts';
import { Entry, StatusEntryType } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';

const validStatus: StatusEntryType[] = ['pennding', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

export const entryPage: FC<Props> = ({ entry }) => {
  const { dropEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<StatusEntryType>(entry.status);
  const [touch, setTouch] = useState(false);

  const router = useRouter();

  const isValid = useMemo(
    () => inputValue.length <= 0 && touch,
    [inputValue, touch]
  );

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as StatusEntryType);
  };

  const onDeleteEntry = async () => {
    await deleteEntry(entry._id);
    console.log('redirect');
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const onSave = () => {
    console.log({ inputValue, status });

    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    dropEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 10) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${inputValue}`}
              subheader={`Created ${timeFromToNow(entry.createAt)} min`}
            />
            <CardContent>
              <TextField
                sx={{ margin: [2, 1] }}
                fullWidth
                placeholder="new entry"
                autoFocus
                multiline
                label="New Entry"
                value={inputValue}
                onChange={onChangeInputValue}
                helperText={isValid && 'type a value'}
                onBlur={() => setTouch(true)}
                error={isValid}
              />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      label={capitalize(option)}
                      value={option}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                startIcon={<SaveOutlinedIcon />}
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <IconButton
          onClick={onDeleteEntry}
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark',
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Grid>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default entryPage;
