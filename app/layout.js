"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useWrappedStore } from "next-redux-wrapper";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import StoreProvider from "./StoreProvider";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";
import Loading from "./loading";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head> */}

      <body className={inter.className}>
        {/* <Suspense fallback={<Loading />}> */}
          <StoreProvider>
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={3000}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              {children}
            </SnackbarProvider>
          </StoreProvider>
        {/* </Suspense> */}
      </body>
    </html>
  );
}
