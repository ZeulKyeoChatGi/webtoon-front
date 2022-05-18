import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import _getWebtoonDetail from '@/api/webtoonId';

const ThumbnailWrapper = styled.div`
  display: flex;
  padding: 16px 16px 0 16px;
  align-items: center;
  margin-bottom: 8px;
`;

const WebtoonName = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
`;

const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const TeamLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: absolute;
  bottom: 12px;
  right: 16px;
`;

const Info = styled.div`
  display: flex;
  padding: 16px 17px;
  align-items: center;
`;

const SaveMoneyText = styled.div`
  padding-left: 12px;
  line-height: 24px;
`;

const SaveMoney = styled.span`
  font-weight: 700;
`;

const Divider = styled.div`
  border: 1px solid #c1c9d1;
`;

const Content = styled.div`
  padding: 27px 16px 23px 16px;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const ScoreDivider = styled.div`
  height: 12px;
  border: 1px solid #c4c4c4;
  margin: 0 8px 0 8px;
`;

const WebtoonInfo = styled.div`
  display: flex;
  margin-top: 14px;
`;

const WebtoonInfoType = styled.div`
  color: #abb4bf;
  white-space: nowrap;
`;

const WebtoonInfoStory = styled.div`
  padding-left: 8px;
`;

const PaytoShow = styled.div`
  color: #ff5353;
  text-align: center;
  font-weight: 500;
  margin-top: 32px;
`;

const Label = styled.span`
  color: white;
  font-weight: 600;
  padding: 2px 4px;
  background-color: #6e7781;
`;

const Button = styled.div`
  display: flex;
  flex: 1;
  background-color: #31c52e;
  justify-content: center;
  color: white;
  padding: 16px 0;
  margin-top: 8px;
`;

const WebtoonDetail: React.VFC = () => {
  const router = useRouter();
  const { webtoonId } = router.query;
  const webtoonData = _getWebtoonDetail(webtoonId as string);

  console.log(webtoonData)
  return webtoonData ? (
    <div>
      <ThumbnailWrapper>
        <div>
          <Image src="/icons/ic_left_arrow.svg" alt="arrow" width={12} height={20} />
        </div>
        <WebtoonName>{webtoonData?.title}</WebtoonName>
      </ThumbnailWrapper>
      <Thumbnail style={{ height: '250px' }}>
        <img style={{ height: '100%', position: 'absolute' }} src={webtoonData?.thumbnail_first_layer} />
        <img style={{ height: '100%', zIndex: 1 }} src={webtoonData?.thumbnail_second_layer} />
        <TeamLabel>
          {webtoonData?.platform === 'NAVER' && <Image src="/icons/ic_naver.svg" alt="ic_naver" width={68} height={20} />}
          {webtoonData?.platform === 'KAKAO' && <Image src="/icons/ic_kakao.svg" alt="ic_kakao" width={68} height={20} />}
        </TeamLabel>
      </Thumbnail>
      <Info>
        <div>
          <Image src="/icons/ic_empty_icon.svg" alt="empty" width={48} height={54} />
        </div>
        <div>
          <SaveMoneyText>
            지금보면 <br />
            최대 <SaveMoney>47,000원</SaveMoney>을 아낄 수 있어요!
          </SaveMoneyText>
        </div>
      </Info>
      <Divider />
      <Content>
        <Score>
          <div>
            <Image src="/icons/ic_star_black.svg" alt="star" width={13} height={13} />
            {webtoonData?.webtoon_data[0].rating}
          </div>
          <ScoreDivider />
          <div>
            <Image src="/icons/ic_heart_black.svg" alt="star" width={13} height={12} />
            {webtoonData?.webtoon_data[0].like_count}
          </div>
        </Score>
        <Label>{webtoonData?.webtoon_data[0].is_completed ? '연재 종료' : '연재중'}</Label>
        <WebtoonInfo>
          <WebtoonInfoType>작품소개</WebtoonInfoType>
          <WebtoonInfoStory>{webtoonData?.description}</WebtoonInfoStory>
        </WebtoonInfo>
        <WebtoonInfo>
          <WebtoonInfoType>글/그림</WebtoonInfoType>
          <WebtoonInfoStory>
            {webtoonData?.author}
            {webtoonData?.drawer && `/ ${webtoonData?.drawer}`}
          </WebtoonInfoStory>
        </WebtoonInfo>
        <WebtoonInfo>
          <WebtoonInfoType>장르</WebtoonInfoType>
          <WebtoonInfoStory>{webtoonData?.origin_genre}</WebtoonInfoStory>
        </WebtoonInfo>
        <WebtoonInfo>
          <WebtoonInfoType>연령대</WebtoonInfoType>
          <WebtoonInfoStory>전체연령가</WebtoonInfoStory>
        </WebtoonInfo>
        <PaytoShow>2022년 3월 27일 유료화</PaytoShow>
        <Link href={webtoonData?.webtoon_url}>
          <Button>바로 정주행 하기!</Button>
        </Link>
      </Content>
    </div>
  ) : null;
};

export default WebtoonDetail;
