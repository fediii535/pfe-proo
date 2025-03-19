import React, { useState } from 'react';
import './Signup.css';
import authimage from './assets/outhimage.png';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Sign up the user with Supabase Auth
      const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name, // Save additional user metadata
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Save user information to a custom table (optional)
      const { data, error: dbError } = await supabase
        .from('users') // Replace with your table name
        .insert([{ id: user.id, email, name }]);

      if (dbError) {
        setError(dbError.message);
        return;
      }

      console.log('User signed up and data saved:', user);
      alert('Check your email for the confirmation link!');
      navigate('/'); // Redirect to the login page after sign-up
    } catch (err) {
      setError('An error occurred during sign-up.');
      console.error(err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({ provider: 'google' });

      if (error) {
        setError(error.message);
      } else {
        console.log('User signed up with Google:', user);
        navigate('/sidebar'); // Redirect to the Sidebar page
      }
    } catch (err) {
      setError('An error occurred during Google sign-up.');
      console.error(err);
    }
  };

  return (
    <div className="signup-main-container">
      {/* Left Side: Signup Form */}
      <div className="signup-left">
        <h1 className="logo">Yuna</h1>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
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
          <button type="submit" className="btn-primary">
            Create account
          </button>
          <button type="button" className="btn-google" onClick={handleGoogleSignup}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Sign up with Google
          </button>
          <p className="login-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
        <div className="footer">
          © SoftyEducation | <a href="mailto:help@SoftyEducation.com">help@SoftyEducation.com</a>
        </div>
      </div>

      {/* Right Side: Image + Text */}
      <div className="signup-right">
        <div className="overlay">
          <h1>Lorem Ipsum is simply dummy text</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. To complement
            us best, the industry is certified.
          </p>
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