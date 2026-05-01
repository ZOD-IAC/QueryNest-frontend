import { getHeaders } from '@/utils/helper';
import { GET, POST, PUT, DELETE_REQ } from '../../utils/api';

export const getAnswers = (body = {}) => {
  const params = new URLSearchParams(body);
  const url = `/answer/api/get-answers?${params.toString()}`;
  const res = GET(url);

  return res;
};

export const AnswerVoting = (body) => {
  const params = new URLSearchParams(body);
  const url = `/answer/api/answers-vote?${params.toString()}`;
  const res = POST(url, null ,getHeaders());

  return res;
};
