import React, { useState,useContext } from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { EditContext } from "../context/EditContext";

function EditForm({setCurrentTask,currentTask,baseURL,setIsEditing}) {
  const editContext = useContext(EditContext);
  const {dispatch} = useTasksContext(); 
  const currentTitle = currentTask.title;
  const [title, setTitle] = useState(currentTitle);
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState(false);

  //Handles the submission of updated task
  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = {title};
    
    const response = await fetch(baseURL+"/api/tasks/"+currentTask._id, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyField(true);
    }

    if (response.ok) {
      setIsEditing(true);
      const updatedTask = await fetch(baseURL+"/api/tasks/"+currentTask._id, {
        method: "GET"
      });

      const updatedJson = await updatedTask.json();

      setTitle("");
      setEmptyField(false);
      editContext.setIsOpen(false);
      setError(null);
      setCurrentTask(null);

      dispatch({
        type: 'EDIT_TASK',
        payload: updatedJson
      });
      setIsEditing(false);
    }

  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Editing the workout </h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className= {emptyField ? 'error': '' }
      />

      <button>Save Changes</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default EditForm;