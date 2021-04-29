import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Jobs from './Jobs';
import NavBar from './NavBar';
import Profile from './Profile';
import Login from './Login';
import Signup from './Signup';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';

function Routes ({ login, signup }) {
    // const currentUser = useContext(CurrentUserContext);

    return (
        <div className="Routes">
          <BrowserRouter>
            <NavBar />
            <main>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <PrivateRoute exact path="/companies" component={CompanyList}/>
                <PrivateRoute exact path="/jobs" component={Jobs}/>
                <PrivateRoute path="/companies/:handle" component={CompanyDetail}/>
                {}
                <PrivateRoute exact path='/profile' component={Profile}/>
                <Route exact path="/login">
                  <Login login={login}/>
                </Route>
                <Route exact path="/signup">
                  <Signup signup={signup}/>
                </Route>
                <Route>
                  <p>Hmmm. I can't seem to find what you want.</p>
                </Route>
              </Switch>
            </main>
          </BrowserRouter>
        </div>
      );
}

export default Routes;