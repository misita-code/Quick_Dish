import { useState, useEffect } from 'react';
import { useAdmin } from '../AdminContext';

export const UseAdminData = (dataType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const adminContext = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real application, you would fetch data from your API here
        // For now, we'll use the context data
        const contextData = adminContext[dataType] || [];
        setData(contextData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType, adminContext]);

  return { data, loading, error };
};

export default UseAdminData;