// import
import React,{useState,useEffect} from 'react'
import firebase from './firebase'

function Demo() {
    // get auth from firebase
    const auth = firebase.auth();
    // create set with its function and default value
    const [user,setUser]= useState(null);
    const[email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);

    // click on sign in button => check email and password
    const handleSubmit =async()=>{

        try{
            // set loading true
            setLoading(true)
            // wait for answer => 
            // signInWithEmailAndPassword => it is used to check email and password is correct or not
            let res = await auth.signInWithEmailAndPassword(email,password);
            // set user
            setUser(res.user);
            // set loading false
            setLoading(false);
        }
        // handle eeror
        catch(e){
            // set error message
            setError(e.message);
            // set timeout (for 2 min)
            setTimeout(()=>{
                setError('')
            },2000)
            // set loading false
            setLoading(false)
        }
        // set password
        setPassword('')
        // set email
        setEmail('')
    }
    // function : signout
    // It is aysn function
    const handleSignOut =async()=>{

        try{
            // set loading true
            setLoading(true);
            // sign out 
            let res = await auth.signOut();
            // set user to null
            setUser(null);
            // set loading
            setLoading(false)
        }
        // handle error
        catch(e){
            // set message
            setError(e.message);
            // set timeout
            setTimeout(()=>{
                setError('')
            },2000)
            // set loading to false
            setLoading(false)
        }
    }
    return (
        <>
        {/* if loading is true => h1 appear  */}
        {/* if loading false and user is null then div appear */}
        {loading?<h1>Please Wait.....Loading</h1>:user==null?
        <div>
            <label>
                Email:
                <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </label>
           <label>
               Password:
               <input type='text' value={password} onChange={(e)=>setPassword(e.target.value)}/>
           </label>
           <button onClick={handleSubmit}>Sign In</button>
           { error?<h1>{error}</h1>:<></> }
        </div>:
        //  if loading false and user is not null then signout option come
        <>
        <h2>{user.uid} is Signed In </h2>
        <button onClick={handleSignOut} >Sign Out</button>
        </>
        }
        </>
    )
        
}

export default Demo