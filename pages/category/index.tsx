import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarWebtoonItem from './components/calendarWebtoonItem';

import { _getWebtoonListAll } from 'api/webtoon';
import 'react-spring-bottom-sheet/dist/style.css';

import SelectBox from 'components/SelectBox';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { CategoryWebtoon } from 'types/webtoon';

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
  // width: 61px;
  padding: 0 12px;
  height: 32px;
  left: 57px;
  top: 0px;

  background: #adadad;
  // border-radius: 16px;
  margin-right: 8px;

  cursor: pointer;

  p {
    width: max-content;
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

    // color: #ffffff;
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
  height: 180px;
  margin: 0 16px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  z-index: 3;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.025) 0%, rgba(0, 0, 0, 0) 0.01%, rgba(0, 0, 0, 0.2) 100%), #abb4bf;

  img.background {
    z-index: -1;
    position: absolute;
    overflow: hidden;
    width: 100%;
  }

  img.background2 {
    z-index: -1;
    position: absolute;
    overflow: hidden;
    width: 100%;
  }

  p.title {
    z-index: 10;
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
    z-index: 10;
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
    z-index: 10;
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
    },
    {
      text: '학원물',
      value: 'cate3'
    },
    {
      text: '무협',
      value: 'cate4'
    },
    {
      text: '카테고리',
      value: 'cate5'
    },
    {
      text: '카테고리~~',
      value: 'cate6'
    }
  ];

  const [open, setOpen] = useState(false);
  const onDismiss = () => {
    setOpen(false);
  };

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [webtoonList, setWebtoonList] = useState<Array<CategoryWebtoon>>([]);

  const getWebtoonListAll = async () => {
    const result = await _getWebtoonListAll();

    result.data.results.map((webtoon: any, index: number) => {
      webtoon.thumbnail_second_layer = '';
    });

    setWebtoonList(result.data.results);
  };

  useEffect(() => {
    getWebtoonListAll();
  }, []);

  return (
    <>
      {/* <CalendarInput placeholder="웹툰명을 검색해주세요." /> */}

      <Wrapper>
        <Layout className="category_scroll" style={{ overflowX: 'auto', height: '64px', marginLeft: '19px' }}>
          {categories.map((cat, index) => (
            <Chip onClick={() => setSelectedCategory(cat.value)} className={selectedCategory === cat.value ? 'selected' : ''} key={index}>
              <p>{cat.text}</p>
            </Chip>
          ))}
        </Layout>

        <Divider />

        <div className="category_filter_container">
          <SelectBox />

          <img src="/icons/ic_filter.svg" onClick={() => setOpen(true)} />
        </div>

        {webtoonList.map((webtoon, index) => (
          <WebtoonCard key={index}>
            <img className="background" src={webtoon.thumbnail_first_layer} />

            {webtoon.thumbnail_second_layer ? (
              <>
                <img className="background2" src={webtoon.thumbnail_second_layer} />
              </>
            ) : (
              <></>
            )}
            <p className="title">{webtoon.title}</p>
            <p className="writer">{webtoon.author}</p>
            <p className="description">{webtoon.description}</p>
          </WebtoonCard>
        ))}
      </Wrapper>

      <BottomSheet open={open} onDismiss={onDismiss} snapPoints={({ minHeight }) => minHeight}>
        <div className="bottom_sheet_item">
          <p>네이버 웹툰</p>
        </div>

        <div className="bottom_sheet_item mt-32">
          <p>카카오 웹툰</p>
        </div>

        <div className="bottom_sheet_item mt-32">
          <p>연재작품</p>
        </div>

        <div className="bottom_sheet_item">
          <p>완결작품</p>
        </div>

        {/* <SheetContent>
            <p>
              Using <Code>onDismiss</Code> lets users close the sheet by swiping
              it down, tapping on the backdrop or by hitting <Kbd>esc</Kbd> on
              their keyboard.
            </p>
            <Expandable>
              <div className="bg-gray-200 block rounded-md h-10 w-full my-10" />
              <p>
                The height adjustment is done automatically, it just works™!
              </p>
              <div className="bg-gray-200 block rounded-md h-10 w-full my-10" />
            </Expandable>
            <Button onClick={onDismiss} className="w-full">
              Dismiss
            </Button>
          </SheetContent> */}
      </BottomSheet>
    </>
  );
};

export default Calendar;
