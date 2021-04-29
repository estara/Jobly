import React, { useState } from "react";
import { CurrentUserContext, CurrentUserDispatchContext, HasAppliedToJobContext, HasAppliedToJobDispatchContext } from './JoblyContext';
import App from './App';

function JoblyProvider() {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasAppliedToJob, setHasAppliedToJob] = useState(null);
  const [applyToJob, setApplyToJob] = useState(null);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={setCurrentUser}>
          <HasAppliedToJobContext.Provider value={hasAppliedToJob}>
              <HasAppliedToJobDispatchContext.Provider value={setHasAppliedToJob}>
                <App />
              </HasAppliedToJobDispatchContext.Provider>
          </HasAppliedToJobContext.Provider>
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default JoblyProvider;