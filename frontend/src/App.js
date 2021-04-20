import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import CreateQuiz from './CreateQuiz'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/create-quiz' component={CreateQuiz}/>
          <Route exact path='' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
