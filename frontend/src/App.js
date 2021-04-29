import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { CurrentUserDispatchContext, HasAppliedToJobDispatchContext } from './JoblyContext';
import JoblyApi from './api.js';
import NavBar from './NavBar';
import Routes from './Routes';

function App() {
  const { setCurrentUser } = useContext(CurrentUserDispatchContext);
  const { setHasAppliedToJob } = useContext(HasAppliedToJobDispatchContext);

  useEffect(() => {
    async function onLoad() {
      const token = localStorage.getItem('token');
      JoblyApi.token = token;
      const username = localStorage.getItem('username');
      setCurrentUser({token: token, username: username})
      const user = await JoblyApi.getUser(username);
      setHasAppliedToJob(user.jobs);
    }
    onLoad();
  }, []);

  async function login(formData) {
    const res = await JoblyApi.login(formData);
    setCurrentUser({token: res.token, username: formData.username});
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', res.username)
  }

  async function logout() {
    await JoblyApi.logout();
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  async function signup (formData) {
    const res = await JoblyApi.signup(formData);
    setCurrentUser({token: res.token, username: formData.username});
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', formData.username);
  }

  const [isLoading, setIsLoading] = useState(true);

  // display loading message while loading
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }


  return (
    <div className="App">
      <NavBar logout={logout}/>
      <Routes login={login} signup={signup}/>
    </div>
  );
}

export default App;
