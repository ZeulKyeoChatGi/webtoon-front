import { useRouter } from 'next/router';
import { _getWebtoonList } from 'api/webtoon';
import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { CategoryWebtoon } from '@/types/webtoon';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import thumbnailWebtoon from 'assets/webtoon.json';

const Layout = styled.div`
  display: flex;
`;

interface JsonInterface {
  [prop: string]: any;
}

const _thumbnailWebtoon: JsonInterface = thumbnailWebtoon;

const Search = () => {
  const router = useRouter();

  const [webtoonList, setWebtoonList] = useState<Array<any>>([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchSetTime, setSearchSetTime] = useState<any>();

  const [isSearching, setIsSearching] = useState(false);

  const [imageWidth, setImageWidth] = useState(0);

  const [thumbnails, setThumbnails] = useState<JsonInterface>({
    all: {},
    daily: {},
    fantasy: {},
    action: {},
    pure: {},
    drama: {},
    thrill: {}
  });

  const handleClickRouteBack = () => {
    router.back();
  };

  const onChangeSearchKeyword = (e: any) => {
    setSearchKeyword(e.target.value);
    setIsSearching(true);
    clearTimeout(searchSetTime);

    setSearchSetTime(
      setTimeout(() => {
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

  const sendGa = (text: string) => {
    window.gtag('event', text, { send_to: 'G-RBTEKD8D4E' });
  };

  useLayoutEffect(() => {
    function updateSize() {
      const width = (window.innerWidth - 44) / 2;

      if (width < 298) {
        setImageWidth(width);
      } else {
        setImageWidth(298);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    const genreKeys: any = Object.keys(thumbnailWebtoon);

    let tempGenre: any = {};
    let isOverlaped = false;
    let isWhile = false;

    for (const key of genreKeys) {
      isWhile = true;

      while (isWhile) {
        isOverlaped = false;

        const random = _thumbnailWebtoon[key].sort(() => Math.random() - 0.5).splice(0, 1);

        for (const key of genreKeys) {
          if (tempGenre[key] === undefined) {
            continue;
          }

          if (tempGenre[key][0].id === random[0].id) {
            isOverlaped = true;
          }
        }

        if (!isOverlaped) {
          isWhile = false;

          tempGenre = {
            ...tempGenre,
            [key]: random
          };
          break;
        }
      }
    }

    setThumbnails(tempGenre);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div>
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
                {thumbnails.all.length > 0 && (
                  <div>
                    {searchKeyword === '' ? (
                      <div className="genre-container">
                        <div className="webtoon-genre-layout">
                          <div className="flex">
                            <Link href="/search/all">
                              <a
                                onClick={() => {
                                  sendGa('검색_전체');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-1"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.all[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.all[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.all[0].thumbnail_second_layer}`} alt="" />

                                  <p>전체</p>
                                </div>
                              </a>
                            </Link>

                            <Link href="/search/daily">
                              <a
                                onClick={() => {
                                  sendGa('검색_일상&개그');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-2"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.daily[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.daily[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.daily[0].thumbnail_second_layer}`} alt="" />

                                  <p>일상/개그</p>
                                </div>
                              </a>
                            </Link>
                          </div>

                          <div className="flex">
                            <Link href="/search/fantasy">
                              <a
                                onClick={() => {
                                  sendGa('검색_판타지');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-3"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.fantasy[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.fantasy[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.fantasy[0].thumbnail_second_layer}`} alt="" />

                                  <p>판타지</p>
                                </div>
                              </a>
                            </Link>

                            <Link href="/search/action">
                              <a
                                onClick={() => {
                                  sendGa('검색_액션');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-4"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.action[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.action[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.action[0].thumbnail_second_layer}`} alt="" />

                                  <p>액션</p>
                                </div>
                              </a>
                            </Link>
                          </div>

                          <div className="flex">
                            <Link href="/search/pure">
                              <a
                                onClick={() => {
                                  sendGa('검색_로맨스');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-5"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.pure[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.pure[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.pure[0].thumbnail_second_layer}`} alt="" />

                                  <p>로맨스</p>
                                </div>
                              </a>
                            </Link>

                            <Link href="/search/drama">
                              <a
                                onClick={() => {
                                  sendGa('검색_드라마');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-6"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.drama[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.drama[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.drama[0].thumbnail_second_layer}`} alt="" />

                                  <p>드라마</p>
                                </div>
                              </a>
                            </Link>
                          </div>

                          <div className="flex">
                            <Link href="/search/thrill">
                              <a
                                onClick={() => {
                                  sendGa('검색_공포&스릴러');
                                }}
                              >
                                <div
                                  className="webtoon-item bg-item-5"
                                  style={{
                                    width: imageWidth + 'px',
                                    height: imageWidth + 'px',
                                    backgroundColor: thumbnails.thrill[0].thumbnail_bg_color
                                  }}
                                >
                                  <div className="bg-gradient"></div>
                                  <img src={`${thumbnails.thrill[0].thumbnail_first_layer}`} alt="" />
                                  <img src={`${thumbnails.thrill[0].thumbnail_second_layer}`} alt="" />

                                  <p>공포/스릴러</p>
                                </div>
                              </a>
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
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
