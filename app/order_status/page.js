import React from "react";
import Successfull from "./success";
import FraudAwarness from "../ui/fraud-aware";
import Copyright from "../ui/copyright";
import Header from "../ui/header";
import GlobalSearch from "../ui/global-search";
import FroudAlert from "../ui/froud-alert";

function OrderStatus() {
  return (
    <div className="flex flex-col">
      <Header />
      <GlobalSearch />
      <Successfull />
      <FroudAlert/>
      <Copyright />
    </div>
  );
}

export default OrderStatus;
