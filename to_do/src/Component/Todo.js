import React, { Component } from 'react'

export default class extends Component {
    constructor(props)
    {
super(props);
this.state={
    tasks:[{id:1,txt:"First Task"},{id:2,txt:"Second Task"},{id:3,txt:"Third Task"}],
    currTask:""
}
    }
    handleChange=(e)=>
    {
        let cval=e.target.value;
        this.setState({currTask:cval});
    }
    handleClick=()=>{
        let nta = [...this.state.tasks,{id:this.state.tasks.length+1,txt:this.state.currTask}];
        this.setState(
            {
                tasks:nta,
                currTask:""
            }
        )
    }
    onDelete =(id)=>{
        let nta = this.state.tasks.filter(obj=>{
            return obj.id!=id
        })
        this.setState({
            tasks:nta
        })

    }
    render() {
        return (
            <div>
               <div className="input-container">
                   <input onChange={this.handleChange} type="text" value={this.state.currTask}></input>
                   <button onClick={this.handleClick}>Add</button>
               </div>
               <div className="class-list">
                   <ul>
                       {
                           this.state.tasks.map(task=>
                            (
                                <li>
                                    <h1>{task.txt}</h1>
                                    <button onClick={()=>{this.onDelete(task.id)}}>Delete</button>
                                </li>
                            ))
                       }
                   </ul>
               </div>
            </div>
        )
    }
}
