import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AcCreated = () => {
  const navigate = useNavigate();

  // Automatically redirect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    // Clear the timer if the component unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Section with Wave and Check Icon */}
      <div className="relative h-48 bg-green-100">
        {/* Wave Shape at the Bottom of the Green Section */}
        <svg
          className="absolute bottom-0 w-full h-auto"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="M0,256L40,266.7C80,277,160,299,240,309.3C320,320,400,320,480,298.7C560,277,640,235,720,192C800,149,880,107,960,96C1040,85,1120,107,1200,122.7C1280,139,1360,149,1400,154.7L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>

        {/* Centered Checkmark Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow items-center justify-center px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Congratulations!</h1>
        <p className="text-gray-600 text-center mb-6">
          Your account is ready to use. You will be redirected to the home page in a few seconds.
        </p>

        {/* Button (Optional if user wants to go home immediately) */}
        <button
          className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-200 transition-colors"
          onClick={() => navigate('/home')}
        >
          BACK TO HOME!
        </button>
      </div>
    </div>
  );
};

export default AcCreated;
