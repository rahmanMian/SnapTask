import { useState, useEffect} from "react";


export function NoteTitle({title, id, deleteNote, editNote}){

    const [newItem, setNewItem] = useState(title); 

    const handleEdit = (e) => {
        const newTitle = e.target.value;
        setNewItem(newTitle); // Update the state with the new title
        editNote(id, newTitle); // Call editTodo function to update title in parent component
      };

    const handleDelete = () => {
        deleteNote(id);
      };

      useEffect(() => {
        const textarea = document.getElementById("textarea_" + id);
        
       
        if (textarea) {
          textarea.style.height = "auto"; // Reset the height to auto to calculate the new height
          textarea.style.width = "auto";
          textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
          textarea.style.width = newItem.length*20 + "px";
        }
      }, [newItem]);

    return(
      <span id="textPan"> 
      <textarea   className="titleInput" id={"textarea_" + id} type="text" value= {newItem} onChange={handleEdit}  />
    </span>
   
    )
}