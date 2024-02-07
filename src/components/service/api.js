import axios from "axios";

const API_KEY = "Ejbl26wSYPCwsZwT3as0PQ1cCitRW6ZYKYw8BWd_Luk";
const searchGalleryApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});

export const getGalleryData = async (value, page) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await searchGalleryApi.get("/search/photos", {
      params: {
        query: value,
        page: page,
        per_page: 12,
        orientation: "landscape",
      },
    });
    return {
      hits: response.data.results.map((result) => ({
        id: result.id,
        webformatURL: result.urls.regular,
        largeImageURL: result.urls.full,
      })),
      totalHits: response.data.total,
    };
  } catch (error) {
    throw error;
  }
};
