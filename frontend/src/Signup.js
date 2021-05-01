import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup ({ signup }) {
    const initialState = {username: "", firstName: "", lastName: "", email: "", password: ""}
    const [formData, setFormData] = useState(initialState)
    const history = useHistory();

    // handle user form input before submit
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
        await signup(formData);
        setFormData(initialState);
        history.push('/companies')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required/>
                <input type="text" name="firstName" placeholder="First name" onChange={handleChange} required/>
                <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} required/>
                <input type="text" name="email" placeholder="Email" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;