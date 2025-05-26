import React, { useState } from 'react';
import './App.css';
import authimage from '../../../assets/outhimage.png';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../../supabase/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Only log once if needed for debugging
      // console.log('User signed in:', data);

      navigate('/home', { replace: true });
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='main-container'>
      
      <div className='login-container'>
        <div className='login-card'>
          <h1 className='logo'>Yuna</h1>
          <h2>Log in</h2>
          <p>Welcome back! Please enter your details.</p>
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label>Email</label>
              <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='input-group'>
              <label>Password</label>
              <input type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='options'>
              <label>
                <input type='checkbox' /> Remember for 30 days
              </label>
              <a href='#'>Forgot password?</a>
            </div>
            {error && <p className="error">{error}</p>}
            <button type='submit' className='btn-primary' disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <button type='button' className='btn-google'>
              <img src='https://www.svgrepo.com/show/475656/google-color.svg' alt='Google' />
              Sign in with Google
            </button>
            <p className='signup-text'>
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
          </form>
        </div>
        <div className='footer'>
          © SoftyEducation | <a href='mailto:help@SoftyEducation.com'>help@SoftyEducation.com</a>
        </div>
      </div>

      
      <div className='image-container'>
        <img src={authimage} alt='Auth' />
        <div className='overlay'>
          <h1>Lorem Ipsum is simply dummy text</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
          <div className='users-join'>
            <span>Join 40,000+ users</span>
            <span>20,000+ letters</span>
          </div>
        </div>
      </div>
    </div>
  );
}