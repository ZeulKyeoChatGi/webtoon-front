import styled from 'styled-components';

const Footer = () => {
  const FooterWrapper = styled.div`
    width: 100%;
    min-height: 120px;
    left: 0px;
    bottom: 34px;

    background: #111111;

    display: flex;
    flex-direction: column;

    p {
      // height: 100%;
      // color: #fff;
      // display: flex;
      // align-items: center;
      // justify-content: center;
    }

    .section_logo {
      height: 56px;
      display: flex;

      margin-left: 16px;
      margin-right: 16px;
      height: fit-content;
      margin-top: 20px;
      padding-bottom: 8px;

      border-bottom: 1px solid rgba(196, 196, 196, 0.2);

      p.logo {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 154% */

        // display: flex;
        // align-items: center;

        /* white */

        color: #ffffff;
      }

      p.team {
        margin-left: 6px;
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        /* identical to box height, or 167% */

        display: flex;
        align-items: center;
        text-align: justify;

        /* black/80 */

        color: #626262;
      }
    }

    .section_content {
      // height: 54px;
      display: flex;
      // align-items: center;
      justify-content: center;
      padding: 0 16px;
      margin: 16px 0 25px 0;
      flex-direction: column;
      // justify-content: center;

      // border-bottom: 1px solid rgba(196, 196, 196, 0.2);

      .item_layout {
        display: flex;

        .item {
          pointer: cursor;
          height: 28px;
          background-color: #2c3131;
          display: flex;
          align-item: center;
          padding: 0 10px;

          p {
            color: white;
          }
        }

        .ml-10 {
          width: 10px;
          background: #111111;
        }
      }

      img {
        margin-right: 4px;
        // margin-top: -1px;
      }

      p {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        /* identical to box height, or 154% */

        display: flex;
        align-items: center;

        /* white */

        color: #ffffff;
      }
    }

    .copyright {
      height: 20px;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 20px;
      /* identical to box height, or 182% */

      display: flex;
      align-items: center;

      width: 100%;
      display: flex;
      justify-content: center;

      margin-bottom: 12px;

      /* white */

      color: #ffffff;

      opacity: 0.4;
    }
  `;

  return (
    <>
      <FooterWrapper>
        <div className="section_logo">
          <p className="logo">오늘의 웹툰</p>
          <p className="team">by.즐겨찾기팀</p>
        </div>

        <div className="section_content">
          <div className="item_layout">
            <div className="item">
              <p>서비스 친구에게 소개하기</p>
            </div>

            <div className="ml-10"></div>

            <div className="item">
              <p>About Us</p>
            </div>
          </div>

          <div className="item_layout" style={{marginTop: '8px'}}>
            <div className="item">
              <p>더 나은 서비스를 위해 피드백 남기기</p>
            </div>

            <div className="ml-10"></div>

            <div className="item">
              <p>후원하기</p>
            </div>
          </div>
        </div>

        {/* <div className="section_content">
          <img src="/icons/ic_raising_hands.svg" />
          <p>팀 소개 보러가기</p>
        </div>

        <div className="section_content">
          <img src="/icons/ic_memo.svg" />
          <p>더 나은 서비스를 위해 의견 남기기</p>
        </div>

        <div className="section_content">
          <img src="/icons/ic_love_letter.svg" />
          <p>후원하기</p>
        </div> */}

        <p className="copyright">copyright(c) 2022 All rights reserved by 오늘의 웹툰.</p>
      </FooterWrapper>
    </>
  );
};

export default Footer;
