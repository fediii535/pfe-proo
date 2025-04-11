import React, { useState } from 'react';
import './Signup.css';
import authimage from './assets/outhimage.png'; 
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      console.log('User signed up:', user);
      
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="signup-main-container">
      
      <div className="signup-left">
        <h1 className='logo'>Yuna</h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <small>Must be at least 8 characters.</small>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-primary">Create account</button>

          <button type="button" className="btn-google">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Sign up with Google
          </button>

          <p className="login-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
        <div className='footer'>
          © SoftyEducation | <a href='mailto:help@SoftyEducation.com'>help@SoftyEducation.com</a>
        </div>
      </div>

      
      <div className="signup-right">
        <div className="overlay">
          <h1>Lorem Ipsum is simply dummy text</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. To complement us best, the industry is certified.</p>
          <div className="users-join">
            <span>40,000+ letters</span>
            <span>20,000+ letters</span>
          </div>
        </div>
        <img src={authimage} alt="Sign up visual" />
      </div>
    </div>
  );
}