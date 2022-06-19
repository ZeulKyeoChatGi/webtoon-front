import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { CategoryWebtoon } from 'types/webtoon';
import ReactLoading from 'react-loading';
import { useInView } from 'react-intersection-observer';
import { _getWebtoonList } from 'api/webtoon';
import styled from 'styled-components';
import 'react-spring-bottom-sheet/dist/style.css';
import Link from 'next/link';
import { setComma } from '@/utils/comma';

interface Filters {
  title: String;
  value: String;
  isChecked: boolean;
}

const categories: any = {
  all: '전체',
  fantasy: '판타지',
  pure: '순정',
  action: '액션/무협',
  drama: '드라마',
  thrill: '공포/스릴러',
  daily: '일상/개그'
};

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
    margin-top: 120px;
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

const SearchGenre = () => {
  const router = useRouter();

  const { ref, inView, entry } = useInView({
    threshold: 0.9
  });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('recent');
  const [isInit, setIsInit] = useState(false);

  const [filters, setFilters] = useState<Array<Filters>>([
    { title: '네이버 웹툰', value: 'naver', isChecked: false },
    { title: '카카오 웹툰', value: 'kakao', isChecked: false },
    { title: '연재작품', value: 'updating', isChecked: false },
    { title: '완결작품', value: 'completed', isChecked: false }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');

  const [webtoonList, setWebtoonList] = useState<Array<CategoryWebtoon>>([]);

  const handleClickRouteBack = () => {
    router.back();
  };

  const onDismiss = () => {
    setOpen(false);
    setPage(0);
  };

  // 서버에서 아이템을 가지고 오는 함수
  const getWebtoonListAll = useCallback(async () => {
    const genre = selectedCategory === 'all' ? '' : selectedCategory;

    const parmas = {
      genre: genre,
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

    console.log(tempWebtoonList)

    setTotalCount(result.data.count);
    setWebtoonList(tempWebtoonList);
  }, [filters, page, selectedCategory, selectedOrder]);

  const setSessionStorage = () => {
    console.log(window.scrollY);

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
      filters: filters,
      totalCount: totalCount
    };

    sessionStorage.setItem('searchwebtoonlist', JSON.stringify(sessionObj));
    // e : sessionStorage 값 설정
  };

  const handleClickFilter = (index: number) => {
    const copyArray = [...filters];

    copyArray[index].isChecked = !copyArray[index].isChecked;

    setFilters(copyArray);

    setPage(0);
  };

  useEffect(() => {
    if (isInit && selectedCategory) {
      getWebtoonListAll();
    }
  }, [getWebtoonListAll, selectedCategory, selectedOrder, filters]);

  useEffect(() => {}, [router]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let webtoonList = sessionStorage.getItem('searchwebtoonlist');

    // console.log(webtoonList);
    // console.log(JSON.parse(webtoonList))

    if (webtoonList) {
      console.log(JSON.parse(webtoonList).page);

      setWebtoonList(JSON.parse(webtoonList).data);
      setPage(JSON.parse(webtoonList).page);
      setFilters(JSON.parse(webtoonList).filters);
      setSelectedOrder(JSON.parse(webtoonList).selectedOrder);
      setSelectedCategory(JSON.parse(webtoonList).selectedCategory);
      setTotalCount(JSON.parse(webtoonList).totalCount);

      console.log(JSON.parse(webtoonList).selectedOrder);

      setTimeout(() => {
        window.scrollTo({ top: JSON.parse(webtoonList!).scroll, left: 0 });
        setIsInit(true);
      }, 0);

      sessionStorage.removeItem('searchwebtoonlist');
    } else {
      setSelectedCategory(String(router.query.genre));
      setIsInit(true);
    }
  }, [router]);

  return (
    <>
      <div className="search-genre-container">
        <div className="toolbar">
          <img onClick={handleClickRouteBack} src="/icons/ic_search_arrow_back.svg" />
        </div>

        <div className="title-content">
          <div className="flex align-end">
            <p className="title">{categories[selectedCategory]}</p>

            <span className="count">{setComma(totalCount)}개</span>
          </div>

          <img src="/icons/ic_filter.svg" onClick={() => setOpen(true)} />
        </div>
      </div>

      <div className="search-genre-webtoon-container">
        {webtoonList.length > 0 ? (
          <>
            {webtoonList.map((webtoon, index) => (
              <Link href={`/${webtoon.id}`} key={webtoon.id}>
                <a onClick={setSessionStorage}>
                  <WebtoonCard className="pointer" ref={ref} style={{ backgroundColor: webtoon.thumbnail_bg_color?.split(':')[1]! }}>
                    <img className="background" src={webtoon.thumbnail_first_layer} />

                    {webtoon.thumbnail_second_layer && (
                      <>
                        <img className="background2" src={webtoon.thumbnail_second_layer} />
                      </>
                    )}

                    {webtoon.platform === 'NAVER' && <img className="img-platform" src="/icons/ic-naver-w.svg" />}
                    {webtoon.platform === 'KAKAO' && <img className="img-platform" src="/icons/ic-kakao-w.svg" />}

                    <p className="title">{webtoon.title}</p>
                    <p className="writer">{webtoon.author}</p>
                  </WebtoonCard>
                </a>
              </Link>
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
      </div>

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

export default SearchGenre;
