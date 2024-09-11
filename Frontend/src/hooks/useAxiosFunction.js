import { useState, useEffect } from "react";

export const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);

  const axiosFetch = async (configObj) => {
    const { axiosInstance, url, method, requestConfig = {} } = configObj;
    const controller = new AbortController();
    setController(controller);

    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: controller.signal,
      });
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      if (axiosInstance.isCancel(error)) return;
      setLoading(false);
      console.log("error is", error.name);
      setError(error);
    }
  };

  useEffect(() => {
    console.log("controller is", controller);
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};
