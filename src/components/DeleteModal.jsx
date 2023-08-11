import React, { useContext } from "react";
import { DeleteContext } from "../context/DeleteContext";
import { useTasksContext } from "../hooks/useTaskContext";

function DeleteModal({ setCurrentTask, currentTask, baseURL,setIsDel }) {
  const deleteContext = useContext(DeleteContext);
  const { dispatch } = useTasksContext();
 
  //Handles the NO option on delete prompt
  const handleNo = () => {
    deleteContext.setIsOpen(false);
  };

  //Handles the Yes option on delete prompt
  const handleDlt = async () => {
    setIsDel(true);
    const response = await fetch(
        baseURL + "/api/tasks/" + currentTask._id,
        {
          method: "DELETE",
        }
      );
  
      const json = await response.json();
  
      if (response.ok) {
        dispatch({ type: "DELETE_TASK", payload: json });
      }
      deleteContext.setIsOpen(false);
      setCurrentTask(null);
      setIsDel(false);
  }

  return (
    <>
      <div>       
            <h2>Are you sure you want to delete this task?</h2>
            <div className="delOptions">
              <button onClick={handleDlt}>Yes</button>
              <button onClick={handleNo}>No</button>
            </div>
      </div>
    </>
  );
}

export default DeleteModal;