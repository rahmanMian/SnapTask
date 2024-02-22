
import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import todoLogo from "./assets/todologo.png"
import { TodoItem } from "./TodoItem"




export default function App() {
  //states immuntable
  
  const [count, setCount] = useState(() => {
      // Retrieve the number from local storage or default to 0
      const storedNumber = localStorage.getItem('COUNT');
      return storedNumber ? parseInt(storedNumber, 10) : 0;
  })

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    
    if (localValue == null) return []
    return JSON.parse(localValue)
  })




  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  },[todos])

  useEffect(() => {
    localStorage.setItem('COUNT', count);
  }, [count]);
    
 

function addTodo(title){
  setTodos(currentTodos =>{
    return [
      ...currentTodos,
      {id:crypto.randomUUID(), title: title, completed:false},
    ]
   })
}


function editTodo(id, newTitle) {

  setTodos(currentTodos => {
    return currentTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle }; // Update only the title
      }
      return todo;
    });
  });
}


    function toggleTodo(id, completed) {
      setTodos(currentTodos => {
        return currentTodos.map(todo => {
          if (todo.id === id){
            return {...todo,completed}
          }
          return todo
        })
      })
    }

    
    function deleteTodo(id) {
      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
      })
    }



  return (
  <>
  
  <div className="headContainer">
    <div className="lineGrid">
     <hr></hr>
     <hr></hr>
     <hr></hr>
     <hr></hr>
    </div>
   <img title="logo" src={todoLogo} />
   <h1 className="header">Todo List</h1>
   </div>
  
  <div className="formContainer">
    
   <NewTodoForm addFunc={addTodo} setCount={setCount}  />
   </div>

   <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
   
    </>)
}

