import React, { useContext, useState } from "react";
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import JoblyApi from './api.js';
import CompanyCard from './CompanyCard';
import './CompanyList.css';
import { CompaniesContext, CompaniesDispatchContext } from "./JoblyContext.js";

// display list of companies
function CompanyList() {
    const [formData, setFormData] = useState({})
    const {companies} = useContext(CompaniesContext);
    const {setCompanies} = useContext(CompaniesDispatchContext)


    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    }
    
    // handle search form submission
    async function handleSubmit (evt) {
        evt.preventDefault();
        const newCompanies = await JoblyApi.getCompanies(formData)
        setCompanies(newCompanies);
        setFormData({});
    }

    
    return (
        <div>
        <Form inline onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="nameLike" className="mr-sm-2">Company Name</Label>
                <Input type="text" name="nameLike" id="nameLike" onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="minEmployees" className="mr-sm-2">Min Employees</Label>
                <Input type="number" name="minEmployees" id="minEmployees" onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="maxEmployees" className="mr-sm-2">Max Employees</Label>
                <Input type="number" name="maxEmployees" id="maxEmployees" onChange={handleChange}/>
            </FormGroup>
            <Button>Filter</Button>
        </Form>
        {companies.map(company => (
        <CompanyCard company={company}/>
        ))}
        </div>
    );
}

export default CompanyList;