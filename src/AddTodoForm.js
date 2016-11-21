import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

class AddTodoForm extends Component {
  constructor(){
    super()
    this.createTodo = this.createTodo.bind(this)

  }
  createTodo(event){
    event.preventDefault()
    const newTodo = {"title": this.todoToAdd.value}
    this.props.addTodo(newTodo)
    this.todoForm.reset()
  }

  render(){
    return(
      <form ref={(input) => this.todoForm = input} onSubmit={(e) => this.createTodo(e)}>
        <input type="text" autoFocus ref={(input) => this.todoToAdd = input} placeholder="New Todo"/>
        <Button type="submit">Add Todo</Button>
      </form>
    )
  }
}





export default AddTodoForm
