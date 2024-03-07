import {MdDeleteForever} from 'react-icons/md';
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';
import { NoteList } from './NoteList';
import { NoteTitle } from './NoteTitle';

export function Note({note, deleteNote, editNote}){
    return <div className='note'>
    
     <NoteTitle {...note} title = {note.title} key = {note.id} deleteNote={deleteNote} editNote = {editNote} />
            
       
        
        <div className="note-footer">
      
            <small>2/23/24</small>
            <MdDeleteForever  className='delete-icon' size="1.3rem" />
        </div>
    </div>
};

