import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import JobList from './JobList';
import JoblyApi from './api.js';

function CompanyDetail () {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function onLoad() {
        // find correct company
        const newCompany = await JoblyApi.getCompany(handle);
        if (!newCompany) return <Redirect to="/companies" />;
        setCompany(newCompany);
    }
    onLoad()
  }, [])
  

  // display details on and jobs at individual company
  return (
    <div>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
        <p>Employees: {company.numEmployees}</p>
        <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;