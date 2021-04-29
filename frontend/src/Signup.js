import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup ({ signup }) {
    const initialState = {username: "", password: ""}
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
                <input type="text" placeholder="username" onChange={handleChange}/>
                <input type="password" placeholder="password" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;