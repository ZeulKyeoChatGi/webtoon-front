import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CalendarWebtoonItem from './components/calendarWebtoonItem';

import { useInView } from 'react-intersection-observer';

import { _getListToBePaid, _getWebtoonList } from 'api/webtoon';
import 'react-spring-bottom-sheet/dist/style.css';

import { BottomSheet } from 'react-spring-bottom-sheet';
import { CategoryWebtoon } from 'types/webtoon';

import Select from 'react-select';

import ReactLoading from 'react-loading';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Filters {
  title: String;
  value: String;
  isChecked: boolean;
}

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

  background: #f1f1f5;
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
  // background: linear-gradient(180deg, rgba(0, 0, 0, 0.025) 0%, rgba(0, 0, 0, 0) 0.01%, rgba(0, 0, 0, 0.2) 100%), #abb4bf;

  img.background-gradient {
    width: 100%;
    z-index: 4;
    position: absolute;
    overflow: hidden;

    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, 0);
  }

  img.background {
    z-index: -1;
    position: absolute;
    overflow: hidden;

    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, 0);
  }

  img.background2 {
    z-index: -1;
    position: absolute;
    overflow: hidden;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    right: 50%;
    transform: translate(-50%, 0);
  }

  .img-platform {
    position: absolute;
    right: 12px;
    top: 12px;
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
    // margin-top: 120px;
    position: absolute;
    top: 120px;
  }

  p.writer {
    z-index: 10;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */
    margin-top: 4px;

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: rgba(255, 255, 255, 0.8);

    margin-left: 12px;
    margin-bottom: 4px;

    position: absolute;
    top: 148px;
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

const customStyles = {
  menu: (base: any) => ({
    ...base,
    fontFamily: 'Pretendard',
    fontSize: '13px',
    color: '#2C3131',
    zIndex: 100
  }),

  control: (provided: any, state: any) => ({
    ...provided,
    background: '#fff',
    fontFamily: 'Pretendard',
    fontSize: '13px',
    color: '#2C3131',
    minHeight: '30px',
    height: '30px',
    boxShadow: state.isFocused ? null : null,
    border: 'none',
    zIndex: 1,
    cursor: 'pointer'
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
    fontFamily: 'Pretendard',
    fontSize: '13px',
    zIndex: 0
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    margin: '0px',
    fontFamily: 'Pretendard',
    zIndex: 0
  }),

  indicatorSeparator: (state: any) => ({
    display: 'none',
    zIndex: 0
  }),

  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    height: '30px',
    fontSize: '13px',
    zIndex: 0
  })
};

const Calendar = () => {
  // const [ref, inView] = useInView();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.9
  });

  const [isApiLoading, setIsApiLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isInit, setIsInit] = useState(false);

  const categories = [
    {
      text: '전체',
      value: ''
    },
    {
      text: '판타지',
      value: 'fantasy'
    },
    {
      text: '로맨스',
      value: 'pure'
    },
    {
      text: '액션/무협',
      value: 'action'
    },
    {
      text: '드라마',
      value: 'drama'
    },
    {
      text: '공포/스릴러',
      value: 'thrill'
    },
    {
      text: '일상/개그',
      value: 'daily'
    }
  ];

  const [options, setOptions] = useState([
    { value: 'recent', label: '최신순' },
    { value: 'old', label: '오래된순' },
    { value: 'money', label: '절약금액순' },
    { value: 'like', label: '좋아요순' }
  ]);

  const [selectedOrder, setSelectedOrder] = useState('recent');

  const [filters, setFilters] = useState<Array<Filters>>([
    { title: '네이버 웹툰', value: 'naver', isChecked: false },
    { title: '카카오 웹툰', value: 'kakao', isChecked: false },
    { title: '연재작품', value: 'updating', isChecked: false },
    { title: '완결작품', value: 'completed', isChecked: false }
  ]);

  const [open, setOpen] = useState(false);

  const onDismiss = () => {
    setOpen(false);
    setPage(0);
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  const [webtoonList, setWebtoonList] = useState<Array<CategoryWebtoon>>([]);

  const handleClickFilter = (index: number) => {
    const copyArray = [...filters];

    copyArray[index].isChecked = !copyArray[index].isChecked;

    setFilters(copyArray);

    setPage(0);
  };

  const sendGa = (text: string) => {
    window.gtag('event', text, { send_to: 'G-RBTEKD8D4E' });
  };

  // 서버에서 아이템을 가지고 오는 함수
  const getWebtoonListAll = useCallback(async () => {
    setIsApiLoading(true);

    const parmas = {
      genre: selectedCategory,
      order: selectedOrder,
      filter: '',
      page: page + 1
    };

    let tempFilter: any = [];

    filters.map((filter, index) => {
      if (filter.isChecked) {
        tempFilter.push(filter.value);
      }
    });

    parmas.filter = tempFilter.toString();

    const result = await _getWebtoonList(parmas);

    let tempWebtoonList: any = [];

    if (page > 0) {
      tempWebtoonList = [...webtoonList];
    }

    result.data.results.map((webtoon: any, index: number) => {
      if (webtoon.thumbnail_second_layer === null) {
        webtoon.thumbnail_second_layer = '';
      }

      tempWebtoonList.push(webtoon);
    });

    setWebtoonList(tempWebtoonList);
    setIsApiLoading(false);
  }, [filters, page, selectedCategory, selectedOrder]);

  const setSessionStorage = (webtoonData: any) => {
    // s : sessionStorage 값 설정

    // session_obj.totalReturnData = totalReturnData;
    // session_obj.path_name = path_name;
    // session_obj.sort = formData.sort;
    // setJSONSessionStorage('session_obj', session_obj); //세션 스토리지에 저장

    const sessionObj = {
      data: webtoonList,
      scroll: window.scrollY,
      selectedOrder: selectedOrder,
      selectedCategory: selectedCategory,
      page: page,
      filters: filters
    };

    sessionStorage.setItem('webtoonlist', JSON.stringify(sessionObj));
    // e : sessionStorage 값 설정
  };

  const onChangeWebtoonCategory = (cat: string) => {
    const selectCat = cat;

    setSelectedCategory(selectCat);
    setPage(0);
  };

  const handleChangeOrder = (e: any) => {
    setSelectedOrder(e.value);
    setPage(0);
  };

  const checkPaidWebtoonFilter = async () => {
    const res = await _getListToBePaid();

    if (res.data.count === 0) {
      setOptions(options.splice(0, 2));
    }
  };

  useEffect(() => {
    if (isInit) {
      getWebtoonListAll();
    }
  }, [getWebtoonListAll, selectedCategory, selectedOrder, filters]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let webtoonList = sessionStorage.getItem('webtoonlist');

    if (webtoonList) {
      setWebtoonList(JSON.parse(webtoonList).data);
      setPage(JSON.parse(webtoonList).page);
      setFilters(JSON.parse(webtoonList).filters);
      setSelectedOrder(JSON.parse(webtoonList).selectedOrder);
      setSelectedCategory(JSON.parse(webtoonList).selectedCategory);

      setTimeout(() => {
        window.scrollTo({ top: JSON.parse(webtoonList!).scroll, left: 0 });
        setIsInit(true);
      }, 0);

      sessionStorage.removeItem('webtoonlist');
    } else {
      getWebtoonListAll();
      setIsInit(true);
    }

    checkPaidWebtoonFilter();
  }, []);

  return (
    <>
      {/* <CalendarInput placeholder="웹툰명을 검색해주세요." /> */}

      <NavToggleWrapper>
        <Link href="/">
          <a
            onClick={() => {
              sendGa('오늘의웹툰_유료화_일정');
            }}
          >
            <NavItem className={'normal'}>
              <p>유료화 일정</p>
            </NavItem>
          </a>
        </Link>

        <Link href="/genre">
          <a
            onClick={() => {
              sendGa('오늘의웹툰_장르별_보기');
            }}
          >
            <NavItem className={'toggled'}>
              <p>장르별 보기</p>
            </NavItem>
          </a>
        </Link>
      </NavToggleWrapper>

      <Wrapper>
        <Layout className="category_scroll" style={{ overflowX: 'auto', height: '64px', marginLeft: '19px' }}>
          {categories.map((cat, index) => (
            <Chip onClick={() => onChangeWebtoonCategory(cat.value)} className={selectedCategory === cat.value ? 'selected' : ''} key={index}>
              <p>{cat.text}</p>
            </Chip>
          ))}
        </Layout>

        <Divider />

        <div className="category_filter_container">
          {/* <SelectBox /> */}

          <Select
            onChange={handleChangeOrder}
            options={options}
            styles={customStyles}
            isSearchable={false}
            value={options.filter((obj) => obj.value === selectedOrder)}
            className="pointer"
          />

          <img src="/icons/ic_filter.svg" className="pointer" onClick={() => setOpen(true)} />
        </div>

        {webtoonList.length > 0 ? (
          <>
            {webtoonList.map((webtoon, index) => (
              <Link href={`/${webtoon.id}`} key={webtoon.id}>
                <a onClick={setSessionStorage}>
                  <WebtoonCard className="pointer" ref={ref} style={{ backgroundColor: webtoon.thumbnail_bg_color?.split(':')[1]! }}>
                    {/* 블러 제거 */}
                    <div>
                      <div></div>
                      <img className="background-gradient" src="/images/gradient.png" />
                      <img className="background" src={webtoon.thumbnail_first_layer} />

                      {webtoon.thumbnail_second_layer && (
                        <>
                          <img className="background2" src={webtoon.thumbnail_second_layer} />
                        </>
                      )}
                    </div>

                    {webtoon.platform === 'NAVER' && <img className="img-platform" src="/icons/ic-naver-w.svg" />}
                    {webtoon.platform === 'KAKAO' && <img className="img-platform" src="/icons/ic-kakao-w.svg" />}

                    <p className="title">
                      {webtoon.is_censored && <img style={{ marginRight: '4px' }} src="/icons/ic-censored.svg" />}
                      {webtoon.title}
                    </p>
                    <p className="writer">{webtoon.author}</p>
                    {/* <p className="description">{webtoon.description}</p> */}
                  </WebtoonCard>
                </a>
              </Link>
            ))}

            {isApiLoading && (
              <>
                <Layout style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
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
      </Wrapper>

      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        className="bottomsheet"
        style={{ maxWidth: '640px', margin: '0 auto' }}
        snapPoints={({ minHeight }) => minHeight}
      >
        {filters.map((item, index) => (
          <div onClick={() => handleClickFilter(index)} key={index} className="bottom_sheet_item">
            <p>{item.title}</p>

            {item.isChecked ? (
              <>
                <img src="/icons/ic_check.svg" />
              </>
            ) : (
              <>
                <img src="/icons/ic_checked.svg" />
              </>
            )}
          </div>
        ))}
      </BottomSheet>
    </>
  );
};

export default Calendar;
