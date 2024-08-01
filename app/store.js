import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { homeSlice } from "./ui/home/slice";
import { productsByCategorySlice } from "./[categoryKey]/slice";
import { personalInfoSlice } from "./personal-info/slice";
import { productsByBrandSlice } from "./brands/[brandKey]/slice";
import { productByIdSlice } from "./product/[id]/slice";
import { termAndConditionSlice } from "./term-and-condition/slice";
import { refundAndCancellationSlice } from "./refund-and-cancellation/slice";
import { privacyPolicySlice } from "./privacy-policy/slice";
import { authModalSlice } from "./ui/login-form/slice";
import { commonSlice } from "./ui/slice";
import { ordersPlaced } from "./orders/slice";
import { savedAdresses } from "./save-address/slice";

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       home: homeSlice.reducer,
//     },
//     devTools: true,
//   });
// export const wrapper = createWrapper(makeStore);

export const makeStore = () => {
  return configureStore({
    reducer: {
        home: homeSlice.reducer,
        productsByCat : productsByCategorySlice.reducer,
        personalInfo : personalInfoSlice.reducer,
        productsByBrand: productsByBrandSlice.reducer,
        productById : productByIdSlice.reducer,
        privacyPolicy : privacyPolicySlice.reducer,
        refundAndCancellation : refundAndCancellationSlice.reducer,
        termAndCondition : termAndConditionSlice.reducer,
        authModal : authModalSlice.reducer,
        commonSlice : commonSlice.reducer,
        ordersPlaced:ordersPlaced.reducer,
        savedAdresses:savedAdresses.reducer,
      }
  })
}
