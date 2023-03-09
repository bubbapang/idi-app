import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
        setErrors([]);
        console.log('coming from signup form')
        console.log('credential', credential)
        console.log('password', password)
        const user = [credential, password]
        return dispatch(sessionActions.signup(user))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };
    
    return (
        <>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
            Email
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
            </label>
            <br></br>
            <label>
            Password
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            <br></br>
            <label>
            Confirm Password
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </label>
            <br></br>
            <button type="submit">Sign Up</button>
        </form>
        </>
    );
}

export default SignupForm;