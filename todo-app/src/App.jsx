import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating unique IDs
import { NewTodoForm } from "./NewTodoForm";
import todoLogo from "./assets/todologo.png";
import { Note } from "./Note";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import KanbanBoard from "./Kanban";

export default function App() {

    const [toDoNotes, setToDoNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('TODO');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing todo notes from localStorage:', error);
            return [];
        }
    });

    const [doneNotes, setDoneNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('DONE');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing done notes from localStorage:', error);
            return [];
        }
    });

    const [backlogNotes, setBacklogNotes] = useState(() => {
        try {
            const localValue = localStorage.getItem('BACKLOG');
            if (localValue === null) return [];
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing Backlog notes from localStorage:', error);
            return [];
        }
    });



    useEffect(() => {
        localStorage.setItem("TODO", JSON.stringify(toDoNotes));
    }, [toDoNotes]);

    useEffect(() => {
        localStorage.setItem("DONE",  JSON.stringify(doneNotes));
    }, [doneNotes]);

    useEffect(() => {
        localStorage.setItem("BACKLOG", JSON.stringify(backlogNotes));
    }, [backlogNotes]);



    
    const [count, setCount] = useState(() => {
        const storedNumber = localStorage.getItem('COUNT');
        return storedNumber ? parseInt(storedNumber, 10) : 0;
    });

    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS");
        if (localValue === null) return [];
        return JSON.parse(localValue);
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
    
        // Add status property based on the count state
        switch (count % 3) {
            case 0:
                newNote.status = "to-do";
                setToDoNotes(prevNotes => [...prevNotes, newNote]);
                break;
            case 2:
                newNote.status = "done";
                setDoneNotes(prevNotes => [...prevNotes, newNote]);
                break;
            case 1:
                newNote.status = "backlog";
                setBacklogNotes(prevNotes => [...prevNotes, newNote]);
                break;
            default:
                newNote.status = ""; // Default to "to-do" if count state is not divisible by 3
                break;
        }
    
        
        setCount(prevCount => prevCount + 1);
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
                newNote.status = ""; // Default to "to-do" if count state is not divisible by 3
                break;
        }
        
    }

    function toggleTodo(id, completed) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: completed } : todo
            )
        );
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
            default:
             // Default to "to-do" if count state is not divisible by 3
                break;
        }

       
        setCount(prevCount => prevCount - 1);
    }



   
    
  

    return (
        <>
        
            <div className="headContainer">
                <div className="lineGrid">
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                </div>
                <img title="logo" src={todoLogo} />
                <h1 className="header">Todo List</h1>
            </div>
            <div className="formContainer">
                <NewTodoForm setCount={setCount} addNote={addNote} />
            </div>
        
                         <KanbanBoard toDoNotes= {toDoNotes} doneNotes={doneNotes} backlogNotes = {backlogNotes} 
                                                  setToDoNotes={setToDoNotes}
                                                  setDoneNotes={setDoneNotes}
                                                  setBacklogNotes={setBacklogNotes}
                                                  editStatusNote={editNoteStatus}  
                                                  deleteNote={deleteNote}
                                                    editNote={editNote}
                                                    todos={todos}
                                                    addTodo={addTodo}
                                                    toggleTodo={toggleTodo}
                                                    deleteTodo={deleteTodo}
                                                    editTodo={editTodo}/>               
        </>
    );
}
