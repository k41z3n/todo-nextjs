import { FC, useReducer } from 'react';

import { UIContext, UIReducer } from './';

export interface UIState {
  sideBarIsOpen: boolean;
}

export interface ReactChil {
  children: JSX.Element;
}

const UI_INITIAL_STATE: UIState = {
  sideBarIsOpen: false,
};

export const UIProvider: FC<ReactChil> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideBar = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };
  const closeSideBar = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };

  return (
    <UIContext.Provider value={{ ...state, openSideBar, closeSideBar }}>
      {children}
    </UIContext.Provider>
  );
};
