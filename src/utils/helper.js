import { stringify } from "querystring";

export const getDataFromlocal = () => {
  if (typeof localStorage != "object") return {};
  const data = localStorage.getItem("auth") ?? "{}";
  const user = JSON.parse(data);

  return user;
};

export const getHeaders = () => {
  const auth = localStorage.getItem("auth") || "{}";
  const { token } = JSON.parse(auth);

  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
};
