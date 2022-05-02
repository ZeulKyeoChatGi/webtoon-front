import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarWebtoonItem from './components/calendarWebtoonItem';

import { _getWebtoonListAll } from 'api/webtoon';

const CalendarInput = styled.input`
  width: 100%;
  height: 48px;

  margin-top: 16px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;

  ::placeholder {
    padding: 12px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #c4c4c4;
  }
`;

const MainWebttonWrapper = styled.div`
  margin: 0 16px;

  width: 328px;
  height: 200px;
  background-color: #e9eaee;

  margin-top: 24px;
  border-radius: 22px;

  .title-wrapper {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    margin: 12px 0 0 12px;
    width: 85px;
    height: 28px;

    .logo {
    }

    .title {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;

      display: flex;
      align-items: center;
      text-transform: uppercase;
      margin-left: 16px;

      color: #000000;
    }
  }

  .d-day {
    margin-top: 98px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #000000;
    margin-left: 16px;
  }

  .date {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    /* identical to box height, or 154% */

    display: flex;
    align-items: center;
    text-align: right;
    text-transform: uppercase;

    margin-left: 16px;

    color: #6e7781;
  }
`;

const FeeBasedPaymentWrapper = styled.div`
  background-color: #f3f3f3;

  padding: 16px 16px 0 16px;
  margin-top: 22px;

  p.title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 144% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #000000;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
`;

const Chip = styled.div`
  // width: 61px;
  padding: 0 12px;
  height: 32px;
  left: 57px;
  top: 0px;

  background: #adadad;
  // border-radius: 16px;
  margin-right: 8px;

  cursor: pointer;

  p {
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    // color: #ffffff;
  }
`;

const Layout = styled.div`
  display: flex;
`;

const Divider = styled.div`
  height: 8px;
  left: 0px;
  top: 219px;

  background: #f3f3f3;
`;

const WebtoonCard = styled.div`
  height: 180px;
  margin: 0 16px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  z-index: 5;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.025) 0%, rgba(0, 0, 0, 0) 0.01%, rgba(0, 0, 0, 0.2) 100%), #abb4bf;

  img.background {
    z-index: -1;
    position: absolute;
    overflow: hidden;
    width: 100%;
  }

  img.background2 {
    z-index: -1;
    position: absolute;
    overflow: hidden;
    width: 100%;
  }

  p.title {
    z-index: 10;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #ffffff;

    margin-left: 12px;
    margin-top: 104px;
  }

  p.writer {
    z-index: 10;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: rgba(255, 255, 255, 0.8);

    margin-left: 12px;
    margin-bottom: 4px;
  }

  p.description {
    z-index: 10;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

    color: #ffffff;

    margin-left: 12px;

    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 12px;
  }
`;

const Calendar = () => {
  const categories = [
    {
      text: '전체',
      value: 'ALL'
    },
    {
      text: '판타지',
      value: 'cate1'
    },
    {
      text: '로맨스',
      value: 'cate2'
    },
    {
      text: '학원물',
      value: 'cate3'
    },
    {
      text: '무협',
      value: 'cate4'
    },
    {
      text: '카테고리',
      value: 'cate5'
    },
    {
      text: '카테고리~~',
      value: 'cate6'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [webtoonList, setWebtoonList] = useState([
    {
      id: 4360,
      webtoon_data: [
        {
          like_count: 29,
          view_count: null,
          rating: 9.65,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-29T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 1,
          webtoon: 4360
        }
      ],
      title: '남편 먹는 여자',
      author: '나나은',
      origin_genre: '드라마',
      zfind_genre: '드라마',
      days: '5',
      source_id: '794154',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/794154/thumbnail/thumbnail_IMAG19_9a292d26-985a-477f-b897-b72188a99ae2.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/794154/thumbnail/titledescimage/backImage_3d098271-a096-4674-99d3-6bcdadb7c7d3.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#ffc5cb',
      description:
        '잘생기고, 돈도 많고, 다정한 남편을 둔 성미인.\n그녀는 모든 여자들의 부러움을 받으며 행복한 결혼 생활을 하고 있었다.\n그러던 어느 날 미인은 남편의 이상한 행위를 보게 되고,\n그녀가 남편을 의심하면서 완벽해 보였던 결혼생활에 금이 가기 시작한다.',
      simple_description: '내 남편이 의심스럽다.',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=794154&weekday=sat',
      is_censored: true
    },
    {
      id: 4289,
      webtoon_data: [
        {
          like_count: 42,
          view_count: null,
          rating: 9.64,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-28T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 2,
          webtoon: 4289
        }
      ],
      title: '킬 더 드래곤',
      author: '현가',
      origin_genre: '액션',
      zfind_genre: '액션/무협',
      days: '4',
      source_id: '794102',
      drawer: '미스 지수',
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/794102/thumbnail/thumbnail_IMAG19_743c7a58-d69a-472d-a31d-8e094510e89b.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/794102/thumbnail/titledescimage/backImage_0637ee8a-cd87-4d72-b75f-618d7a4d8ade.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#b6c3eb',
      description:
        "\"필사적으로 살아남아라.\"\n인류는 침략자 '드래곤'에게 멸망을 선고받았다.\n붕괴 직전의 세계에서 인류를 수호하기 위해\n전쟁고아 이한은 '사이커'로 각성한다!",
      simple_description: '필사적으로 살아남아라.',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=794102&weekday=fri',
      is_censored: true
    },
    {
      id: 4483,
      webtoon_data: [
        {
          like_count: 0,
          view_count: null,
          rating: 9.11,
          is_completed: true,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-25T09:00:00+09:00',
          ended_at: '2022-04-25T09:00:00+09:00',
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 10,
          webtoon: 4483
        }
      ],
      title: '오만상과 편견',
      author: '유현숙',
      origin_genre: '로맨스',
      zfind_genre: '순정',
      days: null,
      source_id: '793382',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer:
        'https://shared-comic.pstatic.net/thumb/webtoon/793382/thumbnail/thumbnail_IMAG06_c89a96b7-bda4-4801-866a-938a53257cb3.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793382/thumbnail/titledescimage/backImage_0293d565-41d8-41c6-9898-5a5e12c702ed.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#ffd3dc',
      description: '매 순간마다 오해와 편견으로 부딪히는 남녀의 로맨스!',
      simple_description: '오해와 편견으로 부딪히는 남녀의 로맨스!',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793382',
      is_censored: false
    },
    {
      id: 3988,
      webtoon_data: [
        {
          like_count: 58,
          view_count: null,
          rating: 9.85,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-24T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 3988
        }
      ],
      title: '오늘의 비너스',
      author: '엄세윤',
      origin_genre: '로맨스',
      zfind_genre: '순정',
      days: '0',
      source_id: '793944',
      drawer: '도달',
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793944/thumbnail/thumbnail_IMAG19_5bd9d2b0-bf25-4917-9e9d-3e307794df08.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793944/thumbnail/titledescimage/backImage_4b579722-0f4c-41dc-805c-b0d9066bf7af.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#fee8bf',
      description:
        '“평범했던 내가... 오늘부터 세상에서 가장 아름답다고?\n그런데, 그 기준은 누가 정하는 거지?“\n뛰어난 연기력에도 평범한 외모 때문에 늘 오디션에서 탈락하던 배우 지망생 ‘강하나’.\n그러던 어느 날, ‘외모가 곧 능력’ 이라는 세계적인 뷰티기업 에서 그녀에게 스카웃 제의가 온다.\n그리고 하나는 곧 엄청난 비밀을 알게 되는데...?\n2021 지상최대공모전 1기 우수상 수상작.',
      simple_description: '내가 세상에서 가장 아름다워..?',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793944&weekday=mon',
      is_censored: true
    },
    {
      id: 4345,
      webtoon_data: [
        {
          like_count: 74,
          view_count: null,
          rating: 9.77,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-22T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 2,
          webtoon: 4345
        }
      ],
      title: '이계진입 리로디드',
      author: '차우민',
      origin_genre: '판타지',
      zfind_genre: '판타지',
      days: '5',
      source_id: '793553',
      drawer: '쵸쵸',
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793553/thumbnail/thumbnail_IMAG19_bc016b73-8845-4c2c-b3c5-68aad3d603d3.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793553/thumbnail/titledescimage/frontImage_e142bb69-aaba-4fda-ba14-971071e830f5.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#c7e2ff',
      description:
        '왕의 심장이 불타 사라질 때, 현세의 운명을 초월한 존재가 이 땅에 강림하리라! \n폭군을 쓰러트리고 이세계를 구원한 지구인 소년 성시한. \n해피엔딩인 줄 알았건만, 그 대가는 모든 걸 빼앗기고 지구로 추방되는 것이었다. \n이에 시한은 10년의 절치부심 끝에 테라노어로 되돌아오게 되는데… 한 번 세상을 구한 영웅의 이계 ‘재’진입 이야기!',
      simple_description: '한 번 세상을 구한 영웅의 이계 재진입 이야기',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793553&weekday=sat',
      is_censored: true
    },
    {
      id: 4290,
      webtoon_data: [
        {
          like_count: 59,
          view_count: null,
          rating: 9.86,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-21T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 2,
          webtoon: 4290
        }
      ],
      title: '악마라고 불러다오',
      author: '자양',
      origin_genre: '로맨스',
      zfind_genre: '순정',
      days: '4',
      source_id: '793853',
      drawer: '써나',
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793853/thumbnail/thumbnail_IMAG19_bfba86a3-faba-4a85-b534-7be1199a1aac.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793853/thumbnail/titledescimage/frontImage_e90c6077-d866-4ee3-8563-7c4950d73bd1.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#F0B6B6',
      description:
        "낮에는 성형외과 의사로, 밤에는 악마로 살아가는 '현신'.  \n눈빛만으로 누구든 유혹하는 마력을 가졌지만,\n어느 날 나타난 '이나'에게는 유혹이 통하지 않는다.\n대신 태평한 얼굴로 가슴 수술을 해달라 하는데... 이 여자는 뭘까?",
      simple_description: '악마들의 유혹에 빠질 시간',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793853&weekday=fri',
      is_censored: true
    },
    {
      id: 4135,
      webtoon_data: [
        {
          like_count: 36,
          view_count: null,
          rating: 9.35,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-19T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4135
        }
      ],
      title: '재생존경쟁',
      author: '미티',
      origin_genre: '판타지',
      zfind_genre: '판타지',
      days: '2',
      source_id: '793696',
      drawer: '톨젠',
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793696/thumbnail/thumbnail_IMAG19_859aa24b-0b2e-437a-810a-13c2e427d4fc.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793696/thumbnail/titledescimage/backImage_eb073754-bb47-4e31-ae8d-8f1cc960106c.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#e3c3ff',
      description:
        '부와 명예로 가득한 미래가 보장된다면, 당신은 죽음의 선택을 번복할 것인가? \n스스로 죽은 이들에게 마지막으로 주어진 재생존의 기회, 그 희망을 잡기 위한 치열한 경쟁이 시작된다.\n살고 싶으면 버티고, 버티고, 버텨라!',
      simple_description: '나는 다시 살고싶다',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793696&weekday=wed',
      is_censored: true
    },
    {
      id: 4137,
      webtoon_data: [
        {
          like_count: 40,
          view_count: null,
          rating: 4.64,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-19T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 2,
          webtoon: 4137
        }
      ],
      title: '그녀의 육하원칙',
      author: '일삼구',
      origin_genre: '스릴러',
      zfind_genre: '공포/스릴러',
      days: '2',
      source_id: '793863',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793863/thumbnail/thumbnail_IMAG19_7948b7b0-a0c2-4a60-b3f9-7e2b7171d8e3.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793863/thumbnail/titledescimage/backImage_ed68ec0e-970d-4e51-8d75-49ebc91df9b7.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#C8D4F2',
      description:
        "같은 반 남학생 '주하원'을 주인공으로 소설을 쓰는 '정민'.\n그의 말투, 행동, 표정 하나하나가 소설의 소재가 된다.\n하지만, 완벽한 줄로만 알았던 하원의 실체를 알아버린 정민은 밀려오는 배신감에 소설 속 하원을 죽여버리고 만다.\n다음 날, 학교에서 벌어진 의문의 살인사건. 그런데 어쩐지 하원이 수상하다!\n2021 지상최대공모전 2기 장려상 수상작.",
      simple_description: '완벽한 나의 주인공, 그와 얽힌 살인 사건!',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793863&weekday=wed',
      is_censored: true
    },
    {
      id: 4167,
      webtoon_data: [
        {
          like_count: 49,
          view_count: null,
          rating: 9.83,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-19T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 2,
          webtoon: 4167
        }
      ],
      title: '이별학',
      author: '맹물',
      origin_genre: '드라마',
      zfind_genre: '드라마',
      days: '2',
      source_id: '783971',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/783971/thumbnail/thumbnail_IMAG19_e3a0be3d-d274-433b-b51d-52c3fa328000.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/783971/thumbnail/titledescimage/backImage_95b7c14f-f0a3-43b0-ab61-a7924353ca6b.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#ffc4c4',
      description:
        "서른 살까지 모솔로 살다 겨우 첫 연애를 시작한 '고장가'는\n3년을 만나도 여자친구 '우주'에 대한 마음이 뜨겁기만 한 댕댕남이다.\n그럼에도 사랑에 유효기간이 있었던 것일까?\n위기가 반복될수록 서툰 그의 연애는 차갑게 식어간다...\n​\n사랑만 있으면 될 것 같았던 연애,\n장가와 우주의 조금은 특별한 이별 이야기.",
      simple_description: '벌써 3년?! 정말로 사랑에 유효기간이 있을까?',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=783971&weekday=wed',
      is_censored: true
    },
    {
      id: 4487,
      webtoon_data: [
        {
          like_count: 3,
          view_count: null,
          rating: 9.02,
          is_completed: true,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-18T09:00:00+09:00',
          ended_at: '2022-04-18T09:00:00+09:00',
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 7,
          webtoon: 4487
        }
      ],
      title: '아이리스',
      author: '차우민',
      origin_genre: '판타지',
      zfind_genre: '판타지',
      days: null,
      source_id: '793381',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer:
        'https://shared-comic.pstatic.net/thumb/webtoon/793381/thumbnail/thumbnail_IMAG06_74e7dab3-f8f1-41a0-8990-40da04998b6e.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793381/thumbnail/titledescimage/backImage_f38c83b5-d517-4521-ade3-b29dc50782e2.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#aae9e1',
      description: "한때 폭발적인 인기를 누리던 게임 '아이리스'\n망해 가는 게임의 부활을 위해 만렙 유저와 운영자가 뭉쳤다!",
      simple_description: '게임 부활을 위해 만렙 유저와 운영자가 뭉쳤다!',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793381',
      is_censored: false
    },
    {
      id: 4429,
      webtoon_data: [
        {
          like_count: 161,
          view_count: null,
          rating: 9.97,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-16T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4429
        }
      ],
      title: '마왕의 고백',
      author: '탑승',
      origin_genre: '판타지',
      zfind_genre: '판타지',
      days: '6',
      source_id: '793539',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793539/thumbnail/thumbnail_IMAG19_fec2aeee-f18e-4893-800c-94a91c759ff2.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793539/thumbnail/titledescimage/backImage_68db6dd5-4a49-4acb-aa9c-19a8e363c639.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#DCD6FA',
      description:
        "천 년 전 마왕이 남긴 '저주'는 사람을 마술사로 만든다. \n마술사라는 정체를 숨긴 채 성기사가 되기를 꿈꾸는 '라피스'.  \n어느 날 실수로 마왕 '카라'를 소환하고 마는데! \n​\n마왕은 자신을 도와준다면 저주를 거두어 주겠다 하지만... \n잠깐, 이 마왕의 고백이 심상치 않다?! \n​\n별을 쫓아 천 년 전 진실에 다가서는 라피스의 \n아카데미 성장&드라마 판타지!",
      simple_description: '성기사 도전기!',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793539&weekday=sun',
      is_censored: true
    },
    {
      id: 3198,
      webtoon_data: [
        {
          like_count: null,
          view_count: null,
          rating: null,
          is_completed: false,
          paid_status: 'NONE',
          paid_date: null,
          published_at: '2022-04-16T00:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-04-17T10:41:10+09:00',
          series_count: 6,
          webtoon: 3198
        }
      ],
      title: '한따까리',
      author: '금기혁',
      origin_genre: '액션/무협',
      zfind_genre: '액션/무협',
      days: '5',
      source_id: '2806',
      drawer: '금기혁',
      platform: 'KAKAO',
      thumbnail_first_layer: 'https://kr-a.kakaopagecdn.com/P/C/2806/bg/2x/5c45771e-369e-4c46-b1a2-0ccd988e1bf8.jpg',
      thumbnail_second_layer: 'https://kr-a.kakaopagecdn.com/P/C/2806/c1/2x/8bcc3458-45b3-419b-baf5-ef0ca9b644c6.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: '#303031',
      description:
        '일제 강점기. 혼란의 시대.\n부모가 누구인지도 모른 채 태어난 강덕배.\n\n자신을 지키기 위해 힘을 길렀고\n가족이라는 이름 하에 무리를 만들었던 그는\n대한민국 최고의 조직 "태성파"의 두목이 된다.\n\n어느덧 50대가 된 덕배의 생일날,\n식구들과 시간을 보내던 중\n적대 조직의 칼을 맞고 눈을 감는 강덕배.\n\n죽은 줄 알았으나 눈을 뜬 곳은\n30년이 지난 현재의 어느 20대 남자의 몸.\n\n그리고 상황 파악을 하기도 전에\n그의 눈에 들어온 것은 썩을 대로 썩은 "태성파"의 모습.\n강덕배는 자신의 잘못된 과거를 직접 고치려고 한다.\n\n"내가 원했던 가족, 조직의 모습은 이게 아니었다.\n잘못된 조직은 내가 직접 없애겠다."',
      simple_description: '내가 만들었던 조직.\n내 손으로 직접 없애겠다.',
      webtoon_url: 'https://webtoon.kakao.com/content/한따까리/2806',
      is_censored: false
    },
    {
      id: 4358,
      webtoon_data: [
        {
          like_count: 95,
          view_count: null,
          rating: 9.95,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-15T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4358
        }
      ],
      title: '팬인데 왜요',
      author: '요나',
      origin_genre: '드라마',
      zfind_genre: '드라마',
      days: '5',
      source_id: '793072',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793072/thumbnail/thumbnail_IMAG19_6f679896-fea6-43f7-8c57-7199bb90f437.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793072/thumbnail/titledescimage/backImage_da5aee31-550a-495c-b5c4-1a49fb32e45d.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#e3c3ff',
      description:
        '치열했던 삶이 어느 정도 정리가 되고 이젠 나이가 들어 무기력하게 집안에만 있던 윤순이 할머니. \n이제 어떻게 살아야 할지 무엇을 해야 할지 아무것도 알지 못한 채 우울하게 하루 하루를 보내고 있던 할머니가 덕통사고를 당하게 된다.\n바로 잘 나가는 5인조 아이돌 그룹 라이트에게!\n노래를 듣고 자신의 이야기와 같다며 눈물을 흘리던 할머니는 처음에는 그들의 노래와 영상을 보기 위해 스마트폰을 샀다가 같은 라이트 팬인 초등학생 소진의 안내로 본격적인 덕질의 문을 열게 된다.\n덕질을 해가며 잃어버렸던 자기 자신을 되찾아가며 다양한 사람들과 만나고 새로운 일에 도전해가는 할머니의 힐링성장 이야기',
      simple_description: '할머니의 힐링성장',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793072&weekday=sat',
      is_censored: true
    },
    {
      id: 4370,
      webtoon_data: [
        {
          like_count: 50,
          view_count: null,
          rating: 9.87,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-15T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4370
        }
      ],
      title: '미나 이퀄',
      author: '이유정',
      origin_genre: '액션',
      zfind_genre: '액션/무협',
      days: '5',
      source_id: '793350',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793350/thumbnail/thumbnail_IMAG19_b5714fa4-7a65-4459-a030-d98369db7442.jpg',
      thumbnail_second_layer: null,
      thumbnail_third_layer: null,
      thumbnail_bg_color: null,
      description:
        "열혈 소방관 강호는 사명감으로 모든 것을 바쳐 많은 사람들을 구해내었으나,\n돌아온 건, 불구가 된 몸과 처참한 죽임을 당한 아내, 세상으로부터의 배신이었다.\n그는 자신의 방법대로 복수를 결심하는데, 비록 자신이 구했으나, \n새 삶을 살 가치가 없다 판단되는 이들의 목숨을 도로 회수하는 것. \n그리곤 그 복수를 이행하기 위해 딸 '미나'를 냉혹한 킬러로 키워낸다. \n시간이 흘러 10년 후,고등학생이 된 딸이 킬러로서 완성되었다 생각한 강호는\n지정한 타겟의 생명을 회수하라는 첫 미션을 내리는데....",
      simple_description: null,
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793350&weekday=sat',
      is_censored: true
    },
    {
      id: 3167,
      webtoon_data: [
        {
          like_count: null,
          view_count: null,
          rating: null,
          is_completed: false,
          paid_status: 'NONE',
          paid_date: null,
          published_at: '2022-04-15T00:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-04-17T10:41:10+09:00',
          series_count: 7,
          webtoon: 3167
        }
      ],
      title: '취향의 문제',
      author: '한지우',
      origin_genre: '드라마',
      zfind_genre: '드라마',
      days: '4',
      source_id: '2781',
      drawer: '한지우',
      platform: 'KAKAO',
      thumbnail_first_layer: 'https://kr-a.kakaopagecdn.com/P/C/2781/bg/2x/aff318ed-8721-4e92-bf96-98d1484db31a.jpg',
      thumbnail_second_layer: 'https://kr-a.kakaopagecdn.com/P/C/2781/c1/2x/13b175fd-9741-4a31-b7ed-b29f17c51b6e.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: '#2f1d22',
      description:
        "완벽한 부부인 서준과 혜원.\n둘 사이에는 눈에 넣어도 아프지 않을 소중한 딸 규리가 있다.\n\n어느 날부터 서준의 야근이 잦아지면서\n혜원은 의심을 품게 되는데...\n\n'내 남편이 바람을 피우는 것 같다.'",
      simple_description: '완벽한 부부같아 보이는 서준과 혜원,\n혜원은 점점 의심이 싹트게 되는데..',
      webtoon_url: 'https://webtoon.kakao.com/content/취향의 문제/2781',
      is_censored: false
    },
    {
      id: 4292,
      webtoon_data: [
        {
          like_count: 60,
          view_count: null,
          rating: 9.87,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-14T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4292
        }
      ],
      title: '별빛 커튼콜',
      author: '아르몽',
      origin_genre: '로맨스',
      zfind_genre: '순정',
      days: '4',
      source_id: '793410',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793410/thumbnail/thumbnail_IMAG19_2cd7cd71-e5a2-4ccc-a99e-46528698c72d.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793410/thumbnail/titledescimage/frontImage_a1d11060-567f-432d-8c09-4a21860e7273.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#f8d3da',
      description:
        "화려한 인플루언서로 살아온 '문유별'. \n아버지 사업이 망하며 성월에 있는 외할아버지 집으로 쫓기듯 내려오고, \n그곳에 살고 있는 남자 '오리온'을 만나게 된다. \n​\n빚더미에서 벗어나기 위해, \n외할아버지가 남긴 유산을 받으려 고군분투하는 유별과, \n사사건건 유별을 방해하는 리온. \n​\n과연 유별은 무사히 유산을 받고 원래의 삶으로 돌아갈 수 있을까? \n성월에서 펼쳐지는 힐링 로맨스!",
      simple_description: '커튼콜 도전기!',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793410&weekday=fri',
      is_censored: true
    },
    {
      id: 3105,
      webtoon_data: [
        {
          like_count: null,
          view_count: null,
          rating: null,
          is_completed: false,
          paid_status: 'NONE',
          paid_date: null,
          published_at: '2022-04-13T00:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-04-17T10:41:10+09:00',
          series_count: 1,
          webtoon: 3105
        }
      ],
      title: '보지 마, 안 괜찮아, 불법이야!',
      author: '한국웹툰작가협회',
      origin_genre: '코믹/일상',
      zfind_genre: '일상/개그',
      days: '2',
      source_id: '2820',
      drawer: '한국웹툰작가협회',
      platform: 'KAKAO',
      thumbnail_first_layer: 'https://kr-a.kakaopagecdn.com/P/C/2820/bg/2x/ca1b5535-43ec-489a-8355-df5b5ccd4936.jpg',
      thumbnail_second_layer: 'https://kr-a.kakaopagecdn.com/P/C/2820/c1/2x/b10584d7-c8ea-406f-a48f-5ee7de33e2e4.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: '#a5b3d6',
      description:
        '웹툰을 사랑한다면, 최애 작가의 신작을 계속 보고 싶다면!\n지속 가능한 웹툰 생태계를 위한 첫 단추,\n불법 유통 웹툰 보지 않기!\n\n작가와 독자 모두가 행복해지는\n그날을 위해 다 같이 외쳐 봅시다.\n\n"보지 마, 안 괜찮아, 불법이야!"\n\n본 캠페인은 한국만화가협회와 한국웹툰작가협회,\n한국저작권보호원이 함께합니다.',
      simple_description: '모두가 행복한 웹툰 생태계를 위해\n"보지 마, 안 괜찮아, 불법이야!"',
      webtoon_url: 'https://webtoon.kakao.com/content/보지 마, 안 괜찮아, 불법이야!/2820',
      is_censored: false
    },
    {
      id: 4138,
      webtoon_data: [
        {
          like_count: 78,
          view_count: null,
          rating: 9.87,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-12T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4138
        }
      ],
      title: '주부 육성중',
      author: '임현',
      origin_genre: '드라마',
      zfind_genre: '드라마',
      days: '2',
      source_id: '793388',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793388/thumbnail/thumbnail_IMAG19_ce25ca41-4a07-4169-b5b3-095543887918.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793388/thumbnail/titledescimage/backImage_e95a6104-1a3d-4aae-9154-92829e3d9856.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#d9e4ff',
      description:
        '최강 소방관의 다음 직업은 최강 주부?\n사랑하는 배우자를 위해 주부가 되기로 한 남자와, 그를 주부로 만들기 위한 마음빌라 사람들의 고군분투 주부 육성기!',
      simple_description: '이 남자.. 주부로 만들어보자.',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793388&weekday=wed',
      is_censored: true
    },
    {
      id: 4166,
      webtoon_data: [
        {
          like_count: 38,
          view_count: null,
          rating: 9.7,
          is_completed: false,
          paid_status: '무료',
          paid_date: null,
          published_at: '2022-04-12T09:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-05-02T09:39:08+09:00',
          series_count: 3,
          webtoon: 4166
        }
      ],
      title: '우리 은하',
      author: '녕',
      origin_genre: '로맨스',
      zfind_genre: '순정',
      days: '2',
      source_id: '793113',
      drawer: null,
      platform: 'NAVER',
      thumbnail_first_layer: 'https://image-comic.pstatic.net/webtoon/793113/thumbnail/thumbnail_IMAG19_ab6085bf-d25f-4970-92e1-020ea86d2154.jpg',
      thumbnail_second_layer:
        'https://image-comic.pstatic.net/webtoon/793113/thumbnail/titledescimage/backImage_44f00479-ee92-488b-aa18-69099339e508.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: 'background-color:#e5c3f8',
      description:
        '하렘 만화 오타쿠 ‘나은하’는 어느 날 신의 도움으로 미소녀 미소년들이 가득한 학교로 전학을 가게 된다. \n여기선 모두가 날 좋아해! 하렘 라이프 최고! \n그런데 ‘이우주’가 전학을 오고 나서는 이상한 일들이 생기는데...\n‘난 하렘 주인공이 아니었어...?’ \n우당탕탕 은하의 하렘 공략기!',
      simple_description: '우당탕탕 하렘 공략 대결기!',
      webtoon_url: 'https://comic.naver.com/webtoon/list?titleId=793113&weekday=wed',
      is_censored: true
    },
    {
      id: 3070,
      webtoon_data: [
        {
          like_count: null,
          view_count: null,
          rating: null,
          is_completed: false,
          paid_status: 'NONE',
          paid_date: null,
          published_at: '2022-04-12T00:00:00+09:00',
          ended_at: null,
          last_crawled_at: '2022-04-17T10:41:10+09:00',
          series_count: 11,
          webtoon: 3070
        }
      ],
      title: '불멸의 투귀',
      author: '옥한돌',
      origin_genre: '액션/무협',
      zfind_genre: '액션/무협',
      days: '1',
      source_id: '2796',
      drawer: '옥한돌',
      platform: 'KAKAO',
      thumbnail_first_layer: 'https://kr-a.kakaopagecdn.com/P/C/2796/bg/2x/e30c56bf-dec2-4724-b05d-faa71b96d12f.jpg',
      thumbnail_second_layer: 'https://kr-a.kakaopagecdn.com/P/C/2796/c1/2x/864e5808-3be7-4990-a32f-075ca63134d4.png',
      thumbnail_third_layer: null,
      thumbnail_bg_color: '#2e2820',
      description:
        '차가운 한랭지옥의 아귀가 이승으로 넘어와\n사람들을 잡아먹는 시대.\n\n하늘의 최고신 제석천과 그 아래의 사천왕이\n지옥의 아귀로부터 세상을 지킨다.\n\n한데 그 최고신 제석천이 주인공 “나수아”의 동생을\n자신이 아꼈던 이의 환생자라며 데려가려는데\n나수아가 옷깃을 잡으며 이를 막아서자\n그것에 불쾌함을 느낀 제석천은 나수아의 팔을 잘라버린다.\n\n나수아의 하늘에 대한 원한이\n한랭지옥의 반대편인 뜨거운 초열지옥에 닿았고,\n나수아는 초열아귀의 팔을 갖게 되는데...\n\n사람도 아귀도 아니게 된 나수아.\n동생을 되찾기 위해 지옥과 싸우는 하늘에게 맞서려 한다.',
      simple_description: '최고신 제석천이 동생을 데려갔다.\n동생을 되찾기 위한 나수아의 싸움!',
      webtoon_url: 'https://webtoon.kakao.com/content/불멸의 투귀/2796',
      is_censored: false
    }
  ]);

  const getWebtoonListAll = async () => {
    const result = await _getWebtoonListAll();
    setWebtoonList(result.data.results);
  };

  useEffect(() => {
    getWebtoonListAll();
  });

  return (
    <>
      {/* <CalendarInput placeholder="웹툰명을 검색해주세요." /> */}

      <Wrapper>
        <Layout className="category_scroll" style={{ overflowX: 'auto', height: '64px', marginLeft: '19px' }}>
          {categories.map((cat, index) => (
            <Chip onClick={() => setSelectedCategory(cat.value)} className={selectedCategory === cat.value ? 'selected' : ''} key={index}>
              <p>{cat.text}</p>
            </Chip>
          ))}
        </Layout>

        <Divider />

        <div style={{ height: '68px' }}>{/* 체크박스 */}</div>

        {webtoonList.map((webtoon, index) => (
          <WebtoonCard key={index}>
            <img className="background" src={webtoon.thumbnail_first_layer} />
            <img className="background2" src={webtoon.thumbnail_second_layer} />
            <p className="title">{webtoon.title}</p>
            <p className="writer">{webtoon.author}</p>
            <p className="description">{webtoon.description}</p>
          </WebtoonCard>
        ))}
      </Wrapper>
    </>
  );
};

export default Calendar;
