import { getCookie } from "cookies-next";

export const getTokens = () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  return {
    accessToken,
    refreshToken,
  };
};
