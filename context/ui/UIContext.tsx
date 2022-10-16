import { createContext } from 'react';

interface contextProps {
  sideBarIsOpen: boolean;
  //METHODS
  openSideBar: () => void;
  closeSideBar: () => void;
}

export const UIContext = createContext({} as contextProps);
