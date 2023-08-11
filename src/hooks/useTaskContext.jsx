import { TaskContext } from "../context/taskContext";
import { useContext } from "react";

export const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw Error(
      "useTaskContext must be used inside a Task context provider"
    );
  }

  return context;
};