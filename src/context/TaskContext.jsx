import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };

    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((t) => t._id !== action.payload._id),
      };

    case "EDIT_TASK":
      const reqID = action.payload._id; 
  
      return {
        tasks: state.tasks.map(t => {
          if(t._id === reqID){
            return action.payload;
          } else {
            return t;
          }
        }),
      };
      
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null,
  });

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};