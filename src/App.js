import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList'

class App extends Component {
  render() {
    return (
<div className="container">
  <TodoList></TodoList>
</div>
    );
  }
}

export default App;
