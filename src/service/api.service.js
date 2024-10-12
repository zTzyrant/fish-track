import useSWR from "swr";
import axios from "axios";
import { getTokens } from "@/libs/auth";

const baseUrl = "https://test.api.sahabatlautlestari.com";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "x-version": "2",
  },
});

// Fetcher function using axios
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

// Custom hook to get species data
export const getSpecies = ({ keyWord = "", pageNumber = 1, pageSize = 10 }) => {
  const queryParams = new URLSearchParams({
    ...(keyWord && { keyWord }),
    ...(pageNumber && { pageNumber }),
    ...(pageSize && { pageSize }),
  });

  const { data, error } = useSWR(
    `${baseUrl}/species?${queryParams.toString()}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export const getSpeciesById = (id) => {
  const { data, error } = useSWR(`${baseUrl}/species/${id}`, fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export const postSpecies = (speciesData) => {
  return axiosInstance.post(`${baseUrl}/species`, speciesData, {
    headers: {
      Authorization: `Bearer ${getTokens().accessToken}`,
    },
  });
};

export const putSpecies = (id, speciesData) => {
  return axiosInstance.put(`${baseUrl}/species/${id}`, speciesData, {
    headers: {
      Authorization: `Bearer ${getTokens().accessToken}`,
    },
  });
};

export const deleteSpecies = (id) => {
  return axiosInstance.delete(`${baseUrl}/species/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokens().accessToken}`,
    },
  });
};

export const postLogin = (loginData) => {
  return axiosInstance.post(`${baseUrl}/auth/login`, loginData);
};

export const verifyToken = (token) => {
  return axiosInstance.get(`${baseUrl}/auth/verify?token=${token}`);
};
