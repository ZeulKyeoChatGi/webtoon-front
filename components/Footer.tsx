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
      height: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .section_logo {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;

      border-bottom: 1px solid rgba(196, 196, 196, 0.2);

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

    .section_content {
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;

      border-bottom: 1px solid rgba(196, 196, 196, 0.2);

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
      height: 44px;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 20px;
      /* identical to box height, or 182% */

      display: flex;
      align-items: center;

      /* white */

      color: #ffffff;

      opacity: 0.4;
    }
  `;

  return (
    <>
      <FooterWrapper>
        <div className="section_logo">
          <p>로고</p>
        </div>

        <div className="section_content">
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
        </div>

        <p className="copyright">copyright(c) 2022 All rights reserved by 오늘의 웹툰.</p>
      </FooterWrapper>
    </>
  );
};

export default Footer;
