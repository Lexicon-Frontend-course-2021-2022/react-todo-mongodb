/******************************************************************************
 @file TodoItem.js
 @brief Class TodoItem

 Let's try to tag this source and see if we can wrangle Doxygen to generate a
 decent documentation for JavaScript. That would be cool!
 *****************************************************************************/

import React, { Component } from "react";

/** @brief Style button */
const btnStyle = {
  background: '#555',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  outline: 'none',
  cursor: 'pointer',
  float: 'right'
};

/******************************************************************************
 @brief TodosItem Class
 *****************************************************************************/
class TodoItem extends Component {

  /** @brief Style component dependent on completed state */
  todoStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px dotted #ccc',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    };
  };

  /** @brief Render component */
  render() {

    /* Convenience */
    const { completed, _id, title } = this.props.todo;
    const deleteTodo = this.props.deleteTodo.bind(this, _id);
    const toggleCompleted = this.props.toggleCompleted.bind(this, this.props.todo);

    /* Render component */
    return (
      <div style={this.todoStyle()}>
        <p>
          <input type='checkbox'
            onChange={toggleCompleted}
            checked={completed}
          />

          {' '}

          {title}

          <button onClick={deleteTodo} style={btnStyle}>X</button>
        </p>
      </div>
    )
  }
};



export default TodoItem;