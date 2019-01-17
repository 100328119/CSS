import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from "react-router-dom";

// import style
import './style/App.css';

// import components
import Homepage from './pages/Homepage';
import About from './pages/About';
import Dashboard from './components/Dashboard';
import Login from './components/login';
import SignUp from './components/signup';
import Test from './pages/test';
import Test2 from './pages/test2';
import Pre_Calendar from './components/pre-calendar';

class App extends React.Component {
  showNavList = () => {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/test2" component={Test2} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUp" render={()=> <SignUp /> }/>
        <Route exact path='/Pre_Calendar' component={Pre_Calendar}/>
      </Switch>
    )
  }

  render() {
    const appTitle = 'Coures Scheduler';

    return (
      <React.Fragment>
      <CssBaseline />
      <Dashboard content={this.showNavList} title={appTitle} className='App' />
      </React.Fragment>
    );
  }
}

export default App;
