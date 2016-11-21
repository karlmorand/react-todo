import React, { Component } from 'react';
import Todos from './Todos'
import AddTodoForm from './AddTodoForm'
import base from './base'
import Dragula from 'react-dragula'


class TodoList extends Component {
  constructor(){
    super()
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.eachTodo = this.eachTodo.bind(this)
    this.renderTodoList = this.renderTodoList.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.dragulaDecorator = this.dragulaDecorator.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)

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
    this.ref = base.syncState(`User - ${this.state.uid}`, {
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
    const logout = <button>Log Out</button>
    if (Object.keys(this.state.todos).length<1) {
       note = <h1>Add some todos!</h1>
    }
    return (<div>
            <AddTodoForm addTodo={this.addTodo}></AddTodoForm>
            {logout}
            <div ref={this.dragulaDecorator} className='container'>
              {Object.keys(this.state.todos).map(key => this.eachTodo(key))}
            </div>
            {note}
          </div>)
  }
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };

  render(){
    //check if not logged in
      if(!this.state.uid){

        return <div>{this.renderLogin()}</div>
        }
    return this.renderTodoList()
  }
}

export default TodoList
