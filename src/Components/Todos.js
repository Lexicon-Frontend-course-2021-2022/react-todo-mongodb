/******************************************************************************
 @file Todos.js
 @brief Class Todos

 Let's try to tag this source and see if we can wrangle Doxygen to generate a
 decent documentation for JavaScript. That would be cool!
 *****************************************************************************/

import React, { Component } from "react";
import TodoItem from './TodoItem';

/******************************************************************************
 @brief Todos Class
 *****************************************************************************/
class Todos extends Component {

  /** @brief Render component */
  render() {

    return (

      this.props.todos.map(todo => {
        if (todo) {

          return (
            <TodoItem
              toggleCompleted={this.props.toggleCompleted}
              deleteTodo={this.props.deleteTodo}
              todo={todo}
              key={todo.uuid}
            />
          );

        } else {

          return "";

        }

      })
    );

  };

};

export default Todos;