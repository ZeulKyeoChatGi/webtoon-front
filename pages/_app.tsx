import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { fetcher } from '@/api/axios';

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
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isHeaderShow, setIsHeaderShow] = useState(true);

  useEffect(() => {
    // @ts-ignore
    window.Kakao.init('350229edb0e64261ecacf6fdcc508c57');

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (router.asPath.includes('/search')) {
      setIsHeaderShow(false);
    } else {
      setIsHeaderShow(true);
    }
  }, [router]);

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Head>
          <script async src="https://www.googleoptimize.com/optimize.js?id=OPT-TGCBRJD"></script>
        </Head>
        <div className="global-wrapper">
          {isHeaderShow && (
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
          )}

          <Component {...pageProps} />
          <Footer />

          <ToastContainer />
        </div>
      </SWRConfig>
    </>
  );
}

export default MyApp;
