import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';

import Footer from '../components/Footer';
import styled from 'styled-components';

import '../assets/scss/global.scss';
import '../assets/scss/animation.scss';

import '../assets/scss/search.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'assets/scss/main.scss';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

import Link from 'next/link';
import Head from 'next/head';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  useEffect(() => {
    // @ts-ignore
    window.Kakao.init('350229edb0e64261ecacf6fdcc508c57');
  }, []);

  return (
    <>
      <Head>
        <title>오늘의 웹툰</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="global-wrapper">
        <div className="header-wrapper">
          <Link href="/">
            <h1 className="logo pointer">오늘의 웹툰</h1>
          </Link>

          <Link href="/search">
            <a>
              <img src="/icons/ic-search.svg" />
            </a>
          </Link>
        </div>

        <Component {...pageProps} />
        <Footer />

        <ToastContainer />
      </div>
    </>
  );
}

export default MyApp;
