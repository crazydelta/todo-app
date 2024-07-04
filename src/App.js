import React, { Component } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //list that maintains all the tasks
      count: 0,  //keeps a track of how many tasks are present
    };
  }

  //retrieving the data that is saved in the local storage and updating the state accordingly
  componentDidMount() {
    const storedTasks = localStorage.getItem('todoList');
    if (storedTasks) {
      this.setState({
        tasks: JSON.parse(storedTasks),
        count: JSON.parse(storedTasks).length
      });
    }
  }

  //handles adding of task to the tasks list
  handleAddTask = (task) => {
    this.setState((prev) => ({
      tasks: [...this.state.tasks, task],
      count: prev.count + 1
    }));
  }

  //filters out the deleted list items and shows the undeleted ones
  handleDeleteTask = (index) => {
    this.setState((prev) => ({
      tasks: this.state.tasks.filter((task, i) => i !== index),
      count: prev.count - 1
    }));
    localStorage.setItem("todoList", JSON.stringify(this.state.tasks.filter((task, i) => i !== index)));
  }

  //updates the task when edited
  handleEditTask = (index, task) => {
    this.setState({
      tasks: this.state.tasks.map((t, i) => i === index ? task : t)
    });
  }

  //saving to the localstorage so that, even when the page is reloded the data would'nt be lost
  savetToLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(this.state.tasks));
  }

  render() {
    const { count } = this.state
    return (
      <div className='todo-container'>
        <h1>Todo App</h1>
        <div className='inputform'>
          //Component TaskInput is beign called and a function is beign sent to it as a prop
          <TaskInput onAddTask={this.handleAddTask} />
        </div>
        <p>Total Tasks: {count}</p>
        <div className='task-list'>
          //Component TaskList is beign called to get all the list items of tasks displayed with added functional buttons edit and delete
          <TaskList tasks={this.state.tasks} onDeleteTask={this.handleDeleteTask} onEditTask={this.handleEditTask} />
        </div>
        //when clicked the data will be stored to the local storage
        <button className='addtask' onClick={this.savetToLocalStorage}>Save</button>
      </div>
    );
  }
}

export default App;
