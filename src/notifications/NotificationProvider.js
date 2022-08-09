import { createContext, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import Notification from './Notification';

const NotificationContext = createContext();

const NotificationProvider = (props) => {
  // Messages are stored on State. Reducer manages adding or removing notifications from state array based on action.type
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, action.payload];
      case 'REMOVE_NOTIFICATION':
        return state.filter((notification) => notification.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    // value={dispatch} give us access to Notification dispatcher everytime Context is used
    <NotificationContext.Provider value={dispatch}>
      <div className="notification-wrapper">
        {state.map((notification) => {
          return (
            <Notification
              dispatch={dispatch}
              key={notification.id}
              {...notification}
            />
          );
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

// Custom Hook for Notifications
export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  /*  Will always return an action with fixed type (ADD_NOTIFICATION)
      Requires type and message parameters
      Type: 'success' / 'info' / 'error'
      Message: string
  */
  return (type, message) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id: v4(), type, message },
    });
  };
};

export default NotificationProvider;
