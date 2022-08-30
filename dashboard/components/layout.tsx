import Header from "./header/header";
import Head from "next/head";
import React from "react";

function Layout({seometa, children} : any){
  return <>
  <Header/>
  <main style={{marginLeft: "130px", marginTop: "30px"}}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" href="/favicon.ico" />
      {seometa}
    </Head>
  
    {children}
  </main>
  <footer style={{textAlign: "center", marginTop: "60px"}}>
    <p>Copyright : &copy; Emiljano Doka 2022</p>
  </footer>
  </>
}
export default Layout;