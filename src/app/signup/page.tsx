"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductService from "@/services/product-services";

function Signup() {
  const [email, setEmail] = useState('');    
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function userSignup(email:string, password:any) {
    try {
      const response = await fetch(`${ProductService.SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': ProductService.SUPABASE_KEY,
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(response.status)

      if (response.status === 400) {
        setError(data.msg || 'Signup failed!');
        setSuccess('');
        return;
      }

      if (response.status === 422) {
        setError('Password should be at least 6 characters!');
        setSuccess('');
        return;
      }

      if (response.status === 500) {
        setError('Server problem, try again later!');
        setSuccess('');
        return;
      }

      setSuccess('Account created! Redirecting to login...');
      setError('');
      setTimeout(() => { router.push('/login'); }, 2000);

    } catch (err) {
      setError('Network error, check your connection!');
      setSuccess('');
    }
  }

  function handleSubmit(e:any) {
    e.preventDefault();

    // check passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    userSignup(email, password);
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-6 col-md-4">

          <h3 className="mb-4">Create Account</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Sign Up</button>

            <div className="mt-3">
              Already have an account?{' '}
              <span
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/login')}>
                Login
              </span>
            </div>

            {success && <div className="fw-bold text-success mt-3 fs-5">{success}</div>}
            {error && <div className="fw-bold text-danger mt-3">{error}</div>}

          </form>

        </div>
      </div>
    </div>
  );
}

export default Signup;