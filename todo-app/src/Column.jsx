import React from 'react'
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import { Note } from "./Note";


const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 700px;
    height: 900px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid gray;
`;


const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;

const TaskList = styled.div`
    padding: 3px;
    transistion: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({title, tasks, id, notes,deleteNote,editNote,todos,addTodo,toggleTodo,deleteTodo,editTodo}) {
  return (
  <Container className='column'>
        <Title
        style={{
            backgroundColor: "lightblue",
            position: "stick",
        }}
        >
            {title}
        </Title>
        <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <TaskList
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
                    </TaskList>
                )}
            </Droppable>
  </Container> 
  );
}
