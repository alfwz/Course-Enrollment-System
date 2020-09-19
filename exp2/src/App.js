import React from 'react';
import './App.css';
import Menu from './components/Menu'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AllCourses from './views/AllCourses';
import EnrolledCourses from './views/EnrolledCourses';
import NoticationDialog from "./components/NotificationDialog";

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route path="/" exact>
          <AllCourses />
        </Route>

        <Route path="/enrolled-courses">
          <EnrolledCourses />
        </Route>

        <Route path="/debug">
            <NoticationDialog open isSucceed message="test message"/>
        </Route>
       
      </Switch>
    

    </Router>
    
  );
}

export default App;
