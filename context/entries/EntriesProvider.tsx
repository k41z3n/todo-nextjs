import { FC, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

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

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createAt: Date.now(),
      status: 'pennding',
    };
    dispatch({
      type: 'Entry - add',
      payload: newEntry,
    });
  };

  const dropEntry = (entry: Entry) => {
    dispatch({ type: 'Entry - drop', payload: entry });
  };

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
