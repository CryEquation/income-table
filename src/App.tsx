import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import type { ApiData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startMonthIndex, setStartMonthIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://3snet.co/js_test/api.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error('API request was not successful');
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setStartMonthIndex((prev) => (prev - 1 + 12) % 12);
      } else if (e.key === 'ArrowRight') {
        setStartMonthIndex((prev) => (prev + 1) % 12);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return <div className="w-[1440px] h-[1080px] flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-[1440px] h-[1080px] flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="w-[1440px] h-[1080px] bg-white mx-auto relative p-10 font-['Roboto'] text-[#202F55]">
      {/* For simplicity, header is omitted as it's static and complex */}
      <h1 className="text-2xl font-medium absolute top-[181px] left-[81px]">Affiliate manager</h1>
      
      <div className="absolute top-[249px] left-[45px] w-[calc(100%-90px)]">
          <div className="flex justify-end items-center mb-4">
              <div className="flex items-center gap-4">
                  <button onClick={() => setStartMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12)} className="p-2 border border-[#DDDEDF] rounded-md w-10 h-10 flex items-center justify-center text-2xl text-[#202F55]">&larr;</button>
                  <button onClick={() => setStartMonthIndex((prevIndex) => (prevIndex + 1) % 12)} className="p-2 border border-[#DDDEDF] rounded-md w-10 h-10 flex items-center justify-center text-2xl text-[#202F55]">&rarr;</button>
              </div>
          </div>
          {data && (
            <Table
              data={data}
              startMonthIndex={startMonthIndex}
            />
          )}
      </div>
    </div>
  );
};

export default App;
