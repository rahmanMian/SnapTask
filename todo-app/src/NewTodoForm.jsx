import { useState } from "react";
import "./styles.css"

export function NewTodoForm({setCount, addNote}){
    //addtodo function from app
    

    //usestate for entering new values
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e){
        e.preventDefault();
       if(newItem  === "") return
       addNote(newItem)
       //addFunc(newItem)
       setCount(count=> count + 1)
       setNewItem("")
      }

  return(
     <>
    
    <form onSubmit={handleSubmit} className="new-item-form">
    
    <div className="form-row">
     <input  id = "addInput" placeholder="Add a note..." value={newItem} onChange={e=> setNewItem(e.target.value)}/>
     <button id="addButton" type = "submit" className="button">Add</button>
    </div>
    
    
</form>
</>
  )
}