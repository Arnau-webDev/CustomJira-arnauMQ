import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean

    // Methods
    setIsAddingEntry: (isAdding: boolean) => void,
    startDragging: () => void,
    stopDragging: () => void
}

export const UIContext = createContext({} as ContextProps);