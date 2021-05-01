import React, { useState, useEffect } from 'react';
import './App.css';
import { CurrentUserContext, CurrentUserDispatchContext, HasAppliedToJobContext, HasAppliedToJobDispatchContext, CompaniesDispatchContext, CompaniesContext, JobsContext, JobsDispatchContext } from './JoblyContext';
import JoblyApi from './api.js';
import Routes from './Routes';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasAppliedToJob, setHasAppliedToJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState(null);
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try{
      const token = localStorage.getItem('token');
      JoblyApi.token = token;
      const username = localStorage.getItem('username');
      const user = await JoblyApi.getUser(username);
      setCurrentUser({token: token, username: username, firstName: user.firstName, lastName: user.lastName, email: user.email})
      setHasAppliedToJob(user.applications);
      const companyList = await JoblyApi.getCompanies();
      setCompanies(companyList);
      const jobList = await JoblyApi.getJobs();
      setJobs(jobList);
      setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setCurrentUser(false);
      }
    }
    onLoad();
  }, []);

  async function login(formData) {
    const res = await JoblyApi.login(formData);
    console.log(formData.username)
    setCurrentUser({token: res, username: formData.username});
    localStorage.setItem('token', res);
    localStorage.setItem('username', formData.username)
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

  

  // display loading message while loading
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={setCurrentUser}>
      <HasAppliedToJobContext.Provider value={hasAppliedToJob}>
      <HasAppliedToJobDispatchContext.Provider value={setHasAppliedToJob}>
      <CompaniesContext.Provider value={companies}>
      <CompaniesDispatchContext.Provider value={setCompanies}>
      <JobsContext.Provider value={jobs}>
      <JobsDispatchContext.Provider value={setJobs}>
          <Routes logout={logout} login={login} signup={signup}/>
      </JobsDispatchContext.Provider>
      </JobsContext.Provider>
      </CompaniesDispatchContext.Provider>
      </CompaniesContext.Provider>
      </HasAppliedToJobDispatchContext.Provider>
      </HasAppliedToJobContext.Provider>
      </CurrentUserDispatchContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
