import React,{useState} from 'react'

// IN Function Component => whole function is render
// React check old and new state on the basic of reference(address) => if it is change => render call(whole function run), otherwise no render call
// useState line run only one time => first time when app start , React run useState line.
function Uswo() {
    console.log('render');
    // run one time => app start
    const [msgObj,setMsgObj] =useState({message:'',id:1});

    const handleChange = (e)=>{
        // *********wrong approch*********
    //   msgObj.message = e.target.value;
    //   setMsgObj(msgObj);
    //   console.log(msgObj);

    // ***************************
    
    let obj ={...msgObj,message:e.target.value}//shallow copy;
    // ...msgbj => shallow copy of obj
    // second argument => changed vlaue

    setMsgObj(obj);

    }

    return (
        <div>
            <input value={msgObj.message} onChange={handleChange} type='text' placeholder='Type your message'></input>
            <p>{msgObj.message}</p>
         
        </div>
    )
}

export default Uswo
