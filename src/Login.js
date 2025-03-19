import React, { useState } from 'react';
import './App.css';
import authimage from './assets/outhimage.png';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { user, error } = await supabase.auth.signin({ email, password });

      if (error) {
        setError(error.message);
      } else {
        console.log('User logged in:', user);
        navigate('/sidebar'); // Redirect to the Sidebar page
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({ provider: 'google' });

      if (error) {
        setError(error.message);
      } else {
        console.log('User logged in with Google:', user);
        navigate('/sidebar'); // Redirect to the Sidebar page
      }
    } catch (err) {
      setError('An error occurred during Google login.');
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      {/* Left Side: Login Form */}
      <div className="login-container">
        <div className="login-card">
          <h1 className="logo">Yuna</h1>
          <h2>Log in</h2>
          <p>Welcome back! Please enter your details.</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
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
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember for 30 days
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn-primary">
              Sign in
            </button>
            <button type="button" className="btn-google" onClick={handleGoogleLogin}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Sign in with Google
            </button>
            <p className="signup-text">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
        <div className="footer">
          © SoftyEducation | <a href="mailto:help@SoftyEducation.com">help@SoftyEducation.com</a>
        </div>
      </div>

      {/* Right Side: Image + Overlay */}
      <div className="image-container">
        <img src={authimage} alt="Auth" />
        <div className="overlay">
          <h1>Lorem Ipsum is simply dummy text</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard.
          </p>
          <div className="users-join">
            <span>Join 40,000+ users</span>
            <span>20,000+ letters</span>
          </div>
        </div>
      </div>
    </div>
  );
}