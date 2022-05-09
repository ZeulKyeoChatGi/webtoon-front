import '../styles/globals.css';
import type { AppProps } from 'next/app';

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

const GlobalWrapper = styled.div`
  // padding: 16px 0 0 0;
  max-width: 640px;
  // display: flex;
  // align-item: center;
  // flex-direction: column;
  margin: 0 0;
  margin-left: auto;
  margin-right: auto;
`;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.Kakao.init('350229edb0e64261ecacf6fdcc508c57');
  }, []);

  return (
    <>
      <GlobalWrapper>
        <Component {...pageProps} />
        <Footer />

        <ToastContainer />
      </GlobalWrapper>
    </>
  );
}

export default MyApp;
