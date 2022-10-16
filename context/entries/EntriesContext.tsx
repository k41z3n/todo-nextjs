import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface contextProps {
  entries: Entry[];
  //MEHODS
  addNewEntry: (description: string) => void;
}

export const EntriesContext = createContext({} as contextProps);
