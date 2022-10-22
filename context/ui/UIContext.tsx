import { createContext } from 'react';

interface contextProps {
  sideBarIsOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  //METHODS
  openSideBar: () => void;
  closeSideBar: () => void;

  setIsAddingEntry: (isAddingEntry: boolean) => void;

  setIsDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as contextProps);
