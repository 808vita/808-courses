import React, { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "@/components/Layout";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap" as any);
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout></>
  );
}
