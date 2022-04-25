import styled from 'styled-components';

interface webtoonInfoProp {
  index: number;
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
  height: 96px;
  // border: 1px solid red;
  border-bottom: 1px solid #E5E5EC;
  margin-top: 8px;
  
  float: right;

  display: flex;
  width: 328px;

  // padding: 16px 0 18px 0;

  .img {
    min-width: 80px;
    height: 80px;

    background: #abb4bf;
    margin: 8px 16px 8px 8px;
  }

  .content {
    margin: 8px 0;

    display: flex;
    flex-direction: column;
    width: 100%;
    // background-color: blue;

    .title_wrapper {
      width: 100%;
      justify-content: space-between;

      .naver {
        width: 17px;
        height: 20px;
        background-color: #31c52e;
        margin-right: 16px;
      }
    }

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

const CalendarWebtoonItem = ({ index, name, dDay, thumbnailUrl, site, writer, star, liked }: webtoonInfoProp) => {
  return (
    <>
      <CalendarWebtoonWrapper key={index}>
        <div className={'img'}></div>

        <div className={'content'}>
          <Layout className="title_wrapper">
            <p className={'webtoon-title'}>{name}</p>

            <div className="naver"></div>
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
