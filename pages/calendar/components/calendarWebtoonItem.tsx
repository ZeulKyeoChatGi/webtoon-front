import styled from 'styled-components';

interface webtoonInfoProp {
  name: string;
  dDay: string;
  thumbnailUrl: string;
  site: string;
  writer: string;
  star: string;
  liked: string;
}

const Layout = styled.div`
  display: flex;
`;

const Spacer = styled.div`
  display: flex;
  flex: 1;
`;

const CalendarWebtoonWrapper = styled.div`
  height: 114px;
  // border: 1px solid red;

  display: flex;

  padding: 16px 0 18px 0;

  .img {
    width: 80px;
    height: 80px;

    background: #abb4bf;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-left: 7px;
    width: 100%;
    // background-color: blue;

    .site-chip {
      width: 48px;
      height: 20px;
      background: #ffffff;
      border: 1px solid #e9eaee;
      box-sizing: border-box;
      border-radius: 10px;

      p {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height, or 133% */

        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;

        color: #31c52e;
      }
    }

    .webtoon-title {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */

      display: flex;
      align-items: center;
      text-transform: uppercase;

      color: #000000;
    }

    .webtoon-d-day {
      margin-left: auto;

      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */

      display: flex;
      align-items: center;
      text-transform: uppercase;

      color: #000000;
    }

    .webtoon-writer {
      margin-top: 24px;

      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      display: flex;
      align-items: center;
      text-transform: uppercase;

      color: #abb4bf;
    }

    .linked {
      .font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      text-transform: uppercase;

      color: #000000;
    }

    .star {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      text-transform: uppercase;

      color: #000000;
    }

    .divider {
      width: 1px;
      height: 12px;
      background: #c4c4c4;

      margin: 0 9px;
    }
  }
`;

const CalendarWebtoonItem = ({ name, dDay, thumbnailUrl, site, writer, star, liked }: webtoonInfoProp) => {
  return (
    <>
      <CalendarWebtoonWrapper>
        {/* <img /> */}
        <div className={'img'}></div>

        <div className={'content'}>
          <Layout>
            <div className={'site-chip'}>
              <p>네이버</p>
            </div>

            <p className={'webtoon-title'}>웹툰명</p>

            <p className={'webtoon-d-day'}>D-3</p>
          </Layout>

          <Layout>
            <p className={'webtoon-writer'}>작가이름</p>
          </Layout>

          <Layout style={{ alignItems: 'center' }}>
            <p className={'linked'}>4.9</p>
            <div className={'divider'}></div>
            <p className={'star'}>44.9만</p>
          </Layout>
        </div>
      </CalendarWebtoonWrapper>
    </>
  );
};

export default CalendarWebtoonItem;
