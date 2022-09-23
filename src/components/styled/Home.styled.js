import styled from 'styled-components';

export const Div = styled.div``;

// 슬라이더 wrapper
export const MainSliderWrapper = styled.div`
  width: 100%;
  height: 340px;
  position: relative;
  overflow: hidden;
`;

// 웹툰 이미지 1
export const MainSliderImage1 = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 60%;
  z-index: 1;
`;

// 웹툰 이미지 2
export const MainSliderImage2 = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 60%;
  z-index: 2;
`;

// 웹툰 배경 그림자
export const MainSliderBackgroundShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 40.1%);
  z-index: 5;
`;

// 절약 금액 정보
export const WebtoonSaveInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 7;
`;

// 절약 금액 정보 문구
export const WebtoonSavePriceInfo = styled.p`
  justify-content: flex-end;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #2c3131;
`;

// 절약 금액
export const WebtoonSavePrice = styled.div``;

// 유료화 예정일
export const WebtoonPaidDueDate = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: right;
  color: #2c3131;
  display: flex;
  flex-flow: row-reverse;
`;

// 웹툰 정보
export const WebtoonInfoWrapper = styled.div`
  position: absolute;
  padding: 0 8px;
  height: 28px;
  right: 16px;
  bottom: 17px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  img {
  }
`;

// 웹툰 정보 플랫폼(네이버, 카카오)
export const WebtoonInfoPlatform = styled.img`
  width: 12px;
  height: 20px;
  position: static;
  margin-left: 2px;
  margin-right: 7px;
`;

// 웹툰명
export const WebtoonInfoTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: right;
  text-transform: uppercase;
  color: #000;
`;

// 유료화 일정 웹툰 없을 때
export const MainSliderEmpty = styled.div`
  height: 340px;
  position: relative;
`;

export const MainSliderEmptyText = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #2c3131;
  padding-top: 75px;
  justify-content: center;
`;

export const MainSLiderEmptyImage = styled.img`
  position: absolute;
  right: 21.74px;
  top: 171px;
`;

export const SliderPendingSpacer = styled.div`
  height: 500px;
`;

// ** ============ */

// Nav Toggle Wrapper
export const NavToggleWrapper = style.div`
display: flex;
height: 48px;
cursor: pointer;
border-bottom: 1px solid #000000;
margin-top: 24px;
`;

export const NavToggleLink = styled.a``;

export const NavToggleItem = styled.div`
  width: 50%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.toggled {
    width: 120px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;

    color: white;
    background: #000000;
  }

  &.normal {
    width: 120px;
    height: 48px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;

    opacity: 0.3;

    color: #000000;
  }
`;

export const NavToggleItemText = styled.p``;

export const BottomActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BottomMoreButton = styled.img`
  width: '32px';
  height: '32px';
  margin-top: 20px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
`;

export const BottomMoreLast = styled.div`
  heioght: 90%;
`;

export const WebtoonListTitle = styled.p`
  margin-bottom: 4px;
  padding: 24px 16px 0 16px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #000000;
`;

export const FeeBasedPaymentWrapper = styled.div`
  margin-top: 22px;
`;

export const FeeBasedPaymentTitle = styled.p `
margin-bottom: 4px;
padding: 24px 16px 0 16px;

font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 26px;

display: flex;
align-items: center;
text-transform: uppercase;

color: #000000;`
