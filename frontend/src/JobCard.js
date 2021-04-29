import React, { useState, useContext } from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from "reactstrap";
import JoblyApi from './api.js';
import { CurrentUserContext, CurrentUserDispatchContext } from './JoblyContext';

function JobCard ( { job } ) {
    const {currentUser, hasAppliedToJob} = useContext(CurrentUserContext);
    const {setHasAppliedToJob} = useContext(CurrentUserDispatchContext)
    const [applied, setApplied] = useState("Apply")
  
    async function handleClick (evt) {
        evt.preventDefault()
        await JoblyApi.apply(currentUser.username, job.id)
        setApplied("Applied")
        setHasAppliedToJob([...hasAppliedToJob, job])
    }

    if (job.id in hasAppliedToJob) {
        setApplied("Applied")
    }
    // display details on individual menu item
    return (
      <section>
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bold text-left">
              {job.name}
            </CardTitle>
            <CardSubtitle>{job.company}</CardSubtitle>
            <CardText className="font-bold text-left">
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
                </CardText>
                <Button onClick={handleClick}>{applied}</Button>
          </CardBody>
        </Card>
      </section>
    );
  }
  
  export default JobCard;