import React from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../lib/hooks";
import {
  addNewAddress,
  addNewAddress as apiAddNewAddress,
} from "../lib/endpoints";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  savedAdresses,
} from "../save-address/slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enqueueSnackbar } from "notistack";
import { postData } from "../lib/api";

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email Address is required"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string(),
  city: yup.string().required("City is required"),
  pin: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  landmark: yup.string().required("Landmark is required"),
});

function AddNewAddress(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { callAddNewAddressApi } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      // name: addressData?.fullname || "",
      // email: addressData?.email || "",
      // phone: addressData?.mobile || "",
      // address1: addressData?.address1 || "",
      // address2: addressData?.address2 || "",
      // city: addressData?.city || "",
      // pin: addressData?.pincode || "",
      // landmark: addressData?.landmark || "",
    },
  });
 
  const onSubmit = async (data) => {
    let USER_DATA;

    if (typeof window !== "undefined") {
      USER_DATA = JSON.parse(localStorage.getItem("loginData"));
    }

    const requestData = {
      user_id: USER_DATA?.data?.userid,
      fullname: data.name,
      address1: data.address1,
      address2: data.address2,
      mobile: data.phone,
      email: data.email,
      city: data.city,
      pincode: data.pin,
      landmark: data.landmark,
      is_primary: 1,
    };
    const res = callAddNewAddressApi(requestData);
    if (res?.data?.code == 200) {
      props.closeDrawer();
    }
  };

  return (
    <div className="max-w-[100%] w-[500px] px-5 py-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          <span className="underline underline-offset-8 decoration-[#BD00FF]">
            SAVE NEW
          </span>{" "}
          ADDRESS
        </h2>
        <IconButton onClick={props.closeDrawer}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
              type="text"
              placeholder="Full Name"
              {...register("name")}
              onBlur={() => trigger("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
              type="email"
              placeholder="Email Address"
              {...register("email")}
              onBlur={() => trigger("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              maxLength={10}
              className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              onBlur={() => trigger("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
              type="text"
              placeholder="Address Line 1"
              {...register("address1")}
              onBlur={() => trigger("address1")}
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address1.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
              type="text"
              placeholder="Address Line 2"
              {...register("address2")}
              onBlur={() => trigger("address2")}
            />
          </div>

          <div className="mb-4 flex gap-2">
            <div className="w-full">
              <input
                className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
                type="text"
                placeholder="City"
                {...register("city")}
                onBlur={() => trigger("city")}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                maxLength={6}
                className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
                type="text"
                placeholder="Pincode"
                {...register("pin")}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                onBlur={() => trigger("pin")}
              />
              {errors.pin && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pin.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <input
              className="w-full rounded-lg bg-[#f24f1e2a] border-[#F24E1E] p-2"
              type="text"
              placeholder="Landmark"
              {...register("landmark")}
              onBlur={() => trigger("landmark")}
            />
            {errors.landmark && (
              <p className="text-red-500 text-sm mt-1">
                {errors.landmark.message}
              </p>
            )}
          </div>

          <div className="mb-3 mt-3">
            <button
              type="submit"
              className="bg-[#F24E1E] hover:bg-[#f24f1ed7] px-[50px] py-3 text-white rounded-lg block m-auto"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewAddress;
