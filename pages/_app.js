import { Provider } from "next-auth/client";
import App from "next/app";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import React from "react";
import { Provider as RProvider } from "react-redux";
import configureStore from "../src/redux/store/configureStore";
import "../styles/antd.less";
import "../styles/globals.css";

//
const store = configureStore();
const Noop = ({ children }) => children;

const TopProgressBar = dynamic(
  () => {
    return import("../src/components/Layouts/TopProgressBar");
  },
  { ssr: false }
);

export default class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   return {
  //     pageProps: {
  //       nookies: parseNookies(ctx), // 👈
  //       ...(Component.getInitialProps
  //         ? await Component.getInitialProps(ctx)
  //         : {}),
  //     },
  //   };
  // }
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || Noop;
    return (
      <>
        <Provider
          options={{
            clientMaxAge: 60,
            keepAlive: 5 * 60,
          }}
          session={pageProps.session}
        >
          <RProvider store={store}>
            <TopProgressBar />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RProvider>
        </Provider>
      </>
    );
  }
}
