import styled from 'styled-components';
import CalendarWebtoonItem from './genre/components/calendarWebtoonItem';
import API from '../api/axios';
import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';

import { _getListToBePaid, _getRecentlyPaidWebtoonList } from 'api/webtoon';
import { CalendarWebtoon } from '@/types/webtoon';
import Slider from 'react-slick';
import Link from 'next/link';
import ReactLoading from 'react-loading';
import { setComma } from '@/utils/comma';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

const Layout = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
`;

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
  // autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true
};
const PRESS_TIME_UNTIL_DRAG_MS = 250;

const Calendar = ({ data, isEmptyPaidWebtoon }: any) => {
  const router = useRouter();

  const [isApiLoading, setIsApiLoading] = useState(false);

  const [isLastPage, setIsLastPage] = useState(false);

  const [toBePaidList, setToBePaidList] = useState<Array<CalendarWebtoon>>([]);
  const [recentlyPaidList, setRecentPaidList] = useState<Array<CalendarWebtoon>>([]);

  const [page, setPage] = useState(0);

  const [sliderWebtoon, setSliderWebtoon] = useState<Array<CalendarWebtoon>>([]);

  const [dataloaded, setDataloaded] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [sliderClick, setSliderClick] = useState(false);

  const onDragStart = () => {
    setSliderClick(true);
  };

  const onDragMove = () => {
    if (sliderClick) {
      setDragging(true);
    }
  };

  const onDragEnd = () => {
    setTimeout(() => {
      setDragging(false);
      setSliderClick(false);
    }, 100);
  };

  const getListToBePaid = async () => {
    let result: any = {};

    if (data.results.length > 0) {
      result.data = data;
      setSliderWebtoons(data.results);
    }
  };

  const setSliderWebtoons = (results: any) => {
    console.log(results);
    setDataloaded(true);

    if (results) {
      for (const [idx, webtoon] of results.entries()) {
        const nowDate = new Date();
        const toDate = webtoon.webtoon_data[0].paid_date;

        const diffDate = nowDate.getTime() - new Date(toDate).getTime();
        const dateDays = Math.round(diffDate / (1000 * 3600 * 24));

        if (dateDays === 0) {
          webtoon.diffDate = -1;
        } else {
          webtoon.diffDate = dateDays;
        }

        const paidDate = webtoon.webtoon_data[0].paid_date;
        const year = paidDate.substr(0, 4);
        const month = paidDate.substr(5, 2);
        const day = paidDate.substr(8, 2);

        webtoon.paidYear = year;
        webtoon.paidMonth = month;
        webtoon.paidDay = day;

        const cookiePrice = webtoon.webtoon_data[0].series_count * 200;
        webtoon.cookiePrice = cookiePrice;

        if (idx > 0) {
          if (results[idx - 1].diffDate === webtoon.diffDate) {
            webtoon.isSameDiffDate = true;
          } else {
            webtoon.isSameDiffDate = false;
          }
        }
      }

      if (!isEmptyPaidWebtoon) {
        setToBePaidList(results);
      }

      let copyList2 = [...results];

      const _kakaoWebtoonList = copyList2.filter((x) => x.platform === 'KAKAO');
      const _naverWebtoonList = copyList2.filter((x) => x.platform === 'NAVER');

      let paidWebtoonList = [];

      let kakaoList = [];
      let naverList = [];

      for (const img of _kakaoWebtoonList) {
        if (kakaoList.length <= 0) {
          kakaoList.push(img);
        } else if (kakaoList[0].webtoon_data[0].paid_date === img.webtoon_data[0].paid_date) {
          kakaoList.push(img);
        }
      }

      for (const img of _naverWebtoonList) {
        if (naverList.length <= 0) {
          naverList.push(img);
        } else if (naverList[0].webtoon_data[0].paid_date === img.webtoon_data[0].paid_date) {
          naverList.push(img);
        }
      }

      paidWebtoonList = kakaoList.concat(naverList);

      paidWebtoonList = paidWebtoonList.sort(() => Math.random() - 0.5);
      paidWebtoonList = paidWebtoonList.splice(0, 3);

      for (const img of paidWebtoonList) {
        const _img1 = new Image();
        _img1.src = img.thumbnail_first_layer;

        const _img2 = new Image();
        _img2.src = img.thumbnail_second_layer;

        if (img.platform === 'NAVER') {
          img.widthDiff = (_img2.width - _img1.width) * -1 + 'px';
        }
      }

      console.log(paidWebtoonList);

      setSliderWebtoon(paidWebtoonList);
    }
  };

  const getNextPage = () => {
    setPage(page + 1);
  };

  const onClickSlider = (webtoonId: string) => {
    if (!dragging) {
      router.push(`/${webtoonId}`);
    }
  };

  const sendGa = (text: string) => {
    window.gtag('event', text, { send_to: 'G-RBTEKD8D4E' });
  };

  const getRecentlyPaidWebtoonList = async () => {
    setIsApiLoading(true);

    const params = {
      page: page + 1
    };

    const result = await _getRecentlyPaidWebtoonList(params);

    if (result) {
      if (data.results.length <= 0) {
        setSliderWebtoons(result.data.results);
      }

      if (result.data.next === null) setIsLastPage(true);

      for (const [idx, webtoon] of result.data.results.entries()) {
        const nowDate = new Date();
        const toDate = webtoon.webtoon_data[0].paid_date;

        if (nowDate.getTime() > new Date(toDate).getTime()) {
          const diffDate = nowDate.getTime() - new Date(toDate).getTime();
          const dateDays = Math.round(diffDate / (1000 * 3600 * 24));

          if (dateDays === 0) {
            webtoon.diffDate = 1;
          } else {
            webtoon.diffDate = dateDays;
          }
        }

        const paidDate = webtoon.webtoon_data[0].paid_date;
        const year = paidDate.substr(0, 4);
        const month = paidDate.substr(5, 2);
        const day = paidDate.substr(8, 2);

        webtoon.paidYear = year;
        webtoon.paidMonth = month;
        webtoon.paidDay = day;

        const cookiePrice = webtoon.webtoon_data[0].series_count * 200;
        webtoon.cookiePrice = cookiePrice;

        if (idx > 0) {
          if (result.data.results[idx - 1].diffDate === webtoon.diffDate) {
            webtoon.isSameDiffDate = true;
          } else {
            webtoon.isSameDiffDate = false;
          }
        }

        const _img1 = new Image();
        _img1.src = webtoon.thumbnail_first_layer;

        const _img2 = new Image();
        _img2.src = webtoon.thumbnail_second_layer;

        if (webtoon.platform === 'NAVER') {
          webtoon.widthDiff = ((_img2.width - _img1.width) * -1) / 3 + 'px';
        }
      }

      const copyList = [...recentlyPaidList];
      result.data.results.map((webtoon: any) => {
        copyList.push(webtoon);
      });

      setRecentPaidList(copyList);
    }

    setIsApiLoading(false);
  };

  useEffect(() => {
    getListToBePaid();

    // getRecentlyPaidWebtoonList();
  }, []);

  useEffect(() => {
    getRecentlyPaidWebtoonList();
  }, [page]);

  return (
    <>
      {dataloaded ? (
        <>
          {sliderWebtoon.length > 0 ? (
            <>
              <Slider {...settings}>
                {sliderWebtoon.map((webtoon, index) => (
                  <div
                    onMouseDownCapture={onDragStart}
                    onMouseMoveCapture={onDragMove}
                    onMouseUpCapture={onDragEnd}
                    onClick={() => onClickSlider(String(webtoon.id))}
                    key={webtoon.id}
                    className="pointer"
                  >
                    <div style={{ background: webtoon.thumbnail_bg_color.split(':')[1] }} className="main-slider-wrapper">
                      <img className="img" src={webtoon.thumbnail_first_layer} />
                      <img className="img2" src={webtoon.thumbnail_second_layer} />

                      <div className="background_shadow"></div>

                      <div className="save_info">
                        {webtoon.diffDate > 0 ? (
                          <p className="text_price">최근 유료화 됐어요</p>
                        ) : (
                          <p className="text_price">지금보면 최대 {setComma(webtoon.cookiePrice)}원 절약!</p>
                        )}

                        {webtoon.diffDate === 0 && <p className="text_date">오늘 유료화 예정</p>}

                        <p className="text_date">
                          {webtoon.paidYear}년 {webtoon.paidMonth}월 {webtoon.paidDay}일 유료화
                        </p>
                      </div>

                      <div className="save_info"> </div>

                      <div className="webtoon_info">
                        {webtoon.platform === 'KAKAO' ? (
                          <>
                            <img src="/icons/K.svg" />
                          </>
                        ) : (
                          <>
                            <img src="/icons/N.svg" />
                          </>
                        )}

                        <p className="webtoon_title">{webtoon.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <>
              <div className="main-slider-empty">
                <p>유료화 일정인 웹툰이 없어요!</p>

                <img src="/icons/ic-slider-empty.svg" />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ height: '500px' }}></div>
        </>
      )}

      <div className="nav-toggle-wrapper">
        <Link href="/">
          <a
            onClick={() => {
              sendGa('오늘의웹툰_유료화_일정');
            }}
          >
            <div className={'toggled nav-item'}>
              <p>유료화 일정</p>
            </div>
          </a>
        </Link>

        <Link href="/genre">
          <a
            onClick={() => {
              sendGa('오늘의웹툰_장르별_보기');
            }}
          >
            <div className={'normal nav-item'}>
              <p>장르별 보기</p>
            </div>
          </a>
        </Link>
      </div>

      <Wrapper>
        {toBePaidList.length >= 0 && recentlyPaidList.length >= 0 ? (
          <>
            {toBePaidList.map((webtoon, index) => (
              <>
                <div className="fee-based-payment-wrapper" style={{ marginTop: webtoon.isSameDiffDate ? '0' : '22px' }} key={index}>
                  {webtoon.diffDate === 0 ? (
                    <>{!webtoon.isSameDiffDate && <p className={'title'}>오늘 유료화 예정</p>}</>
                  ) : (
                    <>{!webtoon.isSameDiffDate && <p className={'title'}>{webtoon.diffDate * -1}일 뒤에 유료화</p>}</>
                  )}

                  <CalendarWebtoonItem
                    key={index}
                    index={index}
                    name={webtoon.title}
                    dDay={webtoon.diffDate.toString()}
                    thumbnailUrl1={webtoon.thumbnail_first_layer}
                    thumbnailUrl2={webtoon.thumbnail_second_layer}
                    backgroundColor={webtoon.thumbnail_bg_color}
                    site={webtoon.platform}
                    writer={webtoon.author}
                    rating={webtoon.webtoon_data[0].rating || 0}
                    likeCount={webtoon.webtoon_data[0].like_count || 0}
                    isNaver={webtoon.platform === 'NAVER'}
                    isKakao={webtoon.platform === 'KAKAO'}
                    is_censored={webtoon.is_censored}
                    webtoonId={webtoon.id}
                    widthDiff={webtoon.widthDiff}
                  />
                </div>
              </>
            ))}

            {<p className={'webtoon-list-title'}>최근 유료화 된 작품</p>}
            {recentlyPaidList.map((webtoon, index) => (
              <>
                <div className="fee-based-payment-wrapper" style={{ marginTop: webtoon.isSameDiffDate ? '0' : '0' }} key={index}>
                  <CalendarWebtoonItem
                    key={index}
                    index={index}
                    name={webtoon.title}
                    dDay={webtoon.diffDate.toString()}
                    thumbnailUrl1={webtoon.thumbnail_first_layer}
                    thumbnailUrl2={webtoon.thumbnail_second_layer}
                    backgroundColor={webtoon.thumbnail_bg_color}
                    site={webtoon.platform}
                    writer={webtoon.author}
                    rating={webtoon.webtoon_data[0].rating || 0}
                    likeCount={webtoon.webtoon_data[0].like_count || 0}
                    isNaver={webtoon.platform === 'NAVER'}
                    isKakao={webtoon.platform === 'KAKAO'}
                    is_censored={webtoon.is_censored}
                    webtoonId={webtoon.id}
                    widthDiff={webtoon.widthDiff}
                  />
                </div>
              </>
            ))}

            {isApiLoading && (
              <>
                <Layout style={{ display: 'flex', justifyContent: 'center' }}>
                  <ReactLoading type="bubbles" color="#000" />
                </Layout>
              </>
            )}
          </>
        ) : (
          <>
            <Layout style={{ display: 'flex', justifyContent: 'center' }}>
              <ReactLoading type="bubbles" color="#000" />

              <div style={{ height: '500px' }}></div>
            </Layout>
          </>
        )}

        <div className="bottom-action-wrapper">
          {!isLastPage ? (
            <img onClick={getNextPage} className="pointer" style={{ width: '32px', height: '32px' }} src="/icons/ic-more-btn.svg" />
          ) : (
            <div style={{ height: '90px' }}></div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await _getListToBePaid();
  return { props: { data: res.data, isEmptyPaidWebtoon: false, fallback: 'blocking' } };
};

export default Calendar;
