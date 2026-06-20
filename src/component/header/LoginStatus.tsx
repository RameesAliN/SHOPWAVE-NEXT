"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/hooks'
import { setLoginStatus } from '@/slice/loginSlice'

function LoginStatus() {
  const { loginStatus} = useSelector((state:any)=>state.getLogin)
  const dispatch = useAppDispatch();
  useEffect(() => {
      const token = localStorage.getItem('access_token');
      let stored = localStorage.getItem('loginStatus');
      const status = stored? JSON.parse(stored) : 'Login'
      console.log(status);
      dispatch(setLoginStatus(status))
    }, []);
  
  return <li className="nav-item ms-2">
              <Link href="/login" className={'nav-link'}> {loginStatus}</Link>
          </li>
}

export default LoginStatus
