import { UIState } from './';

type UIActionType = 
| { type: 'UI - Toggle Adding Entry', payload: boolean }
| { type: 'UI - Start Dragging'}
| { type: 'UI - Stop Dragging'};

export const uiReducer = ( state: UIState, action: UIActionType): UIState => {

   switch (action.type) {
      case 'UI - Toggle Adding Entry':
         return {
            ...state,
            isAddingEntry: action.payload
         }
      case 'UI - Start Dragging':
         return {
            ...state,
            isDragging: true
         }
      case 'UI - Stop Dragging':
         return {
            ...state,
            isDragging: false
         }
      default:
          return state;
   };
};