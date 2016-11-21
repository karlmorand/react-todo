import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
class Todos extends Component {
  constructor(){
    super()
    this.deleteTodo = this.deleteTodo.bind(this)
    this.edit = this.edit.bind(this)
    this.update = this.update.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
    this.state = {
      editing: false
    }
  }
  deleteTodo(){
    this.props.removeTodo(this.props.todo.id)
  }
  edit(){
    this.setState({editing: true})
  }
  update(){
    this.props.updateTodo(this.props.todo.id, this.refs.newText.value)
    this.setState({editing: false})
  }
  renderDisplay(){
    return(
      <li>
        <span className="todo-item">{this.props.todo.title}</span>
        <Button onClick={this.deleteTodo}>X</Button>
        <Button onClick={this.edit}>Edit</Button>
      </li>
    )
  }
  renderEdit(){
    return (
    <li>
      <input type="text" ref="newText" defaultValue={this.props.todo.title}/>
      <Button onClick={this.update}>Update</Button>
    </li>
    )
  }
  render(){
    return (this.state.editing)? this.renderEdit(): this.renderDisplay()

  }
}

export default Todos
