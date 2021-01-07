import React, {useState,useContext} from 'react';
import { ToDoContext } from './ToDoList.js';
import Task from './Task.js';
import uuid from 'react-uuid';
const style = { margin:"0 auto", width:"500px", display:"flex", flexDirection: "colum", justifyContent: "space-between"}
const ListTasks = ({ filter}) =>{
const {getData} = useContext(ToDoContext)
  return(
    <ul>
      {
        getData().map( task => <li key = {uuid()} className = { task.completed && 'done'}><Task color = {task.color} task = {task.name} show = {filter}  id = {task.id} completed = {task.completed} /></li>)
      }
    </ul>
  )
}
export default ListTasks;
