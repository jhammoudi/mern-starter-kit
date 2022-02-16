import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Team 6</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Welcome to Team 6's Project!</h2>
}

function About() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>About Team 6</h2>

      <ul>
        <li>
          <Link to={`${match.url}/clarissa`}>
            Clarissa Gallardo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/daryl`}>
            Daryl Stronge
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/jason`}>
            Jason Fujii
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/joseph`}>
            Joseph Tyler Buenaventura
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/kami`}>
            Kami Sawekchim
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/spencer`}>
            Spencer Holsinger
          </Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={`${match.url}/clarissa`}
               render={() => {window.location.href="About/clarissa.html"}}>
        </Route>
        <Route exact path={`${match.url}/daryl`}
               render={() => {window.location.href="About/daryl.html"}}>
        </Route>
        <Route exact path={`${match.url}/jason`}
               render={() => {window.location.href="About/jason.html"}}>
        </Route>
        <Route exact path={`${match.url}/joseph`}
               render={() => {window.location.href="About/joseph.html"}}>
        </Route>
        <Route exact path={`${match.url}/kami`}
               render={() => {window.location.href="About/kami.html"}}>
        </Route>
        <Route exact path={`${match.url}/spencer`}
               render={() => {window.location.href="About/spencer.html"}}>
        </Route>
      </Switch>
    </div>
  );
}


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
