import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

function CompanyCard ( { company } ) {

    // display details on individual company
    return (
      <div>
        <Link to={`/companies/${company.id}`} key={company.id}>
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bold text-left">
              {company.name}
            </CardTitle>
            <CardImg right src={company.logoUrl} alt={`${company.name} logo`}/>
            <CardText className="text-left">{company.description}
            Employees: {company.numEmployees} 
            </CardText>
          </CardBody>
        </Card>
        </Link>
      </div>
    );
  }
  
  export default CompanyCard;
  