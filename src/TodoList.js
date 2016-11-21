import React, { Component } from 'react';
import Todos from './Todos'
import AddTodoForm from './AddTodoForm'
import base from './base'


class TodoList extends Component {
  constructor(){
    super()
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.eachTodo = this.eachTodo.bind(this)
    this.renderTodoList = this.renderTodoList.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.state = {
      todos:{}
    }
  }
  componentWillMount(){
    this.ref = base.syncState('todos', {
      context: this,
      state: 'todos'
  });
  }

  addTodo(todo){
    const date = Date.now()
    const todos = {...this.state.todos}
    todos[date] = todo
    todos[date].id = date
    this.setState({todos})
  }
  updateTodo(key, newText){
    const todos = {...this.state.todos}
    todos[key].title = newText
    this.setState({todos})
  }
  removeTodo(key){
    const todos = {...this.state.todos}
    todos[key] = null
    this.setState({todos})
  }
  eachTodo(key){
    return <Todos updateTodo={this.updateTodo} key={key} removeTodo={this.removeTodo} todo={this.state.todos[key]}></Todos>
  }

  renderTodoList(){
    let note = ""
    if (Object.keys(this.state.todos).length<1) {
       note = <h1>Add some todos!</h1>
    }
    return (<div>
            <AddTodoForm addTodo={this.addTodo}></AddTodoForm>
            <ul>
              {Object.keys(this.state.todos).map(key => this.eachTodo(key))}
            </ul>
            {note}
          </div>)
  }
  render(){
    return this.renderTodoList()
  }
}

export default TodoList
