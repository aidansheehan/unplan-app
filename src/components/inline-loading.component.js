import React, { useState, useEffect } from 'react';

const InlineLoadingComponent = () => {
  const [progress, setProgress] = useState(0);
  const loadingTime = 20000; // 20 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = oldProgress + 5;
        if (newProgress === 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, loadingTime / 20); // Update every 5% of the total time

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full px-4">
      <div className="w-full bg-gray-200 rounded-full">
        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>
          Loading...
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-center">
        This may take around 20 seconds. Please don't close this page.
      </p>
    </div>
  );
};

export default InlineLoadingComponent;
