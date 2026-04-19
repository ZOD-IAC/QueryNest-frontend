import { GET, POST, PUT, DELETE_REQ } from '../../utils/api';

const getHeaders = () => {};

export const getQuestionTags = (body) => {
  const url = `/question/api/get-tags/${body}`;
  const res = GET(url);

  return res;
};

export const addQuestionTag = (body) => {
  const url = `/question/api/add-tags/`;
  const res = POST(url, { tag: body });

  return res;
};
