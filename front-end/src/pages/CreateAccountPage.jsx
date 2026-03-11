import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CreateAccountPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ error, setError ] = useState('');

    const navigate = useNavigate();

    async function createAccount() {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message)
    }}

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Create Account</h1>
                <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    type="password" 
                    placeholder="Your password address" 
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <input 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} />
                
                <button onClick={createAccount}>Create Account</button>
                
                <Link to="/login" className="signup-link">
                    Already have an account? Log in here.
                </Link>
            </div>
        </div>
    );
}