import { Box, Button, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchFailure, fetchStart, fetchSuccess, openModalLogin, openModalSignup } from './slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { getSignup } from '@/app/lib/endpoints';
import { postData } from '@/app/lib/api';
import { enqueueSnackbar } from 'notistack';
import { checkValidPhoneNo, isValidEmail } from '@/app/lib/utils';

function Signupform() {

    const [userName, setUserName] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPass, setUserPass] = useState()
    const [emailError, setEmailError] = useState()
    const [phoneError, setPhoneError] = useState()
    const { signup } = useAppSelector((state) => state.authModal);
    const dispatch = useAppDispatch()
    const handleSetTrue = () => {
        dispatch(openModalLogin(true));
    };
    const handleSetFalse = () => {
        dispatch(openModalSignup(false));
    };


    const signupHandle = async () => {
        let key = "signup";
        dispatch(fetchStart(key));
        const data = {
            "fullname": userName,
            "phonenumber": userPhone,
            "email": userEmail,
            "password": userPass,
        }
        try {
            const res = await postData(getSignup, data)
            dispatch(fetchSuccess({ key, data: res }));
            if (res?.status) {
                enqueueSnackbar(res.message, { variant: 'success' })
                localStorage.getItem('signupData', JSON.stringify(res))
                dispatch(openModalSignup(false));
                dispatch(openModalLogin(true));
            } else {
                enqueueSnackbar(res.message, { variant: 'error' })
            }

        } catch (e) {
            enqueueSnackbar(e.message, { variant: 'error' })
            dispatch(fetchFailure({ key, error: e?.message }));
        }
    }

    const phoneNumValidation = (e) =>{
        let phoneHyperText = ""
        if(!checkValidPhoneNo(e.target.value)){
            setPhoneError(false);
            setPhoneError(phoneHyperText="please enter 10 digit phone number");
        }else{
            setPhoneError(true);
            setUserPhone(e.target.value);
            setPhoneError(phoneHyperText);

        }
    }

    const emailValidation = (e) =>{
        let emailHyperText = ""
        if(!isValidEmail(e.target.value)){
            setEmailError(false)
            setEmailError(emailHyperText="Please enter valid email");
        }else{
            setEmailError(true);
            setUserEmail(e.target.value);
            setEmailError(emailHyperText);

        }
       
    }

    return (
        <div>
            <div className='sm:grid grid-cols-2'>
                <div>
                    <Image src="/offer.jpg" width={800} height={800} alt='' />
                </div>
                <div className='py-16 px-3 relative'>
                    <form action="#">
                        <Box className="mb-5">
                            <TextField
                                onChange={(e) => { setUserName(e.target.value) }}
                                id="outlined-basic" 
                                label="Full name" 
                                variant="outlined"
                                placeholder='Enter full name'
                                size='small'
                                className='w-full'
                            />
                        </Box>
                        <Box className="mb-5">
                            <TextField
                                error={phoneError}
                                id="outlined-error-helper-text"
                                label="Phone number"
                                placeholder='Enter phone number'
                                helperText={phoneError}
                                onChange={phoneNumValidation}
                                size='small'
                                className='w-full'
                            />
                        </Box>
                        <Box className="mb-5">
                        <TextField
                                error = {emailError}
                                id="outlined-error-helper-text"
                                label="Email Address"
                                placeholder='Enter your email'
                                helperText={emailError}
                                onChange={emailValidation}
                                size='small'
                                className='w-full'
                            />
                        </Box>
                        <Box className="mb-5">
                            <TextField
                            onChange={(e)=>{setUserPass(e.target.value)}}
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                size='small'
                                className='w-full'
                            />
                        </Box>
                        
                        <div className='py-5 px-3'>
                            <p className='text-[13px]'>By continue, you agree to Laikaa's <Link href='#' className='text-[#4eadff]'>term & condition</Link> and <Link href='#' className='text-[#4eadff]'>Privacy Policy</Link></p>
                        </div>
                        <div>
                            <Button className='w-full bg-[#ff5800] hover:bg-[#ff5900d0] py-3 text-[#fff]' onClick={signupHandle}>Request OTP</Button>
                        </div>
                    </form>
                    <div className='absolute bottom-0 left-0 p-4 w-full text-center'>
                        Already have account?<Button onClick={() => { handleSetTrue(), handleSetFalse() }} className='text-[#2688d9] text-[14px]'> Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signupform;
