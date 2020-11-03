import { useState } from "react";
import PropTypes from "prop-types";
import { parseJSON, isSuccessfulStatusCode, getPath } from "../helpers/methods";

const useFetch = ({ url, params, body, options }) => {
  const [response, setResponse] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const doFetch = async () => {
    const stringifiedBody = body && JSON.stringify(body);

    const requestUrl = getPath(url, params);
    const updatedOptions = {
      ...options,
      body: stringifiedBody,
      headers: {
        "Content-Type": "application/json",
      },
    };

    setIsCompleted(false);
    setLoading(true);

    try {
      const result = await fetch(requestUrl, updatedOptions);
      const jsonResponse = await parseJSON(result);
      const statusIsSuccessful = isSuccessfulStatusCode(result.status);

      statusIsSuccessful ? setErrors(null) : setErrors(jsonResponse);

      setResponse(jsonResponse);
      setIsSuccess(statusIsSuccessful);
    } catch (errors) {
      setErrors(errors);
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setIsCompleted(true);
    }
  };

  return [doFetch, { response, loading, errors, isCompleted, isSuccess }];
};

useFetch.defaultProps = {
  params: undefined,
  body: undefined,
  options: undefined,
};
useFetch.propTypes = {
  url: PropTypes.string.isRequired,
  params: PropTypes.arrayOf(PropTypes.object),
  body: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  options: PropTypes.object,
};

export default useFetch;
