"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import FroudAlert from "../ui/froud-alert";
import LaikaaFeatures from "../ui/laikaa-features";
import ProfileSidebar from "../ui/profile-sidebar";
import { fetchFailure, fetchStart, fetchSuccess } from "./slice";
import { postData } from "../lib/api";
import { getTermAndCondition } from "../lib/endpoints";
import { enqueueSnackbar } from "notistack";

function TermAndCondition() {
  const dispatch = useAppDispatch();
  const { termAndCondition } = useAppSelector(
    (state) => state.termAndCondition
  );
  useEffect(() => {
    let key = "termAndCondition";
    const updateData = async () => {
      dispatch(fetchStart(key));
      const data = {
        pageid: 2,
      };
      try {
        const res = await postData(getTermAndCondition, data);
        dispatch(fetchSuccess({ key, data: res?.data }));
      } catch (e) {
        dispatch(fetchFailure({ key, error: e?.message }));
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
                  TERMS &
                </span>{" "}
                CONDITIONS
              </h2>
            </div>
            <div>
              <div className="mt-6 leading-10">
                {termAndCondition.data?.page_content}
              </div>
              <div className="bg-[#7877771a] p-3 mt-5">
                <button className="block m-auto border-2 border-slate-400 py-2 px-5 hover:bg-[#b1b1b13a]">
                  NEED HELP?
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FroudAlert />
        </div>
        <div>
          <LaikaaFeatures />
        </div>
      </div>
    </div>
  );
}

export default TermAndCondition;
