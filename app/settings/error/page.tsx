import SlidingUnAuthorisedText from "@/app/settings/error/(client-renders)/sliding-unauthorised";
import '@/app/globals.css';

export default function UnAuthorised() {
  return (
    <div className="relative bg-white text-center mt-16 flex flex-col justify-center items-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">401</h1>
      <SlidingUnAuthorisedText />
    </div>
  );
}

