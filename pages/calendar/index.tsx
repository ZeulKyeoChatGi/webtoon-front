import styled from 'styled-components';
import CalendarWebtoonItem from '../category/components/calendarWebtoonItem';

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
      color: #2C3131;
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
  background-color: #f3f3f3;

  padding: 16px 16px 0 16px;
  margin-top: 22px;

  p.title {
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

const Calendar = () => {
  const webtoonMain = [
    {
      site: 'naver',
      date: 'D-3',
      name: '대학일기',
      datetext: '2022년 04월 20일 유료화',
      discountPrice: 20000
    }
  ];

  const webtoonMain2 = [
    {
      site: 'naver',
      name: '대학일기',
      dDay: 'D-3',
      thumbnailUrl: '',
      writer: '작가이름',
      star: '5.00',
      liked: '44.9만'
    }
  ];

  const Wrapper = styled.div`
    display: flex;
    align-item: center;
    flex-direction: column;
  `;

  return (
    <>
      {/* <CalendarInput placeholder="웹툰명을 검색해주세요." /> */}

      <Wrapper>
        {webtoonMain.map((webtoon, index) => (
          <MainWebttonWrapper key={index}>
            <div className="shadow"></div>
            <img className="img" src="/images/temp/thumb_main.png" />

            <div style={{ position: 'absolute' }}>
              <div className={'title-wrapper'}>
                <p className={'title'}>{webtoon.name}</p>
              </div>

              {/* <p className={'d-day'}>{webtoon.date}</p> */}
              <p className="discount-price">지금보면 최대 {webtoon.discountPrice}원 절약</p>
              <p className={'date'}>{webtoon.datetext}</p>
            </div>
          </MainWebttonWrapper>
        ))}

        <FeeBasedPaymentWrapper>
          <p className={'title'}>유료화가 될 다른 웹툰</p>

          {webtoonMain2.map((webtoon, index) => (
            <CalendarWebtoonItem
              key={index}
              name={webtoon.name}
              dDay={webtoon.dDay}
              thumbnailUrl={webtoon.thumbnailUrl}
              site={webtoon.site}
              writer={webtoon.writer}
              star={webtoon.star}
              liked={webtoon.liked}
            />
          ))}
        </FeeBasedPaymentWrapper>
      </Wrapper>
    </>
  );
};

export default Calendar;
