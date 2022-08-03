declare global {
  interface Window {
    gtag?: any;
  }
}

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { fetcher } from '@/api/axios';

import Footer from '../components/Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'assets/scss/main.scss';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  title: '웹툰투데이ㅣ여기저기 흩어진 웹툰 정보를 한눈에',
  description: '지금 봐야 무료인 네이버, 카카오 웹툰 정보도 알려드려요!',
  canonical: 'https://www.todaytoon.me',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.todaytoon.me',
    title: '웹툰투데이ㅣ여기저기 흩어진 웹툰 정보를 한눈에',
    site_name: '웹툰투데이',
    images: [
      {
        url: 'https://ifh.cc/g/6FyVQj.png',
        width: 128,
        height: 128,
        alt: '웹툰투데이_로고'
      }
    ]
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image'
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isHeaderShow, setIsHeaderShow] = useState(true);

  const sendGa = (text: string) => {
    window.gtag('event', text, { send_to: 'G-RBTEKD8D4E' });
  };

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
          <title>웹툰투데이</title>
          <script async src="https://www.googleoptimize.com/optimize.js?id=OPT-TGCBRJD"></script>
        </Head>

        <DefaultSeo {...DEFAULT_SEO} />

        <div className="global-wrapper">
          {isHeaderShow && (
            <div className="header-wrapper">
              <Link href="/">
                <h1 className="logo pointer">웹툰투데이</h1>
              </Link>

              <Link href="/search">
                <a
                  onClick={() => {
                    sendGa('웹툰투데이_검색');
                  }}
                >
                  <img src="/icons/ic-search.svg" />
                </a>
              </Link>
            </div>
          )}

          <div style={{ flex: 1 }}>
            <Component style={{ flex: 1 }} {...pageProps} />
          </div>

          <Footer />

          <ToastContainer />
        </div>
      </SWRConfig>
    </>
  );
}

export default MyApp;
