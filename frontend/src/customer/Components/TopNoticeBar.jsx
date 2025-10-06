import React from "react";

const TopNoticeBar = () => {
  return (
    <div className="w-full bg-gradient-to-r rounded-xl from-[#6A4ABF] to-[#BBA4F9] flex items-center justify-center gap-2 my-2 py-1 px-3 text-white text-sm font-medium shadow-sm">
      {/* Small dot/icon like Shopsy green dot */}
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

      {/* Text */}
      <span>🎉 Big Diwali Sale Live</span>
    </div>
  );
};

export default TopNoticeBar;
