/******************************************************************************
 @file App.js
 @brief Class App

 Let's try to tag this source and see if we can wrangle Doxygen to generate a
 decent documentation for JavaScript. That would be cool!
 *****************************************************************************/
import React from 'react';
import './App.css';

import AddTodo from './Components/AddTodo';
import Todos from './Components/Todos';


import * as Realm from 'realm-web';
// import TodoItem from './Components/TodoItem';

const REALM_APP_ID = 'application-0-sjscn';



/******************************************************************************
 @brief App Class
 *****************************************************************************/
class App extends React.Component {

  /** @brief Component state */
  state = {
    todos: [],

  };

  app = null;
  user = null;
  db = null;

  /** @brief Lifecycle */
  async componentDidMount() {

    /* Connect to db */
    this.app = new Realm.App({ id: REALM_APP_ID })
    this.user = await this.app.logIn(Realm.Credentials.anonymous());
    this.db = await this.user.mongoClient('mongodb-atlas').db('db0').collection('collection0');

    /* Populate todos from db */
    if (this.db) {
      this.setState({
        todos: await this.db.find()
      })
    }

  }

  /** @brief Add Todo */
  addTodo = title => {

    /* Add item to db */
    this.db.insertOne({
      title, completed: false
    })
      .then(res => {
        this.db.find()
          .then(res => {

            /* Update state */
            this.setState(
              {
                todos: res
              });
          });
      });
  };

  /** @brief Toggle completed state */
  toggleCompleted = todo => {

    /* Toggle state object first, to make toggles more responsive */
    todo.completed = !todo.completed;
    this.setState(state => state);

    /* Then, actually update db */
    this.db.updateOne(
      {
        _id: todo._id
      },
      {
        completed: todo.completed,
        title: todo.title
      },
      {}
    )
      /* Catch db update error */
      .catch(res => {
        this.db.find()
          .then(res => {
            this.setState(
              {
                todos: res
              });
          });
      });

  };

  /** @brief Delete todo */
  deleteTodo = _id => {

    /* Remove item from db */
    this.db.deleteOne(
      {
        _id
      }, {}
    )
      .then(res => {
        this.db.find()
          .then(res => {

            /* Update state */
            this.setState(
              {
                todos: res
              });
          });
      });
  }

  /** @brief Render component */
  render() {
    return (
      <div className="App">
        <div className="container">

          <Todos
            todos={this.state.todos}
            toggleCompleted={this.toggleCompleted}
            deleteTodo={this.deleteTodo}
          />

          <AddTodo
            addTodo={this.addTodo}
          />

        </div>
      </div>
    );

  }

};

export default App;
