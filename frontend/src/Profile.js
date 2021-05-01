import React, { useState, useContext } from 'react';
import JoblyApi from './api.js';
import { CurrentUserContext, CurrentUserDispatchContext } from './JoblyContext';

function Profile () {
    const {currentUser} = useContext(CurrentUserContext);
    const {setCurrentUser} = useContext(CurrentUserDispatchContext);
    const initialState = {firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email, password: ""};
    const [formData, setFormData] = useState(initialState);

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
        await JoblyApi.updateUser(currentUser.username, formData);
        setCurrentUser('reload me');
        setFormData(initialState);
    }

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <h4>Username</h4>
                <p>{currentUser.username}</p>
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" value={currentUser.firstName} onChange={handleChange}/>
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" value={currentUser.lastName} onChange={handleChange}/>
                <label for="email">Email</label>
                <input type="text" name="email" value={currentUser.email} onChange={handleChange}/>
                <label for="password">Confirm password to make changes:</label>
                <input type="text" name="password" onChange={handleChange}/>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default Profile;