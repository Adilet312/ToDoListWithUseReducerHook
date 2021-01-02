import React from 'react';
import Task from './Task.js';
import uuid from 'react-uuid';
const style = { margin:"0 auto", width:"500px", display:"flex", flexDirection: "colum", justifyContent: "space-between"}
const ListTasks = ({tasks, deleteTask, updateTask, doneUndoneTask}) =>{
  return(
    <ul>
      {
        tasks.map( task => <li key = {uuid()} className = { task.completed && 'done'} ><Task task = {task.name} deleteTask = {deleteTask} id = {task.id} updateTask = {updateTask} completed = {task.completed} doneUndoneTask ={doneUndoneTask}/></li>)
      }
    </ul>
  )
}
export default ListTasks;
