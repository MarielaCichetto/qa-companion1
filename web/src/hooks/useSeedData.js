import { useEffect, useState } from 'react';

// Simple hook to serve mock data while backend integration is under development.
export const useSeedData = (loader) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const result = await loader();
      if (active) {
        setData(result);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [loader]);

  return data;
};
