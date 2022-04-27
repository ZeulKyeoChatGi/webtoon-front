import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();

  const handleClickRouteBack = () => {
    router.back();
  };

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
          <input placeholder='웹툰명을 검색해주세요.' />
          <img onClick={handleClickRouteBack} src="/icons/ic-search.svg" />
        </div>
      </div>
    </>
  );
};

export default Search;
