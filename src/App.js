import React, { useState, useEffect } from 'react';
import './App.css';
// Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // USE EFFECT
  useEffect(() => {
    getLoadState();
  }, []);
  
  useEffect(() => {
    filterHandler();
    saveLoadState();
  }, [todos, status]);
  //Events
  const filterHandler = () => {
    switch (status) {
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
  };

  const saveLoadState = () => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  };

  const getLoadState = () => {
    if(localStorage.getItem('todoList') === null){
      localStorage.setItem('todoList', JSON.stringify([]));
    } else {
      let todoList = JSON.parse(localStorage.getItem('todoList'));
      setTodos(todoList);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Asitha's Todo List {inputText}</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />

      <TodoList
        status={status}
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
