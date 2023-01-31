import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,

    // Methods
    openSideMenuFn: () => void,
    closeSideMenuFn: () => void,
    setIsAddingEntry: (isAdding: boolean) => void,
}

export const UIContext = createContext({} as ContextProps);