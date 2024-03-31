import React from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column";

export default function KanbanBoard({ toDoNotes, doneNotes, backlogNotes,setNotes, setToDoNotes, setDoneNotes, setBacklogNotes, editStatusNote, deleteNote, editNote, todos, addTodo, toggleTodo, deleteTodo, editTodo }) {
    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        // If dropped outside the list or in the same position, return
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }
    
        // Determine the source and destination columns based on droppableId
        let sourceColumn, destinationColumn;
        switch (source.droppableId) {
            case "to-do":
                sourceColumn = toDoNotes;
                break;
            case "done":
                sourceColumn = doneNotes;
                break;
            case "backlog":
                sourceColumn = backlogNotes;
                break;
            default:
                break;
        }
    
        switch (destination.droppableId) {
            case "to-do":
                destinationColumn = toDoNotes;
                break;
            case "done":
                destinationColumn = doneNotes;
                break;
            case "backlog":
                destinationColumn = backlogNotes;
                break;
            default:
                break;
        }
    
        // Remove the dragged note from the source column
        const draggedNote = sourceColumn[source.index];
    
        // If the source and destination columns are different
        if (source.droppableId !== destination.droppableId) {
            // Remove the dragged note from the source column
            const updatedSourceColumn = [...sourceColumn.slice(0, source.index), ...sourceColumn.slice(source.index + 1)];
    
            // Insert the dragged note at the new position in the destination column
            const updatedDestinationColumn = [...destinationColumn.slice(0, destination.index), draggedNote, ...destinationColumn.slice(destination.index)];
    
            // Update the state of the destination column notes array
            switch (destination.droppableId) {
                case "to-do":
                    setToDoNotes(updatedDestinationColumn);
                    editStatusNote(draggableId,"to-do");
                    break;
                case "done":
                    setDoneNotes(updatedDestinationColumn);
                    editStatusNote(draggableId,"done");
                    break;
                case "backlog":
                    setBacklogNotes(updatedDestinationColumn);
                    editStatusNote(draggableId,"backlog");
                    break;
                default:
                    break;
            }
    
            // Update the state of the source column notes array
            switch (source.droppableId) {
                case "to-do":
                    setToDoNotes(updatedSourceColumn);
                    break;
                case "done":
                    setDoneNotes(updatedSourceColumn);
                    break;
                case "backlog":
                    setBacklogNotes(updatedSourceColumn);
                    break;
                default:
                    break;
            }
        } else {
            // If the source and destination columns are the same, just update the position of the note
            const updatedColumn = [...sourceColumn.slice(0, source.index), ...sourceColumn.slice(source.index + 1)];
            updatedColumn.splice(destination.index, 0, draggedNote);
    
            // Update the state of the source column notes array
            switch (source.droppableId) {
                case "to-do":
                    setToDoNotes(updatedColumn);
                    break;
                case "done":
                    setDoneNotes(updatedColumn);
                    break;
                case "backlog":
                    setBacklogNotes(updatedColumn);
                    break;
                default:
                    break;
            }
        }
    };
    
  

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanbanCon" style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <Column
                    title="To Do"
                    id="to-do"
                    notes={toDoNotes}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
                <Column
                    title="Done"
                    id="done"
                    notes={doneNotes}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
                <Column
                    title="Backlog"
                    id="backlog"
                    notes={backlogNotes}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
            </div>
        </DragDropContext>
    );
}
