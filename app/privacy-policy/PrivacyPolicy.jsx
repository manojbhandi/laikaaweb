"use client"
import { useEffect } from "react"
import { postData } from "../lib/api"
import { getPrivacyPolicy } from "../lib/endpoints"
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import FroudAlert from "../ui/froud-alert"
import LaikaaFeatures from "../ui/laikaa-features"
import ProfileSidebar from "../ui/profile-sidebar"
import { fetchFailure, fetchStart, fetchSuccess } from "./slice"
import { enqueueSnackbar } from "notistack"


function PrivacyPolicy() {

    const dispatch = useAppDispatch()
    const {privacyPolicy} = useAppSelector(state=> state.privacyPolicy)
    useEffect(()=>{
      let key = "privacyPolicy";
      const updateData = async ()=>{

    dispatch(fetchStart(key));
        const data = {
            "pageid":1
        }
      try {
        const res= await postData(getPrivacyPolicy,data)
        dispatch(fetchSuccess({ key, data: res?.data }));
      } catch (e) {
        dispatch(fetchFailure({ key, error: e?.message }));
        enqueueSnackbar(e.message,{ variant: 'error' })

      }
    }
    updateData();
  },[])

  return (
    <div>
        <div className="container mx-auto px-5">
            <div className="md:grid md:grid-cols-8 gap-5">
                <div className="col-span-2">
                    <ProfileSidebar/>
                </div>
                <div className="col-span-6">
                    <div className="mt-5">
                        <h2 className="text-2xl font-bold"><span className="underline underline-offset-8 decoration-[#BD00FF]">Privacy</span> Policy</h2>
                    </div>
                    <div>
                        <div className="mt-6 leading-10">
                           {
                            privacyPolicy.data?.page_content
                           }
                        </div>
                        <div className='bg-[#7877771a] p-3 mt-5'>
                            <button className='block m-auto border-2 border-slate-400 py-2 px-5 hover:bg-[#b1b1b13a]'>NEED HELP?</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <FroudAlert/>
            </div>
            <div>
                <LaikaaFeatures/>
            </div>
        </div>
    </div>
  )
}

export default PrivacyPolicy