import { GET, PUT, POST, DELETE_REQ } from '../../utils/api';

export const loginUser = async (body) => {
  const res = await POST('/user/api/login/', body);
  return res;
};

export const registerUser = async (body) => {
  const res = await POST('/user/api/register', body);
  return res;
};
