import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean,

    // Methods
    openSideMenuFn: () => void,
    closeSideMenuFn: () => void,
}

export const UIContext = createContext({} as ContextProps);