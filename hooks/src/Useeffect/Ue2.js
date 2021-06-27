// 2nd variation (componentDidMount)
// => useEffect call after 1st render in this variation.
// empty array is used to indicate componentDidMount.
import React,{useEffect,useState} from 'react'
function Ue2() {
   const [movies,setMovies] =useState([]);
    const [count,setCount] =useState(0);
    useEffect(()=>{
        console.log('useEffect');
        document.title = `Clicked ${count} times`;
        // n/w request
        // movies state ko set krata
    },[])
    console.log('render');
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>setCount(count+1)} >Click Me</button>
        </div>
    )
}

export default Ue2