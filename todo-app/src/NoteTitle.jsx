export function NoteTitle({title, id, deleteNote}){


    const handleDelete = () => {
        deleteNote(id);
      };

    return(
        <>
           <h1>{title}</h1>
           <button className="singleInput button" onClick={handleDelete}  
           id="deleteButton">Delete</button>

   </>

    )
}