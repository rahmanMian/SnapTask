import { useState } from "react";
import "./styles.css"

export function NewTodoForm({addFunc, setCount}){
    //addtodo function from app
    

    //usestate for entering new values
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e){
        e.preventDefault();
       if(newItem  === "") return
       addFunc(newItem)
       setCount(count=> count + 1)
       setNewItem("")
       
      }

  return(
     <>
    
    <form onSubmit={handleSubmit} className="new-item-form">
    
    <div className="form-row">
     <input  id = "addInput" placeholder="Add a task..." value={newItem} onChange={e=> setNewItem(e.target.value)}/>
     <button id="addButton" className="button">Add</button>
    </div>
    
    
</form>
</>
  )
}