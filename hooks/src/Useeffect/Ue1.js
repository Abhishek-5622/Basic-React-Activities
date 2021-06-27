// Life Cycl =>  ComponentDidMount ComponentDidUpdat, ComponentWillUnmount
// useEffect provides the above functionality in functional Components

// **SYNTAX**
// useEffect(()=>{
    //  execute your functionality whatever it is
// },optional dependency array)

//  3 variation of  useEffect

// **** 1st variation (componentDidMount + componentDidUpdate) **** 
// => it after every render
// => componentDidMount, it call after 1st render
// => componentDidUpdate, it call all rennder except first.
// render run them useEffect run 

import React,{useEffect,useState} from 'react'

function Ue1() {
   
    const [count,setCount] =useState(0);
    useEffect(()=>{
        console.log('useEffect');
        document.title = `Clicked ${count} times`;
    })
    console.log('render');
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>setCount(count+1)} >Click Me</button>
        </div>
    )
}

export default Ue1