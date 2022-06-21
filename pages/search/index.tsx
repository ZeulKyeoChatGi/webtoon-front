import { useRouter } from 'next/router';
import { _getWebtoonList } from 'api/webtoon';
import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { CategoryWebtoon } from '@/types/webtoon';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Layout = styled.div`
  display: flex;
`;

const Search = () => {
  const router = useRouter();

  const [webtoonList, setWebtoonList] = useState<Array<any>>([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchSetTime, setSearchSetTime] = useState<any>();

  const [isSearching, setIsSearching] = useState(false);

  const [imageWidth, setImageWidth] = useState(0);

  const handleClickRouteBack = () => {
    router.back();
  };

  const onChangeSearchKeyword = (e: any) => {
    setSearchKeyword(e.target.value);
    setIsSearching(true);
    clearTimeout(searchSetTime);

    setSearchSetTime(
      setTimeout(() => {
        console.log(e.target.value);
        setIsSearching(false);
        getWebtoonList(e.target.value);
      }, 800)
    );
  };

  const getWebtoonList = async (target: string) => {
    const param = {
      search: target
    };

    const res = await _getWebtoonList(param);

    setWebtoonList(res.data.results);
  };

  useLayoutEffect(() => {
    function updateSize() {
      const width = (window.innerWidth - 44) / 2;

      if (width < 298) {
        console.log(width)
        setImageWidth(width);
      } else {
        setImageWidth(298);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <div className="search_container">
        <div className="header">
          <img onClick={handleClickRouteBack} src="/icons/ic_search_arrow_back.svg" />
        </div>

        <p className="search_top_text">
          어떤 웹툰을
          <br />
          찾으시나요?
        </p>

        <div className="search_bar">
          <input onChange={onChangeSearchKeyword} placeholder="웹툰명을 검색해주세요." />
          <img onClick={handleClickRouteBack} src="/icons/ic-search.svg" />
        </div>

        <div style={{ width: '100%', height: '8px', backgroundColor: '#F7F7FB', marginTop: '24px' }}></div>

        {isSearching ? (
          <>
            <Layout style={{ display: 'flex', justifyContent: 'center' }}>
              <ReactLoading type="bubbles" color="#000" />

              <div style={{ height: '500px' }}></div>
            </Layout>
          </>
        ) : (
          <>
            {webtoonList.length > 0 && searchKeyword !== '' ? (
              <>
                {webtoonList.map((webtoon, index) => (
                  <Link href={`/${webtoon.id}`} key={webtoon.id}>
                    <div className="serached-item">
                      <img src="/icons/ic-search-gray.svg" />
                      <p>{webtoon.title}</p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {searchKeyword === '' ? (
                  <div className="genre-container">
                    <div className="webtoon-genre-layout">
                      <div className="flex">
                        <Link href="/search/all">
                          <div className="webtoon-item bg-item-1" style={{ width: imageWidth + 'px', height: imageWidth + 'px' }}>
                            <div className="bg-gradient"></div>
                            <img src="/images/genre_all_1.png" />
                            <img src="/images/genre_all_2.png" />
                            <p>전체</p>
                          </div>
                        </Link>

                        <Link href="/search/daily">
                          <div className="webtoon-item bg-item-2" style={{ width: imageWidth + 'px', height: imageWidth + 'px' }}>
                            <div className="bg-gradient"></div>
                            <img src="/images/genre_gag_1.png" />
                            <p>일상/개그</p>
                          </div>
                        </Link>
                      </div>

                      <div className="flex">
                        <Link href="/search/fantasy">
                          <div className="webtoon-item bg-item-3" style={{ width: imageWidth + 'px', height: imageWidth + 'px' }}>
                            <div className="bg-gradient"></div>
                            <img src="/images/genre_fantasy_1.png" />
                            <p>판타지</p>
                          </div>
                        </Link>

                        <Link href="/search/pure">
                          <div className="webtoon-item bg-item-4" style={{ width: imageWidth + 'px', height: imageWidth + 'px' }}>
                            <div className="bg-gradient"></div>
                            <img src="/images/genre_romance_1.png" />
                            <p>순정</p>
                          </div>
                        </Link>
                      </div>

                      <div className="flex">
                        <Link href="/search/drama">
                          <div className="webtoon-item bg-item-5" style={{ width: imageWidth + 'px', height: imageWidth + 'px' }}>
                            <div className="bg-gradient"></div>
                            <img src="/images/genre_drama_1.png" />
                            <p>드라마</p>
                          </div>
                        </Link>

                        <Link href="/search/thrill">
                          <div className="webtoon-item bg-item-6" style={{ width: imageWidth + 'px', height: imageWidth + 'px' }}>
                            <div className="bg-gradient"></div>
                            <img src="/images/genre_triller_1.png" />
                            <p>공포/스릴러</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="empty-list">
                      <p>검색결과가 없습니다.</p>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
