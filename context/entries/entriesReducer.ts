import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType = { type: 'Entry - add'; payload: Entry };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case 'Entry - add':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    default:
      return state;
  }
};
