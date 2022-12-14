import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface contextProps {
  entries: Entry[];
  //MEHODS
  addNewEntry: (description: string) => void;
  dropEntry: (enrty: Entry, showSnackBar?: boolean) => void;
  deleteEntry: (enrtyId: string) => void;
}

export const EntriesContext = createContext({} as contextProps);
