"use client";
import Link from "next/link";
import FroudAlert from "../ui/froud-alert";
import LaikaaFeatures from "../ui/laikaa-features";
import ProfileSidebar from "../ui/profile-sidebar";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { useEffect, useState } from "react";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { fetchSuccess as loginFetchSuccess } from "../ui/login-form/slice";
import { postData } from "../lib/api";
import { updateProfileInfo } from "../lib/endpoints";
import { enqueueSnackbar } from "notistack";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function PersonalInfo() {
  const [personalData, setPersonalData] = useState({
    email: null,
    phoneNumber: null,
    name: null,
    password:null,
  })

 const dispatch = useAppDispatch()
  const {personalInfo} = useAppSelector(state=> state.personalInfo)
  const {login} = useAppSelector((state)=>state.authModal);
  let USER_DATA = {};
  useEffect(() => {
    let key = "login";
    if (typeof window !== "undefined") {
      USER_DATA = JSON.parse(localStorage.getItem("loginData"));
      dispatch(loginFetchSuccess({ key, data: USER_DATA }));
    }
  }, []);

  useEffect(()=>{
    let key = "personalInfo";
    const updateData = async () => {
      dispatch(fetchStart(key));
      const data = {
        user_id: USER_DATA?.data?.userid,
        sessionkey: USER_DATA?.data?.session_key,
      };
      try {
        // const response = await postData()
        const res = await postData(updateProfileInfo, data);
        dispatch(fetchSuccess({ key, data: res?.data }));
      } catch (error) {
        dispatch(fetchFailure({ key, error: error?.message }));
        enqueueSnackbar(e.message, { variant: "error" });
      }
    };
    updateData();
  }, []);

  

  return (
    <div>
      <div className="container mx-auto px-5">
        <div className="md:grid md:grid-cols-8 gap-5">
          <div className="col-span-2">
            <ProfileSidebar />
          </div>
          <div className="col-span-6">
            <div className="mt-5">
              <h2 className="text-2xl font-bold">
                <span className="underline underline-offset-8 decoration-[#BD00FF]">
                  Personal
                </span>{" "}
                Information
              </h2>
            </div>
            <div className="pt-10">
              <form action="#">
                <div className="md:grid md:grid-cols-2 gap-5">
                  <div className="mb-3 sm:mb-0">
                    <TextField
                    label="Full Name"
                      type="text"
                      readOnly
                      value={login.data?.data?.fullname}
                      placeholder="Full Name"
                      className="w-[100%] h-10 rounded-md focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="mb-3 sm:mb-0">
                    <TextField
                      label="Email Id"
                      type="text"
                      readOnly
                      value={login.data?.data?.email}
                      placeholder="Email Address"
                      className="w-[100%] h-10 rounded-md focus:outline-none focus:ring-0"
                    />
                  </div>

                  <div className="mb-3 sm:mb-0">
                    <TextField
                      label="Phone No."
                      type="text"
                      readOnly
                      value={login.data?.data?.phonenumber}
                      placeholder="Phone Number"
                      className="w-[100%] h-10 rounded-md focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="mb-3 sm:mb-0">
                    <TextField
                      variant="outlined"
                      label="Password"
                      type="password"
                      readOnly
                      value="not coming from apis"
                      placeholder="Password"
                      className="w-[100%] h-10 rounded-md"
                    />
                  </div>
                  <div className="col-span-full mb-3 sm:mb-0">
                    <Button className="block ms-auto text-[#F24E1E]">
                      <EditIcon/> Edit Info
                    </Button>
                  </div>
                  {/* <div className="col-span-full">
                    <button className="bg-[#F24E1E] w-[100%] rounded-md py-2 text-white font-medium text-xl">
                      Save
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <FroudAlert />
          <LaikaaFeatures />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
