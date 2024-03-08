import {MdDeleteForever} from 'react-icons/md';
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';
import { NoteList } from './NoteList';
import { NoteTitle } from './NoteTitle';

export function Note({note, deleteNote, editNote}){

    const handleDelete = () => {
        deleteNote(note.id);
      };

      const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
    return <div className='note'>
    
     <NoteTitle {...note} title = {note.title} key = {note.id} deleteNote={deleteNote} editNote = {editNote} />
            
       
        
        <div className="note-footer">
               
            <small>{formattedDate}</small>
            <MdDeleteForever  className='delete-icon' size="1.3rem" onClick={handleDelete}/>
        </div>
    </div>
};

