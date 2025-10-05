"use client";

export default function BottomArrow() {
  return (
      <div className="fixed bottom-8 right-8 p-3 bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer lg:block hidden" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >
        <div data-svg-wrapper data-property-1="Up" className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0013 6V18M12.0013 6L16.3555 10.3541M12.0013 6L7.64721 10.3541" stroke="#202122" strokeWidth="1.67198" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
  );
}