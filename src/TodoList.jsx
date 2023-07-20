import { useState } from "react"
import List from '@mui/material/List';
import TodoItem from "./TodoItem";
import TodoListForm from "./TodoListForm";
import rand from "./util";
import { useEffect } from "react";
import Button from '@mui/material/Button';
function getInitialTodo(){
  let data=JSON.parse(localStorage.getItem('todo'))
  if(!data)return [];
  return data;
}
let initialTodo=getInitialTodo();
export default function TodoList(){
    let [todo,setTodo]=useState(initialTodo)
    useEffect(()=>{
      localStorage.setItem('todo',JSON.stringify(todo))
    },[todo])
    function removeTodo(id){
      setTodo((currTodo)=> currTodo.filter((t)=> {
        return t.id !== id
      })
        
        
      )
      // normal method :-let newTodo=todo.filter((t)=> {
      //   return t.id !== id
      // })
      // setTodo(newTodo)
    }
    function toggleTodo(id){
      setTodo((currTodo)=> currTodo.map((t)=> {
        let x=t.completed
        if(t.id === id){
          return {...t,['completed']:!x}
        }else{
          return t
        }
      }))
    }
    function updateTodo(newTodo){
      let obj={id:crypto.randomUUID(),text:newTodo,completed:false};
      setTodo([...todo,obj])
    }
    function newForm(){
      setTodo([])
    }
    return(
      <div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todo.map((t)=>{
                 return <TodoItem todo={t} key={t.id} remove={removeTodo} toggle={toggleTodo}/>
               
            })}
        </List>
        <TodoListForm update={updateTodo}/>
        <Button variant="outlined" onClick={newForm}>new Todo List</Button>
        {/* <button >new Todo List</button> */}
        </div>
    );
}