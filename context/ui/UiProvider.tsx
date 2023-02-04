import { PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

const setIsAddingEntry = (isAdding: boolean) => dispatch({ type: 'UI - Toggle Adding Entry', payload: isAdding});

const startDragging = () => dispatch({ type: 'UI - Start Dragging'});
const stopDragging = () => dispatch({ type: 'UI - Stop Dragging'});

  return (
    <UIContext.Provider value={{
       ...state,
       setIsAddingEntry,
       startDragging,
       stopDragging
    }}>
        { children }
    </UIContext.Provider>
  )
};