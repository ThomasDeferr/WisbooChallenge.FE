export const API_ENDPOINTS = {
  VIDEO_MEDIAS: `${process.env.REACT_APP_API_URL}/v1/videomedias`,
  VIDEO_COMMENTS: (videoMediaId) =>
    `${process.env.REACT_APP_API_URL}/v1/videomedias/${videoMediaId}/comments`,
};

export const WISTIA_DATA_API_ENDPOINTS = {
  MEDIAS: `${process.env.REACT_APP_WISTIA_DATA_API_URL}/v1/medias`,
};
