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
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
    this.completeTodo = this.completeTodo.bind(this)
    this.renderCompletedList = this.renderCompletedList.bind(this)

    this.state = {
      uid: null,
      todos:{}
    }
  }

  componentDidMount(){
    base.onAuth((user) =>{
      if(user){
        this.authHandler(null, { user })
      }
    })
  }

  renderLogin(){
    return (
      <div>
        <h2>Login</h2>
        <button className="github" onClick={()=>this.authenticate('github')}> Login with GitHub</button>
      </div>
    )
  }
  authenticate(provider){
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler(err, authData){
    this.setState({uid : authData.user.uid})
    if(err){
      console.log(err);
      return;
    }
    this.ref = base.syncState(`/users/${this.state.uid}`, {
      context: this,
      state: 'todos'
  });
  }

  logout(){
    base.unauth()
    this.setState({uid: null})
  }

  addTodo(todo){
    const date = Date.now()
    const todos = {...this.state.todos}
    todos[date] = todo
    todos[date].id = date
    todos[date].done = false
    this.setState({todos})
  }
  updateTodo(key, newText){
    const todos = {...this.state.todos}
    todos[key].title = newText
    this.setState({todos})
  }
  completeTodo(key){
    const todos = {...this.state.todos}
    todos[key].done = true;
    this.setState({todos})
  }
  removeTodo(key){
    const todos = {...this.state.todos}
    todos[key] = null
    this.setState({todos})
  }
  eachTodo(key){
    if (!this.state.todos[key].done) {
        return <Todos updateTodo={this.updateTodo} completeTodo={this.completeTodo} key={key} removeTodo={this.removeTodo} todo={this.state.todos[key]}></Todos>
    }
  }

  renderTodoList(){
    let note = ""
    const logout = <button>Log Out</button>
    if (Object.keys(this.state.todos).length<1) {
       note = <h1>Add some todos!</h1>
    }
    return (<div>
            <AddTodoForm addTodo={this.addTodo}></AddTodoForm>
            {logout}
            <div>
              {Object.keys(this.state.todos).map(key => this.eachTodo(key))}
            </div>
            {note}
          </div>)
  }
  renderCompletedList(){
    return(
      <div>
          <h2>Completed Todos</h2>
          {Object.keys(this.state.todos).map(key => this.eachTodo(key))}
      </div>
    )
  }
  render(){
    //check if not logged in
      if(!this.state.uid){
        return this.renderLogin()
        }
    return <div>
        {this.renderTodoList()}
        {this.renderCompletedList()}
      </div>
  }
}

export default TodoList
