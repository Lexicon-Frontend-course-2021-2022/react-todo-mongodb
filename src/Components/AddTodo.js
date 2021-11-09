/******************************************************************************
 @file AddTodo.js
 @brief Class AddTodo

 Let's try to tag this source and see if we can wrangle Doxygen to generate a
 decent documentation for JavaScript. That would be cool!
 *****************************************************************************/

import React, { Component } from "react";

/******************************************************************************
 @brief AddTodo Class
 *****************************************************************************/
class AddTodo extends Component {

  /** @brief Constructor */
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.addTodo = this.props.addTodo.bind(this)

    this.state = {
      title: ''
    }
  }

  /** @brief Event onSubmit */
  onSubmit = e => {
    e.preventDefault();
    this.addTodo(this.state.title); /* props drilling? */
    this.setState({ title: '' });
  };


  /** @brief Event onChange */
  onChange = e => {
    this.setState({ title: e.target.value });
  }

  /** @brief Render component */
  render() {
    return (
      <form style={{ display: 'flex' }} onSubmit={this.onSubmit}>

        <input type='text'
          name='title' placeholder='Add todo...'
          style={{ flex: '10', padding: '5px' }} value={this.state.title}
          onChange={this.onChange}
        />

        <input type='submit'
          value='Submit' className='btn' style={{ flex: '1' }}
        />

      </form>
    );
  }
};

export default AddTodo;