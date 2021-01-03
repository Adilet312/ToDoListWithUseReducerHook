import React, { useReducer, useEffect, Fragment } from 'react';
import ListTasks from './ListTasks';
import Modal from 'react-modal';
import uuid from 'react-uuid'
import '../CSS/styles.css';
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const taskReducer = (state, action) => {
  switch(action.type){
    case ADD_TODO : {
      const todos = [action.task, ...state.todos]
      return {...state, todos}
    }
    case REMOVE_TODO : {
      const todos = state.todos.filter( task => task.id!==action.id && task)
      return  {...state, todos}
    }
    case UPDATE_TODO : {
      //Object.assign({},task,{name: action.task.name})
      const todos = state.todos.map( task => task.id===action.task.id ? {...task, name: action.task.name} : task)
      return  {...state, todos}
    }
    case TOGGLE_TODO : {
      //Object.assign({},task,{completed: !action.task.completed})
      const todos = state.todos.map( task => task.id===action.task.id ? {...task, completed: !action.task.completed}: task)
      return  {...state, todos}
    }
    default: return state;
  }
}

const ToDoList = () =>{
  const [ state, dispatch ] = useReducer(taskReducer, {
    currentUser: null,
    todos: [],
    filter: 'SHOW_ALL'
  });
  /*Add task to the list*/
  const addTask = (input) =>{
    let task = input.target.previousElementSibling.value;
    dispatch({
      type: ADD_TODO,
      task: {id:uuid(), name:task, completed: false}

    })
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
  return(
      <section>
        <div className = 'add-task'>
          <input type='text' placeholder = "Add task" />
          <input type = 'submit' value = 'Add task' onClick = {(e) => addTask(e)}/>
        </div>
        <ListTasks tasks = {state.todos} deleteTask = {deleteTask} updateTask = {updateTask} doneUndoneTask = {doneUndoneTask}/>
     </section>
  )
}
export default ToDoList;
