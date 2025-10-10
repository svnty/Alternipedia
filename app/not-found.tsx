import SlidingNotFoundText from '@/app/sliding-not-found-text';

import '@/app/globals.css';

export default async function NotFound() {
  return (
    <div className="relative bg-white text-center mt-16 flex flex-col justify-center items-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <SlidingNotFoundText />
    </div>
  );
}