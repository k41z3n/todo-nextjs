import { FC, useReducer } from 'react';

import { UIContext, UIReducer } from './';

export interface UIState {
  sideBarIsOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

export interface ReactChil {
  children: JSX.Element;
}

const UI_INITIAL_STATE: UIState = {
  sideBarIsOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<ReactChil> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideBar = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };
  const closeSideBar = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI - isAddingEntry', payload: isAdding });
  };
  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: 'UI - isDragging', payload: isDragging });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideBar,
        closeSideBar,
        setIsAddingEntry,
        setIsDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
