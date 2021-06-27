import Movies from './Component/Movies'
import About from './Component/About';
import Home from './Component/Home';
import Navbar from './Component/NavBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <>
<BrowserRouter>
<Navbar></Navbar>
  <Switch>
  <Route exact path='/' component={Home}/>
  <Route path='/movies' component={Movies}/>
  <Route path='/about' render={(props)=>{ return <About {...props} isAuth={true} />}}/>
  </Switch>
  </BrowserRouter>
  </>
  );
}

export default App;
