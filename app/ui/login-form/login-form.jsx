"use client"
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { Box, Button, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchFailure, fetchStart, fetchSuccess, openModalLogin, openModalSignup } from './slice'
import { getLogin } from '@/app/lib/endpoints'
import { postData } from '@/app/lib/api'
import { enqueueSnackbar } from 'notistack'

function LoginForm() {

    const {login} = useAppSelector((state)=>state.authModal);
    const dispatch = useAppDispatch()
   
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const loginHandler = async ()=>{
    let key = "login";
    dispatch(fetchStart(key));
        const data = {
            "email": username,
            "password": password,
        }
        try {
            const res = await postData(getLogin,data)
            dispatch(fetchSuccess({ key, data: res }));
            if(res?.status){
                enqueueSnackbar(res.message,{ variant : 'success' })
                localStorage.setItem('loginData', JSON.stringify(res));
                dispatch(openModalLogin(false));
            }else{
                enqueueSnackbar(res.message,{ variant: "error" });
            }
        } catch (e) {
            dispatch(fetchFailure({ key, error: e?.message }));
            enqueueSnackbar(e.message,{ variant: 'error' });
        }
    }

   

   
    const handleSetTrue = () => {
        dispatch(openModalSignup(true));
    };
    const handleSetFalse = () => {
        dispatch(openModalLogin(false));
    };

  return (
    <div>
        <div className='sm:grid grid-cols-2'>
            <div>
                <Image src="/offer.jpg" width={800} height={800} alt=''/>
            </div>
            <div className='py-16 px-3 relative'>
                <form action="#">
                    <Box className="mb-5">
                        <TextField
                            type="email" 
                            onChange={(e)=>{setUsername(e.target.value)}}  
                            placeholder='Enter your email'
                            required
                            id="outlined-required"
                            label="Email Address"
                            size='small'
                            className='w-full'
                        />
                    </Box>
                    <Box className="mb-5">
                        <TextField
                            onChange={(e)=>{setPassword(e.target.value)}}  
                            placeholder='Enter your password'
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            size='small'
                            className='w-full'
                        />
                    </Box>
                    <div className='py-5 px-3'>
                        <p className='text-[13px]'>By continue, you agree to Laikaa&apos;s <Link href='#' className='text-[#4eadff]'>term & condition</Link> and <Link href='#' className='text-[#4eadff]'>Privacy Policy</Link></p>
                    </div>
                    <div>
                        <Button className='w-full bg-[#ff5800] hover:bg-[#ff5900d0] py-3 text-[#fff]' onClick={loginHandler}>Request OTP</Button>
                    </div>
                </form>
                <div className='absolute bottom-0 left-0 p-4 w-full text-center'>
                    New To Laikaa?<Button onClick={()=>{handleSetTrue(),handleSetFalse()}} className='text-[#2688d9] text-[14px]'> Create an account</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
