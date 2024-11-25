/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import './App.css'
import Navbar from "./component/Navbar"
import { v4 as uuidv4 } from 'uuid';
 

function App() {
  const[todo,setTodo]=useState("")
  const[todos,setTodos]=useState([])
  const[showFinished,setshowFinished]=useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  },[])

  const saveToLS =((params) =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  const handleAdd=()=>{
    setTodos([...todos,{id: uuidv4(),todo, isCompleted: false}])
    setTodo("")
  
  }
  const toggleFinished =(e)=>{
    setshowFinished(!showFinished)
  }
   const handleEdit=(e,id)=>{
      let t =todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      saveToLS()
   }
   const handleDelete =(e,id)=>{
     let newTodos =todos.filter(item=>{
      return item.id!==id
     });
     setTodos(newTodos)
    saveToLS()
   }
   const handleChange =(e)=>{
      setTodo(e.target.value)
       
   }
   const handleCheckbox =(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos =[...todos];
    newTodos[index].isCompleted =!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
   }

  return (
    <>
    <Navbar/>
     
    <div className="container">
      <h1>TaskFlow-Tasks to Accomplish</h1>
      <div className="add-container">
        <h2>Add a Todo</h2>
        <div className="input-container">
          <input onChange={handleChange} value={todo}  type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="savebut">Save</button>
        </div>
      </div>
      <input className="inputfinished" onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished
      <h2 style={{fontSize:'1.6rem',margin:'5px',marginLeft:'22px'}} >Your Todos</h2>
      <div className="todos">
        {todos.length===0 && <div style={{marginLeft:"22px",fontSize:'1.1rem'}}>No Todos to Displays</div>}
        {todos.map(item=>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className="display-container todo">
            <div className='text-container' >
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={todo.isCompleted}  id=""/>
              <div className={item.isCompleted?"line-through":""} style={{flexWrap:'wrap'}}>{item.todo}</div>
            </div>
            <div className='leftbutton'>
              <button onClick={(e)=>{handleEdit(e,item.id)}} className="editbut">Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="editbut">Delete</button>
            </div>
          </div>
          
        })}

      </div>
    </div>
     
       
    </>
  )
}

export default App
