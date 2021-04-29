import React, { useState } from 'react';

function Login ({ login }) {
    const initialState = {username: "", password: ""}
    const [formData, setFormData] = useState(initialState)

    // handle user form input before submit
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    }
    
    // handle form submission
    const handleSubmit = evt => {
        evt.preventDefault();
        login(formData);
        setFormData(initialState);
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

export default Login;