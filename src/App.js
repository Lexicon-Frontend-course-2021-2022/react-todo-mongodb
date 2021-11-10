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

/* uuid */
import { v4 as getUuid } from 'uuid';

/* db */
import * as Realm from 'realm-web';

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

    const todo = {
      title,
      uuid: getUuid(),
      completed: false
    };

    /* Update state object first for snappy feel */
    /* Don't mutate state object. Instead make a copy of todos and use setState() */
    const todos = [...this.state.todos, todo];
    this.setState({ todos });

    /* Add item to db */
    this.db.insertOne(todo)

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

  /** @brief Toggle completed state */
  toggleCompleted = todo => {

    /* New completed state */
    const completed = !todo.completed;

    /* Update state object first for snappy feel */
    /* Don't mutate state object. Instead make a copy of todos and use setState() */
    const todos = this.state.todos.map(item => {
      if (item.uuid === todo.uuid) {
        item.completed = completed;
      }
      return item;
    });

    this.setState({ todos });

    /* Then, actually update db */
    this.db.updateOne(
      {
        uuid: todo.uuid
      },
      {
        uuid: todo.uuid,
        completed,
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
  deleteTodo = todo => {

    const uuid = todo.uuid;

    /* Update state object first for snappy feel */
    /* Don't mutate state object. Instead make a copy of todos and use setState() */
    const todos = this.state.todos.filter(item => item !== todo);
    this.setState({ todos });

    /* Remove item from db */
    this.db.deleteOne(
      {
        uuid
      }, {}
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
