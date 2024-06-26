import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating unique IDs
import { NewTodoForm } from "./NewTodoForm";
import { Note } from "./Note";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import KanbanBoard from "./Kanban";
import logo from "./assets/todonotes.svg";
export default function App() {



    /**
     * DOCKERIZE PLEAES
     *
     * 
     */

    const [toDoNotes, setToDoNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('TODO');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing notes from localStorage:', error);
            return [];
        }
    });

   

    const [doneNotes, setDoneNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('DONE');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing notes from localStorage:', error);
            return [];
        }
    });


    const [backlogNotes, setBacklogNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('BACKLOG');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing notes from localStorage:', error);
            return [];
        }
    });


    const [notes, setNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('NOTES');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing notes from localStorage:', error);
            return [];
        }
    });

    
        useEffect(() => {
            localStorage.setItem("BACKLOG", JSON.stringify(backlogNotes));
        }, [backlogNotes]); // Listen for changes in the 'notes' array
        
  

    useEffect(() => {
        localStorage.setItem("TODO", JSON.stringify(toDoNotes));
    }, [toDoNotes]);


    useEffect(() => {
        localStorage.setItem("DONE", JSON.stringify(doneNotes));
        }, [doneNotes]);
    
  


    
    const [count, setCount] = useState(() => {
        const storedValue = localStorage.getItem('COUNT');
        
        return storedValue ;
    });

    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS");
        if (localValue === null) return [];
        return JSON.parse(localValue);
    });

 

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('COUNT', count);
    }, [count]);

    useEffect(() => {
        localStorage.setItem("NOTES", JSON.stringify(notes));
    }, [notes]);

    function addNote(title) {
        const newNote = {
            id: uuidv4(), // Generate unique ID for note
            title: title,
            status: ""
        };
    
        let b = backlogNotes.length;
        let d = doneNotes.length;
        let t = toDoNotes.length;
    
        // Find the minimum count among the categories
        const min = Math.min(b, d, t);
    
        // Assign status based on the minimum count
        if (min === t) {
            newNote.status = "to-do";
            setToDoNotes(prevNotes => [...prevNotes, newNote]);
        } else if (min === d) {
            newNote.status = "done";
            setDoneNotes(prevNotes => [...prevNotes, newNote]);
        } else if (min === b) {
            newNote.status = "backlog";
            setBacklogNotes(prevNotes => [...prevNotes, newNote]);
        } else {
            newNote.status = ""; // Default to "to-do" if count state is not divisible by 3
        }
    }
    



    function addTodo(title, noteID) {
        const newTodo = {
            id: uuidv4(), // Generate unique ID for todo
            title: title,
            completed: false,
            noteID: noteID
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }

    function editTodo(id, newTitle) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            )
        );
    }

    function editNote(id, newTitle, status) {
        switch (status) {
            case "to-do":
              
            setToDoNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === id ? { ...note, title: newTitle } : note
                )
            );
                break;
            case "done":
                setDoneNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === id ? { ...note, title: newTitle } : note
                    )
                );
                break;
            case "backlog":
                setBacklogNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === id ? { ...note, title: newTitle } : note
                    )
                );
                break;
            default:
                newNote.status = ""; // Default to "to-do" if count state is not divisible by 3
                break;
        }
    
    }

    function editNoteStatus(id, status) {

        switch (status) {
            case "to-do":
              
            setToDoNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === id ? { ...note, status: status } : note
                )
            );
         
                break;
            case "done":
                setDoneNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === id ? { ...note, status: status } : note
                    )
                );
                break;
            case "backlog":
                setBacklogNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === id ? { ...note, status: status } : note
                    )
                );
                break;
            default:
                break;
        }
        
    }

    function toggleTodo(id, completed) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: completed } : todo));
    }

    function deleteTodo(id) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    function deleteNote(id,status) {
        switch (status) {
            case "to-do":
            setToDoNotes(prevNotes => prevNotes.filter(note => note.id !== id));
                break;
            case "done":
                setDoneNotes(prevNotes => prevNotes.filter(note => note.id !== id));
                break;
            case "backlog":
                setBacklogNotes(prevNotes => prevNotes.filter(note => note.id !== id));
                break;
        }

        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        setCount(prevCount => prevCount - 1);
    }


    return (
        <>
        
            <div className="headContainer">
                <img title="Logo" src={logo}></img>
                <h1 className="header">SnapTask</h1>
            </div>
            <div className="formContainer">
                <NewTodoForm setCount={setCount} addNote={addNote} />
            </div>
        
                         <KanbanBoard notes = {notes} toDoNotes= {toDoNotes} doneNotes={doneNotes} backlogNotes = {backlogNotes} 
                                                  setToDoNotes={setToDoNotes}
                                                  setDoneNotes={setDoneNotes}
                                                  setBacklogNotes={setBacklogNotes}
                                                  setNotes={setNotes}
                                                  editStatusNote={editNoteStatus}  
                                                  deleteNote={deleteNote}
                                                    editNote={editNote}
                                                    todos={todos}
                                                    addTodo={addTodo}
                                                    toggleTodo={toggleTodo}
                                                    deleteTodo={deleteTodo}
                                                    editTodo={editTodo}/>               
        </>
    )
    };
