import React, { useReducer, useEffect, useState, Fragment } from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListTasks from './ListTasks';
import Modal from 'react-modal';
import { ChromePicker } from 'react-color';
import { ImTextColor } from 'react-icons/im';
import uuid from 'react-uuid'
import '../CSS/styles.css';
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SHOW_ALL = 'SHOW_ALL';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SHOW_UNCOMPLETED = 'SHOW_UNCOMPLETED';
export const ToDoContext = React.createContext();
const taskReducer = (state, action) => {
  switch(action.type){
    case ADD_TODO : {
      const todos = [action.task, ...state.todos]
      return{...state, todos}
    }
    case REMOVE_TODO : {
      const todos = state.todos.filter( task => task.id!==action.id && task)
      return {...state, todos}
    }
    case UPDATE_TODO : {
      //Object.assign({},task,{name: action.task.name})
      const todos = state.todos.map( task => task.id===action.task.id ? {...task, name: action.task.name} : task)
      return {...state, todos}
    }
    case TOGGLE_TODO : {
      //Object.assign({},task,{completed: !action.task.completed})
      const todos = state.todos.map( task => task.id===action.task.id ? {...task, completed: !action.task.completed}: task)
      return {...state, todos}
    }
    case SHOW_COMPLETED : {
      return {...state, filter: SHOW_COMPLETED}
    }
    case SHOW_UNCOMPLETED : {
      return {...state, filter: SHOW_UNCOMPLETED }
    }
    case SHOW_ALL: {
      return {...state, filter: SHOW_ALL}
    }
    default: return state;
  }
}
const filterReducer = (state) =>{
  switch (state.filter) {
    case SHOW_COMPLETED : {
      return  state.todos.filter( task => task.completed && task);
    }
    case SHOW_UNCOMPLETED : {
      return  state.todos.filter( task => !task.completed && task);
    }
    case SHOW_ALL: {
      return state.todos
    }

  }
}
const ToDoList = () =>{
  const [ state, dispatch ] = useReducer(taskReducer, {
    currentUser: null,
    todos: [],
    filter: SHOW_ALL
  });
  const [ isColor, setIsColor ] = useState(false);
  const [ color, setColor ] = useState('#000080');

  /*Add task to the list*/
  const addTask = (input) =>{
    let task = input.target.parentNode.firstElementChild.value;
    console.log(color);
    dispatch({
      type: ADD_TODO,
      task: {id:uuid(), name:task, completed: false, color:color}

    })
    input.target.parentNode.firstElementChild.value = '';
  }
  /*Remove task from the list*/
const deleteTask = (givenId) =>{
  dispatch({
    type: REMOVE_TODO,
    id: givenId
  })
}
/*Update task from list*/
const updateTask = (updatedTask) =>{
  dispatch({
    type:UPDATE_TODO,
    task: updatedTask
  })
}
/*Toggle toDo if task is done*/
const doneUndoneTask = (updatedTask) =>{
  dispatch({
    type: TOGGLE_TODO,
    task: updatedTask
  })
}
const applyFilter = (filter) =>{
  dispatch({
    type:filter
  })
}
const getData = () =>{
  if(state.filter===SHOW_COMPLETED)
 {
    return filterReducer(state);
 }else if(state.filter===SHOW_UNCOMPLETED)
 {
   return filterReducer(state);
 }else
 {
   return filterReducer(state);
 }
}
toast.configure();
const notify = () =>{
  toast('Loading color table!',{position: toast.POSITION.TOP_CENTER})
}
const colorTable = () =>{
  // setIsColor(isColor => !isColor )
  notify()
  setTimeout( () => setIsColor(isColor => !isColor ),5000)

}
  return(
      <section className = 'container'>
        <h1>To Do List with UseReducer Hook</h1>
        <div className = 'add-task'>
          <Tippy content ='Enter task'><input type='text' placeholder = "Add task" /></Tippy>
          <Tippy content ='Choose color to highlight the task'><span><ImTextColor style = {{fontSize:"20px"}} onClick = {()=> colorTable()}/></span></Tippy>
          <Tippy content ='Add task to the list'><input type = 'submit' value = 'Add task' onClick = {(e) => (e.target.parentNode.firstElementChild.value) && addTask(e)}/></Tippy>
          <Tippy content ='Show tasks by undo and done'>
            <select name = 'filter' className = 'filterClass'  onChange = {(e) => applyFilter(e.target.value)}>
              <option  value = {SHOW_ALL}>Show all</option>
              <option  value = {SHOW_COMPLETED}>Show completed</option>
              <option value = {SHOW_UNCOMPLETED}>Show uncompleted</option>
            </select>
          </Tippy>
        </div>
        <Modal  isOpen = {isColor}>
          <div className = 'colorModal'>
           <ChromePicker  color = {color} onChange = {(color) => setColor(color.hex)}/>
           <input className = 'color-input' type = 'submit' value = 'Update Color'  onClick =  {()=> setIsColor(isColor => !isColor )}/>
          </div>
        </Modal>
        <ToDoContext.Provider value = {{getData, deleteTask, updateTask, doneUndoneTask }}>
          <ListTasks   filter = {state.filter}/>
        </ToDoContext.Provider>
     </section>
  )
}
export default ToDoList;
