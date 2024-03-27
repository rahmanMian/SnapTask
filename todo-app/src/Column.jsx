import React from 'react'
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import { Note } from "./Note";


const Container = styled.div`
    background-color: white;
    width: 100vw/3e;
    height:100vh;
    overflow:hidden;
    margin: 0;
    border: none;
`;





export default function Column({title, tasks, id, notes,deleteNote,editNote,todos,addTodo,toggleTodo,deleteTodo,editTodo}) {
  return (
  <Container className='column'>
       
        <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {notes.map((note, index) => (
                            <Note  key={note.id}
                            note={note}
                            deleteNote={deleteNote}
                            editNote={editNote}
                            todos={todos}
                            addTodo={addTodo}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
  </Container> 
  );
}
