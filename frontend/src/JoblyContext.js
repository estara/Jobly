import React from "react";

const CurrentUserContext = React.createContext(undefined);
const CurrentUserDispatchContext = React.createContext(undefined);
const HasAppliedToJobContext = React.createContext(undefined);
const HasAppliedToJobDispatchContext = React.createContext(undefined)

export { CurrentUserContext, CurrentUserDispatchContext, HasAppliedToJobContext, HasAppliedToJobDispatchContext };