import { setComma } from '@/utils/comma';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

interface webtoonInfoProp {
  index: number;
  name: string;
  dDay: string;
  thumbnailUrl1: string;
  thumbnailUrl2: string;
  backgroundColor?: string;
  site: string;
  writer: string;
  rating: number;
  likeCount: number;
  isNaver: boolean;
  isKakao: boolean;
  is_censored: boolean;
  webtoonId: number;
  widthDiff?: string | undefined;
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
  border-bottom: 1px solid #e5e5ec;
  margin-top: 8px;
  float: right;
  display: flex;
  width: 91%;

  position: relative;
  overflow: hidden;

  .main-img-section {
    position: relative;
    width: 80px;
    min-width: 80px;
    overflow: hidden;

    img.background-color {
      z-index: 0;
      position: absolute;
      width: 80px;
      height: 80px;
      background: red;
      margin: 8px 16px 8px 8px;
    }

    img.background {
      width: 80px;

      z-index: 2;
      min-width: 80px;
      margin: 8px 16px 8px 0px;
      position: absolute;
      /* width: 80px; */
      overflow: hidden;
      height: 80px;
      object-fit: cover;
      object-position: top;
    }

    img.background2 {
      z-index: 1;
      min-width: 80px;
      height: 80px;
      margin: 8px 16px 8px 0px;
      position: absolute;
    }
  }

  .content {
    margin: 12px 0;
    margin-left: 24px;

    display: flex;
    flex-direction: column;
    width: 100%;
    // background-color: blue;

    .title_wrapper {
      width: 100%;
      justify-content: space-between;

      .img-section {
        margin-right: 16px;

        img {
          margin-left: 6px;
        }
      }

      .naver {
        width: 17px;
        height: 20px;
        background-color: #31c52e;
        margin-right: 16px;

        p {
          font-weight: bold;
          margin-top: 1px;
          margin-left: 1px;
          height: 100%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .kakao {
        width: 17px;
        height: 20px;
        background-color: #000000;
        margin-right: 16px;

        p {
          font-weight: bold;
          margin-top: 1px;
          margin-left: 1px;
          height: 100%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
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
      margin-top: 16px;
      height: 20px;

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
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */
      margin-left: 4px;
      color: #ff6262;

      text-transform: uppercase;
    }

    .star {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */
      margin-left: 4px;
      color: #ff6262;

      text-transform: uppercase;
    }

    .divider {
      width: 1px;
      height: 12px;
      background: #c4c4c4;

      margin: 0 9px;
    }
  }
`;

const CalendarWebtoonItem = ({
  index,
  name,
  dDay,
  thumbnailUrl1,
  thumbnailUrl2,
  backgroundColor,
  site,
  writer,
  rating,
  likeCount,
  isNaver,
  isKakao,
  is_censored,
  webtoonId,
  widthDiff
}: webtoonInfoProp) => {
  return (
    <>
      <Link href={`/${webtoonId}`}>
        <a className="pointer">
          <CalendarWebtoonWrapper key={index}>
            {is_censored && (
              <img src="/icons/ic-censored.svg" alt="" style={{ position: 'absolute', marginTop: '13px', marginLeft: '5px', zIndex: '100' }} />
            )}
            <div className={`main-img-section`}>
              <div className="background-color"></div>
              {thumbnailUrl1 && <img className="background2" src={thumbnailUrl1}></img>}
              {thumbnailUrl2 && <img className="background" src={thumbnailUrl2} style={{ marginLeft: widthDiff }}></img>}
            </div>

            <div className={'content'}>
              <Layout className="title_wrapper">
                <p className={'webtoon-title'}>{name}</p>

                <div className="img-section">
                  {isNaver && <img src="/icons/ic-naver-w.svg" />}
                  {isKakao && <img src="/icons/ic-kakao-w.svg" />}
                </div>
              </Layout>

              <Layout>
                <p className={'webtoon-writer'}>{writer}</p>
              </Layout>

              <Layout style={{ alignItems: 'center' }}>
                {rating > 0 && (
                  <>
                    <img src="/icons/ic-star.svg"></img>
                    <p className={'linked'}>{rating}</p>
                  </>
                )}

                {rating > 0 && likeCount > 0 && (
                  <>
                    <div className={'divider'}></div>
                  </>
                )}

                {likeCount > 0 && (
                  <>
                    <img src="/icons/ic-heart.svg"></img>
                    <p className={'linked'}>{setComma(likeCount)}</p>
                  </>
                )}
              </Layout>
            </div>
          </CalendarWebtoonWrapper>
        </a>
      </Link>
    </>
  );
};

export default CalendarWebtoonItem;
