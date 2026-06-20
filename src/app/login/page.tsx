"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/hooks';
import ProductService from '@/services/product-services';
import { setEmail, setPassword, setSuccess, setError, setLoginStatus } from '@/slice/loginSlice';
import { resetCart,fetchCart } from '@/slice/cartSlice';
import { useRouter } from 'next/navigation';

function Login() {
  const dispatch = useAppDispatch();
  const { loginStatus, email, password, success, error } = useSelector((state: any) => state.getLogin);
  const router = useRouter();

  useEffect(() => {
  localStorage.setItem('loginStatus', JSON.stringify(loginStatus));
}, [loginStatus]);

  useEffect(() => {
    dispatch(setSuccess(''));
    const token = localStorage.getItem('access_token');
    let stored = localStorage.getItem('loginStatus');
    const status = stored? JSON.parse(stored) : 'Login'
    console.log(status);
    dispatch(setLoginStatus(status));
  }, []);

  async function userLogin(body: any) {
    try {           //for error handling api,internet,backend etc...if it's failed catch trigger
      let response = await fetch(`${ProductService.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': ProductService.SUPABASE_KEY,
        },
        body: JSON.stringify(body)
      });

      if (response.status === 400) {        //for cresidential error
        dispatch(setError('Incorrect email or password!'));
        dispatch(setSuccess(''));
        return;
      }

      if (response.status === 500) {           //for cresidential error
        dispatch(setError('Server problem, try again later!'));
        dispatch(setSuccess(''));
        return;
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);  //  save token
      localStorage.setItem('loginStatus',JSON.stringify('Logout') ); //save status
      dispatch(setSuccess(data));
      dispatch(setError(''));
      dispatch(fetchCart())

    } catch (error) {
      dispatch(setError('Network error, check your connection!'));
      dispatch(setSuccess(''));
    }
  }

  async function userLogout() {                  //function for logout
    const token = localStorage.getItem('access_token');
    await fetch(`${ProductService.SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Authorization': `Bearer ${token}`
      }
    });
    localStorage.removeItem('access_token');
    localStorage.setItem('loginStatus',JSON.stringify('Login') );
    dispatch(setLoginStatus('Login'));
    dispatch(resetCart(''));
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => { router.push('/products'); }, 1000);
      setTimeout(() => {
        dispatch(setLoginStatus('Logout')); dispatch(setSuccess(''));}, 4000);
    }
  }, [success]);


  function handleSubmit(e: any) {
    e.preventDefault();
    let body = { email, password };
    console.log(JSON.stringify(body));
    userLogin(body);
  }



  return (
    <div className="container">
      {loginStatus == 'Logout' ?

        <div className="d-flex flex-column align-items-center"> {/*logout */}
          <div className="fw-bold text-danger fs-1 mt-5">
            You Are Already Login.Do You Want To Logout
          </div>
          <button className="btn btn-outline-dark mt-5" onClick={userLogout}>Logout</button>
        </div> :

        <div className="row mt-5">              {/*login */}
          <div className="col-sm-6 col-md-4">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">Remember me</label>
              </div>

              <button type="submit" className="btn btn-primary">Login</button>

              {success && <>
                <div className="fw-bold text-success mt-3 fs-1"> Login successful </div>
                <div className="fw-bold text-success mt-3 fs-9"> Redirect to product </div>
              </>}
              {error && <div className="fw-bold text-danger mt-3"> {error} </div>}

              <div className="text-danger fw-bold mt-4 mb-2">NEW USER?</div>
              <button className="btn btn-primary" type="button" onClick={()=>router.push('/signup')}>
                Signup
              </button>
            </form>

          </div>
        </div>
      }



    </div>
  )
}

export default Login
