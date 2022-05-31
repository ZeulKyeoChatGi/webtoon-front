import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';

import _getWebtoonDetail from '@/api/webtoonId';
import { useEffect, useState } from 'react';
import { setComma } from '@/utils/comma';

const ThumbnailWrapper = styled.div`
  display: flex;
  padding: 16px;
  position: absolute;
  width: 100%;
  z-index: 999;
  top: -1px;
  align-items: center;
  margin-bottom: 8px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1)
  );
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
  height: 250px;
`;

const TeamLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  position: absolute;
  bottom: 12px;
  right: 16px;
  z-index: 10;
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
  border: 1px solid #f0f0f6;
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
  border: 1px solid #ff6262;
  margin: 0 8px 0 8px;
`;

const WebtoonInfo = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  margin-top: 14px;
`;

const WebtoonInfoType = styled.div`
  color: #abb4bf;
  white-space: nowrap;
`;

const WebtoonInfoStory = styled.div`
  padding-left: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  p {
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: #2c3131;
  }

  p:first-line {
    line-height: 100% !important;
  }
`;

const PaytoShow = styled.div`
  color: white;
  position: absolute;
  font-size: 14px;
  top: 8px;
`;

const Label = styled.span`
  color: white;
  font-weight: 600;
  padding: 2px 4px;
  background-color: #2c3131;
  font-size: 12px;
`;

const Button = styled.div`
  display: flex;
  flex: 1;
  background-color: #2c3131;
  justify-content: center;
  color: white;
  padding: 16px 0;
  margin-top: 8px;
`;

const WebtoonDetail: React.VFC = () => {
  const router = useRouter();
  const { webtoonId } = router.query;
  const webtoonData = _getWebtoonDetail(webtoonId as string);
  const imageBgColor = webtoonData?.thumbnail_bg_color.split('#')[1];
  const [saveMoney, setSaveMoney] = useState(0);
  const [diffDate, setDiffDate] = useState(0);

  useEffect(() => {
    if (webtoonData) {
      console.log(webtoonData);
      setSaveMoney(webtoonData.webtoon_data[0].series_count * 120);

      const nowDate = new Date();
      const toDate = webtoonData.webtoon_data[0].paid_date;

      const diffDate = nowDate.getTime() - new Date(toDate).getTime();
      const dateDays = Math.round(diffDate / (1000 * 3600 * 24));

      setDiffDate(dateDays);
    }
  }, [webtoonData]);

  return webtoonData ? (
    <div style={{ position: 'relative' }}>
      <title>{webtoonData?.title}</title>
      <ThumbnailWrapper>
        <div onClick={() => router.back()}>
          <Image src="/icons/ic_left_arrow.svg" alt="arrow" width={12} height={20} />
        </div>
        <WebtoonName>{webtoonData?.title}</WebtoonName>
        <div>
          <Image src="/icons/ic_share.svg" alt="arrow" width={24} height={24} />
        </div>
      </ThumbnailWrapper>
      <Thumbnail>
        <img style={{ height: '100%', position: 'absolute' }} src={webtoonData?.thumbnail_first_layer} />
        {webtoonData?.platform === 'NAVER' ? (
          <div style={{ width: '100%', height: '100%', backgroundColor: `#${imageBgColor}` }} />
        ) : (
          <img style={{ height: '100%', zIndex: 1 }} src={webtoonData?.thumbnail_second_layer} />
        )}
        <TeamLabel>
          {webtoonData?.webtoon_data[0].is_completed ? (
            <Image src="/icons/ic_complete_status.svg" alt="ic_complete_status" width={48} height={20} />
          ) : (
            <Image src="/icons/ic_proceed_status.svg" alt="ic_proceed_status" width={48} height={20} />
          )}
          {webtoonData?.platform === 'NAVER' && <Image src="/icons/ic_naver.svg" alt="ic_naver" width={68} height={20} />}
          {webtoonData?.platform === 'KAKAO' && <Image src="/icons/ic_kakao.svg" alt="ic_kakao" width={68} height={20} />}
        </TeamLabel>
      </Thumbnail>
      {webtoonData?.webtoon_data[0].is_completed && diffDate < 0 && (
        <Info>
          <div>
            <Image src="/icons/ic_pig.svg" alt="empty" width={48} height={54} />
          </div>
          <div>
            <SaveMoneyText>
              지금보면 <br />
              최대 <SaveMoney>{setComma(saveMoney)}원</SaveMoney>을 아낄 수 있어요!
            </SaveMoneyText>
          </div>
        </Info>
      )}
      <div style={{ padding: '0 16px' }}>
        <Divider />
      </div>
      <Content>
        <Score>
          {webtoonData?.webtoon_data[0].view_count && (
            <>
              <div style={{ display: 'flex', color: '#FF6262', gap: '4px' }}>
                <Image src="/icons/ic_eye_red.svg" alt="eye" width={13} height={13} />
                {setComma(webtoonData.webtoon_data[0].view_count)}
              </div>
              <ScoreDivider />
            </>
          )}
          {webtoonData?.webtoon_data[0].rating && (
            <>
              <div style={{ display: 'flex', color: '#FF6262', gap: '4px' }}>
                <Image src="/icons/ic-star.svg" alt="star" width={13} height={13} />
                {setComma(webtoonData?.webtoon_data[0].rating)}
              </div>
              <ScoreDivider />
            </>
          )}
          <div style={{ display: 'flex', color: '#FF6262', gap: '4px' }}>
            <Image src="/icons/ic-heart.svg" alt="star" width={13} height={12} />
            {setComma(webtoonData?.webtoon_data[0].like_count)}
          </div>
        </Score>

        <WebtoonInfo>
          <WebtoonInfoType>작품소개</WebtoonInfoType>
          <WebtoonInfoStory>
            <p>{webtoonData?.description}</p>
          </WebtoonInfoStory>
        </WebtoonInfo>
        <WebtoonInfo>
          <WebtoonInfoType>글/그림</WebtoonInfoType>
          <WebtoonInfoStory>
            <p>
              {webtoonData?.author}
              {webtoonData?.drawer && ` / ${webtoonData?.drawer}`}
            </p>
          </WebtoonInfoStory>
        </WebtoonInfo>
        <WebtoonInfo>
          <WebtoonInfoType>장르</WebtoonInfoType>
          <WebtoonInfoStory>
            <p>{webtoonData?.origin_genre}</p>
          </WebtoonInfoStory>
        </WebtoonInfo>
        <WebtoonInfo>
          <WebtoonInfoType>연령대</WebtoonInfoType>
          <WebtoonInfoStory>
            <p>전체연령가</p>
          </WebtoonInfoStory>
        </WebtoonInfo>
        {!!webtoonData?.webtoon_data[0]?.paid_date && diffDate < 0 && (
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Image src="/icons/ic_talk.svg" alt="arrow" width={180} height={43} />
            <PaytoShow>{dayjs(webtoonData?.webtoon_data[0]?.paid_date).format('YYYY[년] MM[월] DD[일]')} 유료화</PaytoShow>
          </div>
        )}

        <div style={{ marginTop: diffDate > 0 ? '153px' : '' }}>
          <Link href={webtoonData?.webtoon_url}>
            <Button>바로 정주행 하기!</Button>
          </Link>
        </div>
      </Content>
    </div>
  ) : null;
};

export default WebtoonDetail;
