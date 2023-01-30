import { PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false
}

export const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

const openSideMenuFn = () => dispatch({ type: 'UI - Open Sidebar'});
const closeSideMenuFn = () => dispatch({ type: 'UI - Close Sidebar'});

  return (
    <UIContext.Provider value={{
       ...state,
       openSideMenuFn,
       closeSideMenuFn
    }}>
        { children }
    </UIContext.Provider>
  )
};