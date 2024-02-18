export function TodoItem({completed, id, title, toggleTodo, deleteTodo}){
    return (
    <li>
    <label htmlFor="singleInput">
     
      <input className="singleInput" type="checkbox" checked={completed}
      onChange={e =>toggleTodo(id, e.target.checked)}  />  
      
      <span className="singleInput">
     {title}
     </span>
    
     <button className="singleInput button" onClick={() => deleteTodo(id)} 
      id="deleteButton">Delete</button>
    </label>

   
</li>
    )
}