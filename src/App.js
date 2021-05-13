import React from 'react';
import {Router, Switch, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './scrollToTop';
import Header from './templates/header/header';
import Footer from './templates/footer/footer';
import Home from './templates/home';
import SignUp from './templates/forms/signup';
import Login from './templates/forms/login';
import Logout from './templates/forms/logout';
import Register from './templates/forms/register';
import Contribute from './templates/contribute/contribute'
import DonateFood from './templates/forms/donate_food/donate_food';
import GetFood from './templates/forms/get_food/get_food';
import history from './history';
import Profile from './templates/profile/user_profile'
import DonateRequest from './templates/requests/pickup'
import NeedRequest from './templates/requests/need_requests'
import Organizations from './templates/requests/organizations'
import './App.css';

function App() {
  return (
    <Router history={history}>
      
    <div>
      <ScrollToTop/>
      <Switch>
        <Route path="/login"><Login/></Route>
      
        <Route path="/signup"><SignUp/></Route>
        
        <Route path="/logout"><Logout/></Route>

        <Route path="/register"><Register/></Route>

        <Route path="/contribute"><Contribute/></Route>
        <Route path="/donate"><DonateFood/></Route>
        <Route path="/getFood"><GetFood/></Route>
        <Route exact path="/user_profile/:userId" component={Profile}/>
        <Route path="/donate_requests"><DonateRequest/></Route>
        <Route path="/need_requests"><NeedRequest/></Route>
        <Route path="/organizations"><Organizations/></Route>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
      </Switch>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
