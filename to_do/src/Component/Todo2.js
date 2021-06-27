// import react
import React, { Component } from 'react'
//class component => it extends Component class
export default class Todo extends Component {
    // constructor call
    constructor() {
        // call parent constructor
        super();
        // create state
        this.state = {
            tasks: [{ id: 1, txt: 'First task' }, { id: 2, txt: 'Second Task' },
            { id: 3, txt: 'Third Task' }],
        }
    }
    // function that call when we click on add button
    handleClick = (task) => {
        // if task is not enter
        if (task == "") {
            alert("enter task")
        }

        else {
            // create new array of object and add new object
            let nta = [...this.state.tasks,
            { id: this.state.tasks.length + 1, txt: task }];
            // change state 
            // setState => it render the part of web page in which chnage occur
            this.setState({
                tasks: nta
            })
        }
    }
    // function call when we click on delete button
    onDelete = (id) => {
        // create new array of object =>filter used
        let nta = this.state.tasks.filter(obj => {
            return obj.id != id
        })
        // set state
        this.setState({
            tasks: nta
        })

    }
    // render part
    render() {
        // return
        return (
            <>
                <InputComponent handleClick={this.handleClick} />
                <TaskList tasks={this.state.tasks}
                    onDelete={this.onDelete} />
            </>
        )
    }
}
// child class component
class InputComponent extends Component {
    // call constructor => with parameter 
    // props is a object
    constructor(props) {
        // call parent constructor
        super(props);
        // set state 
        this.state = {
            currTask: ''
        }
    }
    // when we enter text in input => function call
    handleChange = (e) => {
        this.setState({ currTask: e.target.value })
    }
    // render => change part
    render() {

        return (
            <div className='input-container'>
                <input type='text' value={this.state.currTask}
                    onChange={this.handleChange} ></input>
                <button onClick={() => {
                    this.props.handleClick(this.state.currTask);
                    this.setState({ currTask: '' })
                }} >
                    Add</button>
            </div>
        )
    }
}
// child class component
class TaskList extends Component {
    // constructor
    constructor(props) {
        // call constructor
        super(props);
    }
    render() {
        return (
            <div className='class-list'>
                <ul>
                    {
                        this.props.tasks.map(task => (
                            <li key={task.id}>
                                <h1>{task.txt}</h1>
                                <button
                                    onClick={() => this.props.onDelete(task.id)} >Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
