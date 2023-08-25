import React, { useState } from 'react';
import { signUp } from './authFunctions.js'
import './splashPage.css';

function SplashPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
            await signUp(email, password);
            // Redirect or show success message here
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="splash-container">
            {/* <img src="path-to-image.jpg" alt="App description" /> */}
            <h1>Welcome to IDI Online</h1>
            <p>An online ordering platform.</p>

            <div className="signup-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Sign Up Now!</button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default SplashPage;
