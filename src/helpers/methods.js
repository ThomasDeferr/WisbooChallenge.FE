export const parseJSON = (response) => {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};

export const getPath = (url, params) =>
  params ? `${url}${encodeParamsAsURI(params)}` : url;

export const getFromPath = (path) => {
  const arrayPath = path.split("?");
  const url = arrayPath[0];
  const params = arrayPath[1] && decodeParamsAsURI(arrayPath[1]);

  return { url, params };
};

export const decodeParamsAsURI = (querystring) => {
  const arrayParams = querystring
    .substr(querystring.indexOf("?") + 1)
    .split("&")
    .map((param) => decodeURI(param).split("="));

  return Object.fromEntries(arrayParams);
};

export const encodeParamsAsURI = (params = {}) => {
  const encodeParams = Object.entries(params)
    .map(([k, v]) => encodeURI(`${k}=${v}`))
    .join("&");

  return `?${encodeParams}`;
};

export const isSuccessfulStatusCode = (statusCode) => {
  return 200 <= statusCode && statusCode < 300;
};

export const isEmptyArray = (array) => !Array.isArray(array) || !array.length;

export const sortDescending = (array, field) =>
  array.sort((a, b) => b[field] - a[field]);
