import { useState, useEffect } from "react";

export function TodoItem({completed, id, title, toggleTodo, deleteTodo, editTodo}){
  const [newItem, setNewItem] = useState(title); 

  const handleEdit = (e) => {
    const newTitle = e.target.value;
    setNewItem(newTitle); // Update the state with the new title
    editTodo(id, newTitle); // Call editTodo function to update title in parent component
  };
 
  useEffect(() => {
    const textarea = document.getElementById("textarea_" + id);
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto to calculate the new height
      textarea.style.width = "auto";
      textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
      textarea.style.width = textarea.scrollWidth + "px";
    }
  }, [newItem]);


  
    return (
    <li>
    
     
      <input id="checkInput" className="singleInput" type="checkbox" checked={completed}
      onChange={e =>toggleTodo(id, e.target.checked)}  />  
      <span className="singleInput">
        
       <textarea  id={"textarea_" + id} type="text" value= {newItem} onChange={handleEdit}  />
     </span>
    
     <button className="singleInput button" onClick={() => deleteTodo(id)} 
      id="deleteButton">Delete</button>
   
</li>
    )
}