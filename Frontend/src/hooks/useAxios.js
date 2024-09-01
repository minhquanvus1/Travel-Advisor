import { useState, useEffect } from "react";

export const useAxios = (configObj) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const { axiosInstance, url, method, requestConfig = {} } = configObj;

  const refetch = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(false);
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
        setError(true);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [reload]);

  return [response, error, loading, refetch];
};
