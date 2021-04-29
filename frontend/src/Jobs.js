import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import JoblyApi from './api.js';
import NavBar from './NavBar';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Jobs () {
    const [jobs, setJobs] = useState(null)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        function onLoad() {
            const newJobs = JoblyApi.getJobs();
            setJobs(newJobs)
        }
        onLoad()
    }, [])

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    }
    
    // handle form submission
    async function handleSubmit (evt) {
        evt.preventDefault();
        const newJobs = await JoblyApi.getJobs(formData)
        setJobs(newJobs);
        setFormData(null);
    }

    
    return (
        <div>
        <NavBar />
        <Form inline onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="nameLike" className="mr-sm-2">Job Title</Label>
                <Input type="text" name="nameLike" id="nameLike" onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="minSalary" className="mr-sm-2">Min Salary</Label>
                <Input type="number" name="minSalary" id="minSalary" onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="hasEquity" className="mr-sm-2">Equity</Label>
                <Input type="checkbox" name="hasEquity" id="hasEquity" onChange={handleChange}/>
            </FormGroup>
            <Button>Search</Button>
        </Form>
        <JobList jobs={jobs} />
        </div>
    );
}

export default Jobs;