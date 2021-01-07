import React, {useState,  Fragment, useContext} from 'react';
import Modal from 'react-modal';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import {TiDeleteOutline} from 'react-icons/ti';
import { VscEdit } from 'react-icons/vsc';
import { ToDoContext } from './ToDoList.js';
const Task = ({task, show,  id, completed, color}) =>{
  const [ updatedTask, setUpdatedTask ] = useState({
    id: id,
    name: task,
    completed: completed
  })
  const [isModal,setIsModal] = useState(false);
  const { deleteTask, updateTask, doneUndoneTask } = useContext(ToDoContext);
  return(
    <Fragment>
        <h3 style = {{color:`${color}`}}>{task}</h3>
        <div className = 'icons'>
          <VscEdit onClick ={()=> setIsModal(isModal => !isModal)}/>
          <TiDeleteOutline className = 'deleteIcon' onClick = {()=> deleteTask(id)}/>
          {
            show=== 'SHOW_ALL' && (completed ? <ImCheckboxChecked onClick = {() => doneUndoneTask(updatedTask)}/> : <ImCheckboxUnchecked onClick = {() => doneUndoneTask(updatedTask)}/>)
          }
        </div>
      <Modal isOpen={isModal} onRequestClose = {()=> setIsModal( isModal => !isModal)}>
        <form className = 'update-task' onSubmit =  {() => {
          updateTask(updatedTask)
          setIsModal( isOpen => !isOpen)
        }}>
          <input className = 'update-input' type='text' placeholder = "Edit task" value = {updatedTask.name} onChange = {(e) => setUpdatedTask( {...updatedTask, name: e.target.value})} contentEditable="true" />
          <input className = 'update-input' type = 'submit' value = 'Update' />
        </form>
      </Modal>
    </Fragment>
  )
}
export default Task;
