import * as React from "react";
import { Route, BrowserRouter,Routes } from 'react-router-dom';
import AddDishForm from './AddDishForm';
import ManagerHomePage from './ManagerHomePage'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ManagerHomePage />
      </div>
    );
  }
}

export default App;
