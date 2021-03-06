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
    async function handleSubmit (evt) {
        evt.preventDefault();
        try{
        await login(formData);
        setFormData(initialState);
        } catch (err) {
            return( <p>Bad login, please try again.</p>)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" onChange={handleChange}/>
                <input type="password" name="password" placeholder="password" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;