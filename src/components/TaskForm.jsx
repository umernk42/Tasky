import React, { useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";

function TaskForm({baseURL}) {
  const {dispatch} = useTasksContext();
  const [title,setTitle] = useState(''); 
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState(false);

  //Handles the submit event of new task creation
  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = { title};

    const response = await fetch(baseURL+"/api/tasks", {
      method: "POST",
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
      setTitle("");
      setEmptyField(false)
      setError(null);
      console.log("New Workout Added: ", json);
      dispatch({
        type: 'CREATE_TASK',
        payload: json
      })

    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className= {emptyField ? 'error': '' }
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default TaskForm;