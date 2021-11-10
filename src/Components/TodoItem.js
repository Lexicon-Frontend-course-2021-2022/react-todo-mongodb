/******************************************************************************
 @file TodoItem.js
 @brief Class TodoItem

 Let's try to tag this source and see if we can wrangle Doxygen to generate a
 decent documentation for JavaScript. That would be cool!
 *****************************************************************************/

import React, { Component } from "react";


/******************************************************************************
 @brief TodosItem Class
 *****************************************************************************/
class TodoItem extends Component {

  /** @brief Style component dependent on completed state */
  todoStyle = () => {
    return {
      padding: '10px',
      borderBottom: '1px dotted #ccc',
    };
  };

  /** @brief Render component */
  render() {

    /* Convenience */
    const { completed, title } = this.props.todo;
    const deleteTodo = this.props.deleteTodo.bind(this, this.props.todo);
    const toggleCompleted = this.props.toggleCompleted.bind(this, this.props.todo);

    /* Render component */
    return (
      <div style={this.todoStyle()}>
        <p>

          <span className='checkbox' onClick={toggleCompleted}>
            {completed ? '☑' : '☐'}
          </span>


          {' '}
          <span style={{ textDecoration: this.props.todo.completed ? 'line-through' : 'none' }}>
            {title}
          </span>

          <button onClick={deleteTodo} className="btn delete">X</button>

        </p>
      </div >
    )
  }
};



export default TodoItem;