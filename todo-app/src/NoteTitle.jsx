import { useState} from "react";


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

    return(
        <>
         <textarea id="noteTitle"  type="text" value= {newItem} onChange={handleEdit}/>

           <button className="singleInput button" onClick={handleDelete}  
           id="deleteButton">Delete</button>

   </>

    )
}