import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
      <h1> App</h1>
    </Fragment>
  );
};

export default App;
