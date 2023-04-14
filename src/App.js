import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../src/style/css/App.scss';
import Home from "../src/pages/Homepage";
import Chat from './pages/Chat';
import Audio from "./pages/Audio";
import Images from "./pages/Images";

function App() {
  return (
    <Router>
      <div className="app">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/images" exact component={Images} />
            <Route path="/audio" exact component={Audio} />
          </Switch>
      </div>
    </Router>
  );
}


export default App;
