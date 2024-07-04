import React, { Component } from 'react';
import'./TaskInput.css'

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      task: event.target.value
    });
  }

  handleAddTask = (event) => {
    event.preventDefault();
    this.props.onAddTask(this.state.task);
    this.setState({
      task: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleAddTask}>
        <input type="text" value={this.state.task} onChange={this.handleInputChange} placeholder="Enter a task" className='inputfield'/>
        <button type="submit" className='addtask'>Add Task</button>
      </form>
    );
  }
}

export default TaskInput;