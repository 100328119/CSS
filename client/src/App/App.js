import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from "react-router-dom";

// import style
import './style/App.css';

// import components
import Homepage from './pages/Homepage';
import About from './pages/About';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  showNavList = () => {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
      </Switch>
    )
  }

  render() {
    const appTitle = 'My Project';

    return (
      <React.Fragment>
        <CssBaseline />
        <Dashboard content={this.showNavList} title={appTitle} className='App' />
      </React.Fragment>
    );
  }
}

export default App;