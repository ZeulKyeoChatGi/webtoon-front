import styled from 'styled-components';
import CalendarWebtoonItem from '../genre/components/calendarWebtoonItem';
import API from '../../api/axios';
import { useEffect, useState } from 'react';

import { _getListToBePaid, _getRecentlyPaidWebtoonList } from 'api/webtoon';
import { CalendarWebtoon } from '@/types/webtoon';
import Slider from 'react-slick';
import Link from 'next/link';
import ReactLoading from 'react-loading';
import { setComma } from '@/utils/comma';

const FeeBasedPaymentWrapper = styled.div`
  // background-color: #f3f3f3;

  // padding: 16px 16px 0 16px;
  margin-top: 22px;

  p.title {
    margin-bottom: 4px;
    padding: 16px 16px 0 16px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 144% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #000000;
  }
`;

const Layout = styled.div`
  display: flex;
`;

const BottomActionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin-top: 20px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
  }

  .share_info_text {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    /* identical to box height, or 167% */

    display: flex;
    align-items: center;
    text-align: center;

    /* black/60 */

    color: #a9a9a9;
  }

  .btn_share {
    background: #2c3131;
    width: 100%;
    height: 48px;
    margin: 8px 0 24px 0;
    width: 220px;

    p {
      justify-content: center;
      align-items: center;
      height: 100%;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 13px;
      line-height: 20px;
      /* identical to box height, or 154% */

      display: flex;
      align-items: center;

      /* white */

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
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Calendar = () => {
  const [toBePaidList, setToBePaidList] = useState([]);
  const [recentlyPaidList, setRecentPaidList] = useState<Array<CalendarWebtoon>>([]);

  const [page, setPage] = useState(0);

  const [sliderWebtoon, setSliderWebtoon] = useState<Array<CalendarWebtoon>>([]);

  const getListToBePaid = async () => {
    const result = await _getListToBePaid();

    if (result.data) {
      setToBePaidList(result.data.results);
    }
  };

  const getNextPage = () => {
    setPage(page + 1);
  };

  const getRecentlyPaidWebtoonList = async () => {
    const params = {
      page: page + 1
    };

    const result = await _getRecentlyPaidWebtoonList(params);

    if (result.data) {
      for (const webtoon of result.data.results) {
        const nowDate = new Date();
        const toDate = webtoon.webtoon_data[0].paid_date;

        if (nowDate.getTime() > new Date(toDate).getTime()) {
          const diffDate = nowDate.getTime() - new Date(toDate).getTime();
          const dateDays = Math.round(diffDate / (1000 * 3600 * 24));

          webtoon.diffDate = dateDays;
        }

        const paidDate = webtoon.webtoon_data[0].paid_date;
        const year = paidDate.substr(0, 4);
        const month = paidDate.substr(5, 2);
        const day = paidDate.substr(8, 2);

        webtoon.paidYear = year;
        webtoon.paidMonth = month;
        webtoon.paidDay = day;

        const cookiePrice = webtoon.webtoon_data[0].series_count * 240;
        webtoon.cookiePrice = cookiePrice;
      }

      const copyList = [...recentlyPaidList];
      result.data.results.map((webtoon: any) => {
        copyList.push(webtoon);
      });

      setRecentPaidList(copyList);

      const copyList2 = [...copyList];

      setSliderWebtoon(copyList2.splice(0, 2));
    }
  };

  useEffect(() => {
    getListToBePaid();
    getRecentlyPaidWebtoonList();
  }, []);

  useEffect(() => {
    getRecentlyPaidWebtoonList();
  }, [page]);

  return (
    <>
      <Slider {...settings}>
        {sliderWebtoon.map((webtoon, index) => (
          <div key={index}>
            <div style={{ background: webtoon.thumbnail_bg_color.split(':')[1] }} className="main-slider-wrapper">
              <img className="img" src={webtoon.thumbnail_second_layer} />

              <div className="background_shadow"></div>

              <div className="save_info">
                <p className="text_price">지금보면 최대 {setComma(webtoon.cookiePrice, false)}원 절약!</p>
                <p className="text_date">
                  {webtoon.paidYear}년 {webtoon.paidMonth}월 {webtoon.paidDay}일 유료화
                </p>
              </div>

              <div className="save_info"> </div>

              <div className="webtoon_info">
                <p className="webtoon_title">{webtoon.title}</p>
              </div>
            </div>
          </div>
        ))}
        {/* <div>
         
        </div>
        <div>
          <div className="main-slider-wrapper">
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
          </div>
        </div> */}
      </Slider>

      <NavToggleWrapper>
        <Link href="/">
          <a>
            <NavItem className={'toggled'}>
              <p>유료화 일정</p>
            </NavItem>
          </a>
        </Link>

        <Link href="/genre">
          <a>
            <NavItem className={'normal'}>
              <p>장르별 보기</p>
            </NavItem>
          </a>
        </Link>
      </NavToggleWrapper>

      <Wrapper>
        {recentlyPaidList.length > 0 ? (
          <>
            {recentlyPaidList.map((webtoon, index) => (
              <>
                <FeeBasedPaymentWrapper key={index}>
                  <p className={'title'}>{webtoon.diffDate}일 전 유료화</p>

                  <CalendarWebtoonItem
                    key={index}
                    index={index}
                    name={webtoon.title}
                    dDay={webtoon.diffDate.toString()}
                    thumbnailUrl1={webtoon.thumbnail_first_layer}
                    thumbnailUrl2={webtoon.thumbnail_second_layer}
                    site={webtoon.platform}
                    writer={webtoon.author}
                    rating={webtoon.webtoon_data[0].rating || 0}
                    likeCount={webtoon.webtoon_data[0].like_count || 0}
                    isNaver={webtoon.platform === 'NAVER'}
                    isKakao={webtoon.platform === 'KAKAO'}
                    webtoonId={webtoon.id}
                  />
                </FeeBasedPaymentWrapper>
              </>
            ))}
          </>
        ) : (
          <>
            <Layout style={{ display: 'flex', justifyContent: 'center' }}>
              <ReactLoading type="bubbles" color="#000" />

              <div style={{ height: '500px' }}></div>
            </Layout>
          </>
        )}

        <BottomActionWrapper>
          <img onClick={getNextPage} className="pointer" style={{ width: '32px', height: '32px' }} src="/icons/ic-more-btn.svg" />
        </BottomActionWrapper>
      </Wrapper>
    </>
  );
};

export default Calendar;
