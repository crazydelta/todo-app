import React, { Component } from 'react';
import './TaskList.css'

class TaskList extends Component {
  render() {
    return (
      <ol className='orderedlist'>
        {this.props.tasks.map((task, index) => (
          <li key={index} className='list-item'>
            <h4>{task}</h4>
            <div className='edit-delete-buttons'>
                <button onClick={() => this.props.onEditTask(index, prompt('Edit task:', task.text))} className='edit'>Edit</button>
                <button onClick={() => this.props.onDeleteTask(index)} className='delete'>Delete</button>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default TaskList;
