import React, { useEffect, useState } from 'react'
import TodoList from './Todo/TodoList';
import Loader from './Loader';
import Context from './context';
import Modal from './Modal/Modal';

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos)
        setLoading(false)
      })
  }, [])

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
        return todo
      })
    )
    
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addTodo = (title) => {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={{removeTodo, toggleTodo}}>
      <div className='wrapper'> 
        <Modal/>
        <React.Suspense fallback={<p>loading</p>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        {loading && <Loader/>}
        <hr/>
        {todos.length 
          ? <TodoList todos={todos}/> 
          : (
            loading ? null : <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
