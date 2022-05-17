import React, { useState, useEffect } from "react";
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";

// Todo list
// https://www.youtube.com/watch?v=pCA4qpQDZD8&t=2559s

function App() {
 
  // States nedan
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


   //Use once when app starts
   useEffect(() => {
    getLocalTodos();
  }, []);


   // useEffect nedan
   useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos, status]);

 
  // Functions nedan
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
        default:
          setFilteredTodos(todos);
          break;
    }
  }

  // Save to local storage
  const saveLocalTodos = () => {
       localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
     let todoLocal = JSON.parse(localStorage.getItem('todos'));
     setTodos(todoLocal);
    }
  };
  




  return (
    <div className="App">
      <header>
        <h1>Rilles ToDo List</h1>

      </header>

      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      
      />
      <TodoList 
      setTodos={setTodos}
      todos={todos}
      filteredTodos={filteredTodos}
      />
   


    </div>
  );
}

export default App;
