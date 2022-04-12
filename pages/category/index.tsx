import { useState } from 'react';
import styled from 'styled-components';
import CalendarWebtoonItem from './components/calendarWebtoonItem';

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

  width: 328px;
  height: 200px;
  background-color: #e9eaee;

  margin-top: 24px;
  border-radius: 22px;

  .title-wrapper {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    margin: 12px 0 0 12px;
    width: 85px;
    height: 28px;

    .logo {
    }

    .title {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;

      display: flex;
      align-items: center;
      text-transform: uppercase;
      margin-left: 16px;

      color: #000000;
    }
  }

  .d-day {
    margin-top: 98px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #000000;
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

    color: #6e7781;
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

const Wrapper = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
`;

const Chip = styled.div`
  width: 61px;
  height: 32px;
  left: 57px;
  top: 0px;

  background: #adadad;
  border-radius: 16px;
  margin-right: 8px;

  cursor: pointer;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #ffffff;
  }
`;

const Layout = styled.div`
  display: flex;
`;

const Divider = styled.div`
  height: 8px;
  left: 0px;
  top: 219px;

  background: #f3f3f3;
`;

const WebtoonCard = styled.div`
  // width: 328px;
  height: 180px;
  left: 16px;
  margin: 0 16px;
  top: 295px;
  margin-bottom: 20px;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.025) 0%, rgba(0, 0, 0, 0) 0.01%, rgba(0, 0, 0, 0.2) 100%), #abb4bf;

  p.title {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #ffffff;

    margin-left: 12px;
    margin-top: 104px;
  }

  p.writer {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: rgba(255, 255, 255, 0.8);

    margin-left: 12px;
    margin-bottom: 4px;
  }

  p.description {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #ffffff;

    margin-left: 12px;

    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 12px;
  }
`;

const Calendar = () => {
  const webtoonMain = [
    {
      site: 'naver',
      date: 'D-3',
      name: '대학일기',
      datetext: '2022년 04월 20일 유료화'
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
      liked: '44.9만',
      description: '줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리'
    },
    {
      site: 'naver',
      name: '대학일기',
      dDay: 'D-3',
      thumbnailUrl: '',
      writer: '작가이름',
      star: '5.00',
      liked: '44.9만',
      description: '줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리'
    },
    {
      site: 'naver',
      name: '대학일기',
      dDay: 'D-3',
      thumbnailUrl: '',
      writer: '작가이름',
      star: '5.00',
      liked: '44.9만',
      description: '줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리'
    },
    {
      site: 'naver',
      name: '대학일기',
      dDay: 'D-3',
      thumbnailUrl: '',
      writer: '작가이름',
      star: '5.00',
      liked: '44.9만',
      description: '줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리'
    }
  ];

  const categories = [
    {
      text: '전체',
      value: 'ALL'
    },
    {
      text: '판타지',
      value: 'cate1'
    },
    {
      text: '로맨스',
      value: 'cate2'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  return (
    <>
      {/* <CalendarInput placeholder="웹툰명을 검색해주세요." /> */}

      <Wrapper>
        <Layout style={{ marginLeft: '19px', marginTop: '16px', marginBottom: '24px' }}>
          {categories.map((cat, index) => (
            <Chip onClick={() => setSelectedCategory(cat.value)} className={selectedCategory === cat.value ? 'selected' : 'test'} key={index}>
              <p>{cat.text}</p>
            </Chip>
          ))}
        </Layout>

        <Divider />

        {webtoonMain2.map((webtoon, index) => (
          <WebtoonCard>
            <p className="title">{webtoon.name}</p>
            <p className="writer">{webtoon.writer}</p>
            <p className="description">{webtoon.description}</p>
          </WebtoonCard>
        ))}
        {/* 
        {webtoonMain.map((webtoon, index) => (
          <MainWebttonWrapper key={index}>
            <div>
              <div className={'title-wrapper'}>
                <p className={'title'}>{webtoon.name}</p>
              </div>

              <p className={'d-day'}>{webtoon.date}</p>
              <p className={'date'}>{webtoon.datetext}</p>
            </div>
          </MainWebttonWrapper>
        ))} */}

        {/* <FeeBasedPaymentWrapper>
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
        </FeeBasedPaymentWrapper> */}
      </Wrapper>
    </>
  );
};

export default Calendar;
