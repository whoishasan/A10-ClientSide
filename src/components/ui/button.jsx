import React from "react";

export default function button({ children }) {
  return (
    <>
      <button className="flex justify-center items-center gap-2 bg-green-500 text-white px-5 py-2">
        {children}
      </button>
    </>
  );
}
