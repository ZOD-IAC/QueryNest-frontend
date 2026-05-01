import { stringify } from "querystring";

export const getDataFromlocal = () => {
  if (typeof localStorage != "object") return {};
  const data = localStorage.getItem("auth") ?? "{}";
  const user = JSON.parse(data);

  return user;
};

export const getHeaders = () => {
  if (typeof localStorage != "object") return {};
  const auth = localStorage.getItem("auth") ?? "{}";
  const { token } = JSON.parse(auth);

  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
};

export const isValidEmail = (email) => {
  const emialId = email.trim();
  const regex = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emialId != "" && regex.test(emialId)) return true;
  
  return false;
};
