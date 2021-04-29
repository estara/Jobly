import React from "react";
import JobCard from './JobCard';

// display menu
function JobList({ jobs }) {
  return (
    <div className="col-md-4">
      {jobs.map(job => (<JobCard job={job} />))}
    </div>
  );
}

export default JobList;