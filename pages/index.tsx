import { useState, useEffect } from 'react';
import { fetcher } from '../lib/api';

const HomePage: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetcher('/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Home Page</h1>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default HomePage;