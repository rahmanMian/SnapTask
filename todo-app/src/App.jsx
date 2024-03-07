
import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import todoLogo from "./assets/todologo.png"
import { TodoItem } from "./TodoItem"
import {NoteList} from "./NoteList"
import { Note } from "./Note"




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

  
  const [notes, setNotes] = useState(() => {
    try {
      const localValue = localStorage.getItem('NOTES');
      if (localValue === null) return [];
      return JSON.parse(localValue);
    } catch (error) {
      console.error('Error parsing notes from localStorage:', error);
      return []; // Return an empty array in case of parsing error
    }
  });
  


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  },[todos])

  useEffect(() => {
    localStorage.setItem('COUNT', count);
  }, [count]);


  useEffect(() => {
    localStorage.setItem("NOTES", JSON.stringify(notes))
}, [notes]);

    

function addNote(title) {
  setNotes(currentNotes => {
 
    return [...currentNotes, 
      {id: crypto.randomUUID(), title: title}
    ]
  })
  


}


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

function editNote(id, newTitle) {

  setNotes(currentNotes => {
    return currentNotes.map(note => {
      if (note.id === id) {
        return { ...note, title: newTitle }; // Update only the title
      }
      return note;
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

    function deleteNote(id){
      setNotes(notes=> {
        return notes.filter(note => note.id !== id)
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
   <NewTodoForm addFunc={addTodo} setCount={setCount} addNote={addNote}  notes={notes} todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} deleteNote={deleteNote} editNote={editNote}  />
   </div>

  {/* <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>*/}

   <div className="noteContainer">
    <div className="notes">
    {notes.map((note) => (
    <Note key = {note.id} note={note} deleteNote={deleteNote} editNote={editNote}/>
    ))}
   </div>
   </div>
   
    </>
    )
}

