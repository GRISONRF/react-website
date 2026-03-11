import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const navigate = useNavigate();

    async function logIn() {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message)
    }}

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Sign In</h1>
                <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    type="password" 
                    placeholder="Your password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button onClick={logIn}>Log In</button>
                <Link to="/create-account" className="signup-link">
                    Don't have an account? Create one here.
                </Link>
            </div>
        </div>
    );
}