import type { NextPage } from 'next';
import Link from 'next/link';

import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';
// import styles from '../styles/Home.module.css'
import styled from 'styled-components';

import Slider from 'react-slick';

import CalendarWebtoonItem from './category/components/calendarWebtoonItem';
import Calendar from './calendar';
import Category from './category';

const GlobalWrapper = styled.div`
  padding: 16px 0 0 0;
  max-width: 640px;
  // display: flex;
  // align-item: center;
  // flex-direction: column;
  margin: 0 0;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderWrapper = styled.div`
  padding: 0 16px;

  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  // background-color: blue;
  justify-content: space-between;

  p,
  h1 {
    // margin-left: 8px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
  }

  h1 {
    font-family: 'ChangwonDangamAsac';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    /* identical to box height, or 108% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #2c3131;
  }
`;

const MainSliderWrapper = styled.div`
  width: 100%;
  height: 340px;
  position: relative;
  background-color: #eee0f7;
  // background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 40.1%);

  img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .background_shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 40.1%);
  }

  .save_info {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: absolute;
    right: 16px;
    top: 16px;

    .text_price {
      /* M/20px/bold */

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 140%;
      /* identical to box height, or 28px */

      display: flex;
      align-items: center;

      /* black/100 */

      color: #2c3131;
    }

    .text_date {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      /* identical to box height, or 24px */

      display: flex;
      align-items: center;
      text-align: right;

      /* black/100 */

      color: #2c3131;

      display: flex;
      flex-flow: row-reverse;
    }
  }

  .webtoon_title {
  }

  .webtoon_info {
    position: absolute;
    width: 137px;
    height: 28px;
    right: 16px;
    bottom: 17px;

    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    p.webtoon_title {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */

      display: flex;
      align-items: center;
      text-align: right;
      text-transform: uppercase;

      color: #ffffff;
    }
  }
`;

const NavToggleWrapper = styled.div`
  display: flex;
  height: 48px;
  cursor: pointer;
  border-bottom: 1px solid #000000;
  margin-top: 24px;

  .toggled {
    width: 120px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;

    color: white;
    background: #000000;
  }

  .normal {
    width: 120px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;

    opacity: 0.3;

    color: #000000;
  }
`;

const NavIcon = styled.div`
  width: 50%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 18.59px;
  }
`;

const NavItem = styled.div`
  width: 50%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home: NextPage = () => {
  const [isMainSlider, setIsMainSlider] = useState(true);
  const [toggleMenu, setToggleMenu] = useState('calendar');
  const [animation, setAnimation] = useState('');

  const homeRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const settings = {
    customPaging: function () {
      return (
        <a>
          <div className="slider_bar">
            <div className="item"></div>
          </div>
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const changeToggleMenu = (menu: string) => {
    if (menu === 'calendar') {
      // topRef.current?.scrollIntoView({ behavior: 'smooth' });

      setIsMainSlider(true);
    } else {
      homeRef.current?.scrollIntoView({ behavior: 'smooth' });

      var scrollTimeout: NodeJS.Timeout;

      const scrollFunction = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
          console.log(menu);
          if (menu === 'category') {
            console.log('Scroll ended');
            setIsMainSlider(false);

            removeEventListener('scroll', scrollFunction);
          }
        }, 100);
      };

      addEventListener('scroll', scrollFunction);

      // setTimeout(() => {
      //   setIsMainSlider(menu === 'calendar');
      // }, 1000);
    }

    setToggleMenu(menu);

    // setTimeout(() => {
    //   setIsMainSlider(menu === 'calendar');
    // }, 1000);
  };

  return (
    <>
      <GlobalWrapper ref={topRef}>
        <HeaderWrapper style={{}}>
          <h1 className="logo">오늘의 웹툰</h1>

          <Link href="/search">
            <a>
              <img src="/icons/ic-search.svg" />
            </a>
          </Link>
        </HeaderWrapper>

        {isMainSlider ? (
          <>
            <Slider {...settings}>
              <div>
                <MainSliderWrapper className={`${animation}`}>
                  <img className="img" src="/images/temp/thumb_main.png" />

                  <div className="background_shadow"></div>

                  <div className="save_info">
                    <p className="text_price">지금보면 최대 20,000원 절약!</p>
                    <p className="text_date">2022년 04월 08일 유료화</p>
                  </div>

                  <div className="save_info"> </div>

                  <div className="webtoon_info">
                    <p className="webtoon_title">와이키키 뱀파이어</p>
                  </div>
                </MainSliderWrapper>
              </div>
              <div>
                <MainSliderWrapper className={`${animation}`}>
                  <img className="img" src="/images/temp/thumb_main.png" />

                  <div className="background_shadow"></div>

                  <div className="save_info">
                    <p className="text_price">지금보면 최대 20,000원 절약!</p>
                    <p className="text_date">2022년 04월 08일 유료화</p>
                  </div>

                  <div className="save_info"> </div>

                  <div className="webtoon_info">
                    <p className="webtoon_title">와이키키 뱀파이어</p>
                  </div>
                </MainSliderWrapper>
              </div>
              <div>
                <MainSliderWrapper className={`${animation}`}>
                  <img className="img" src="/images/temp/thumb_main.png" />

                  <div className="background_shadow"></div>

                  <div className="save_info">
                    <p className="text_price">지금보면 최대 20,000원 절약!</p>
                    <p className="text_date">2022년 04월 08일 유료화</p>
                  </div>

                  <div className="save_info"> </div>

                  <div className="webtoon_info">
                    <p className="webtoon_title">와이키키 뱀파이어</p>
                  </div>
                </MainSliderWrapper>
              </div>
            </Slider>

            {/* <MainSliderWrapper className={`${animation}`}>
              <img className="img" src="/images/temp/thumb_main.png" />

              <div className="background_shadow"></div>

              <div className="save_info">
                <p className="text_price">지금보면 최대 20,000원 절약!</p>
                <p className="text_date">2022년 04월 08일 유료화</p>
              </div>

              <div className="save_info"> </div>

              <div className="webtoon_info">
                <p className="webtoon_title">와이키키 뱀파이어</p>
              </div>
            </MainSliderWrapper> */}
          </>
        ) : (
          <></>
        )}

        <NavToggleWrapper ref={homeRef}>
          <NavItem onClick={() => changeToggleMenu('calendar')} className={toggleMenu === 'calendar' ? 'toggled' : 'normal'}>
            <p>유료화 일정</p>
          </NavItem>

          <NavItem onClick={() => changeToggleMenu('category')} className={toggleMenu === 'category' ? 'toggled' : 'normal'}>
            <p>장르별 보기</p>
          </NavItem>
        </NavToggleWrapper>

        {/* <div className={toggleMenu === 'calendar' ? '' : 'display_none'}>
          <Calendar></Calendar>
        </div>

        <div className={toggleMenu === 'calendar' ? 'display_none' : ''}>
          <Category></Category>
        </div> */}

        {toggleMenu === 'calendar' ? (
          <>
            <Calendar></Calendar>
          </>
        ) : (
          <>
            <Category></Category>
          </>
        )}
      </GlobalWrapper>
    </>
    // <div className={styles.container}>

    //  <Head>
    //   <title>Create Next App</title>
    //   <meta name="description" content="Generated by create next app" />
    //   <link rel="icon" href="/favicon.ico" />
    // </Head>

    // <main className={styles.main}>
    //   <h1 className={styles.title}>
    //     Welcome to <a href="https://nextjs.org">Next.js!</a>
    //   </h1>

    //   <p className={styles.description}>
    //     Get started by editing{' '}
    //     <code className={styles.code}>pages/index.tsx</code>
    //   </p>

    //   <div className={styles.grid}>
    //     <a href="https://nextjs.org/docs" className={styles.card}>
    //       <h2>Documentation &rarr;</h2>
    //       <p>Find in-depth information about Next.js features and API.</p>
    //     </a>

    //     <a href="https://nextjs.org/learn" className={styles.card}>
    //       <h2>Learn &rarr;</h2>
    //       <p>Learn about Next.js in an interactive course with quizzes!</p>
    //     </a>

    //     <a
    //       href="https://github.com/vercel/next.js/tree/canary/examples"
    //       className={styles.card}
    //     >
    //       <h2>Examples &rarr;</h2>
    //       <p>Discover and deploy boilerplate example Next.js projects.</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //     >
    //       <h2>Deploy &rarr;</h2>
    //       <p>
    //         Instantly deploy your Next.js site to a public URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>

    // <footer className={styles.footer}>
    //   <a
    //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Powered by{' '}
    //     <span className={styles.logo}>
    //       <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    //     </span>
    //   </a>
    // </footer>
    // </div>
  );
};

export default Home;
