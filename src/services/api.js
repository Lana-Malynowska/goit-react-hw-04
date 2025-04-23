import axios from "axios";

const ACCESS_KEY = "OSeuIjMbgAWay-G5vd_EUQMOjiT7fsZg9e82ZD6HoK0";

export const fetchPhotos = async (query, page = 1) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
    params: {
      query: query,
      page,
      per_page: 12,
    },
  });

  return {
    photos: response.data.results,
    totalPages: response.data.total_pages,
  };
};
