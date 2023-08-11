import React, { useContext } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DeleteContext } from "../context/DeleteContext";
import { EditContext } from "../context/EditContext";


function TaskDetail({ task, setCurrentTask }) {
  
  const editContext = useContext(EditContext);
  const deleteContext = useContext(DeleteContext);

  //Handles the click event of edit button
  const handleEdit = () => {
    editContext.setIsOpen(true);
    setCurrentTask(task);
  };

  //Handles the click event of delete button
  const askDlt = () => {
    deleteContext.setIsOpen(true);
    setCurrentTask(task);
  };

  return (
    <>
      <div className="task-details fade-in">
        <h4>{task.title}</h4>
        <p>
          {formatDistanceToNow(new Date(task.updatedAt), {
            addSuffix: true,
          })}
        </p>
        <span className='editBtn' onClick={handleEdit}><AiFillEdit /></span>
        <span className="delelteBtn" onClick={askDlt}>
          <AiFillDelete />
        </span>
      </div>
    </>
  );
}

export default TaskDetail;
