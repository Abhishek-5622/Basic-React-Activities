// useState is hooks
import React,{useState} from 'react'

function Demo() {
    //count ki state bnani h
    const [count,setCount] =useState(0);
    // const [ex,setEx] = useState('abcd');
    // count => name of the state
    // setCount => function that will be used to change the state
    // 0 in usestate => initial/default value of your state.

    // function
    const handleIncrement = (str)=>{
        console.log(str);
        setCount(count+1);
    }
    const handleDecrement =function(){
        setCount(count-1)
    }

    return (
        <div>
           <h1>{count}</h1>
           <button onClick={function(){handleIncrement('bogus')}} >+</button>
           <button onClick={handleDecrement} >-</button>
        </div>
    )
}

export default Demo