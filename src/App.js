import React from 'react';
import Nav from './Components/Nav/Nav'
import routes from './routes'
import { withRouter } from 'react-router-dom'
import './App.css';

function App(props) {
  //props is needed as an argument to use withRouter for location
  return (
    <div className="App">
      {/* you need props.location to see your pathname, you then use a ternary to check if you are looking at Auth, if you are Nav is null, otherwise you can see Nav */}
      {props.location.pathname === '/' ? null : <Nav />}
      {routes}
    </div>
  );
}

export default withRouter(App);
