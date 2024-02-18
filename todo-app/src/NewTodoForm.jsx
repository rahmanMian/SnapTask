import { useState } from "react";
export function NewTodoForm({addFunc}){
    //addtodo function from app
    addFunc  

    //usestate for entering new values
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e){
        e.preventDefault();
       if(newItem  === "") return
       addFunc(newItem)
      
       //reset item to empty after adding to list
       setNewItem("")
       
      }

  return(
     <>
    
    <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input value={newItem} onChange={e=> setNewItem(e.target.value)}/>
    </div>
    <button className="button">Add task</button>
</form>
</>
  )
}