import React, { Component } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      count: 0,
    };
  }

  componentDidMount() {
    const storedTasks = localStorage.getItem('todoList');
    if (storedTasks) {
      this.setState({
        tasks: JSON.parse(storedTasks),
        count: JSON.parse(storedTasks).length
      });
    }
  }

  handleAddTask = (task) => {
    this.setState((prev) => ({
      tasks: [...this.state.tasks, task],
      count: prev.count + 1
    }));
  }

  handleDeleteTask = (index) => {
    this.setState((prev) => ({
      tasks: this.state.tasks.filter((task, i) => i !== index),
      count: prev.count - 1
    }));
    localStorage.setItem("todoList", JSON.stringify(this.state.tasks.filter((task, i) => i !== index)));
  }

  handleEditTask = (index, task) => {
    this.setState({
      tasks: this.state.tasks.map((t, i) => i === index ? task : t)
    });
  }

  savetToLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(this.state.tasks));
  }

  render() {
    const { count } = this.state
    return (
      <div className='todo-container'>
        <h1>Todo App</h1>
        <div className='inputform'>
          <TaskInput onAddTask={this.handleAddTask} />
        </div>
        <p>Total Tasks: {count}</p>
        <div className='task-list'>
          <TaskList tasks={this.state.tasks} onDeleteTask={this.handleDeleteTask} onEditTask={this.handleEditTask} />
        </div>
        <button className='addtask' onClick={this.savetToLocalStorage}>Save</button>
      </div>
    );
  }
}

export default App;