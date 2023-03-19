
import './App.css';
import {useState, useEffect} from 'react'
const BASE_URL = 'http://localhost:3001'
function App() {
  let [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [popupActive, setPopupActive] = useState(false)
  const getTodos = async() =>{
    const res = await fetch(BASE_URL + '/todos')
    const data = await res.json()
    await setTodos(data)
  }
  const addTask = async() =>{
    const res = await fetch(BASE_URL + '/todo/new', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        text: newTodo
      })
    })
    const data = await res.json()
    setTodos([...todos, data]);
    setNewTodo('')
    setPopupActive(false)
  }
  const completeTodo = async(id) =>{
    const res = await fetch(BASE_URL + '/todo/complete/' + id)
    const data = await res.json()
    setTodos(todos => todos.map(todo =>{
      if(todo._id === data._id) {
        todo.complete = data.complete
      }
      return todo
    }))
  }
  const deleteTodo = async(id) => {
    const res = await fetch(BASE_URL + '/todo/delete/' +id, {
      method:'DELETE'
    })
    const data =await res.json()

    setTodos(todos => todos.filter(todo =>(
      todo._id !== data._id
    )))
  }
  const toggleInput = () =>{
      setPopupActive(!popupActive)
  }
  useEffect(() =>{
    getTodos()
  }, [])
  return (
    <div className="App">
      <h1 className="greetings">Welcome, Brilliant</h1>
      <h3 className="title">Your tasks</h3>
      <div className="todos">
        {
          todos.map(todo => (
            <div 
            key={todo._id} 
            className={"todo" + (todo.complete ? " is-complete" : '')}>
            <div className="checkbox"></div>
            <div className="task-text" onClick={() => completeTodo(todo._id)}>{todo.text}</div>
            <div className="complete-btn" onClick={() =>{
              deleteTodo(todo._id)
            }}>x</div>
          </div>
          ))
        }
       
      </div>
        <div className={popupActive ? 'form' : 'no-show'}>
          <div className="close" onClick={toggleInput}>x</div>
          <h3 className="form-title">New task</h3>
          <input className="todo-input" placeholder='type task' onChange={e => setNewTodo(e.target.value)} value={newTodo} />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>
        <div className="create-todo" onClick={toggleInput}>+</div>
    </div>
  );
}

export default App;
