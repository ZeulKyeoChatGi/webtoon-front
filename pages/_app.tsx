import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import styled from 'styled-components';

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
  return (
    <>
      <GlobalWrapper>
        <Component {...pageProps} />
        <Footer />
      </GlobalWrapper>
    </>
  );
}

export default MyApp;
