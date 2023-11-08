import React, { useEffect } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";

import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import "@/styles/globals.css";


import { Provider } from 'react-redux'
import { store } from "@/redux/store";
import StateSetterComponent from "@/redux/stateSetterComponent/StateSetterComponent";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap" as any);
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <StateSetterComponent/>
        <Header />
        <Layout>
 
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>

  );
}
