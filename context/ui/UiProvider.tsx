import { PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuOpen: boolean,
    isAddingEntry: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false
}

export const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

const openSideMenuFn = () => dispatch({ type: 'UI - Open Sidebar'});
const closeSideMenuFn = () => dispatch({ type: 'UI - Close Sidebar'});
const setIsAddingEntry = (isAdding: boolean) => dispatch({ type: 'UI - Toggle Adding Entry', payload: isAdding});

  return (
    <UIContext.Provider value={{
       ...state,
       openSideMenuFn,
       closeSideMenuFn,
       setIsAddingEntry
    }}>
        { children }
    </UIContext.Provider>
  )
};