import { createContext } from 'react';

interface contextProps {
  sideBarIsOpen: boolean;
  isAddingEntry: boolean;
  //METHODS
  openSideBar: () => void;
  closeSideBar: () => void;
  setIsAddingEntry: (x: boolean) => boolean;
}

export const UIContext = createContext({} as contextProps);
