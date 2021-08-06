import React,{useReducer} from 'react'

const ACTIONS={
    INCREMENT:'increment',
    DECREMENT:'decrement',
    RESET:'reset'
}
function reducer(count,action)
{
    switch(action.type)
    {
        case ACTIONS.INCREMENT:
            return count+1;
        case ACTIONS.DECREMENT:
            return count-1;
        case ACTIONS.RESET:
            return 0;
        default:
            return count;
    }

}
function Reducer() {
    const[count,dispathch]=useReducer(reducer,0);

    return (
        <div>
            <span>{count}</span>
            <button onClick={()=>dispatchEvent({type:ACTIONS.INCREMENT})}></button>
            <button onClick={()=>dispatchEvent({type:ACTIONS.DECREMENT})}></button>
            <button onClick={()=>dispatchEvent({type:ACTIONS.RESET})}></button>
        </div>
    )
}

export default Reducer
