const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://localhost:5001";

export const API_ENDPOINTS = {
  CATEGORIES: `${API_URL}/v1/categories`
};
