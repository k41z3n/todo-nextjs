import { UIState } from './';

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - isAddingEntry', payload: boolean };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sideBarIsOpen: true,
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        sideBarIsOpen: false,
      };
    case 'UI - isAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    default:
      return state;
  }
};
