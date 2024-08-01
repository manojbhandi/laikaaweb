import { Button, ButtonBase, Drawer } from "@mui/material";
import AddNewAddress from "./AddNewAddress";
import React from "react";

function AddressCard(props) {
  const { address, callEditAddressApi } = props;
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const callEditAddress = () => {
    // const data = {
    //   fullname: "AniTest",
    //   address1: "Test-Kolkata1",
    //   address2: "Kolkata1",
    //   mobile: "1234567890",
    //   email: "test1@gmail.com",
    //   city: "Kolkata",
    //   pincode: "700001",
    //   is_primary: 1,
    // };
    // callEditAddressApi;
    toggleDrawer(true)
  };
  return (
    <>
      <div className="p-3 border-2 border-slate-300 rounded-lg flex justify-between flex-col">
        <div className="mb-5">
          <p className="mb-0 font-semibold text-[#F24E1E]">
            SELECT DELIVERY ADDRESS
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            id="filter-mobile-color-1"
            name="color[]"
            value="beige"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <div className="flex flex-col">
            <h6 className="text-l font-bold">
              {address.fullname},&nbsp;
              <span className="text-l font-normal ">{address.mobile}</span>
            </h6>
            <h6 className="text-l ">{address.address1}</h6>
            <p className="line-clamp-3">
              <span>{address.address2},</span>{" "}
              <span>
                {address.city} - {address.pincode}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end items-center py-3">
          <Button className="text-[#F24E1E]" onClick={toggleDrawer(true)}>
            Edit
          </Button>
          <ButtonBase className="bg-[#FE3358] hover:bg-[#fe335899]  text-[#fff] px-5 py-2 rounded font-semibold ease-in-out duration-300">
            Delete
          </ButtonBase>
        </div>
      </div>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <AddNewAddress
          callAddNewAddressApi={callEditAddressApi}
          closeDrawer={toggleDrawer(false)}
        />
      </Drawer>
    </>
  );
}

export default AddressCard;
