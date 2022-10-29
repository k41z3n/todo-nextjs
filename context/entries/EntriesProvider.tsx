import { FC, useEffect, useReducer } from 'react';

// import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';
import entriesApi from '../../apis/entriesApi';

export interface EntriesState {
  entries: Entry[];
}

export interface ch {
  children: JSX.Element;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<ch> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createAt: Date.now(),
    //   status: 'pennding',
    // };

    const { data } = await entriesApi.post<Entry>('/entries', { description });

    enqueueSnackbar('new Entry created', {
      variant: 'info',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
    });

    dispatch({ type: 'Entry - add', payload: data });
  };

  const dropEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      enqueueSnackbar('Entry updated', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });

      dispatch({ type: 'Entry - drop', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getEntriesData = async () => {
    const { data } = await entriesApi.get('/entries');
    dispatch({ type: 'Entry - get-data', payload: data });
  };

  useEffect(() => {
    getEntriesData();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //METHODS
        addNewEntry,
        dropEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
