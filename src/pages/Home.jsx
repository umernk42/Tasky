import React, { useEffect, useContext, useState } from "react";
import { EditContext } from "../context/EditContext";
import EditForm from "../components/EditForm";
import { useTasksContext } from "../hooks/useTaskContext";
import TaskDetail from "../components/TaskDetail";
import TaskForm from "../components/TaskForm";
import { DeleteContext } from "../context/DeleteContext";
import DeleteModal from "../components/DeleteModal";
import Loading from "../components/Loading";

function Home({ baseURL }) {
  const editContext = useContext(EditContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, dispatch } = useTasksContext();
  const [currentTask, setCurrentTask] = useState(null);
  const [isDel, setIsDel] = useState(false);
  const deleteContext = useContext(DeleteContext);

  //Get all the exiting workouts and displays on screen on load
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(baseURL + "/api/tasks");
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_TASKS",
          payload: json,
        });
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  //For the delete modal close button
  const closeDelModal = () => {
    deleteContext.setIsOpen(false);
  };

  //For page load when tasks are being fetched from mongo DB
  if (isLoading) {
    return <Loading loadingText="Loading..." />;
  }

  //For the edit modal close button
  const onClose = () => {
    editContext.setIsOpen(false);
    setCurrentWorkout(null);
  };

  return (
    //Displays the workouts
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => {
            return (
              <TaskDetail
                key={task._id}
                task={task}
                setCurrentTask={setCurrentTask}
              />
            );
          })}
      </div>
      <TaskForm baseURL={baseURL} />

      {/* Controls the display of  Edit modal*/}    
      {editContext.isOpen ? (
        <div className="modal">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="modal-content">
            {isEditing ? (
              <Loading loadingText="Saving Changes..." />
            ) : (
              <EditForm
                setCurrentTask={setCurrentTask}
                currentTask={currentTask}
                baseURL={baseURL}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        </div>
      ) : null}

      {/* Controls the display of  Delete modal*/} 
      {deleteContext.isOpen ? (
        <div className="modal">
          <span className="close" onClick={closeDelModal}>
            &times;
          </span>
          <div className="modal-content">
            {isDel ? (
              <Loading loadingText="Deleting..." />
            ) : (
              <DeleteModal
                setCurrentTask={setCurrentTask}
                currentTask={currentTask}
                baseURL={baseURL}
                setIsDel={setIsDel}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
