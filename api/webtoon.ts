import API from './axios';

const _getWebtoonListAll = async (params: any) => {
  try {
    const res = API.get('/list', {
      params: params
    });

    return res;
  } catch (error: any) {
    throw error;
  }
};

const _getListToBePaid = async () => {
  try {
    const res = API.get('/list/to-be-paid');

    return res;
  } catch (error: any) {
    throw error;
  }
};

const _getRecentlyPaidWebtoonList = async (params: any) => {
  try {
    const res = API.get('/list/recently-paid', { params: params });

    return res;
  } catch (error: any) {
    throw error;
  }
};

export { _getWebtoonListAll, _getListToBePaid, _getRecentlyPaidWebtoonList };
