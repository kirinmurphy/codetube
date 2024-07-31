import { FaSpinner } from 'react-icons/fa';

export function LoadingSpinner () {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <FaSpinner className="animate-spin text-white text-xl" />
    </div>
  );
};
