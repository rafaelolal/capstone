import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { AppWrapper } from "../context/state";
import Navbar from "../components/layout/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Script
        type="text/javascript"
        src="/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />

      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick={false}
        pauseOnHover
      />
    </AppWrapper>
  );
}
