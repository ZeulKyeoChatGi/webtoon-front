import useSWR from 'swr';

const _getWebtoonDetail = (webtoonId: string) => {
  try {
    const data = useSWR(`/list/${webtoonId}`);
    const webtoonData = data?.data?.results[0];

    return webtoonData;
  } catch (error: any) {
    throw error;
  }
};

export default _getWebtoonDetail;
