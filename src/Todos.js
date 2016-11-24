import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap'
class Todos extends Component {
  constructor(){
    super()
    this.deleteTodo = this.deleteTodo.bind(this)
    this.edit = this.edit.bind(this)
    this.update = this.update.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
    this.complete = this.complete.bind(this)
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
  complete(){
    this.props.completeTodo(this.props.todo.id)
  }
  update(){
    this.props.updateTodo(this.props.todo.id, this.refs.newText.value)
    this.setState({editing: false})
  }
  renderDisplay(){
    return(
      <div>
        <p className="todo-item">{this.props.todo.title}</p>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button onClick={this.complete}>Complete</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.deleteTodo}>Delete</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.edit}>Edit</Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    )
  }
  renderEdit(){
    return (
    <div>
      <input type="text" ref="newText" defaultValue={this.props.todo.title}/>
      <Button onClick={this.update}>Update</Button>
    </div>
    )
  }
  render(){
    return (this.state.editing)? this.renderEdit(): this.renderDisplay()

  }
}

export default Todos
