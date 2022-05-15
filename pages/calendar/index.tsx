import styled from 'styled-components';
import CalendarWebtoonItem from '../category/components/calendarWebtoonItem';
import API from '../../api/axios';
import { useEffect, useState } from 'react';

import { _getListToBePaid, _getRecentlyPaidWebtoonList } from 'api/webtoon';
import { CalendarWebtoon } from '@/types/webtoon';

const CalendarInput = styled.input`
  width: 100%;
  height: 48px;

  margin-top: 16px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;

  ::placeholder {
    padding: 12px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #c4c4c4;
  }
`;

const MainWebttonWrapper = styled.div`
  margin: 0 16px;
  height: 200px;
  background-color: #e9eaee;
  margin-top: 24px;
  border-radius: 22px;
  background: #eee0f7;
  box-shadow: 0px 4px 50px rgb(192 192 224 / 20%);
  border-radius: 22px;
  position: relative;
  overflow: hidden;

  .shadow {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 51.56%, rgba(0, 0, 0, 0.4) 100%);
    width: 100%;
    height: 100%;
    border-radius: 22px;
    position: absolute;
  }

  .img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 262px;
    overflow: hidden;
  }

  .title-wrapper {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    margin: 12px 0 0 12px;
    width: 85px;
    height: 28px;

    .logo {
    }

    .title {
      color: #2c3131;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;

      display: flex;
      align-items: center;
      text-transform: uppercase;
      margin-left: 16px;

      // color: #000000;
    }
  }

  .discount-price {
    color: #ffffff;
    margin-left: 16px;

    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 144% */

    margin-top: 98px;

    display: flex;
    align-items: center;
    text-transform: uppercase;
  }

  .d-day {
    margin-top: 98px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #fff;
    // color: #000000;
    margin-left: 16px;
  }

  .date {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    /* identical to box height, or 154% */

    display: flex;
    align-items: center;
    text-align: right;
    text-transform: uppercase;

    margin-left: 16px;

    color: #fff;
    // color: #6e7781;
  }
`;

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

const Wrapper = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
`;

const Calendar = () => {
  const [toBePaidList, setToBePaidList] = useState([]);
  const [recentlyPaidList, setRecentPaidList] = useState<Array<CalendarWebtoon>>([]);

  const getListToBePaid = async () => {
    const result = await _getListToBePaid();

    if (result.data) {
      console.log(result.data);
      console.log(JSON.stringify(result.data.results));

      setToBePaidList(result.data.results);
    }
  };

  const getRecentlyPaidWebtoonList = async () => {
    const result = await _getRecentlyPaidWebtoonList();

    if (result.data) {
      for (const webtoon of result.data.results) {
        const nowDate = new Date();
        const toDate = webtoon.webtoon_data[0].paid_date;

        if (nowDate.getTime() > new Date(toDate).getTime()) {
          const diffDate = nowDate.getTime() - new Date(toDate).getTime();
          const dateDays = Math.round(diffDate / (1000 * 3600 * 24));

          webtoon.diffDate = dateDays;
        }
      }

      console.log(setRecentPaidList);

      setRecentPaidList(result.data.results);
    }
  };

  useEffect(() => {
    getListToBePaid();
    getRecentlyPaidWebtoonList();
  }, []);

  return (
    <>
      <Wrapper>
        {recentlyPaidList.map((webtoon, index) => (
          <>
            <FeeBasedPaymentWrapper key={index}>
              <p className={'title'}>{webtoon.diffDate}일 전 유료화</p>

              {/* {webtoonMain2.map((webtoon, index) => ( */}
              <CalendarWebtoonItem
                key={index}
                index={index}
                name={webtoon.title}
                dDay={webtoon.diffDate.toString()}
                thumbnailUrl1={webtoon.thumbnail_first_layer}
                thumbnailUrl2={webtoon.thumbnail_second_layer}
                site={webtoon.platform}
                writer={webtoon.author}
                star={'100'}
                liked={webtoon.webtoon_url}
                // isNaver={webtoon.webtoon_data.}
              />
              {/* ))} */}
            </FeeBasedPaymentWrapper>
          </>
        ))}

        <BottomActionWrapper>
          <img style={{ width: '32px', height: '32px' }} src="/icons/ic-bottom-arrow.svg" />

          {/* <p className="share_info_text">친구들에게 서비스를 공유해보세요!</p>

          <div className="btn_share">
            <p>서비스 친구에게 소개하기</p>
          </div> */}
        </BottomActionWrapper>
      </Wrapper>
    </>
  );
};

export default Calendar;
