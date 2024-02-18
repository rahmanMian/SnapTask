import { useState } from "react";

export function TodoItem({completed, id, title, toggleTodo, deleteTodo, editTodo}){
  const [newItem, setNewItem] = useState(title); 

  const handleEdit = (e) => {
    const newTitle = e.target.value;
    setNewItem(newTitle); // Update the state with the new title
    editTodo(id, newTitle); // Call editTodo function to update title in parent component
  };

  
    return (
    <li>
    <label htmlFor="singleInput">
     
      <input className="singleInput" type="checkbox" checked={completed}
      onChange={e =>toggleTodo(id, e.target.checked)}  />  
      
      <span className="singleInput">
       <textarea type="text" value= {newItem} onChange={handleEdit}  />
         
     </span>
    
     <button className="singleInput button" onClick={() => deleteTodo(id)} 
      id="deleteButton">Delete</button>
    </label>
</li>
    )
}